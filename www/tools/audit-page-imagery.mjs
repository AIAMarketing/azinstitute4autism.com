import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(root, 'public');
const failures = [];
const checked = [];

async function checkAsset(reference, owner) {
  if (!reference?.startsWith('/assets/')) return;
  const target = path.join(publicRoot, reference);
  const exists = await fs.access(target).then(() => true).catch(() => false);
  checked.push({ owner, reference, exists });
  if (!exists) failures.push(`${owner}: ${reference}`);
}

const visualSource = await fs.readFile(path.join(root, 'src/data/page-visuals.ts'), 'utf8');
for (const match of visualSource.matchAll(/['"](?<reference>\/assets\/images\/[^'"]+)['"]/g)) {
  await checkAsset(match.groups.reference, 'page hero mapping');
}
await checkAsset('/assets/images/hero-library-index.webp', 'library banner');
await checkAsset('/assets/images/rbt-toddler-play.webp', 'consultation form background');
await checkAsset('/assets/images/blockquote.svg', 'blog blockquote decoration');

for (const file of await fg('src/content/blog/**/*.{md,mdx}', { cwd: root, absolute: true })) {
  const { data } = matter(await fs.readFile(file, 'utf8'));
  if (!data.draft) await checkAsset(data.featuredImage, path.relative(root, file));
}

const uniqueChecked = new Map(checked.map((item) => [`${item.owner}:${item.reference}`, item]));
const report = [
  '# Page Imagery Audit',
  '',
  `Checked ${uniqueChecked.size} page-banner, section-background, and blog-featured-image references.`,
  '',
  failures.length
    ? `## Missing Assets\n\n${failures.map((item) => `- ${item}`).join('\n')}`
    : 'No missing mapped page imagery was detected.',
  ''
].join('\n');

await fs.writeFile(path.join(root, 'reports/page-imagery-audit.md'), report);
console.log(`${failures.length} missing mapped page images.`);
if (failures.length) process.exitCode = 1;
