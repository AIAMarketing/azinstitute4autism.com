import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mirror = path.resolve(root, '../www.azinstitute4autism.com');
const content = path.join(root, 'src/content');
const assets = path.join(root, 'public/assets');
const reports = path.join(root, 'reports');
const site = 'https://www.azinstitute4autism.com';
const mkdir = (value) => fs.mkdir(value, { recursive: true });
const quote = (value = '') => JSON.stringify(String(value).replace(/\s+/g, ' ').trim());
const csv = (value = '') => `"${String(value).replaceAll('"', '""')}"`;
const blogPreamble = /^# .+\n\n!\[[^\]]*\]\(\/assets\/images\/rula-diab-avatar\.jpg\)\n\n[^\n]+\n\n[^\n]+\n\n!\[[^\]]*\]\([^)]+\)\n\n/;

async function walk(dir, prefix = '') {
  const output = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) output.push(...await walk(path.join(dir, entry.name), relative));
    else output.push(relative);
  }
  return output;
}

function logical(file) {
  return file.replace(/(?:\.html)?\?(?:hsLang=[^.]+|hs_amp=true)\.html$/, '.html');
}

function selectCanonical(files) {
  const map = new Map();
  for (const file of files) {
    if (!file.endsWith('.html') || file.includes('hs_amp=true') || /\/(?:page|author)\//.test(file)) continue;
    const target = logical(file);
    const key = `${target.startsWith('ar/') ? 'ar' : target.startsWith('es/') ? 'es' : 'en'}:${target}`;
    if (!map.has(key) || (!file.includes('?') && map.get(key).includes('?'))) map.set(key, file);
  }
  return [...map.values()];
}

function decode(value = '') {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&nbsp;', ' ');
}

function text(value = '') {
  return decode(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function normalizeHref(value = '') {
  return decode(value)
    .replace(/^https?:\/\/www\.azinstitute4autism\.com/, '')
    .replace(/(?:\.html)?(?:%3F|\?)(?:hsLang=[^.#]+|hs_amp=true)(?:\.html)?$/, '')
    .replace(/\.html$/, '')
    .replace(/^index$/, '/');
}

function inline(value = '') {
  return text(value.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
    const cleanLabel = text(label);
    return cleanLabel ? `[${cleanLabel}](${normalizeHref(href)})` : '';
  }));
}

function meta(html, name, property = false) {
  const key = property ? 'property' : 'name';
  const pattern = new RegExp(`<meta[^>]+${key}=["']${name}["'][^>]+content=["']([^"']*)`, 'i');
  const reverse = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${key}=["']${name}["']`, 'i');
  return decode(html.match(pattern)?.[1] || html.match(reverse)?.[1] || '');
}

function asset(value = '') {
  const match = value.match(/(?:hs-fs\/)?hubfs\/([^?#]+)/);
  return match ? `/assets/images/${path.basename(decodeURIComponent(match[1])).split('?')[0]}` : undefined;
}

function markdownFrom(html) {
  let body = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ||
    html.match(/blog-post__body[\s\S]*?(?=<footer|blog-post__tags|<\/article>)/i)?.[0] ||
    '';
  body = body
    .replace(/<(script|style|noscript|header|footer|nav|form)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, value) => `\n\n> ${inline(value)}\n\n`)
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, (_, src, alt) => {
      const local = asset(src);
      return local ? `\n\n![${text(alt)}](${local})\n\n` : '';
    })
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, value) => `\n\n${'#'.repeat(Number(level))} ${inline(value)}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, value) => `\n- ${inline(value)}`)
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, value) => `\n\n${inline(value)}\n\n`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');
  return decode(body).replace(/[ \t]+/g, ' ').replace(/^\s+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
}

function record(file, html) {
  const target = logical(file);
  const lang = target.startsWith('ar/') ? 'ar' : target.startsWith('es/') ? 'es' : 'en';
  const url = target === 'index.html' ? '/' : `/${target.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
  const title = text(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || url);
  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || title);
  const published = meta(html, 'article:published_time', true) ||
    html.match(/<time[^>]+datetime=["']([^"']+)/i)?.[1] || '';
  return {
    file, lang, url, title, h1,
    description: meta(html, 'description'),
    image: asset(meta(html, 'og:image', true)),
    date: /^\d{4}-\d{2}-\d{2}/.test(published) ? published.slice(0, 10) : '2024-01-01',
    markdown: markdownFrom(html)
  };
}

function frontmatter(item, blog) {
  const slug = ['/', '/ar', '/es'].includes(item.url) ? 'index' : item.url.split('/').filter(Boolean).at(-1);
  const lines = [
    '---',
    `title: ${quote(item.title)}`,
    `description: ${quote(item.description)}`,
    `slug: ${quote(slug)}`,
    `canonical: ${quote(`${site}${item.url}`)}`,
    `lang: ${quote(item.lang)}`,
    `translationKey: ${quote(slug)}`,
    item.image ? `featuredImage: ${quote(item.image)}` : '',
    blog ? `date: "${item.date}"` : '',
    blog ? 'author: "rula-diab"' : '',
    blog ? 'category: "Library"' : '',
    blog ? 'tags: []' : '',
    'draft: false',
    '---',
    '',
    (blog ? item.markdown.replace(blogPreamble, '') : item.markdown) || `# ${item.h1}`,
    ''
  ].filter((line) => line !== '');
  return `${lines.join('\n')}\n`;
}

async function copySourceAssets(files) {
  const rows = ['source,target,size,kind'];
  const seen = new Set();
  await Promise.all(['images', 'fonts', 'downloads'].map((kind) => fs.rm(path.join(assets, kind), { recursive: true, force: true })));
  for (const file of files.filter((name) => name.startsWith('hubfs/') || name.startsWith('hs-fs/hubfs/') || name.startsWith('_hcms/googlefonts/'))) {
    const font = file.startsWith('_hcms/googlefonts/');
    const raw = font ? file.replace('_hcms/googlefonts/', '') : path.basename(file).split('?')[0];
    if (!font && !/\.(?:avif|gif|jpe?g|png|svg|webp|pdf)$/i.test(raw)) continue;
    const key = `${font}:${raw}`;
    if (!raw || seen.has(key)) continue;
    seen.add(key);
    const kind = font ? 'fonts' : raw.endsWith('.pdf') ? 'downloads' : 'images';
    const target = path.join(assets, kind, raw);
    await mkdir(path.dirname(target));
    await fs.copyFile(path.join(mirror, file), target);
    const size = (await fs.stat(target)).size;
    rows.push([file, path.relative(root, target), size, kind].map(csv).join(','));
  }
  await fs.writeFile(path.join(reports, 'asset-inventory.csv'), `${rows.join('\n')}\n`);
}

async function removeMissingFeaturedImages() {
  for (const type of ['pages', 'blog']) {
    for (const file of await walk(path.join(content, type))) {
      const target = path.join(content, type, file);
      let source = await fs.readFile(target, 'utf8');
      const image = source.match(/^featuredImage:\s*"\/assets\/images\/([^"]+)"/m)?.[1];
      if (!image) continue;
      if (!await fs.access(path.join(assets, 'images', image)).then(() => true).catch(() => false)) {
        source = source.replace(/^featuredImage:.*\n/m, '');
        await fs.writeFile(target, source);
      }
    }
  }
}

async function main() {
  const files = await walk(mirror);
  const selected = selectCanonical(files);
  const records = [];
  for (const file of selected) records.push(record(file, await fs.readFile(path.join(mirror, file), 'utf8')));
  await Promise.all(['pages', 'blog', 'authors'].map((type) => fs.rm(path.join(content, type), { recursive: true, force: true })));
  for (const lang of ['en', 'ar', 'es']) {
    for (const type of ['pages', 'blog', 'authors']) await mkdir(path.join(content, type, lang));
  }
  for (const item of records) {
    const blog = item.url.includes('/library/') && !item.url.endsWith('/library');
    const slug = ['/', '/ar', '/es'].includes(item.url) ? 'index' : item.url.split('/').filter(Boolean).at(-1);
    await fs.writeFile(path.join(content, blog ? 'blog' : 'pages', item.lang, `${slug}.md`), frontmatter(item, blog));
  }
  for (const lang of ['en', 'ar', 'es']) {
    await fs.writeFile(path.join(content, 'authors', lang, 'rula-diab.md'), `---\nname: "Rula Diab"\nslug: "rula-diab"\ndescription: "Founder and clinical leader at Arizona Institute for Autism."\navatar: "/assets/images/rula-diab-avatar.jpg"\nlang: "${lang}"\ntranslationKey: "rula-diab"\n---\n`);
  }
  if (!records.some((item) => item.lang === 'ar' && item.url === '/ar')) {
    await fs.writeFile(path.join(content, 'pages/ar/index.md'), `---\ntitle: "معهد أريزونا للتوحد"\ndescription: "صفحة عربية تمهيدية لمعهد أريزونا للتوحد."\nslug: "index"\ncanonical: "https://www.azinstitute4autism.com/ar"\nlang: "ar"\ntranslationKey: "home"\ndraft: false\n---\n\n<!-- TODO: Replace this placeholder with reviewed Arabic content. -->\n\nتتوفر المقالات العربية الحالية في المكتبة. يرجى مراجعة المحتوى العربي قبل النشر.\n`);
  }
  const rows = ['source_file,url,language,type,title,description,h1'];
  for (const item of records) rows.push([item.file, item.url, item.lang, item.url.includes('/library/') ? 'blog' : 'page', item.title, item.description, item.h1].map(csv).join(','));
  await mkdir(reports);
  await fs.writeFile(path.join(reports, 'url-inventory.csv'), `${rows.join('\n')}\n`);
  await copySourceAssets(files);
  await removeMissingFeaturedImages();
  console.log(`Fallback extraction completed: ${records.length} canonical records.`);
}

await main();
