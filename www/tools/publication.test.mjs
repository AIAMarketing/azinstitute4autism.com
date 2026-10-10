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
import { createPublicationManifest, hreflangLinksFor, normalizeRoute, publicationFor, renderSitemap, robotsFor, sitemapUrls, validateTranslationGraph } from '../src/utils/publication-policy.ts';
import { createLibraryCatalog } from '../src/utils/library-catalog.ts';
import { createLibraryPaginationPublications } from '../src/utils/library-pagination.ts';
import { createAuthorArchivePublications } from '../src/utils/author-archives.ts';
import { createLibrarySearchPublication } from '../src/utils/search-publication.ts';

const project = fileURLToPath(new URL('../', import.meta.url));
const site = JSON.parse(await readFile(path.join(project, 'src/data/site.json'), 'utf8')).url;
const evidence = JSON.parse(await readFile(path.join(project, 'reports/route-reconciliation-2026-10-07-offline.json'), 'utf8'));
const verifiedExceptions = evidence.routes.filter((row) => row.local && row.production?.http?.robots === 'noindex');
const entry = (data = {}, collection = 'pages', id = 'en/example') => ({ id, collection, data: { slug: 'example', lang: 'en', draft: false, ...data } });

async function readEntries(root) {
  return Promise.all((await fg('src/content/{pages,blog}/**/*.{md,mdx}', { cwd: root })).sort().map(async (file) => {
    const [, , collection, ...parts] = file.split('/');
    return { id: parts.join('/').replace(/\.mdx?$/, ''), collection, data: matter(await readFile(path.join(root, file), 'utf8')).data };
  }));
}

async function readAuthors(root) {
  return Promise.all((await fg('src/content/authors/**/*.{md,mdx}', { cwd: root })).sort().map(async (file) => ({
    id: file.replace(/^src\/content\/authors\//, '').replace(/\.mdx?$/, ''),
    data: matter(await readFile(path.join(root, file), 'utf8')).data
  })));
}

function assertCanonical(html, expected) {
  const $ = load(html);
  const tags = $('head link[rel="canonical"]');
  assert.equal(tags.length, 1, 'Exactly one canonical link is required');
  const href = tags.attr('href');
  assert.ok(/^https?:\/\//.test(href ?? ''), 'Canonical must be an absolute HTTP(S) URL');
  const parsed = new URL(href);
  assert.ok(!parsed.hash && !parsed.username && !parsed.password, 'Invalid canonical components');
  assert.equal(href, expected, 'Canonical must match the publication policy');
}

test('normal published pages self-canonicalize and enter the production sitemap', () => {
  const page = publicationFor(entry(), site);
  assert.equal(page.route, '/example');
  assert.equal(page.canonical, `${site}/example`);
  assert.equal(page.eligible, true);
  assert.deepEqual(sitemapUrls([page], true), [`${site}/example`]);
  assert.equal(robotsFor(page, true), 'index,follow');
});

test('draft/unpublished entries cannot become routes or sitemap entries', () => {
  const page = publicationFor(entry({ draft: true }), site);
  assert.equal(page.eligible, false);
  assert.equal(page.sitemapEligible, false);
  assert.deepEqual(sitemapUrls([page], true), []);
});

test('published noindex pages stay eligible but never enter the sitemap', () => {
  const page = publicationFor(entry({ noindex: true }), site);
  assert.equal(page.eligible, true);
  assert.equal(robotsFor(page, true), 'noindex,follow');
  assert.deepEqual(sitemapUrls([page], true), []);
});

test('external canonicals are preserved and excluded independently of noindex', () => {
  const page = publicationFor(entry({ canonical: 'https://publisher.example/original/' }), site);
  assert.equal(page.noindex, false);
  assert.equal(page.eligible, true);
  assert.equal(page.url, `${site}/example`);
  assert.equal(page.canonical, 'https://publisher.example/original/');
  assert.equal(page.externalCanonical, true);
  assert.deepEqual(sitemapUrls([page], true), []);
});

test('trailing slashes normalize; absent frontmatter canonicals get a self canonical', () => {
  assert.equal(normalizeRoute('/example///'), '/example');
  assert.equal(normalizeRoute('/'), '/');
  assert.equal(publicationFor(entry({ canonical: `${site}/example/` }), site).canonical, `${site}/example`);
  assert.equal(publicationFor(entry({ slug: 'index' }), site).canonical, `${site}/`);
  assert.equal(publicationFor(entry({ slug: 'index', lang: 'es' }), site).canonical, `${site}/es`);
});

test('malformed, unsafe and conflicting local canonicals are rejected', () => {
  for (const canonical of ['', '/example', 'not a URL', 'javascript:alert(1)', 'ftp://example.org/a', 'https://user:secret@example.org/a', `${site}/example#fragment`, `${site}/other`, `${site}/example?tracking=yes`, 'http://www.azinstitute4autism.com/example', 'https://azinstitute4autism.com/example']) {
    assert.throws(() => publicationFor(entry({ canonical }), site), /canonical/i, canonical);
  }
});

test('duplicate canonical targets and duplicate frontmatter keys are rejected', () => {
  const canonical = 'https://publisher.example/original';
  assert.throws(() => createPublicationManifest([entry({ canonical }), entry({ slug: 'second', canonical }, 'pages', 'en/second')], site), /Duplicate canonical/);
  assert.throws(() => matter('---\ncanonical: https://example.org/a\ncanonical: https://example.org/b\n---\n'), /duplicated mapping key/);
});

test('route collisions include cross-collection, locale, trailing-slash and draft cases', () => {
  for (const pair of [
    [entry({ slug: 'library/example' }), entry({}, 'blog')],
    [entry({ slug: 'es/example' }), entry({ lang: 'es' })],
    [entry(), entry({ slug: 'example/', draft: true }, 'pages', 'en/draft')]
  ]) assert.throws(() => createPublicationManifest(pair, site), /Route collision/);
  for (const slug of ['sitemap.xml', 'robots.txt', 'assets/example']) {
    assert.throws(() => publicationFor(entry({ slug }), site), /reserved utility/);
  }
  for (const route of ['//example.org', '/a/../b', '/a/%2E%2E/b', '/a//b', '/a%2fb', '/a?q=1', '/a#id']) {
    assert.throws(() => normalizeRoute(route), /Invalid local route/);
  }
});

test('staging noindex cannot be overridden by page policy', () => {
  for (const data of [{}, { noindex: false }, { noindex: true }, { draft: true }]) {
    assert.equal(robotsFor(publicationFor(entry(data), site), false), 'noindex,nofollow');
  }
  assert.deepEqual(sitemapUrls([publicationFor(entry(), site)], false), []);
});

test('generated-head acceptance checks reject missing, duplicate and invalid canonicals', () => {
  const canonical = `${site}/example`;
  const tag = `<link rel="canonical" href="${canonical}">`;
  assert.doesNotThrow(() => assertCanonical(`<head>${tag}</head>`, canonical));
  for (const tags of ['', tag + tag, '<link rel="canonical" href="/example">', '<link rel="canonical" href="javascript:alert(1)">']) {
    assert.throws(() => assertCanonical(`<head>${tags}</head>`, canonical));
  }
});

const sourceEntries = await readEntries(project);
const actualManifest = createPublicationManifest(sourceEntries, site);
const sourceAuthors = await readAuthors(project);
const sitePublications = (manifest) => [
  ...manifest,
  ...createLibraryPaginationPublications(createLibraryCatalog(manifest, sourceAuthors), manifest, site),
  ...createAuthorArchivePublications(createLibraryCatalog(manifest, sourceAuthors), sourceAuthors, manifest, site)
].sort((left, right) => left.route.localeCompare(right.route, 'en'));
const generatedPublications = (manifest) => [
  ...sitePublications(manifest).filter((page) => page.eligible),
  createLibrarySearchPublication(site)
];

function translationPair() {
  return createPublicationManifest([
    entry({ slug: 'original', translationKey: 'explicit-pair' }),
    entry({ slug: 'traduccion', lang: 'es', translationKey: 'explicit-pair' }, 'pages', 'es/traduccion')
  ], site);
}

test('explicit English/Spanish equivalents with different slugs are reciprocal and self-referencing', () => {
  const pair = translationPair();
  for (const page of pair) {
    assert.deepEqual(hreflangLinksFor(page, true), [
      { lang: 'en', href: `${site}/original` },
      { lang: 'es', href: `${site}/es/traduccion` },
      { lang: 'x-default', href: `${site}/original` }
    ]);
    assert.deepEqual(page.translations.map(({ route }) => route), ['/original', '/es/traduccion']);
  }
});

test('singletons, absent keys and different keys never invent translations from matching slugs', () => {
  for (const keys of [[undefined, undefined], ['english-only', 'spanish-only'], ['declared', undefined]]) {
    const pages = createPublicationManifest([
      entry({ translationKey: keys[0] }),
      entry({ lang: 'es', translationKey: keys[1] }, 'pages', 'es/example')
    ], site);
    for (const page of pages) {
      assert.deepEqual(page.translations, []);
      assert.deepEqual(hreflangLinksFor(page, true), []);
    }
  }
});

test('translation keys are scoped to collections; pages cannot pair with blog posts', () => {
  const pages = createPublicationManifest([
    entry({ translationKey: 'shared-key' }),
    entry({ lang: 'es', translationKey: 'shared-key' }, 'blog', 'es/example')
  ], site);
  assert.ok(pages.every((page) => page.translations.length === 0));
});

test('draft placeholders, noindex and external-canonical equivalents are excluded independently', () => {
  for (const flags of [{ draft: true }, { noindex: true }, { canonical: 'https://publisher.example/original' }]) {
    const pages = createPublicationManifest([
      entry({ ...flags, translationKey: 'pair' }),
      entry({ lang: 'es', translationKey: 'pair' }, 'pages', 'es/example'),
      entry({ lang: 'ar', translationKey: 'pair' }, 'pages', 'ar/example')
    ], site);
    assert.deepEqual(pages.find((page) => page.route === '/example').translations, []);
    for (const page of pages.filter((page) => page.route !== '/example')) {
      assert.deepEqual(hreflangLinksFor(page, true), [
        { lang: 'es', href: `${site}/es/example` },
        { lang: 'ar', href: `${site}/ar/example` }
      ], 'No x-default may point to an excluded English member');
    }
  }
});

test('x-default is omitted when a genuine Spanish/Arabic set has no English member', () => {
  const pages = createPublicationManifest([
    entry({ lang: 'es', translationKey: 'pair' }, 'pages', 'es/example'),
    entry({ lang: 'ar', translationKey: 'pair' }, 'pages', 'ar/example')
  ], site);
  for (const page of pages) {
    assert.equal(hreflangLinksFor(page, true).length, 2);
    assert.ok(!hreflangLinksFor(page, true).some(({ lang }) => lang === 'x-default'));
    assert.deepEqual(hreflangLinksFor(page, false), [], 'Staging suppresses metadata, not the navigation graph');
    assert.equal(page.translations.length, 2);
  }
});

test('ambiguous same-language declarations fail even if the duplicate is a draft', () => {
  for (const draft of [false, true]) {
    assert.throws(() => createPublicationManifest([
      entry({ translationKey: 'pair' }),
      entry({ slug: 'second', translationKey: 'pair', draft }, 'pages', 'en/second')
    ], site), /Ambiguous translation: pages:pair/);
  }
  for (const translationKey of ['', ' ', ' key', 'key ', null, 123]) {
    assert.throws(() => createPublicationManifest([entry({ translationKey })], site), /Invalid translationKey/);
  }
});

test('missing referenced translations fail graph validation instead of being silently dropped', () => {
  const pair = translationPair();
  assert.throws(() => validateTranslationGraph(pair.filter((page) => page.entry.data.lang === 'en')), /Missing translation target/);
});

test('graph validation rejects cross-family, wrong-key and publication-ineligible targets', () => {
  for (const mutate of [
    (page) => { page.entry.collection = 'blog'; },
    (page) => { page.entry.data.translationKey = 'different-family'; },
    (page) => { page.sitemapEligible = false; }
  ]) {
    const pair = translationPair();
    mutate(pair.find((page) => page.entry.data.lang === 'es'));
    assert.throws(() => validateTranslationGraph(pair), /family\/key mismatch|Ineligible translation/);
  }
});

test('graph validation rejects duplicate languages, nonreciprocity and missing self references', () => {
  const duplicate = translationPair();
  duplicate[0].translations.push(duplicate[0].translations[0]);
  assert.throws(() => validateTranslationGraph(duplicate), /duplicate translation/);
  const nonreciprocal = translationPair();
  nonreciprocal[0].translations = [];
  assert.throws(() => validateTranslationGraph(nonreciprocal), /Nonreciprocal/);
  const selfMissing = translationPair();
  for (const page of selfMissing) page.translations = page.translations.filter(({ lang }) => lang === 'en');
  assert.throws(() => validateTranslationGraph(selfMissing), /include itself and an equivalent/);
});

test('real content declares 24 translation sets and all five exceptions are absent', () => {
  const members = actualManifest.filter((page) => page.translations.length);
  const groups = new Set(members.map((page) => `${page.entry.collection}:${page.entry.data.translationKey}`));
  assert.equal(groups.size, 24);
  assert.equal(members.length, 53);
  assert.deepEqual(members.reduce((counts, page) => {
    const lang = page.entry.data.lang; counts[lang] = (counts[lang] ?? 0) + 1; return counts;
  }, {}), { en: 24, ar: 8, es: 21 });
  const excluded = ['/ar', ...verifiedExceptions.map(({ route }) => route)];
  for (const route of excluded) {
    assert.deepEqual(actualManifest.find((page) => page.route === route).translations, []);
    assert.ok(members.every((page) => page.translations.every((target) => target.route !== route)));
  }
  assert.ok(actualManifest.every((page) => page.entry.collection !== 'authors'));
});

test('the actual Arabic homepage placeholder remains unpublished', () => {
  const arabic = actualManifest.find((page) => page.route === '/ar');
  assert.equal(arabic.entry.data.draft, true);
  assert.equal(arabic.eligible, false);
  assert.ok(!sitemapUrls(actualManifest, true).includes(`${site}/ar`));
});

test('all four verified public noindex exceptions retain their policy', () => {
  assert.deepEqual(verifiedExceptions.map((page) => page.route).sort(), [
    '/employee-portal', '/library/community-highlight-meet-rula-diab',
    '/library/new-aia-scottsdale-office', '/schedule-consultation'
  ]);
  for (const exception of verifiedExceptions) {
    const page = actualManifest.find((candidate) => candidate.route === exception.route);
    assert.equal(page.eligible, true, exception.route);
    assert.equal(page.noindex, true, exception.route);
    assert.equal(page.canonical, exception.production.http.canonical, exception.route);
    assert.equal(page.sitemapEligible, false, exception.route);
  }
});

// Build the actual application in isolation: no network, deployment or writes
// to the real source, environment files or dist. Child processes isolate Vite's
// environment cache so indexing-enabled output cannot leak into staging.
let temporary;
let fixtureManifest;
const artifacts = new Map();
before(async () => {
  temporary = await mkdtemp(path.join(os.tmpdir(), 'aia-publication-test-'));
  await cp(path.join(project, 'src'), path.join(temporary, 'src'), { recursive: true });
  await symlink(path.join(project, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  await writeFile(path.join(temporary, 'package.json'), '{"type":"module"}\n');
  for (const [collection, name, flags] of [
    ['pages', 'publication-draft', 'draft: true'],
    ['blog', 'publication-draft', 'draft: true\ndate: 2026-10-07\nauthor: aia'],
    ['pages', 'publication-normal', 'draft: false'],
    ['pages', 'publication-external', 'draft: false\ncanonical: https://publisher.example/original/']
  ]) {
    await writeFile(path.join(temporary, 'src/content', collection, 'en', `${name}.md`),
      `---\ntitle: Publication regression fixture\nslug: ${name}\nlang: en\n${flags}\n---\nFixture content.\n`);
  }
  // Different slugs prove that the rendered switcher cannot use URL guessing.
  // Same-slug unkeyed fixtures prove that it cannot invent a relationship.
  for (const [lang, slug, flags] of [
    ['en', 'translation-original', 'translationKey: publication-translated'],
    ['es', 'traduccion-distinta', 'translationKey: publication-translated'],
    ['ar', 'translation-draft', 'translationKey: publication-translated\ndraft: true'],
    ['en', 'translation-unrelated', ''],
    ['es', 'translation-unrelated', ''],
    ['es', 'translation-without-english', 'translationKey: publication-no-default'],
    ['ar', 'translation-without-english', 'translationKey: publication-no-default']
  ]) {
    await writeFile(path.join(temporary, 'src/content/pages', lang, `${slug}.md`),
      `---\ntitle: Translation regression fixture\nslug: ${slug}\nlang: ${lang}\n${flags}\n---\nFixture content.\n`);
  }
  fixtureManifest = createPublicationManifest(await readEntries(temporary), site);
  const runner = `import {build} from ${JSON.stringify(pathToFileURL(path.join(project, 'node_modules/astro/dist/index.js')).href)};
await build({root:${JSON.stringify(temporary)},configFile:${JSON.stringify(path.relative(temporary, path.join(project, 'astro.config.mjs')))},logLevel:'silent',vite:{cacheDir:${JSON.stringify(path.join(temporary, '.vite'))}}});`;
  for (const mode of ['staging', 'indexing', 'draft-indexes']) {
    if (mode === 'draft-indexes') {
      for (const file of ['src/content/pages/en/index.md', 'src/content/pages/es/library.md']) {
        const target = path.join(temporary, file);
        await writeFile(target, (await readFile(target, 'utf8')).replace('draft: false', 'draft: true'));
      }
    }
    execFileSync(process.execPath, ['--input-type=module', '-e', runner], {
      cwd: temporary, env: { ...process.env, PUBLIC_ALLOW_INDEXING: mode === 'staging' ? 'false' : 'true' },
      timeout: 60_000, maxBuffer: 2 * 1024 * 1024
    });
    const html = new Map();
    for (const file of await fg('**/*.html', { cwd: path.join(temporary, 'dist') })) {
      const route = '/' + file.replace(/(^|\/)index\.html$/, '').replace(/\/$/, '');
      html.set(route, await readFile(path.join(temporary, 'dist', file), 'utf8'));
    }
    artifacts.set(mode, { html, sitemap: await readFile(path.join(temporary, 'dist/sitemap.xml'), 'utf8'), robots: await readFile(path.join(temporary, 'dist/robots.txt'), 'utf8') });
  }
}, { timeout: 120_000 });

after(async () => {
  if (temporary) await rm(temporary, { recursive: true, force: true });
});

for (const mode of ['staging', 'indexing']) {
  test(`${mode} build: only eligible local routes are generated, including home/Library`, () => {
    assert.deepEqual([...artifacts.get(mode).html.keys()].sort(), generatedPublications(fixtureManifest).map((page) => page.route).sort());
    assert.ok(!artifacts.get(mode).html.has('/ar'));
    assert.ok(artifacts.get(mode).html.has('/schedule-consultation'));
    assert.ok(artifacts.get(mode).html.has('/search'));
  });

  test(`${mode} build: every generated head has exactly one correct canonical and robots tag`, () => {
    for (const page of generatedPublications(fixtureManifest)) {
      const html = artifacts.get(mode).html.get(page.route);
      assertCanonical(html, page.canonical);
      const $ = load(html);
      assert.equal($('meta[name="robots"]').length, 1, page.route);
      assert.equal($('meta[name="robots"]').attr('content'), robotsFor(page, mode === 'indexing'), page.route);
      assert.equal($('a[href="/ar"]').length, 0, 'No navigation links to the unpublished placeholder');
    }
  });

  test(`${mode} build: sitemap exactly matches eligible local indexable self-canonical routes`, () => {
    const { sitemap, html, robots } = artifacts.get(mode);
    assert.equal(sitemap, renderSitemap(sitePublications(fixtureManifest), mode === 'indexing'));
    const $ = load(sitemap, { xml: true });
    const urls = $('loc').map((_, node) => $(node).text()).get();
    assert.equal(new Set(urls).size, urls.length);
    for (const url of urls) {
      assert.equal(new URL(url).origin, site);
      assert.ok(html.has(new URL(url).pathname), url);
    }
    assert.equal(robots.includes(`Sitemap: ${site}/sitemap.xml`), mode === 'indexing');
    assert.ok(!urls.includes(`${site}/ar`));
    for (const exception of verifiedExceptions) assert.ok(!urls.includes(site + exception.route));
    assert.ok(!urls.includes(`${site}/publication-external`));
    if (mode === 'indexing') assert.ok(urls.includes(`${site}/publication-normal`));
  });
}

function assertRenderedTranslations({ html }, manifest, allowIndexing) {
  const pages = new Map(generatedPublications(manifest).map((page) => [page.route, page]));
  for (const [route, content] of html) {
    const page = pages.get(route);
    assert.ok(page, `Unknown generated route: ${route}`);
    const $ = load(content);
    const links = $('head link[rel="alternate"][hreflang]').map((_, tag) => ({
      lang: $(tag).attr('hreflang'), href: $(tag).attr('href')
    })).get();
    assert.deepEqual(links, hreflangLinksFor(page, allowIndexing), route);
    assert.equal($('link[hreflang]').length, links.length, 'Alternates belong in head');
    const choices = $('.lang-switcher__menu a').map((_, tag) => ({
      lang: $(tag).attr('lang'), route: $(tag).attr('href')
    })).get();
    assert.deepEqual(choices, page.translations.map(({ lang, route }) => ({ lang, route })), route);
    assert.equal($('.lang-switcher__trigger').attr('aria-haspopup'), choices.length ? 'listbox' : undefined);
    for (const translation of page.translations) {
      assert.ok(html.has(translation.route), `Missing generated translation target: ${route} -> ${translation.route}`);
    }
    for (const link of links) {
      assert.equal(new URL(link.href).origin, site);
      const targetRoute = new URL(link.href).pathname;
      assert.ok(html.has(targetRoute), `Missing generated translation target: ${link.href}`);
      const target = pages.get(targetRoute);
      assert.ok(target?.sitemapEligible, `Ineligible hreflang target: ${targetRoute}`);
      assert.equal(target.entry.collection, page.entry.collection);
      assert.equal(target.entry.data.translationKey, page.entry.data.translationKey);
      assert.equal(target.entry.data.lang, link.lang === 'x-default' ? 'en' : link.lang);
      const other = load(html.get(targetRoute));
      assert.deepEqual(other('head link[rel="alternate"][hreflang]').map((_, tag) => ({
        lang: other(tag).attr('hreflang'), href: other(tag).attr('href')
      })).get(), links, `Reciprocity: ${route} -> ${targetRoute}`);
    }
  }
}

for (const mode of ['staging', 'indexing', 'draft-indexes']) {
  test(`${mode} build: hreflang and LanguageSwitcher share only real eligible equivalents`, () => {
    const manifest = mode === 'draft-indexes'
      ? createPublicationManifest(fixtureManifest.map(({ entry: source }) => ({ ...source, data: {
        ...source.data, draft: source.data.draft || (source.collection === 'pages' && ['en/index', 'es/library'].includes(source.id))
      } })), site)
      : fixtureManifest;
    assertRenderedTranslations(artifacts.get(mode), manifest, mode !== 'staging');
    const $ = load(artifacts.get(mode).html.get('/translation-original'));
    assert.equal($('.lang-switcher__menu a[lang="es"]').attr('href'), '/es/traduccion-distinta');
    const unpaired = load(artifacts.get(mode).html.get('/translation-unrelated'));
    assert.equal(unpaired('.lang-switcher__menu a').length, 0);
  });
}

test('rendered-output validation fails for a missing referenced translation file', () => {
  const artifact = { ...artifacts.get('indexing'), html: new Map(artifacts.get('indexing').html) };
  artifact.html.delete('/es/traduccion-distinta');
  assert.throws(() => assertRenderedTranslations(artifact, fixtureManifest, true), /Missing generated translation target/);
});

test('formerly fixed home and Library routes disappear when their entries become drafts', () => {
  const { html, sitemap } = artifacts.get('draft-indexes');
  assert.ok(!html.has('/'));
  assert.ok(!html.has('/es/library'));
  assert.ok(html.has('/es'));
  const $ = load(sitemap, { xml: true });
  const urls = $('loc').map((_, node) => $(node).text()).get();
  assert.ok(!urls.includes(`${site}/`));
  assert.ok(!urls.includes(`${site}/es/library`));
});
