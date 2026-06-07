import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
async function walk(dir) {
  const output = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await walk(target));
    else if (entry.name.endsWith('.md')) output.push(target);
  }
  return output;
}
const files = [...await walk(path.join(root, 'src/content/pages')), ...await walk(path.join(root, 'src/content/blog'))];
const urls = [];
for (const file of files) {
  const source = await fs.readFile(file, 'utf8');
  const canonical = source.match(/^canonical:\s*["']?([^"'\n]+)["']?/m)?.[1];
  const draft = source.match(/^draft:\s*(true|false)/m)?.[1] === 'true';
  if (canonical && !draft) urls.push(canonical);
}
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.sort().map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Generated sitemap with ${urls.length} URLs.`);
