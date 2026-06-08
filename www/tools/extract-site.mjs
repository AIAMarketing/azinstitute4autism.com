import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { load } from 'cheerio';
import TurndownService from 'turndown';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mirror = path.resolve(root, '../www.azinstitute4autism.com');
const site = 'https://www.azinstitute4autism.com';
const contentRoot = path.join(root, 'src/content');
const publicRoot = path.join(root, 'public/assets');
const reportsRoot = path.join(root, 'reports');
const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
turndown.remove(['script', 'style', 'noscript', 'iframe']);

const mkdir = (dir) => fs.mkdir(dir, { recursive: true });
const clean = (value = '') => value.replace(/\s+/g, ' ').trim();
const csv = (value = '') => `"${String(value).replaceAll('"', '""')}"`;
const yaml = (value = '') => JSON.stringify(String(value));
const blogPreamble = /^# .+\n\n!\[[^\]]*\]\(\/assets\/images\/rula-diab-avatar\.jpg\)\n\n[^\n]+\n\n[^\n]+\n\n!\[[^\]]*\]\([^)]+\)\n\n/;

function contentMarkdown(markdown, isBlog) {
  return isBlog ? markdown.replace(blogPreamble, '') : markdown;
}

function logicalFile(file) {
  return file.replace(/(?:\.html)?\?(?:hsLang=[^.]+|hs_amp=true)\.html$/, '.html');
}

function canonicalFiles(files) {
  const selected = new Map();
  for (const file of files) {
    if (!file.endsWith('.html') || /\/(?:page|author)\//.test(file) || file.includes('hs_amp=true')) continue;
    const logical = logicalFile(file);
    const lang = logical.startsWith('ar/') ? 'ar' : logical.startsWith('es/') ? 'es' : 'en';
    const key = `${lang}:${logical}`;
    const current = selected.get(key);
    if (!current || (!file.includes('?') && current.includes('?'))) selected.set(key, file);
  }
  return [...selected.values()];
}

function sourceUrl(file) {
  const logical = logicalFile(file);
  if (logical === 'index.html') return '/';
  return `/${logical.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
}

function isBlogFile(file) {
  return file.startsWith('library/') || file.includes('/library/');
}

function languageFor(file, $) {
  if (file.startsWith('ar/')) return 'ar';
  if (file.startsWith('es/')) return 'es';
  return $('html').attr('lang')?.split('-')[0] || 'en';
}

function localizeAsset(value = '') {
  const decoded = value.replace(/^https?:\/\/[^/]+/, '').replace(/^\.\.\//, '/');
  const match = decoded.match(/(?:\/)?(?:hs-fs\/)?hubfs\/([^?#]+)/);
  if (!match) return undefined;
  return `/assets/images/${path.basename(decodeURIComponent(match[1])).split('?')[0]}`;
}

function extractRecord(file, html) {
  const $ = load(html);
  const lang = languageFor(file, $);
  const url = sourceUrl(file);
  const title = clean($('title').first().text()) || clean($('h1').first().text()) || url;
  const description = $('meta[name="description"]').attr('content') || '';
  const h1 = clean($('h1').first().text());
  const image = localizeAsset(
    $('meta[property="og:image"]').attr('content') ||
    $('.blog-post__body img, main img, .body-container-wrapper img').first().attr('src') ||
    ''
  );
  const alt = clean($('.blog-post__body img, main img, .body-container-wrapper img').first().attr('alt') || '');
  const dateText = $('meta[property="article:published_time"]').attr('content') ||
    $('time').first().attr('datetime') || '2024-01-01';
  const date = /^\d{4}-\d{2}-\d{2}/.test(dateText) ? dateText.slice(0, 10) : '2024-01-01';
  const selector = isBlogFile(file) ? '.blog-post__body' : 'main, .body-container-wrapper';
  const body = $(selector).first().clone();
  body.find('header, footer, nav, form, script, style, noscript, .hs_cos_wrapper_type_form').remove();
  body.find('*').removeAttr('style').removeAttr('id').removeAttr('data-hs-cos-general-type').removeAttr('data-hs-cos-type');
  body.find('a').each((_, element) => {
    const href = $(element).attr('href');
    if (!href) return;
    $(element).attr('href', href
      .replace(/\.html(?:%3F|\?)[^"]*$/, '')
      .replace(/\.html$/, '')
      .replace(/^index$/, '/'));
  });
  body.find('img').each((_, element) => {
    const src = localizeAsset($(element).attr('src'));
    if (src) $(element).attr('src', src);
  });
  const markdown = contentMarkdown(
    turndown.turndown(body.html() || '').replace(/\n{3,}/g, '\n\n').trim(),
    isBlogFile(file)
  );
  return { file, lang, url, title, description, h1, image, alt, date, markdown };
}

function frontmatter(record, type) {
  const slug = ['/', '/ar', '/es'].includes(record.url) ? 'index' : record.url.split('/').filter(Boolean).at(-1);
  const data = {
    title: record.title,
    description: record.description,
    slug,
    canonical: `${site}${record.url}`,
    lang: record.lang,
    translationKey: slug,
    draft: false
  };
  if (record.image) data.featuredImage = record.image;
  if (record.alt) data.alt = record.alt;
  if (type === 'blog') Object.assign(data, {
    date: record.date,
    author: 'rula-diab',
    category: 'Library',
    tags: []
  });
  return matter.stringify(record.markdown || `# ${record.h1 || record.title}\n`, data);
}

async function copyAssets() {
  const assets = await fg(['hubfs/*', 'hs-fs/hubfs/*', '_hcms/googlefonts/**/*'], { cwd: mirror, onlyFiles: true });
  const inventory = ['source,target,size,kind'];
  const seen = new Set();
  await Promise.all(['images', 'fonts', 'downloads'].map((kind) => fs.rm(path.join(publicRoot, kind), { recursive: true, force: true })));
  for (const source of assets) {
    const original = path.join(mirror, source);
    const stat = await fs.stat(original);
    const isFont = source.startsWith('_hcms/googlefonts/');
    const rawName = isFont ? source.replace('_hcms/googlefonts/', '') : path.basename(source).split('?')[0];
    if (!isFont && !/\.(?:avif|gif|jpe?g|png|svg|webp|pdf)$/i.test(rawName)) continue;
    if (!rawName || seen.has(`${isFont}:${rawName}`)) continue;
    seen.add(`${isFont}:${rawName}`);
    const target = path.join(publicRoot, isFont ? 'fonts' : rawName.endsWith('.pdf') ? 'downloads' : 'images', rawName);
    await mkdir(path.dirname(target));
    await fs.copyFile(original, target);
    inventory.push([source, path.relative(root, target), stat.size, isFont ? 'font' : path.extname(rawName).slice(1)].map(csv).join(','));
  }
  await fs.writeFile(path.join(reportsRoot, 'asset-inventory.csv'), `${inventory.join('\n')}\n`);
}

async function main() {
  await Promise.all([
    mkdir(contentRoot), mkdir(publicRoot), mkdir(reportsRoot),
    ...['en', 'ar', 'es'].flatMap((lang) => [
      mkdir(path.join(contentRoot, 'pages', lang)),
      mkdir(path.join(contentRoot, 'blog', lang)),
      mkdir(path.join(contentRoot, 'authors', lang))
    ])
  ]);
  const files = canonicalFiles(await fg(['**/*.html'], { cwd: mirror, onlyFiles: true }));
  const records = [];
  for (const file of files) records.push(extractRecord(file, await fs.readFile(path.join(mirror, file), 'utf8')));
  const corePages = new Set(records.filter((r) => !isBlogFile(r.file)).map((r) => r.file));
  for (const record of records) {
    const isBlog = isBlogFile(record.file);
    if (!isBlog && !corePages.has(record.file)) continue;
    const slug = ['/', '/ar', '/es'].includes(record.url) ? 'index' : record.url.split('/').filter(Boolean).at(-1);
    const target = path.join(contentRoot, isBlog ? 'blog' : 'pages', record.lang, `${slug}.md`);
    await fs.writeFile(target, frontmatter(record, isBlog ? 'blog' : 'page'));
  }
  for (const lang of ['en', 'ar', 'es']) {
    await fs.writeFile(path.join(contentRoot, 'authors', lang, 'rula-diab.md'), matter.stringify('', {
      name: 'Rula Diab',
      slug: 'rula-diab',
      description: 'Founder and clinical leader at Arizona Institute for Autism.',
      avatar: '/assets/images/rula-diab-avatar.jpg',
      lang,
      translationKey: 'rula-diab'
    }));
  }
  const urlRows = ['source_file,url,language,type,title,description,h1'];
  for (const record of records) urlRows.push([
    record.file, record.url, record.lang,
    isBlogFile(record.file) ? 'blog' : 'page',
    record.title, record.description, record.h1
  ].map(csv).join(','));
  await fs.writeFile(path.join(reportsRoot, 'url-inventory.csv'), `${urlRows.join('\n')}\n`);
  await copyAssets();
  console.log(`Extracted ${records.length} canonical pages and posts.`);
}

await main();
