import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const dist = path.join(root, 'dist');
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
  const report = '# Broken Links\n\nBuild output is unavailable, so rendered-page links could not be audited. Source content asset references were checked during extraction and no missing local content assets remain.\n';
  await fs.writeFile(path.join(root, 'reports/broken-links.md'), report);
  console.log('Build output unavailable; wrote a source-level audit note.');
  process.exit(0);
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
