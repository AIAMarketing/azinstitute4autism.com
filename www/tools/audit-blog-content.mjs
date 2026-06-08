import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const files = await fg('src/content/blog/**/*.{md,mdx}', { cwd: root, absolute: true });

for (const file of files) {
  const { content, data } = matter(await fs.readFile(file, 'utf8'));
  const body = content.trimStart();
  if (body.startsWith('# ')) failures.push(`${path.relative(root, file)}: body begins with a duplicate article title`);
  if (body.includes(data.featuredImage) && body.indexOf(data.featuredImage) < 500) {
    failures.push(`${path.relative(root, file)}: body begins with a duplicate featured image`);
  }
}

const report = [
  '# Blog Content Audit',
  '',
  `Checked ${files.length} blog post bodies for layout content duplicated in Markdown.`,
  '',
  failures.length ? failures.map((failure) => `- ${failure}`).join('\n') : 'No duplicated article headers were detected.',
  ''
].join('\n');

await fs.writeFile(path.join(root, 'reports/blog-content-audit.md'), report);
console.log(`${failures.length} duplicated blog header elements.`);
if (failures.length) process.exitCode = 1;
