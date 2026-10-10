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
import { createLibraryCatalog, extractMarkdownHeadings } from '../src/utils/library-catalog.ts';
import { boundedSearchOffset, normalizeLibrarySearchText, parseLegacyLibrarySearchState, searchLibrary } from '../src/utils/library-search.ts';
import { createPublicationManifest, renderSitemap, robotsFor } from '../src/utils/publication-policy.ts';
import { createLibrarySearchPublication } from '../src/utils/search-publication.ts';

const project = fileURLToPath(new URL('../', import.meta.url));
const site = JSON.parse(await readFile(path.join(project, 'src/data/site.json'), 'utf8')).url;

async function contentEntries(root = project) {
  return Promise.all((await fg('src/content/{pages,blog}/**/*.{md,mdx}', { cwd: root })).sort().map(async (file) => {
    const source = await readFile(path.join(root, file), 'utf8');
    const parsed = matter(source);
    const [, , collection, ...parts] = file.split('/');
    return { id: parts.join('/').replace(/\.mdx?$/, ''), collection, body: parsed.content, data: parsed.data };
  }));
}

async function authorEntries(root = project) {
  return Promise.all((await fg('src/content/authors/**/*.{md,mdx}', { cwd: root })).sort().map(async (file) => {
    const parsed = matter(await readFile(path.join(root, file), 'utf8'));
    return { id: file.replace(/^src\/content\/authors\//, '').replace(/\.mdx?$/, ''), data: parsed.data };
  }));
}

const entries = await contentEntries();
const manifest = createPublicationManifest(entries, site);
const catalog = createLibraryCatalog(manifest, await authorEntries());

function record(overrides = {}) {
  return {
    url: '/library/example', locale: 'en', title: 'Autism Support Guide', description: 'Practical family resources',
    headings: ['Planning Daily Routines'], category: 'Library', tags: [], author: { name: 'Rula Diab', slug: 'rula-diab' },
    publishedAt: '2026-01-01', ...overrides
  };
}

test('actual catalog groups every eligible post by locale and preserves syndicated noindex records', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(catalog.byLocale).map(([locale, items]) => [locale, items.length])), { en: 46, es: 12, ar: 7 });
  assert.equal(catalog.all.length, 65);
  for (const slug of ['community-highlight-meet-rula-diab', 'new-aia-scottsdale-office']) {
    assert.ok(catalog.byLocale.en.some(({ search }) => search.url === `/library/${slug}`));
  }
  assert.equal(new Set(catalog.all.map(({ route }) => route)).size, 65);
  assert.ok(catalog.all.every(({ search }) => search.author.name === 'Rula Diab'));
});

test('catalog ordering is date descending with route ascending as the stable tie-breaker', () => {
  for (let index = 1; index < catalog.all.length; index++) {
    const previous = catalog.all[index - 1].search;
    const current = catalog.all[index].search;
    const dateOrder = Date.parse(previous.publishedAt) - Date.parse(current.publishedAt);
    assert.ok(dateOrder > 0 || (dateOrder === 0 && previous.url.localeCompare(current.url, 'en') < 0));
  }
});

test('catalog fixtures include new eligible posts automatically and exclude drafts', () => {
  const author = [{ id: 'en/author', data: { lang: 'en', slug: 'author', name: 'Example Author' } }];
  const make = (slug, draft = false) => ({
    id: `en/${slug}`, collection: 'blog', body: '## Searchable heading',
    data: { lang: 'en', slug, title: slug, description: '', date: '2026-01-01', author: 'author', category: 'Library', tags: [], draft }
  });
  const fixtureManifest = createPublicationManifest([make('new-post'), make('draft-post', true)], site);
  const fixture = createLibraryCatalog(fixtureManifest, author);
  assert.deepEqual(fixture.all.map(({ route }) => route), ['/library/new-post']);
  assert.deepEqual(fixture.all[0].search.headings, ['Searchable heading']);
});

test('catalog rejects duplicate routes and missing or ambiguous locale authors', () => {
  const source = {
    id: 'en/example', collection: 'blog', body: '',
    data: { lang: 'en', slug: 'example', title: 'Example', description: '', date: '2026-01-01', author: 'author' }
  };
  const publication = { route: '/library/example', eligible: true, entry: source };
  assert.throws(() => createLibraryCatalog([publication, publication], [{ id: 'a', data: { lang: 'en', slug: 'author', name: 'Author' } }]), /Duplicate Library route/);
  assert.throws(() => createLibraryCatalog([publication], []), /Missing or ambiguous article author/);
  assert.throws(() => createLibraryCatalog([publication], [
    { id: 'a', data: { lang: 'en', slug: 'author', name: 'Author' } },
    { id: 'b', data: { lang: 'en', slug: 'author', name: 'Other' } }
  ]), /Missing or ambiguous article author/);
});

test('heading extraction ignores fenced code and strips Markdown/MDX presentation syntax', () => {
  assert.deepEqual(extractMarkdownHeadings(`## Visible **heading**\n\n\`\`\`md\n## Hidden code\n\`\`\`\n## [Linked heading](/path)\n## <Widget script="ignored" />\n## ![Image heading](/image.jpg)`), [
    'Visible heading', 'Linked heading', 'Image heading'
  ]);
});

test('normalization handles case, whitespace, punctuation, Spanish accents, and Arabic marks', () => {
  assert.equal(normalizeLibrarySearchText('  EVALUACIÓN—ABA  ', 'es'), 'evaluacion aba');
  assert.equal(normalizeLibrarySearchText('التَّـوحُّد', 'ar'), 'التوحد');
  assert.doesNotThrow(() => normalizeLibrarySearchText('\ud800 🙂 ???', 'en'));
});

test('search handles empty, exact-title, headings, descriptions, authors, categories and multiple terms', () => {
  const records = [
    record(),
    record({ url: '/library/second', title: 'Second article', description: 'Autism support', publishedAt: '2026-02-01' })
  ];
  assert.deepEqual(searchLibrary(records, ''), []);
  assert.deepEqual(searchLibrary(records, '   '), []);
  assert.equal(searchLibrary(records, 'Autism Support Guide')[0].record.url, '/library/example');
  assert.equal(searchLibrary([records[0]], 'daily routines')[0].record.url, '/library/example');
  assert.equal(searchLibrary([records[0]], 'family resources')[0].record.url, '/library/example');
  assert.equal(searchLibrary([records[0]], 'Rula Diab')[0].record.url, '/library/example');
  assert.equal(searchLibrary([records[0]], 'Library')[0].record.url, '/library/example');
  assert.equal(searchLibrary(records, 'autism resources').length, 1);
  assert.equal(searchLibrary(records, 'nonexistent').length, 0);
});

test('search matches Spanish accents and Arabic diacritics without changing display text', () => {
  const spanish = record({ locale: 'es', title: 'Evaluación del autismo', url: '/es/library/evaluacion' });
  const arabic = record({ locale: 'ar', title: 'دليل التَّـوحُّد', url: '/ar/library/guide' });
  assert.equal(searchLibrary([spanish], 'evaluacion')[0].record.title, 'Evaluación del autismo');
  assert.equal(searchLibrary([arabic], 'التوحد')[0].record.title, 'دليل التَّـوحُّد');
});

test('equal search scores use publication date then normalized route', () => {
  const records = [
    record({ url: '/library/z', title: 'Shared title', publishedAt: '2025-01-01' }),
    record({ url: '/library/b', title: 'Shared title', publishedAt: '2026-01-01' }),
    record({ url: '/library/a', title: 'Shared title', publishedAt: '2026-01-01' })
  ];
  assert.deepEqual(searchLibrary(records, 'shared').map(({ record: item }) => item.url), ['/library/a', '/library/b', '/library/z']);
});

test('legacy query parsing gives term precedence, preserves repeated types, and normalizes offset/language', () => {
  assert.deepEqual(parseLegacyLibrarySearchState('?term=autism&q=ignored&type=BLOG_POST&type=SITE_PAGE&lang=es&offset=20'), {
    query: 'autism', language: 'es', offset: 20, types: ['BLOG_POST', 'SITE_PAGE']
  });
  assert.deepEqual(parseLegacyLibrarySearchState('?q=%3Cscript%3E&lang=unknown&offset=-10'), {
    query: '<script>', language: 'all', offset: 0, types: []
  });
  assert.equal(parseLegacyLibrarySearchState('?term=&q=fallback').query, '');
  for (const offset of ['NaN', '11', '-20', 'Infinity']) assert.equal(parseLegacyLibrarySearchState(`?offset=${offset}`).offset, 0);
});

test('legacy page offsets clamp to the last real ten-result page', () => {
  assert.equal(boundedSearchOffset(0, 100), 0);
  assert.equal(boundedSearchOffset(25, 0), 0);
  assert.equal(boundedSearchOffset(25, 20), 20);
  assert.equal(boundedSearchOffset(25, 100), 20);
  assert.equal(boundedSearchOffset(25, 11), 0);
});

test('mixed-language Library search returns matching records without translation or mutation', () => {
  const records = [
    record({ locale: 'en', title: 'Autism support', url: '/library/en' }),
    record({ locale: 'es', title: 'Apoyo para el autismo', url: '/es/library/es' }),
    record({ locale: 'ar', title: 'دعم للأطفال المصابين بالتوحد', url: '/ar/library/ar' })
  ];
  assert.deepEqual(searchLibrary(records, 'autism').map(({ record: item }) => item.url), ['/library/en', '/es/library/es']);
  assert.deepEqual(searchLibrary(records, 'autismo').map(({ record: item }) => item.url), ['/es/library/es']);
  assert.deepEqual(searchLibrary(records, 'التوحد').map(({ record: item }) => item.url), ['/ar/library/ar']);
});

let temporary;
const artifacts = new Map();
before(async () => {
  temporary = await mkdtemp(path.join(os.tmpdir(), 'aia-library-test-'));
  await cp(path.join(project, 'src'), path.join(temporary, 'src'), { recursive: true });
  await symlink(path.join(project, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  await writeFile(path.join(temporary, 'package.json'), '{"type":"module"}\n');
  const runner = `import {build} from ${JSON.stringify(pathToFileURL(path.join(project, 'node_modules/astro/dist/index.js')).href)};
await build({root:${JSON.stringify(temporary)},configFile:${JSON.stringify(path.relative(temporary, path.join(project, 'astro.config.mjs')))},logLevel:'silent',vite:{cacheDir:${JSON.stringify(path.join(temporary, '.vite'))}}});`;
  for (const mode of ['staging', 'indexing']) {
    execFileSync(process.execPath, ['--input-type=module', '-e', runner], {
      cwd: temporary, env: { ...process.env, PUBLIC_ALLOW_INDEXING: mode === 'indexing' ? 'true' : 'false' },
      timeout: 90_000, maxBuffer: 4 * 1024 * 1024
    });
    const html = new Map();
    for (const file of await fg('**/*.html', { cwd: path.join(temporary, 'dist') })) {
      const route = '/' + file.replace(/(^|\/)index\.html$/, '').replace(/\/$/, '');
      html.set(route, await readFile(path.join(temporary, 'dist', file), 'utf8'));
    }
    const indexes = Object.fromEntries(await Promise.all(['en', 'es', 'ar'].map(async (locale) => [
      locale,
      JSON.parse(await readFile(path.join(temporary, 'dist/assets/search/library', `${locale}.json`), 'utf8'))
    ])));
    artifacts.set(mode, { html, indexes, sitemap: await readFile(path.join(temporary, 'dist/sitemap.xml'), 'utf8') });
  }
}, { timeout: 180_000 });

after(async () => {
  if (temporary) await rm(temporary, { recursive: true, force: true });
});

test('build emits one deterministic, minimal UTF-8 index per locale', () => {
  const first = artifacts.get('staging').indexes;
  const second = artifacts.get('indexing').indexes;
  assert.deepEqual(second, first);
  assert.deepEqual(Object.fromEntries(Object.entries(first).map(([locale, records]) => [locale, records.length])), { en: 46, es: 12, ar: 7 });
  for (const [locale, records] of Object.entries(first)) {
    assert.ok(records.every((item) => item.locale === locale && item.url.startsWith(locale === 'en' ? '/library/' : `/${locale}/library/`)));
    assert.equal(new Set(records.map((item) => item.url)).size, records.length);
    for (const item of records) {
      assert.deepEqual(Object.keys(item), ['url', 'locale', 'title', 'description', 'headings', 'category', 'tags', 'author', 'publishedAt']);
      assert.deepEqual(Object.keys(item.author), ['name', 'slug']);
      assert.ok(!JSON.stringify(item).includes('<script'));
      assert.ok(!('body' in item) && !('canonical' in item) && !('draft' in item));
    }
  }
});

test('Library pages retain every server-rendered article and expose progressive search controls', () => {
  for (const [route, locale, count] of [['/library', 'en', 46], ['/es/library', 'es', 12], ['/ar/library', 'ar', 7]]) {
    const $ = load(artifacts.get('staging').html.get(route));
    assert.equal($('.blog-list .blog-card').length, count, route);
    assert.equal($('[data-library-search][hidden]').length, 1, route);
    assert.equal($('noscript').length, 1, route);
    assert.match($('noscript').html(), /library-search__noscript/, route);
    assert.equal($('html').attr('lang'), locale, route);
    assert.equal($('html').attr('dir'), locale === 'ar' ? 'rtl' : 'ltr', route);
  }
});

test('/search is a noindex static Library-only compatibility route in both build modes', () => {
  const publication = createLibrarySearchPublication(site);
  for (const mode of ['staging', 'indexing']) {
    const { html, sitemap } = artifacts.get(mode);
    assert.equal(html.size, manifest.filter((item) => item.eligible).length + 1);
    const $ = load(html.get('/search'));
    assert.equal($('link[rel="canonical"]').attr('href'), `${site}/search`);
    assert.equal($('meta[name="robots"]').attr('content'), robotsFor(publication, mode === 'indexing'));
    assert.equal($('link[hreflang]').length, 0);
    assert.equal($('[data-library-search][data-mode="legacy"]').length, 1);
    assert.equal($('main h1').length, 1);
    assert.match($('main').text(), /Library articles/);
    assert.ok(!sitemap.includes(`${site}/search`));
    assert.equal(sitemap, renderSitemap(manifest, mode === 'indexing'));
  }
});

test('client source uses textContent and contains no analytics, cookies, external search, or innerHTML sink', async () => {
  const source = await readFile(path.join(project, 'src/components/LibrarySearch.astro'), 'utf8');
  assert.match(source, /textContent/);
  assert.doesNotMatch(source, /innerHTML|document\.cookie|localStorage|sessionStorage|analytics|HubSpot/i);
  assert.match(source, /URLSearchParams/);
  assert.match(source, /popstate|hashchange/);
});
