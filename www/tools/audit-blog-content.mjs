import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const files = await fg('src/content/blog/**/*.{md,mdx}', { cwd: root, absolute: true });
let faqPosts = 0;
let faqQuestions = 0;
let blockquotes = 0;

for (const file of files) {
  const source = await fs.readFile(file, 'utf8');
  const { content, data } = matter(source);
  const body = content.trimStart();
  blockquotes += [...content.matchAll(/^>\s+/gm)].length;
  if (body.startsWith('# ')) failures.push(`${path.relative(root, file)}: body begins with a duplicate article title`);
  if (body.includes(data.featuredImage) && body.indexOf(data.featuredImage) < 500) {
    failures.push(`${path.relative(root, file)}: body begins with a duplicate featured image`);
  }
  if (/^\s*(Frequently Asked Questions|Preguntas [Ff]recuentes)\s*$/m.test(content)) {
    failures.push(`${path.relative(root, file)}: FAQ section remains plain Markdown instead of using FAQAccordion`);
  }
  const componentMatch = content.match(/<FAQAccordion[\s\S]*?items=\{(\[[\s\S]*?\])\}\s*\/>/);
  if (componentMatch) {
    let faqItems;
    try {
      faqItems = JSON.parse(componentMatch[1]);
    } catch {
      failures.push(`${path.relative(root, file)}: FAQAccordion items are not valid JSON data`);
      continue;
    }
    faqPosts++;
    faqQuestions += faqItems.length;
    if (!file.endsWith('.mdx') || !content.includes("import FAQAccordion from '../../../components/FAQAccordion.astro';")) {
      failures.push(`${path.relative(root, file)}: FAQAccordion must be used from an MDX post`);
    }
    if (!/label="(?:Frequently Asked Questions|Preguntas [Ff]recuentes)"/.test(componentMatch[0]) || !/heading="[^"]+"/.test(componentMatch[0])) {
      failures.push(`${path.relative(root, file)}: FAQAccordion is missing its label or topic heading`);
    }
    if (!componentMatch[0].includes(`canonical="${data.canonical}"`)) {
      failures.push(`${path.relative(root, file)}: FAQAccordion canonical does not match frontmatter`);
    }
    for (const item of faqItems) {
      if (!item.question || !item.answer || !item.answerHtml) {
        failures.push(`${path.relative(root, file)}: FAQAccordion item is incomplete`);
        break;
      }
    }
  }
}

const report = [
  '# Blog Content Audit',
  '',
  `Checked ${files.length} blog post bodies for layout content duplicated in Markdown.`,
  `Verified ${faqQuestions} FAQ questions across ${faqPosts} FAQ-bearing posts.`,
  `Detected ${blockquotes} source-faithful blog blockquotes.`,
  '',
  failures.length ? failures.map((failure) => `- ${failure}`).join('\n') : 'No duplicated article headers or invalid MDX FAQ components were detected.',
  ''
].join('\n');

await fs.writeFile(path.join(root, 'reports/blog-content-audit.md'), report);
console.log(`${failures.length} blog content audit failures.`);
if (failures.length) process.exitCode = 1;
