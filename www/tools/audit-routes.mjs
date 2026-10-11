import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { load } from 'cheerio';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { createPublicationManifest } from '../src/utils/publication-policy.ts';
import { validateRedirects } from './generate-redirects.mjs';

export const ORIGIN = 'https://www.azinstitute4autism.com';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const REPORTS = path.join(ROOT, 'reports');
const BASELINE = 'route-baseline-2026-10-06.json';
const AGENT = 'AIA-Route-Audit';
const now = () => new Date().toISOString();
const compare = (a, b) => a.localeCompare(b, 'en');
const sorted = (items) => [...new Set(items)].sort(compare);

// Keep semantic query parameters (including unknown ones), their order, and
// fragments. The page key omits fragments only: anchors share an HTTP document.
export function normalizeReference(value, base = ORIGIN) {
  let url;
  try { url = new URL(value, base); } catch { return null; }
  if (url.origin !== ORIGIN || url.username || url.password) return null;
  if (!['http:', 'https:'].includes(url.protocol)) return null;
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_.+|hsLang|hsCtaAttrib|gclid|dclid|fbclid|msclkid|_ga|_gl)$/i.test(key)) {
      url.searchParams.delete(key);
    }
  }
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const route = pathname + url.search;
  return { route, reference: route + url.hash };
}

export function isPageRoute(route) {
  const pathname = new URL(route, ORIGIN).pathname;
  return !/^\/(?:hubfs|hub_generated|hs|_hcms|assets|_astro)(?:\/|$)/.test(pathname)
    && !/\.(?!html?$)[a-z\d]{1,8}$/i.test(pathname);
}

export function addDiscovery(records, value, source, observedAt, base = ORIGIN) {
  const normalized = normalizeReference(value, base);
  if (!normalized || !isPageRoute(normalized.route)) return null;
  const { route, reference } = normalized;
  const record = records.get(route) ?? {
    route, discoveredAt: observedAt, sources: [], references: [], http: null
  };
  record.sources = sorted([...record.sources, source]);
  if (reference !== route) record.references = sorted([...record.references, reference]);
  records.set(route, record);
  return record;
}

export function classify(local, production) {
  const status = production?.http?.status;
  const hasLocal = Boolean(local?.generated);
  const redirect = local?.redirect;
  if (status >= 300 && status < 400) {
    if (redirect) {
      const target = production?.http?.location ? normalizeReference(production.http.location)?.route : null;
      return !target || target === redirect.to ? 'local-and-production-redirect' : 'local-production-redirect-conflict';
    }
    return hasLocal ? 'local-generated-production-redirect' : 'production-redirect-only';
  }
  if (status === 404 || status === 410) {
    if (redirect) return 'local-redirect-production-absent';
    return hasLocal ? (local.placeholder ? 'local-placeholder-production-absent' : 'local-only-production-absent')
      : 'discovered-production-absent';
  }
  if (status >= 200 && status < 300) {
    if (redirect) return 'local-redirect-production-live';
    return hasLocal ? 'both-route-present-content-unverified' : 'live-only-verified';
  }
  const discovered = production?.sources?.some((s) => /^(sitemap|link|form|alternate):/.test(s));
  if (discovered) {
    if (redirect) return 'local-redirect-production-unverified';
    return hasLocal ? 'both-discovered-http-unverified' : 'live-discovered-local-missing';
  }
  if (local) return redirect ? 'local-redirect-production-unverified'
    : local.generated ? 'local-only-production-unverified' : 'local-source-not-generated';
  return 'verification-inconclusive';
}

export function reconcile(local, production) {
  const localMap = new Map(local.map((r) => [r.route, r]));
  const liveMap = new Map(production.map((r) => [r.route, r]));
  return sorted([...localMap.keys(), ...liveMap.keys()]).map((route) => {
    const local = localMap.get(route) ?? null;
    const production = liveMap.get(route) ?? null;
    return {
      route, local, production,
      inProductionSitemap: Boolean(production?.sources.some((s) => s.startsWith('sitemap:'))),
      disposition: classify(local, production)
    };
  });
}

export function summarize(routes) {
  const hasSitemap = (r) => r.inProductionSitemap;
  const generated = (r) => r.local?.generated;
  const live = (r) => r.production?.http?.status >= 200 && r.production.http.status < 300;
  return {
    routes: routes.length,
    localGenerated: routes.filter(generated).length,
    localRedirects: routes.filter((r) => r.local?.redirect).length,
    sitemap: routes.filter(hasSitemap).length,
    sitemapLocalOverlap: routes.filter((r) => hasSitemap(r) && generated(r)).length,
    sitemapLocalMissing: routes.filter((r) => hasSitemap(r) && !generated(r)).length,
    localNotInSitemap: routes.filter((r) => generated(r) && !hasSitemap(r)).length,
    verifiedLiveNotInSitemap: routes.filter((r) => live(r) && !hasSitemap(r)).length,
    verifiedAbsent: routes.filter((r) => [404, 410].includes(r.production?.http?.status)).length,
    dispositions: Object.fromEntries(sorted(routes.map((r) => r.disposition)).map((key) =>
      [key, routes.filter((r) => r.disposition === key).length]))
  };
}

// Only 404/410 establish absence. Redirects, blocks, errors and sitemap omission
// cannot. Compare inherited observations without replacing the original evidence.
export function baselineChanges(baseline, routes) {
  const oldSitemap = new Set(baseline.production.filter((r) => r.sources.some((s) => s.startsWith('sitemap:'))).map((r) => r.route));
  const currentSitemap = new Set(routes.filter((r) => r.inProductionSitemap).map((r) => r.route));
  const observations = [];
  for (const old of baseline.production) {
    const current = routes.find((r) => r.route === old.route)?.production;
    if (!old.http || !current?.http || !Number.isInteger(current.http.status)) continue;
    for (const key of ['status', 'location', 'canonical', 'title', 'locale', 'robots']) {
      // A redirect/error response without parsed HTML has unknown metadata;
      // do not report its uncollected fields as removals from the live page.
      if (!(key in old.http) || !(key in current.http)) continue;
      if ((old.http[key] ?? null) !== (current.http[key] ?? null)) {
        observations.push({ route: old.route, field: key, inherited: old.http[key], current: current.http[key] ?? null });
      }
    }
  }
  return {
    sitemapAdded: sorted([...currentSitemap].filter((r) => !oldSitemap.has(r))),
    sitemapRemoved: sorted([...oldSitemap].filter((r) => !currentSitemap.has(r))),
    observations
  };
}

export function parseRobots(text) {
  const groups = [];
  const sitemaps = [];
  let group = null;
  for (const line of text.split(/\r?\n/)) {
    const match = line.replace(/#.*/, '').match(/^\s*([\w-]+)\s*:\s*(.*?)\s*$/);
    if (!match) continue;
    const [, rawKey, value] = match;
    const key = rawKey.toLowerCase();
    if (key === 'sitemap') { sitemaps.push(value); continue; }
    if (key === 'user-agent') {
      if (!group || group.started) { group = { agents: [], rules: [], delay: 0, started: false }; groups.push(group); }
      group.agents.push(value.toLowerCase());
    } else if (group) {
      group.started = true;
      if (['allow', 'disallow'].includes(key) && value) group.rules.push({ allow: key === 'allow', pattern: value });
      if (key === 'crawl-delay' && Number.isFinite(Number(value))) group.delay = Math.max(0, Number(value) * 1000);
    }
  }
  const specific = groups.filter((g) => g.agents.includes(AGENT.toLowerCase()));
  const applicable = specific.length ? specific : groups.filter((g) => g.agents.includes('*'));
  return { rules: applicable.flatMap((g) => g.rules), delay: Math.max(750, ...applicable.map((g) => g.delay)), sitemaps };
}

export function robotsAllows(url, policy) {
  const { pathname, search } = new URL(url, ORIGIN);
  const matches = policy.rules.filter(({ pattern }) => {
    const end = pattern.endsWith('$');
    const body = end ? pattern.slice(0, -1) : pattern;
    const regex = body.split('*').map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    return new RegExp('^' + regex + (end ? '$' : '')).test(pathname + search);
  }).sort((a, b) => b.pattern.replace(/[*$]/g, '').length - a.pattern.replace(/[*$]/g, '').length || Number(b.allow) - Number(a.allow));
  return !matches.length || matches[0].allow;
}

function metadata(html) {
  const $ = load(html);
  return {
    title: $('head title').text().trim(),
    canonical: $('link[rel="canonical"]').attr('href') ?? null,
    locale: $('html').attr('lang') ?? null,
    robots: $('meta[name="robots"]').attr('content') ?? null
  };
}

async function localInventory() {
  const records = new Map();
  const entries = [];
  for (const file of (await fg('src/content/{pages,blog}/**/*.{md,mdx}', { cwd: ROOT })).sort(compare)) {
    const source = await fs.readFile(path.join(ROOT, file), 'utf8');
    const { data } = matter(source);
    const [, , collection, ...parts] = file.split('/');
    entries.push({ id: parts.join('/').replace(/\.mdx?$/, ''), collection, data, file, source });
  }
  for (const { route, eligible, sitemapEligible, canonical, externalCanonical, entry } of createPublicationManifest(entries, ORIGIN)) {
    const { data, file, source } = entry;
    records.set(route, {
      route, source: file, draft: data.draft === true,
      placeholder: /TODO: Replace this placeholder/i.test(source),
      sourceCanonical: data.canonical ?? null, locale: data.lang, generated: false,
      eligible, noindex: data.noindex === true, policyCanonical: canonical, externalCanonical, sitemapEligible
    });
  }
  const htmlFiles = (await fg('dist/**/*.html', { cwd: ROOT })).sort(compare);
  if (!htmlFiles.length) throw new Error('Build output unavailable. Run npm run build first.');
  for (const file of htmlFiles) {
    const route = file.replace(/^dist/, '').replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    records.set(route, { ...records.get(route), route, generated: true, ...metadata(await fs.readFile(path.join(ROOT, file), 'utf8')) });
  }
  const redirects = validateRedirects(
    JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/redirects.json'), 'utf8')),
    [...records.values()].filter(({ generated }) => generated).map(({ route }) => route)
  );
  for (const { from, to, status, reason } of redirects) {
    records.set(from, {
      ...records.get(from), route: from, generated: false, eligible: false,
      sitemapEligible: false, redirect: { to, status, reason }
    });
  }
  return [...records.values()].sort((a, b) => compare(a.route, b.route));
}

async function sourceFingerprint() {
  const hash = createHash('sha256');
  for (const file of (await fg([
    'src/**/*', 'public/**/*', 'astro.config.mjs', 'package.json', 'package-lock.json',
    'tools/audit-routes.mjs', 'tools/generate-redirects.mjs'
  ], { cwd: ROOT, onlyFiles: true })).sort(compare)) {
    hash.update(file + '\0'); hash.update(await fs.readFile(path.join(ROOT, file))); hash.update('\0');
  }
  return hash.digest('hex');
}

async function discover(local, baseline) {
  const records = new Map();
  const requests = [];
  const warnings = [];
  const cache = new Map();
  let policy = { rules: [], delay: 750, sitemaps: [] };
  let lastRequest = 0;
  let halted = false;
  async function get(url, purpose) {
    url = new URL(url, ORIGIN).href;
    if (new URL(url).origin !== ORIGIN) { warnings.push(`Skipped off-origin request: ${url}`); return null; }
    if (cache.has(url)) return cache.get(url);
    if (halted || !robotsAllows(url, policy)) {
      const result = { http: { checkedAt: now(), status: null, error: halted ? 'request-budget-or-server-stop' : 'robots-disallowed' } };
      cache.set(url, result); return result;
    }
    if (requests.length >= 80) { halted = true; warnings.push('80-request budget reached; remaining routes unverified.'); return get(url, purpose); }
    await new Promise((resolve) => setTimeout(resolve, Math.max(0, policy.delay - (Date.now() - lastRequest))));
    lastRequest = Date.now();
    const checkedAt = now();
    let result;
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': `${AGENT}/1.0 (read-only migration inventory)` } });
      const contentType = response.headers.get('content-type') ?? '';
      result = { http: { checkedAt, status: response.status }, text: await response.text(), contentType };
      const location = response.headers.get('location');
      if (location) result.http.location = new URL(location, url).href;
      if (response.status === 429 || response.status >= 500) {
        halted = true; warnings.push(`Stopped requests after HTTP ${response.status}: ${url}`);
      }
    } catch (error) {
      result = { http: { checkedAt, status: null, error: error.message } };
      halted = true; warnings.push(`Stopped requests after network failure: ${url}`);
    }
    requests.push({ url, purpose, ...result.http });
    cache.set(url, result);
    return result;
  }

  const robots = await get('/robots.txt', 'robots');
  if (![200, 404, 410].includes(robots.http.status)) throw new Error(`Cannot establish robots policy: ${JSON.stringify(robots.http)}`);
  policy = parseRobots(robots.http.status === 200 ? robots.text : '');
  if (policy.delay > 60000) throw new Error('robots crawl-delay exceeds this interactive audit budget; no page requests made.');
  const pendingSitemaps = sorted([`${ORIGIN}/sitemap.xml`, ...policy.sitemaps]);
  const seenSitemaps = new Set();
  while (pendingSitemaps.length && seenSitemaps.size < 10) {
    const url = pendingSitemaps.shift();
    if (seenSitemaps.has(url)) continue;
    seenSitemaps.add(url);
    const response = await get(url, 'sitemap');
    if (response?.http.status !== 200) { warnings.push(`Sitemap unavailable: ${url}`); continue; }
    const $ = load(response.text, { xml: true });
    $('sitemapindex > sitemap > loc').each((_i, e) => pendingSitemaps.push(new URL($(e).text(), url).href));
    $('urlset > url').each((_i, e) => {
      const record = addDiscovery(records, $(e).children('loc').text(), `sitemap:${url}`, response.http.checkedAt);
      if (record) record.sitemapLastmod = $(e).children('lastmod').text() || null;
    });
  }
  if (pendingSitemaps.length) warnings.push('Sitemap limit reached; discovery is incomplete.');
  if (![...records.values()].some((r) => r.sources.some((s) => s.startsWith('sitemap:')))) warnings.push('No sitemap routes discovered; sitemap absence is not reliable.');

  async function page(route) {
    const record = records.get(route);
    const response = await get(route, 'page');
    if (!response) return;
    record.http = response.http;
    if (response.http.status !== 200 || !response.contentType?.includes('text/html')) return;
    record.http = { ...response.http, ...metadata(response.text) };
    const $ = load(response.text);
    // Discover references only; do not recursively visit article links or submit
    // forms. Form actions identify public search routes, not backend endpoints.
    $('a[href], link[hreflang], form[action]').each((_i, e) => {
      const node = $(e);
      if (e.tagName === 'form' && (node.attr('method') ?? 'get').toLowerCase() !== 'get') return;
      const kind = e.tagName === 'form' ? 'form' : e.tagName === 'link' ? 'alternate' : 'link';
      const href = node.attr('href') ?? node.attr('action');
      if (href) addDiscovery(records, href, `${kind}:${route}`, response.http.checkedAt, new URL(route, ORIGIN));
    });
  }

  const seeds = ['/', '/es', '/library', '/es/library', '/ar/library'];
  for (const route of seeds) { addDiscovery(records, route, 'seed:index', now()); await page(route); }
  const localRoutes = new Set(local.filter((r) => r.generated).map((r) => r.route));
  const targets = sorted([
    ...local.filter((r) => r.generated && !records.get(r.route)?.sources.some((s) => s.startsWith('sitemap:'))).map((r) => r.route),
    ...[...records.values()].filter((r) => r.sources.some((s) => s.startsWith('sitemap:')) && !localRoutes.has(r.route)).map((r) => r.route),
    ...baseline.production.filter((r) => r.http).map((r) => r.route)
  ]);
  for (const route of targets) {
    addDiscovery(records, route, localRoutes.has(route) ? 'target:local-or-baseline' : 'target:baseline-or-missing', now());
    if (!seeds.includes(route)) await page(route);
  }
  // Verify discovered utility routes, including pagination; never broad-crawl
  // articles or follow query variants automatically.
  const utilities = sorted([...records.keys()].filter((r) => !r.includes('?') &&
    (/\/(?:page\/\d+|author\/[^/]+)$/.test(r) || r === '/search' || r.startsWith('/lp/'))));
  for (const route of utilities) if (!records.get(route).http) await page(route);
  return {
    checkedAt: now(), policy: { method: 'GET', minimumIntervalMs: policy.delay, maxRequests: 80, redirects: 'recorded, not followed', origin: ORIGIN },
    robots: { ...robots.http, text: robots.text ?? '' }, requests, warnings,
    production: [...records.values()].sort((a, b) => compare(a.route, b.route))
  };
}

// One row per route/request keeps the JSON compact and directly reviewable.
export function compactJson(value) {
  return '{\n' + Object.entries(value).map(([key, entry]) => `  ${JSON.stringify(key)}: ` +
    (Array.isArray(entry) ? '[\n' + entry.map((row) => '    ' + JSON.stringify(row)).join(',\n') + '\n  ]' : JSON.stringify(entry))).join(',\n') + '\n}\n';
}

async function latestEvidence() {
  const files = await fg('route-reconciliation-*.json', { cwd: REPORTS });
  if (!files.length) throw new Error('No saved reconciliation. Run npm run audit:routes online first.');
  const dated = await Promise.all(files.map(async (file) => ({ file, generatedAt: JSON.parse(await fs.readFile(path.join(REPORTS, file), 'utf8')).generatedAt })));
  dated.sort((a, b) => compare(a.generatedAt, b.generatedAt));
  return path.join(REPORTS, dated.at(-1).file);
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const offline = args.includes('--offline');
  let evidenceFile;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--evidence' && args[i + 1]) evidenceFile = path.resolve(args[++i]);
    else if (!['--check', '--offline'].includes(args[i])) throw new Error(`Unknown or incomplete option: ${args[i]}`);
  }
  if (evidenceFile && !check && !offline) throw new Error('--evidence requires --check or --offline.');
  const baselineText = await fs.readFile(path.join(REPORTS, BASELINE), 'utf8');
  const baseline = JSON.parse(baselineText);
  const baselineSha256 = createHash('sha256').update(baselineText).digest('hex');
  const local = await localInventory();
  const fingerprint = await sourceFingerprint();
  let discovery;
  if (check || offline) {
    evidenceFile ??= await latestEvidence();
    const saved = JSON.parse(await fs.readFile(evidenceFile, 'utf8'));
    if (![1, 2].includes(saved.schemaVersion) || saved.baselineSha256 !== baselineSha256) throw new Error('Saved evidence schema/baseline does not match.');
    discovery = { ...saved.discovery, production: saved.routes.flatMap((r) => r.production ? [r.production] : []) };
    const routes = reconcile(local, discovery.production);
    if (check) {
      if (saved.schemaVersion !== 2) throw new Error('Saved evidence predates redirect-aware reconciliation. Run --offline to produce a schema 2 report.');
      if (fingerprint !== saved.sourceFingerprint) throw new Error('Application source/assets changed since evidence capture. Build, then run --offline to produce a new reconciliation.');
      const localRedirects = local.filter(({ redirect }) => redirect).map(({ route, redirect }) => ({ route, ...redirect }));
      for (const [key, expected] of Object.entries({ routes, localRedirects, summary: summarize(routes), baselineChanges: baselineChanges(baseline, routes) })) {
        if (JSON.stringify(saved[key]) !== JSON.stringify(expected)) throw new Error(`Offline ${key} mismatch. Rebuild/reconcile; saved evidence was not changed.`);
      }
      if (discovery.warnings.length) throw new Error(`Saved production discovery is incomplete: ${discovery.warnings.join('; ')}`);
      console.log(`Offline check passed: ${path.basename(evidenceFile)} (no network or writes).`);
      console.log(JSON.stringify(saved.summary, null, 2));
      return;
    }
  } else discovery = await discover(local, baseline);
  const routes = reconcile(local, discovery.production);
  const generatedAt = now();
  const { production: _production, ...discoveryDetails } = discovery;
  const report = {
    schemaVersion: 2, generatedAt, mode: offline ? 'offline-reconciliation' : 'fresh-discovery',
    gitHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(),
    sourceFingerprint: fingerprint, baselineFile: BASELINE, baselineSha256,
    limitations: ['Route presence is not content or visual parity.', 'Unrequested sitemap URLs are not HTTP-verified.', 'Existing dist required; rebuild before capture if application files changed.', 'Fragments are preserved references, not separately fetched documents.', 'Query variants are retained; automatic requests do not submit search terms.', 'Fresh requests record redirects without following them; inherited observations generally recorded final responses. A status difference alone is not evidence of a newly introduced redirect.', 'Local redirects are repository definitions; this report does not establish activation on a deployed host.'],
    localUtilities: (await fg(['dist/robots.txt', 'dist/sitemap.xml'], { cwd: ROOT })).map((f) => '/' + f.slice(5)).sort(compare),
    discovery: discoveryDetails,
    localRedirects: local.filter(({ redirect }) => redirect).map(({ route, redirect }) => ({ route, ...redirect })),
    summary: summarize(routes), baselineChanges: baselineChanges(baseline, routes), routes
  };
  const name = `route-reconciliation-${generatedAt.slice(0, 10)}${offline ? '-offline' : ''}.json`;
  let output = path.join(REPORTS, name);
  if (await fs.access(output).then(() => true).catch(() => false)) {
    output = path.join(REPORTS, name.replace('.json', `-${generatedAt.slice(11).replace(/[:.]/g, '-')}.json`));
  }
  await fs.writeFile(output, compactJson(report), { flag: 'wx' });
  console.log(`Saved ${path.relative(ROOT, output)}; ${discovery.requests.length} recorded production requests${offline ? ' (reused; no new requests)' : ''}.`);
  console.log(JSON.stringify(report.summary, null, 2));
  if (discovery.warnings.length) throw new Error(`Evidence saved with incomplete discovery: ${discovery.warnings.join('; ')}`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().catch((error) => { console.error(`Route audit failed: ${error.message}`); process.exitCode = 1; });
}
