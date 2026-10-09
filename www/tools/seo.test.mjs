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
import { blogPostingSchema, faqItemsFromSourceHtml, faqPageSchema, serializeJsonLd } from '../src/utils/structured-data.ts';
import { homePageSchema, homeSectionsSchema } from '../src/types/home-sections.ts';
import { teamPageSchema } from '../src/types/team-page.ts';

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
    cwd: temporary, env: { ...process.env, PUBLIC_ALLOW_INDEXING: String(indexing), TZ: 'America/Phoenix' },
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
const jsonLd = ($) => $('script[type="application/ld+json"]').map((_, node) => JSON.parse($(node).text())).get();
const schemaOf = ($, type) => jsonLd($).filter((schema) => schema['@type'] === type);
const text = (value) => value.replace(/\s+/g, ' ').trim();

async function writeFaqFixture(slug, content, flags = {}) {
  await writeFile(path.join(temporary, 'src/content/pages/en', `${slug}.mdx`), matter.stringify(
    `import FAQAccordion from '../../../components/FAQAccordion.astro';\n\n${content}\n`,
    { title: 'FAQ fixture', slug, lang: 'en', ...flags }
  ));
}

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
      alt: `Existing image description (${lang})`, date: '2024-12-02', updatedDate: '2026-10-08'
    });
  }
  await writeEntry('blog', 'en', 'seo-minimal', { description: '' });
  await writeEntry('blog', 'en', 'seo-noindex', { noindex: true });
  await writeEntry('blog', 'en', 'seo-external', { canonical: 'https://publisher.example/original' });
  await writeEntry('blog', 'en', 'seo-draft', { draft: true });
  await writeEntry('blog', 'en', 'seo-escaped', { title: 'Literal </script><script>not executable</script> & text' });
  const accordion = '<FAQAccordion heading="Fixture questions" items={[{ question: "Visible question?", answer: "Stale duplicate text", answerHtml: "<p>Visible <strong>answer</strong> &amp; link.</p>" }]} />';
  await writeFaqFixture('seo-faq', accordion + '\n<script type="application/ld+json" is:inline>{`{"@context":"https://schema.org","@type":"WebPage","name":"Existing unrelated block"}`}</script>');
  await writeFaqFixture('seo-faq-noindex', accordion, { noindex: true });
  await writeFaqFixture('seo-faq-external', accordion, { canonical: 'https://publisher.example/faq' });
  await writeFaqFixture('seo-faq-empty', '<FAQAccordion heading="Empty" />');
  // An unknown runtime source cannot be advertised as server-verified FAQ content.
  await writeFaqFixture('seo-faq-runtime-only', '<FAQAccordion heading="Runtime only" sourceSelector="#not-rendered" />');
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
  // Exercise old homepage data without the new optional sections or step links
  // through the actual renderer, in the existing isolated override build.
  for (const lang of ['en', 'es']) {
    const target = path.join(temporary, 'src/content/pages', lang, 'index.md');
    const { data, content } = matter(await readFile(target, 'utf8'));
    delete data.home.hsaFsa;
    delete data.home.logos;
    data.home.process.steps.forEach((step) => delete step.href);
    await writeFile(target, matter.stringify(content, data));
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

test('BlogPosting uses the SEO title, canonical, declared day and matching locale author', () => {
  for (const mode of ['staging', 'indexing']) {
    for (const publication of manifest.filter((item) => item.eligible && item.entry.collection === 'blog')) {
      const { entry, route } = publication;
      const $ = page(route, mode);
      const schemas = schemaOf($, 'BlogPosting');
      assert.equal(schemas.length, publication.sitemapEligible ? 1 : 0, route);
      if (!schemas.length) continue;
      const schema = schemas[0];
      assert.equal(schema.headline, entry.data.title, route);
      assert.equal(schema['@id'], `${publication.canonical}#article`, route);
      assert.equal(schema.url, publication.canonical, route);
      assert.equal(schema.mainEntityOfPage, publication.canonical, route);
      assert.equal(schema.inLanguage, entry.data.lang, route);
      assert.equal(schema.datePublished, new Date(entry.data.date).toISOString().slice(0, 10), route);
      assert.deepEqual(schema.author, { '@type': 'Person', name: 'Rula Diab' }, route);
      assert.ok(!('publisher' in schema), 'Do not manufacture publisher entities');
      assert.equal(schema.image, meta($, 'og:image').attr('content'), route);
    }
    for (const lang of languages) {
      const $ = page(`${prefix(lang)}/library/seo-display`, mode);
      const schema = schemaOf($, 'BlogPosting')[0];
      assert.notEqual(schema.headline, $('main h1').text());
      assert.equal(schema.dateModified, '2026-10-08');
      assert.equal(schema.image, site + image);
    }
  }
});

test('missing optional article metadata stays absent, without fabricated modification dates or profile URLs', () => {
  const schema = schemaOf(page('/library/seo-minimal'), 'BlogPosting')[0];
  for (const key of ['image', 'description', 'dateModified', 'publisher']) assert.ok(!(key in schema), key);
  assert.ok(!('url' in schema.author), 'Author archives are not generated local routes');
  for (const lang of languages) {
    const actual = schemaOf(page(`${prefix(lang)}/library/autism-self-advocacy-skills-aba`), 'BlogPosting')[0];
    assert.ok(!('dateModified' in actual), 'Do not import a live timestamp into otherwise unreconciled local content');
  }
});

test('article and card calendar dates match declared dates even on a negative-offset build host', () => {
  for (const publication of manifest.filter((item) => item.eligible && item.entry.collection === 'blog')) {
    const { data } = publication.entry;
    const date = new Date(data.date);
    const article = page(publication.route);
    const byline = article('.article-byline time');
    assert.equal(byline.attr('datetime'), date.toISOString());
    assert.equal(byline.text(), date.toLocaleDateString(data.lang, { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }));
    const index = page(`${prefix(data.lang)}/library`);
    const card = index('.blog-card').filter((_, el) => index(el).find('h3 a').attr('href') === publication.route);
    assert.equal(card.find('time').text(), date.toLocaleDateString(data.lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }));
  }
});

test('JSON-LD serialization preserves script-like text without creating HTML/script nodes', () => {
  const schema = { text: '</script><script>not executable</script> & text' };
  const html = `<script type="application/ld+json">${serializeJsonLd(schema)}</script>`;
  const $ = load(html);
  assert.equal($('script').length, 1);
  assert.deepEqual(jsonLd($), [schema]);
  const rendered = page('/library/seo-escaped');
  assert.equal(schemaOf(rendered, 'BlogPosting')[0].headline, schema.text.replace(/^/, 'Literal '));
  assert.equal(rendered('script:not([type="application/ld+json"])').filter((_, el) => rendered(el).text() === 'not executable').length, 0);
});

test('noindex, external-canonical and draft records cannot gain article or FAQ entities', () => {
  for (const mode of ['staging', 'indexing']) {
    for (const route of ['/schedule-consultation', '/employee-portal', '/library/community-highlight-meet-rula-diab', '/library/new-aia-scottsdale-office', '/library/seo-noindex', '/library/seo-external', '/seo-faq-noindex', '/seo-faq-external']) {
      const $ = page(route, mode);
      assert.equal(schemaOf($, 'BlogPosting').length, 0, route);
      assert.equal(schemaOf($, 'FAQPage').length, 0, route);
      assert.equal(schemaOf($, 'MedicalOrganization').length, 1, 'Existing site schema remains independent');
    }
    assert.ok(!artifacts.get(mode).html.has('/library/seo-draft'));
    assert.ok(!artifacts.get(mode).html.has('/ar'));
  }
  const draft = manifest.find((item) => item.route === '/library/seo-draft');
  assert.equal(blogPostingSchema(draft.entry, draft, [], site), undefined);
  assert.equal(faqPageSchema([{ question: 'Q?', answer: 'A.' }], draft), undefined);
});

test('every server-item FAQ schema matches actual visible questions and answers', () => {
  for (const mode of ['staging', 'indexing']) {
    for (const [route, content] of artifacts.get(mode).html) {
      const $ = load(content);
      const schemas = schemaOf($, 'FAQPage');
      const details = $('[data-faq-list] details.faq');
      if (!schemas.length || !details.length) continue;
      assert.equal(schemas.length, 1, route);
      assert.equal(schemas[0]['@id'], `${site}${route}#faq`, route);
      assert.equal(schemas[0].mainEntity.length, details.length, route);
      details.each((i, el) => {
        assert.deepEqual(schemas[0].mainEntity[i], {
          '@type': 'Question', name: text($(el).find('summary').text()),
          acceptedAnswer: { '@type': 'Answer', text: text($(el).find('.faq-answer__inner').text()) }
        }, route);
      });
    }
  }
  const corrected = schemaOf(page('/seo-faq'), 'FAQPage')[0];
  assert.equal(corrected.mainEntity[0].acceptedAnswer.text, 'Visible answer & link.');
  assert.equal(schemaOf(page('/insurance'), 'FAQPage')[0].mainEntity.length, 2);
  assert.equal(schemaOf(page('/es/library/parents-guide-to-autism-and-aba'), 'FAQPage')[0].mainEntity.length, 6);
});

test('standalone runtime accordion gets server schema from its exact rendered source, not invented items', () => {
  const $ = page('/faqs');
  const questions = $('#faq-page-source > h3');
  const schema = schemaOf($, 'FAQPage')[0];
  assert.equal(questions.length, 70);
  assert.equal(schema.mainEntity.length, 70);
  assert.equal($('[data-faq-list] details').length, 0, 'Preserve the existing runtime enhancement path');
  questions.each((i, el) => {
    assert.equal(schema.mainEntity[i].name, text($(el).text()));
    // HTML compression and Cheerio's sibling selection discard block-boundary
    // whitespace. Compare all answer characters independently of that spacing.
    assert.equal(schema.mainEntity[i].acceptedAnswer.text.replace(/\s/g, ''), $(el).nextUntil('h3').text().replace(/\s/g, ''));
  });
  for (const route of ['/seo-faq-runtime-only', '/seo-faq-empty']) assert.equal(schemaOf(page(route), 'FAQPage').length, 0);
  const nested = faqItemsFromSourceHtml('<h2>Introduction</h2><p>Not an answer</p><h3>One?</h3><p>Text &amp; <strong>more</strong>.</p><h4>Detail</h4><ul><li>Item</li></ul><h3>Two?</h3><p>Next.</p>');
  assert.deepEqual(nested.map(({ question }) => question), ['One?', 'Two?']);
  assert.ok(nested[0].answerHtml.includes('<h4>Detail</h4>'));
  assert.ok(!nested[0].answer.includes('Not an answer'));
});

test('multiple JSON-LD blocks coexist without duplicate article, FAQ or entity IDs', () => {
  for (const { html } of artifacts.values()) {
    for (const [route, content] of html) {
      const $ = load(content);
      const schemas = jsonLd($);
      assert.equal(schemaOf($, 'MedicalOrganization').length, 1, route);
      assert.ok(schemaOf($, 'BlogPosting').length <= 1, route);
      assert.ok(schemaOf($, 'FAQPage').length <= 1, route);
      const ids = schemas.map((schema) => schema['@id']).filter(Boolean);
      assert.equal(ids.length, new Set(ids).size, route);
    }
  }
  assert.deepEqual(jsonLd(page('/library/parents-guide-to-autism-and-aba')).map((schema) => schema['@type']).sort(), ['BlogPosting', 'FAQPage', 'MedicalOrganization']);
  assert.equal(schemaOf(page('/seo-faq'), 'WebPage')[0].name, 'Existing unrelated block');
});

test('duplicate questions, duplicate accordion schemas and conflicting canonicals fail explicitly', async () => {
  const publication = manifest.find((item) => item.route === '/seo-faq');
  assert.throws(() => faqPageSchema([{ question: 'Same?', answer: 'A' }, { question: ' same? ', answer: 'B' }], publication), /Duplicate FAQ question/);
  assert.throws(() => faqPageSchema([{ question: 'Empty?', answer: ' ' }], publication), /Empty FAQ/);
  for (const [content, expected] of [
    ['<FAQAccordion heading="One" items={[{question:"One?",answer:"A"}]} /><FAQAccordion heading="Two" items={[{question:"Two?",answer:"B"}]} />', /Multiple FAQ schemas/],
    ['<FAQAccordion heading="Wrong canonical" canonical="https://www.azinstitute4autism.com/other" items={[{question:"One?",answer:"A"}]} />', /FAQ canonical disagrees/],
    ['<FAQAccordion heading="Mixed" sourceSelector="#source" items={[{question:"One?",answer:"A"}]} />', /must not be mixed/]
  ]) {
    try {
      await writeFaqFixture('seo-invalid-faq', content);
      assert.throws(() => build(), (error) => { assert.match(String(error.stdout) + String(error.stderr), expected); return true; });
    } finally {
      await rm(path.join(temporary, 'src/content/pages/en/seo-invalid-faq.mdx'), { force: true });
    }
  }
}, { timeout: 60_000 });

test('authors resolve by exact locale and slug; missing/ambiguous records and reversed dates fail', async () => {
  const publication = manifest.find((item) => item.route === '/library/seo-display');
  const entry = { ...publication.entry, data: { ...publication.entry.data, date: new Date('2024-12-02'), updatedDate: new Date('2026-10-08') } };
  const author = (lang) => ({ id: `${lang}/rula-diab`, collection: 'authors', data: { slug: 'rula-diab', name: `Name (${lang})`, lang } });
  assert.deepEqual(blogPostingSchema(entry, publication, [author('en'), author('es')], site).author, { '@type': 'Person', name: 'Name (en)' });
  assert.throws(() => blogPostingSchema(entry, publication, [author('es')], site), /Missing or ambiguous article author/);
  assert.throws(() => blogPostingSchema(entry, publication, [author('en'), author('en')], site), /Missing or ambiguous article author/);
  assert.throws(() => blogPostingSchema({ ...entry, data: { ...entry.data, updatedDate: new Date('2020-01-01') } }, publication, [author('en')], site), /modification precedes publication/);
  try {
    await writeEntry('blog', 'en', 'seo-invalid-author', { author: 'missing-person' });
    assert.throws(() => build(), (error) => { assert.match(String(error.stdout) + String(error.stderr), /Missing or ambiguous article author/); return true; });
  } finally {
    await rm(path.join(temporary, 'src/content/blog/en/seo-invalid-author.md'), { force: true });
  }
}, { timeout: 60_000 });

test('Phase 5A applies approved ABA eligibility without retaining superseded audiences', () => {
  assert.equal(page('/aba-therapy')('#behavioral-services-we-offer').text(), 'Services We Offer');
  const cases = [
    ['/aba-therapy', '18 months through 8 years'],
    ['/es/aba-therapy', '18 meses a 8 años'],
    ['/referrals', '18 months through 8 years'],
    ['/client-consultation', '18 months through 8 years'],
    ['/es/client-consultation', '18 meses a 8 años'],
    ['/schedule-consultation', '18 months through 8 years']
  ];
  for (const mode of ['staging', 'indexing']) {
    for (const [route, approved] of cases) {
      const $ = page(route, mode);
      const copy = text($('main').text());
      assert.ok(copy.includes(approved), route);
      assert.doesNotMatch(copy, /children (?:and|&) teens|niños y adolescentes|\b2\s*(?:[–-]|to|a)\s*(?:8|17)\b/i, route);
    }
  }
});

test('Phase 5A retains independently supported program ages, ratios and payment distinctions', () => {
  for (const lang of ['en', 'es']) {
    const aba = page(`${prefix(lang)}/aba-therapy`);
    assert.match(aba('main').text(), /1:1/);
    assert.match(aba('main').text(), /1:2/);
    assert.match(aba('main').text(), lang === 'en' ? /2 to 6 years/ : /2 a 6 años/);
    assert.match(aba('main').text(), /AIA Preparatory Academy©/);
    const club = page(`${prefix(lang)}/learner-social-club`);
    assert.match(club('main').text(), lang === 'en' ? /8–17 years/ : /8 a 17 años/);
    assert.match(club('main').text(), lang === 'en' ? /Private Pay/ : /Pago particular/);
    assert.match(club('main').text(), lang === 'en' ? /4:00 PM – 6:00 PM/ : /4:00 p\. m\. – 6:00 p\. m\./);
    assert.doesNotMatch(club('main').text(), /18 (?:months|meses)/);
    const evaluation = page(`${prefix(lang)}/autism-evaluations`);
    assert.match(evaluation('main').text(), lang === 'en' ? /children of all ages/ : /niños de todas las edades/);
    assert.doesNotMatch(evaluation('main').text(), /18 (?:months|meses)/);
  }
});

test('Phase 5A conversion CTAs resolve to the intended published local route or form anchor', () => {
  const cases = [
    ['/aba-therapy', 'Make an Appointment', '/client-consultation'],
    ['/autism-evaluations', 'Make an Appointment', '/client-consultation'],
    ['/learner-social-club', 'Enroll Now', '/client-consultation'],
    ['/es/aba-therapy', 'Hacer una cita', '/es/client-consultation'],
    ['/es/autism-evaluations', 'Programar una cita', '/es/client-consultation'],
    ['/es/learner-social-club', 'Enroll Now', '/es/client-consultation'],
    ['/referrals', 'Refer a Client', '#form-title'],
    ['/aba-therapy-intake-process', 'Take the First Step', '/client-consultation'],
    ['/es/aba-therapy-intake-process', 'Take the First Step', '/es/client-consultation'],
    ['/services', 'Consult with a Client Advocate', '/client-consultation'],
    ['/services', 'Get a Free Consultation', '/client-consultation'],
    ['/es/services', 'Consulte con un Defensor del Cliente', '/es/client-consultation'],
    ['/es/services', 'Programe una consulta gratuita', '/es/client-consultation'],
    ['/es/services', 'Inicio', '/es']
  ];
  for (const [route, label, href] of cases) {
    const $ = page(route);
    const link = $('main a').filter((_, el) => text($(el).text()) === label);
    assert.equal(link.length, 1, `${route}: ${label}`);
    assert.equal(link.attr('href'), href, route);
    const target = new URL(href, site + route);
    const destination = page(target.pathname);
    if (target.hash) assert.equal(destination(`[id="${target.hash.slice(1)}"]`).length, 1, href);
  }
});

test('Phase 5A preserves disabled forms and one localized H1 on every targeted page', () => {
  const slugs = ['aba-therapy', 'autism-evaluations', 'learner-social-club', 'services', 'client-consultation', 'aba-therapy-intake-process'];
  const routes = ['/referrals', '/schedule-consultation', '/insurance', ...['en', 'es'].flatMap((lang) => slugs.map((slug) => `${prefix(lang)}/${slug}`))];
  for (const route of routes) {
    const $ = page(route);
    assert.equal($('main h1').length, 1, route);
    assert.equal($('html').attr('lang'), route.startsWith('/es/') ? 'es' : 'en', route);
    assert.equal($('html').attr('dir'), 'ltr', route);
    assert.equal($('iframe[src*="jotform"], script[src*="jotform"]').length, 0, route);
    $('main form').each((_, el) => {
      const form = $(el);
      assert.equal(form.attr('action'), '', route);
      assert.equal(form.find('[type="submit"]:not([disabled])').length, 0, route);
      assert.ok(form.find('[type="submit"][disabled]').length, route);
      assert.match(form.text(), /Online submission is not yet connected/, route);
    });
  }
  assert.equal(meta(page('/autism-evaluations'), 'description').attr('content'), "Get comprehensive childhood autism evaluations in Scottsdale, AZ. Our expert team provides accurate assessments to support your child's unique development.");
});

test('Phase 5B homepage schemas accept present/absent sections and reject incomplete data', () => {
  for (const route of ['/', '/es']) {
    const home = manifest.find((item) => item.route === route).entry.data.home;
    assert.deepEqual(homePageSchema.parse(home), home);
    const legacy = structuredClone(home);
    delete legacy.hsaFsa;
    delete legacy.logos;
    legacy.process.steps.forEach((step) => delete step.href);
    assert.ok(homePageSchema.safeParse(legacy).success);
    assert.equal(homePageSchema.safeParse({ ...home, hsaFsa: { heading: 'Incomplete' } }).success, false);
    assert.equal(homePageSchema.safeParse({ ...home, logos: { items: [{ file: 'missing-alt.png' }] } }).success, false);
    assert.equal(homePageSchema.safeParse({ ...home, process: { ...home.process, steps: [{ icon: 'step.svg', label: 'Step', href: 42 }] } }).success, false);
  }
  const english = manifest.find((item) => item.route === '/').entry.data.home;
  assert.ok(homeSectionsSchema.safeParse([{ type: 'hsa-fsa', ...english.hsaFsa }, { type: 'logos', ...english.logos }]).success);
});

test('Phase 5B corrects ABA-specific ages and audiences without rewriting historical testimonials', () => {
  for (const mode of ['staging', 'indexing']) {
    for (const [route, range] of [['/', '18 Months Through 8 Years'], ['/es', '18 meses a 8 años']]) {
      const $ = page(route, mode);
      const headings = $('main h2').map((_, el) => $(el).text()).get();
      assert.ok(headings[0].includes(range));
      assert.match(headings[0], /ABA/);
      assert.doesNotMatch($('main').text(), /children (?:and|&) teens|niños y adolescentes|\b2\s*(?:[–-]|to|a)\s*(?:8|17)\b/i);
      assert.equal($('main h1').length, 1);
      assert.equal($('html').attr('lang'), route === '/' ? 'en' : 'es');
      assert.equal($('html').attr('dir'), 'ltr');
      assert.match($('.testimonial-section').text(), /21 months year old/);
      assert.equal($('.testimonial-section .swiper-slide').length, 11);
    }
  }
  assert.equal(page('/')('head title').text(), 'Scottsdale ABA Therapy for Children | Arizona Institute for Autism');
  assert.equal(meta(page('/'), 'description').attr('content'), 'Arizona Institute for Autism: center for behavioral health & education services in Scottsdale. We serve children diagnosed with autism and their families.');
  assert.equal(page('/es')('head title').text(), 'Terapia ABA cerca de mí | Arizona Institute for Autism | Scottsdale');
});

test('Phase 5B preserves section order, English-only HSA/FSA and the final source logo row', () => {
  for (const mode of ['staging', 'indexing']) {
    for (const route of ['/', '/es']) {
      const $ = page(route, mode);
      const home = manifest.find((item) => item.route === route).entry.data.home;
      const expected = [home.servicesIntro.servicesHeading, home.servicesIntro.commitmentsHeading,
        home.benefits.heading, home.skills.heading, home.insurance.heading, home.esa.heading,
        ...(route === '/' ? [home.hsaFsa.heading] : []), home.financialHelp.heading,
        home.process.heading, home.director.heading, home.testimonials.heading];
      assert.deepEqual($('main h2').map((_, el) => $(el).text()).get(), expected);
      assert.equal($('.hsa-fsa-section').length, route === '/' ? 1 : 0);
      assert.deepEqual($('.home-logos img').map((_, el) => $(el).attr('src')).get(), ['/assets/images/logo-BACB.png', '/assets/images/casp-member-logo.webp']);
      assert.equal($('.testimonial-section').nextAll(':not(script):not(style)').first().hasClass('home-logos'), true);
      if (route === '/') {
        assert.equal(text($('.hsa-fsa-section p').text()), home.hsaFsa.body);
        assert.match(home.hsaFsa.body, /qualified clinical services/);
        assert.match(home.hsaFsa.body, /If you participate/);
        assert.equal($('.hsa-fsa-section img').attr('src'), '/assets/images/hsa-fsa-accepted.png');
        assert.equal($('.hsa-fsa-section img').attr('alt'), 'hsa-fsa-accepted');
        assert.equal($('.hsa-fsa-section').find('a, form, script, iframe').length, 0);
      } else assert.doesNotMatch($('main').text(), /Health Savings|HSA|FSA/);
      assert.deepEqual(jsonLd($).map((item) => item['@type']), ['MedicalOrganization']);
    }
  }
  for (const route of ['/', '/es']) {
    const $ = page(route, 'overrides');
    assert.equal($('.hsa-fsa-section, .home-logos, .process-grid a').length, 0);
    assert.equal($('.process-grid > div').length, 6);
    assert.equal($('main h1').length, 1);
  }
});

test('Phase 5B consultation and six intake-step CTAs resolve in each homepage language', async () => {
  for (const route of ['/', '/es']) {
    const $ = page(route);
    const localePrefix = route === '/' ? '' : '/es';
    const home = manifest.find((item) => item.route === route).entry.data.home;
    const calls = [home.hero.cta, home.servicesIntro.commitmentsCta, home.financialHelp.cta];
    for (const { label } of calls) {
      const link = $('main a').not('.process-grid a').filter((_, el) => text($(el).text()) === label);
      assert.equal(link.length, 1);
      assert.equal(link.attr('href'), `${localePrefix}/client-consultation`);
      const destination = page(link.attr('href'));
      assert.equal(destination('form [type="submit"]:not([disabled])').length, 0);
      assert.match(destination('form').text(), /Online submission is not yet connected/);
    }
    const links = $('.process-grid a');
    assert.equal(links.length, 6);
    const anchors = [];
    links.each((_, el) => {
      const url = new URL($(el).attr('href'), site);
      assert.equal(url.pathname, `${localePrefix}/aba-therapy-intake-process`);
      const target = page(url.pathname);
      const id = decodeURIComponent(url.hash.slice(1));
      assert.equal(target(`[id="${id}"]`).length, 1, url.href);
      anchors.push(id);
    });
    assert.equal(new Set(anchors).size, 6);
    // audit:images primarily covers banners/blogs; include every homepage image here.
    for (const src of $('main img').map((_, el) => $(el).attr('src')).get()) {
      assert.ok(src.startsWith('/assets/'), src);
      assert.ok((await readFile(path.join(project, 'public', src))).length, src);
    }
  }
});

test('Phase 5C validates one structured Team source and rejects duplicate members or external CTAs', async () => {
  const source = matter(await readFile(path.join(project, 'src/content/pages/en/team.md'), 'utf8'));
  const team = source.data.team;
  assert.deepEqual(teamPageSchema.parse(team), team);
  assert.match(source.content, /maintained in the validated `team:` frontmatter/);
  for (const member of [...team.clinicalGroups.flatMap((group) => group.members), ...team.careTeam.members]) {
    assert.ok(!source.content.includes(member.name), `Rendered roster must not be duplicated in Markdown: ${member.name}`);
  }
  const duplicate = structuredClone(team);
  duplicate.careTeam.members.push(structuredClone(duplicate.clinicalGroups[0].members[0]));
  assert.equal(teamPageSchema.safeParse(duplicate).success, false);
  assert.equal(teamPageSchema.safeParse({
    ...team,
    careers: { ...team.careers, cta: { ...team.careers.cta, href: 'https://jobs.example/' } }
  }).success, false);
});

test('Phase 5C renders the published Team groups, member order, roles and exact local portraits', async () => {
  const team = manifest.find((item) => item.route === '/team').entry.data.team;
  const expectedGroups = [...team.clinicalGroups, {
    heading: team.careTeam.groupHeading,
    members: team.careTeam.members
  }];
  for (const mode of ['staging', 'indexing']) {
    const $ = page('/team', mode);
    const renderedGroups = [...$('.team-clinical .team-group'), ...$('.team-care')];
    assert.equal(renderedGroups.length, expectedGroups.length);
    for (const [index, node] of renderedGroups.entries()) {
      const group = expectedGroups[index];
      const element = $(node);
      assert.equal(text(element.children('.container').children('h3').first().text()), group.heading);
      assert.deepEqual(element.find('.team-member').map((_, member) => ({
        name: text($(member).find('h4').text()),
        role: text($(member).find('p').text()),
        image: $(member).find('img').attr('src'),
        alt: $(member).find('img').attr('alt')
      })).get(), group.members.map((member) => ({
        name: member.name,
        role: member.role,
        image: `/assets/images/${member.image}`,
        alt: member.imageAlt
      })));
    }
    const names = $('.team-member h4').map((_, member) => text($(member).text())).get();
    assert.equal(names.length, 9);
    assert.equal(new Set(names).size, names.length, 'No duplicate Team entries');
    for (const unpublished of ['Timirah Clay', 'Carol Harrington', 'Rachel Crosby']) {
      assert.ok(!names.some((name) => name.includes(unpublished)), `${unpublished} is not on the current published roster`);
    }
    for (const member of [...team.clinicalGroups.flatMap((group) => group.members), ...team.careTeam.members]) {
      const bytes = await readFile(path.join(project, 'public/assets/images', member.image));
      assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', member.image);
      assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', member.image);
    }
  }
});

test('Phase 5C preserves Team hierarchy, supporting copy, careers destination and matching contact values', () => {
  const team = manifest.find((item) => item.route === '/team').entry.data.team;
  const $ = page('/team');
  assert.equal($('main h1').length, 1);
  assert.equal($('main h1').text(), 'Meet the Team');
  assert.equal($('.team-clinical > .team-intro > h2').text(), team.intro.heading);
  assert.equal($('.team-clinical .team-group h3').length, team.clinicalGroups.length);
  assert.equal($('.team-care > .container > h2').text(), team.careTeam.heading);
  assert.equal($('.team-member').find('h1,h2,h3').length, 0);
  assert.equal($('.team-member h4').length, 9);
  assert.equal(text($('.team-closing').text()), team.careTeam.closingStatement);
  assert.equal(text($('.team-careers > .container-narrow > p').eq(1).text()), team.careers.intro);

  const careers = $('.team-careers a.content-button');
  assert.equal(careers.length, 1);
  assert.equal(text(careers.text()), team.careers.cta.label);
  assert.equal(careers.attr('href'), '/careers');
  assert.ok(artifacts.get('staging').html.has('/careers'));

  const contact = $('#team-careers-email');
  assert.equal(contact.text(), 'hr [at] azinstitute4autism [dot] com');
  const script = contact.next('script').text();
  const decode = (variable) => {
    const match = script.match(new RegExp(`const ${variable} = (\\[[^\\]]+\\])`));
    assert.ok(match, `Missing ${variable}`);
    return JSON.parse(match[1]).map((code) => String.fromCharCode(code)).join('');
  };
  assert.equal(decode('encodedTarget'), team.careers.email);
  assert.equal(decode('encodedText'), team.careers.email);
});

test('Phase 5C retains Team publication metadata and creates no translation route', () => {
  for (const mode of ['staging', 'indexing']) {
    const $ = page('/team', mode);
    assert.equal($('head title').text(), 'Meet Our Dedicated Autism Support Team | Arizona Institute for Autism');
    assert.equal(meta($, 'description').attr('content'), 'Meet the all-star team of compassionate, experienced professionals transforming personalized autism therapy and education at Arizona Institute for Autism.');
    assert.equal($('link[rel="canonical"]').attr('href'), `${site}/team`);
    assert.equal(meta($, 'og:image').attr('content'), `${site}/assets/images/AIALanding_BG_V2.jpg`);
    assert.equal(meta($, 'twitter:image').attr('content'), `${site}/assets/images/AIALanding_BG_V2.jpg`);
    assert.equal(meta($, 'og:image:alt').attr('content'), 'learn more about arizona institute for autism');
    assert.equal(meta($, 'twitter:image:alt').attr('content'), 'learn more about arizona institute for autism');
    assert.equal($('link[hreflang]').length, 0);
    assert.equal($('.lang-switcher__menu a').length, 0);
  }
  for (const { html } of artifacts.values()) assert.equal(html.has('/es/team'), false);
  assert.equal(manifest.some((item) => item.route === '/es/team'), false);
});

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
