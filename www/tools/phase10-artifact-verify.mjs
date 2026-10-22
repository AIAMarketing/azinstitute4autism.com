import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import fg from 'fast-glob';

const readText = async (file) => fs.readFile(file, 'utf8');

function hrefValues(html, rel) {
  const values = [];
  const pattern = new RegExp(`<link\\b[^>]*\\brel=["']${rel}["'][^>]*\\bhref=["']([^"']+)["']`, 'gi');
  for (const match of html.matchAll(pattern)) values.push(match[1]);
  return values;
}

function routeFromHtml(file, root) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'/index.html'.length)}`;
  return `/${relative.replace(/\.html$/, '')}`;
}

function formActions(html) {
  return [...html.matchAll(/<form\b([^>]*)>/gi)].map((match) =>
    match[1].match(/\baction=["']([^"']*)["']/i)?.[1] ?? null);
}

function unsafeSignals(html) {
  const signals = [];
  if (/<iframe\b[^>]*\bsrc=["'][^"']*jotform/i.test(html)) signals.push('active Jotform iframe');
  if (/<script\b[^>]*\bsrc=["'][^"']*(?:jotform|googletagmanager|google-analytics|doubleclick)/i.test(html)) signals.push('active vendor tracking/form script');
  if (/data-(?:form|forms)-mode=["']live["']/i.test(html)) signals.push('live form mode');
  if (/api\.azinstitute4autism\.com/i.test(html)) signals.push('production API origin');
  if (/AIza[0-9A-Za-z_-]{20,}|-----BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY-----|(?:api[_-]?key|secret|password)\s*[:=]/i.test(html)) signals.push('credential-like content');
  return signals;
}

export async function verifyArtifact(root, mode = 'staging') {
  const htmlFiles = (await fg('**/*.html', { cwd: root, absolute: true })).sort();
  const routes = [];
  const canonicalMap = new Map();
  const errors = [];
  const warnings = [];
  let hreflangLinks = 0;
  let activeForms = 0;
  let secretSignals = [];

  for (const file of htmlFiles) {
    const html = await readText(file);
    const route = routeFromHtml(file, root);
    const robots = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
    const canonical = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["']/i)?.[1] ?? null;
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
    const actions = formActions(html);
    const nonSearchActions = actions.filter((action) => action && action !== '/search');
    const signals = unsafeSignals(html);
    if (!title) errors.push(`${route}: missing title`);
    if (!canonical) errors.push(`${route}: missing canonical`);
    if (!robots) errors.push(`${route}: missing robots directive`);
    if (mode === 'staging' && robots !== 'noindex,nofollow') errors.push(`${route}: staging robots is ${robots ?? 'missing'}`);
    if (canonical) {
      const prior = canonicalMap.get(canonical);
      if (prior) errors.push(`${route}: duplicate canonical ${canonical} (also ${prior})`);
      canonicalMap.set(canonical, route);
    }
    hreflangLinks += hrefValues(html, 'alternate').filter((href) => href).length;
    if (signals.length) secretSignals.push({ route, signals });
    if (nonSearchActions.length) activeForms += nonSearchActions.length;
    routes.push({ route, title, robots, canonical, nativeForms: actions.length, nonSearchActions: nonSearchActions.length });
  }

  const sitemapFile = path.join(root, 'sitemap.xml');
  const sitemap = await fs.readFile(sitemapFile, 'utf8').catch(() => '');
  const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);
  const reviewIndex = htmlFiles.some((file) => routeFromHtml(file, root) === '/lp');
  if (mode === 'staging') {
    if (sitemapRoutes.length) errors.push(`staging sitemap contains ${sitemapRoutes.length} URLs`);
    if (hreflangLinks) errors.push(`staging emits ${hreflangLinks} hreflang links`);
    if (!reviewIndex) errors.push('staging /lp review index is missing');
  } else {
    if (!sitemapRoutes.length) errors.push('indexing-enabled sitemap is empty');
    if (reviewIndex) errors.push('indexing-enabled artifact contains staging-only /lp review index');
  }
  if (activeForms) errors.push(`found ${activeForms} non-search native form action(s)`);
  if (secretSignals.length) errors.push(`unsafe artifact signals: ${JSON.stringify(secretSignals)}`);

  const files = (await fg('**/*', { cwd: root, absolute: true, onlyFiles: true })).sort();
  const digest = createHash('sha256');
  for (const file of files) {
    const relative = path.relative(root, file).replaceAll(path.sep, '/');
    digest.update(relative);
    digest.update('\0');
    digest.update(createHash('sha256').update(await fs.readFile(file)).digest('hex'));
    digest.update('\n');
  }
  return {
    mode,
    htmlRoutes: htmlFiles.length,
    sitemapUrls: sitemapRoutes.length,
    hreflangLinks,
    reviewIndex,
    activeNativeFormActions: activeForms,
    artifactFiles: files.length,
    artifactSha256: digest.digest('hex'),
    routes,
    errors,
    warnings,
    passed: errors.length === 0,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const mode = process.argv.find((arg) => arg.startsWith('--mode='))?.slice('--mode='.length) ?? 'staging';
  const root = process.argv.find((arg) => arg.startsWith('--root='))?.slice('--root='.length) ?? 'dist';
  if (!['staging', 'indexing'].includes(mode)) throw new Error(`Unsupported mode: ${mode}`);
  const result = await verifyArtifact(path.resolve(root), mode);
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
}
