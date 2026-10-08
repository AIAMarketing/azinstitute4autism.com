import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { load } from 'cheerio';
import { createPublicationManifest, hreflangLinksFor, renderSitemap, robotsFor } from '../src/utils/publication-policy.ts';
import { socialImageUrl } from '../src/utils/seo.ts';

const project = fileURLToPath(new URL('../', import.meta.url));
const site = JSON.parse(await readFile(path.join(project, 'src/data/site.json'), 'utf8')).url;
const image = '/assets/images/hero-teach-self-advocacy.webp';
const languages = ['en', 'es', 'ar'];
const prefix = (lang) => lang === 'en' ? '' : `/${lang}`;
const artifacts = new Map();
let temporary;
let manifest;
let runner;

async function writeEntry(collection, lang, slug, data = {}) {
  await writeFile(path.join(temporary, 'src/content', collection, lang, `${slug}.md`),
    matter.stringify('Fixture body with **Markdown**.\n', {
      title: `SEO title (${lang})`, description: `Description (${lang})`, slug, lang,
      ...(collection === 'blog' ? { date: '2026-10-08', author: 'rula-diab' } : {}), ...data
    }));
}

function build(indexing = false) {
  return execFileSync(process.execPath, ['--input-type=module', '-e', runner], {
    cwd: temporary, env: { ...process.env, PUBLIC_ALLOW_INDEXING: String(indexing) },
    timeout: 60_000, maxBuffer: 2 * 1024 * 1024, stdio: 'pipe'
  });
}

async function capture(name) {
  const html = new Map();
  for (const file of await fg('**/*.html', { cwd: path.join(temporary, 'dist') })) {
    const route = '/' + file.replace(/(^|\/)index\.html$/, '').replace(/\/$/, '');
    html.set(route, await readFile(path.join(temporary, 'dist', file), 'utf8'));
  }
  artifacts.set(name, { html, sitemap: await readFile(path.join(temporary, 'dist/sitemap.xml'), 'utf8') });
}

const page = (route, mode = 'staging') => {
  const html = artifacts.get(mode).html.get(route);
  assert.ok(html, `Missing ${mode} page: ${route}`);
  return load(html);
};
const meta = ($, key) => $(`head meta[${key.startsWith('og:') ? 'property' : 'name'}="${key}"]`);

before(async () => {
  // The same real Astro configuration and temporary-copy approach as test:publication.
  // Fixtures never enter the working tree or the project's dist directory.
  temporary = await mkdtemp(path.join(os.tmpdir(), 'aia-seo-test-'));
  await cp(path.join(project, 'src'), path.join(temporary, 'src'), { recursive: true });
  await symlink(path.join(project, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  await writeFile(path.join(temporary, 'package.json'), '{"type":"module"}\n');
  for (const lang of languages) {
    await writeEntry('blog', lang, 'seo-default');
    await writeEntry('blog', lang, 'seo-display', {
      displayH1: `Display heading (${lang}) <literal> & text`, featuredImage: image,
      alt: `Existing image description (${lang})`
    });
  }
  await writeEntry('pages', 'en', 'seo-derived', { title: 'Derived banner | SEO suffix' });
  await writeEntry('pages', 'en', 'seo-no-image', { alt: 'Must not describe a nonexistent image' });
  // A fallback banner must not inherit unrelated alt text from the page record.
  const abaPath = path.join(temporary, 'src/content/pages/en/aba-therapy.mdx');
  await writeFile(abaPath, (await readFile(abaPath, 'utf8')).replace(/^---\n/, '---\nalt: Unrelated description without a featured image\n'));
  const entries = await Promise.all((await fg('src/content/{pages,blog}/**/*.{md,mdx}', { cwd: temporary })).map(async (file) => {
    const [, , collection, ...parts] = file.split('/');
    return { id: parts.join('/').replace(/\.mdx?$/, ''), collection, data: matter(await readFile(path.join(temporary, file), 'utf8')).data };
  }));
  manifest = createPublicationManifest(entries, site);
  // A preview Astro.site must not leak into social assets or publication metadata.
  runner = `import {build} from ${JSON.stringify(pathToFileURL(path.join(project, 'node_modules/astro/dist/index.js')).href)};
await build({root:${JSON.stringify(temporary)},configFile:${JSON.stringify(path.relative(temporary, path.join(project, 'astro.config.mjs')))},site:'https://preview.example.invalid',logLevel:'silent',vite:{cacheDir:${JSON.stringify(path.join(temporary, '.vite'))}}});`;
  for (const mode of ['staging', 'indexing']) {
    build(mode === 'indexing');
    await capture(mode);
  }
  for (const [file, heading] of [
    ['en/aba-therapy.mdx', 'Explicit service heading'],
    ['en/seo-derived.md', 'Explicit derived heading'],
    ['en/index.md', 'Explicit home heading <literal>'],
    ['es/library.md', 'Explicit Library heading']
  ]) {
    const target = path.join(temporary, 'src/content/pages', file);
    await writeFile(target, (await readFile(target, 'utf8')).replace(/^---\n/, `---\ndisplayH1: ${JSON.stringify(heading)}\n`));
  }
  build();
  await capture('overrides');
}, { timeout: 120_000 });

after(async () => {
  if (temporary) await rm(temporary, { recursive: true, force: true });
});

test('social images resolve root-relative, path-relative and absolute HTTP(S) URLs', () => {
  for (const input of [image, image.slice(1)]) assert.equal(socialImageUrl(input, site), site + image);
  assert.equal(socialImageUrl('https://images.example/image.jpg', site), 'https://images.example/image.jpg');
  for (const input of [undefined, '', '   ']) assert.equal(socialImageUrl(input, site), undefined);
  for (const input of ['javascript:alert(1)', 'data:image/png;base64,AA', 'https://user:secret@example.com/image', 'https://[invalid']) {
    assert.throws(() => socialImageUrl(input, site));
  }
});

test('articles without overrides retain their original H1 in English, Spanish and Arabic', () => {
  for (const lang of languages) {
    const $ = page(`${prefix(lang)}/library/seo-default`);
    assert.equal($('main h1').text(), `SEO title (${lang})`);
    assert.equal($('head title').text(), `SEO title (${lang})`);
  }
  const $ = page('/ar/library/autism-self-advocacy-skills-aba');
  assert.equal($('main h1').text(), 'دليل تعليم مهارات الدفاع عن النفس في ABA');
});

test('explicit article H1 changes only the heading; SEO and card titles retain title', () => {
  for (const lang of languages) {
    const route = `${prefix(lang)}/library/seo-display`;
    const $ = page(route);
    assert.equal($('main h1').text(), `Display heading (${lang}) <literal> & text`);
    assert.equal($('main h1').children().length, 0, 'Overrides are text, not injected markup');
    for (const tag of ['og:title', 'twitter:title']) assert.equal(meta($, tag).attr('content'), `SEO title (${lang})`);
    assert.equal($('head title').text(), `SEO title (${lang})`);
    const index = page(`${prefix(lang)}/library`);
    assert.equal(index(`.blog-card h3 a[href="${route}"]`).text(), `SEO title (${lang})`);
  }
});

test('production-supported English and Spanish article headings retain their original SEO titles', () => {
  for (const [lang, heading] of [
    ['en', 'Guide to Teaching Self‑Advocacy in ABA'],
    ['es', 'Guía para enseñar la autodefensa en el ABA']
  ]) {
    const route = `${prefix(lang)}/library/autism-self-advocacy-skills-aba`;
    const $ = page(route);
    const record = manifest.find((item) => item.route === route).entry.data;
    assert.equal($('main h1').text(), heading);
    assert.notEqual(heading, record.title);
    assert.equal($('head title').text(), record.title);
    const index = page(`${prefix(lang)}/library`);
    assert.equal(index(`.blog-card h3 a[href="${route}"]`).text(), record.title);
  }
});

test('existing service, page and derived banner headings remain unless explicitly overridden', () => {
  for (const [route, heading] of [
    ['/aba-therapy', 'Behavioral'], ['/es/aba-therapy', 'Conductual'],
    ['/services', 'ABA & Educational Services'], ['/seo-derived', 'Derived banner']
  ]) assert.equal(page(route)('main h1').text(), heading);
  for (const [route, heading] of [['/aba-therapy', 'Explicit service heading'], ['/seo-derived', 'Explicit derived heading']]) {
    const $ = page(route, 'overrides');
    assert.equal($('main h1').text(), heading);
    assert.equal($('head title').text(), page(route)('head title').text());
  }
});

test('home and Library retain component-owned headings and support a single explicit H1', () => {
  const $ = page('/');
  assert.equal($('main h1').text(), 'Behavioral Health& SpecialEducation');
  assert.equal($('main h1 br').length, 2, 'Preserve the existing homepage heading markup');
  assert.equal(page('/library')('main h1').text(), 'The Library at AZ Institute for Autism');
  for (const [route, heading] of [['/', 'Explicit home heading <literal>'], ['/es/library', 'Explicit Library heading']]) {
    const changed = page(route, 'overrides');
    assert.equal(changed('main h1').text(), heading);
    assert.equal(changed('head title').text(), page(route)('head title').text());
  }
});

test('every generated page has exactly one visible main H1 in every fixture build', () => {
  for (const [mode, { html }] of artifacts) {
    for (const [route, content] of html) {
      const $ = load(content);
      assert.equal($('h1').length, 1, `${mode}: ${route}`);
      assert.equal($('main h1').length, 1, `${mode}: ${route}`);
      assert.ok($('main h1').text().trim(), `${mode}: ${route}`);
    }
  }
});

test('featured images emit one absolute OG/Twitter image and supported alt in each locale', () => {
  for (const lang of languages) {
    const $ = page(`${prefix(lang)}/library/seo-display`);
    for (const key of ['og:image', 'twitter:image']) {
      assert.equal(meta($, key).length, 1);
      assert.equal(meta($, key).attr('content'), site + image);
      assert.equal(meta($, `${key}:alt`).attr('content'), `Existing image description (${lang})`);
    }
    assert.equal(meta($, 'twitter:card').attr('content'), 'summary_large_image');
    assert.equal($('.article-featured img').attr('alt'), `Existing image description (${lang})`);
  }
});

test('no image means no image-specific metadata and a valid summary card; no alt is invented', () => {
  for (const route of ['/', '/seo-no-image', '/library/seo-default']) {
    const $ = page(route);
    assert.equal($('meta[property^="og:image"], meta[name^="twitter:image"]').length, 0, route);
    assert.equal(meta($, 'twitter:card').attr('content'), 'summary');
  }
  for (const route of ['/aba-therapy', '/library/autism-self-advocacy-skills-aba']) {
    const $ = page(route);
    assert.equal(meta($, 'og:image').length, 1);
    assert.equal(meta($, 'og:image:alt').length, 0);
    assert.equal(meta($, 'twitter:image:alt').length, 0);
  }
});

for (const mode of ['staging', 'indexing']) {
  test(`${mode}: existing publication policy, metadata, language and navigation are unchanged`, () => {
    const { html, sitemap } = artifacts.get(mode);
    assert.deepEqual([...html.keys()].sort(), manifest.filter((item) => item.eligible).map((item) => item.route).sort());
    assert.equal(sitemap, renderSitemap(manifest, mode === 'indexing'));
    for (const publication of manifest.filter((item) => item.eligible)) {
      const { route, entry, canonical } = publication;
      const $ = page(route, mode);
      assert.equal($('head link[rel="canonical"]').length, 1, route);
      assert.equal($('head link[rel="canonical"]').attr('href'), canonical, route);
      assert.equal(meta($, 'og:url').attr('content'), canonical, route);
      assert.equal(meta($, 'robots').attr('content'), robotsFor(publication, mode === 'indexing'), route);
      assert.deepEqual($('head link[hreflang]').map((_, tag) => ({ lang: $(tag).attr('hreflang'), href: $(tag).attr('href') })).get(), hreflangLinksFor(publication, mode === 'indexing'), route);
      assert.deepEqual($('.lang-switcher__menu a').map((_, tag) => $(tag).attr('href')).get(), publication.translations.map((item) => item.route), route);
      assert.equal($('html').attr('lang'), entry.data.lang, route);
      assert.equal($('html').attr('dir'), entry.data.lang === 'ar' ? 'rtl' : 'ltr', route);
      assert.equal(meta($, 'og:locale').length, 0, 'No unsupported regional locale assignments');
      assert.equal(meta($, 'og:type').attr('content'), entry.collection === 'blog' ? 'article' : 'website', route);
      for (const key of ['og:title', 'twitter:title']) assert.equal(meta($, key).attr('content'), $('head title').text(), route);
      for (const key of ['og:description', 'twitter:description']) assert.equal(meta($, key).attr('content'), meta($, 'description').attr('content'), route);
      const ogImage = meta($, 'og:image').attr('content');
      assert.equal(meta($, 'twitter:image').attr('content'), ogImage, route);
      if (ogImage) assert.equal(new URL(ogImage).origin, site, route);
    }
    for (const route of ['/schedule-consultation', '/employee-portal', '/library/community-highlight-meet-rula-diab', '/library/new-aia-scottsdale-office']) {
      const $ = page(route, mode);
      assert.match(meta($, 'robots').attr('content'), /^noindex,/);
      assert.equal($('link[hreflang]').length, 0);
      assert.ok(!sitemap.includes(`${site}${route}<`));
    }
    assert.ok(!html.has('/ar'));
  });
}

test('actual content-schema builds reject empty, whitespace-only and non-string displayH1', async () => {
  for (const value of ['', '   ', '\n\t', 123]) {
    await writeEntry('pages', 'en', 'seo-invalid', { displayH1: value });
    assert.throws(() => build(), (error) => {
      const diagnostic = String(error.stdout) + String(error.stderr);
      assert.match(diagnostic, /displayH1/);
      assert.match(diagnostic, /schema|InvalidContentEntryDataError/i);
      return true;
    }, `Invalid displayH1: ${JSON.stringify(value)}`);
  }
}, { timeout: 60_000 });
