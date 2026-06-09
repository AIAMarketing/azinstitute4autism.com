import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(root, 'src/content/blog');
const output = path.join(root, 'src/data/blog-footers.json');
const footerHeading = /^### Similar Blog Posts\s*$/m;
const navPattern = /^ ?(Previous Post|Next Post) ?\n\n###### \[([^\]]+)\]\(([^)]+)\)\s*$/gm;
const relatedPattern = /!\[([^\]]*)\]\(([^)]+)\)\s*\n\n#### \[([^\]]+)\]\(([^)]+)\)/g;

const routeFor = (lang, href) => {
  if (/^(?:https?:|mailto:|tel:|#|\/)/.test(href)) return href;
  const slug = href.replace(/^\.\.\//, '').replace(/^library\//, '');
  return `${lang === 'en' ? '' : `/${lang}`}/library/${slug}`;
};

const records = {};
for (const file of await fg('**/*.{md,mdx}', { cwd: contentRoot, onlyFiles: true })) {
  const source = await fs.readFile(path.join(contentRoot, file), 'utf8');
  const heading = footerHeading.exec(source);
  if (!heading) continue;

  const [lang, filename] = file.split('/');
  const slug = filename.replace(/\.(?:md|mdx)$/, '');
  const before = source.slice(0, heading.index);
  const footer = source.slice(heading.index);
  const navigation = {};
  let firstNavIndex = heading.index;

  for (const match of before.matchAll(navPattern)) {
    firstNavIndex = Math.min(firstNavIndex, match.index);
    navigation[match[1] === 'Previous Post' ? 'previous' : 'next'] = {
      title: match[2],
      href: routeFor(lang, match[3])
    };
  }

  const related = [...footer.matchAll(relatedPattern)].map((match) => ({
    image: match[2],
    alt: match[1],
    title: match[3],
    href: routeFor(lang, match[4])
  }));

  records[`${lang}/${slug}`] = { ...navigation, related };
  await fs.writeFile(path.join(contentRoot, file), `${source.slice(0, firstNavIndex).trimEnd()}\n`);
}

const count = Object.keys(records).length;
if (count === 0) {
  throw new Error('No blog footer fragments found; existing footer data was left unchanged.');
}

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, `${JSON.stringify(records, null, 2)}\n`);
console.log(`Extracted and removed footer fragments from ${count} blog posts.`);
