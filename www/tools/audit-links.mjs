import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const dist = path.join(root, 'dist');
const normalizePath = (value) => {
  const decoded = decodeURIComponent(value).replace(/\/index(?:\.html)?$/, '/').replace(/\.html$/, '');
  return decoded !== '/' ? decoded.replace(/\/$/, '') : decoded;
};
const contentRoute = (file, data) => {
  if (!data.slug || data.draft) return null;
  const languagePrefix = data.lang === 'en' ? '' : `/${data.lang}`;
  if (file.includes('/blog/')) return `${languagePrefix}/library/${data.slug}`;
  if (data.slug === 'index') return languagePrefix || '/';
  if (data.slug === 'library') return `${languagePrefix}/library`;
  return `${languagePrefix}/${data.slug}`;
};
const resolveInternalReference = (reference, route) => {
  const cleaned = reference.trim().replace(/^<|>$/g, '');
  if (!cleaned || cleaned.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(cleaned) || cleaned.startsWith('//')) return null;
  try {
    const base = new URL(route, 'https://audit.local');
    const resolved = new URL(cleaned, base);
    return normalizePath(resolved.pathname);
  } catch {
    return cleaned;
  }
};
async function walk(dir) {
  const output = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await walk(target));
    else if (entry.name.endsWith('.html')) output.push(path.relative(dist, target));
  }
  return output;
}
const distExists = await fs.access(dist).then(() => true).catch(() => false);
if (!distExists) {
  const routes = new Set(['/', '/library', '/es', '/es/library', '/ar', '/ar/library']);
  const contentFiles = await fg('src/content/**/*.{md,mdx}', { cwd: root, absolute: true });
  const contentRecords = [];
  for (const file of contentFiles) {
    const parsed = matter(await fs.readFile(file, 'utf8'));
    const route = contentRoute(file, parsed.data);
    if (!route) continue;
    routes.add(normalizePath(route));
    contentRecords.push({ file, route: normalizePath(route), text: parsed.content });
  }
  const publicFiles = new Set((await fg('public/**/*', { cwd: root, onlyFiles: true })).map((file) => `/${file.replace(/^public\//, '')}`));
  const broken = [];

  for (const { file, route, text } of contentRecords) {
    if (file.includes('/pages/') && ['/library', '/es/library', '/ar/library', '/', '/es', '/ar'].includes(route)) continue;
    const references = [...text.matchAll(/\]\(([^)\s]+)(?:\s+["'][^)]*)?\)/g)].map((match) => match[1]);
    for (const rawReference of references) {
      const reference = resolveInternalReference(rawReference, route);
      if (!reference) continue;
      if (reference.startsWith('/assets/')) {
        if (!publicFiles.has(reference)) broken.push(`${path.relative(root, file)}: ${rawReference} -> ${reference}`);
      } else if (!routes.has(reference)) {
        broken.push(`${path.relative(root, file)}: ${rawReference} -> ${reference}`);
      }
    }
  }

  const sourceFiles = await fg('src/**/*.{astro,ts,js,json}', { cwd: root, absolute: true });
  for (const file of sourceFiles) {
    const text = await fs.readFile(file, 'utf8');
    const references = [
      ...text.matchAll(/(?:href|src)=["'](\/[^"'#?{]*)/g),
      ...text.matchAll(/\]\((\/[^)#?]*)/g)
    ].map((match) => normalizePath(match[1]));
    for (const reference of references) {
      if (reference.startsWith('/assets/') || reference === '/robots.txt' || reference === '/sitemap.xml') {
        if (!publicFiles.has(reference)) broken.push(`${path.relative(root, file)}: ${reference}`);
      } else if (!routes.has(reference)) {
        broken.push(`${path.relative(root, file)}: ${reference}`);
      }
    }
  }
  const unique = [...new Set(broken)].sort();
  const report = unique.length
    ? `# Broken Links\n\nRendered output is unavailable in the sandbox; source routes and public assets were audited.\n\n${unique.map((item) => `- ${item}`).join('\n')}\n`
    : '# Broken Links\n\nRendered output is unavailable in the sandbox; source routes and public assets were audited. No broken internal source links were detected.\n';
  await fs.writeFile(path.join(root, 'reports/broken-links.md'), report);
  console.log(`${unique.length} broken internal source links.`);
  if (unique.length) process.exitCode = 1;
  process.exit();
}
const files = await walk(dist);
const broken = [];
for (const file of files) {
  const html = await fs.readFile(path.join(dist, file), 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const url = match[1];
    if (url.startsWith('/assets/')) {
      if (!await fs.access(path.join(dist, url)).then(() => true).catch(() => false)) broken.push(`${file}: ${url}`);
      continue;
    }
    const candidates = [path.join(dist, url, 'index.html'), path.join(dist, `${url}.html`), path.join(dist, url)];
    if (!await Promise.any(candidates.map((candidate) => fs.access(candidate))).then(() => true).catch(() => false)) broken.push(`${file}: ${url}`);
  }
}
const report = broken.length ? `# Broken Links\n\n${broken.map((item) => `- ${item}`).join('\n')}\n` : '# Broken Links\n\nNo broken internal build links detected.\n';
await fs.writeFile(path.join(root, 'reports/broken-links.md'), report);
console.log(`${broken.length} broken internal links.`);
if (broken.length) process.exitCode = 1;
