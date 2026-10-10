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
import { createLibraryPaginationPublications, libraryPageRoute, paginateLibraryItems } from '../src/utils/library-pagination.ts';
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
const paginationPublications = createLibraryPaginationPublications(catalog, manifest, site);
const routeManifest = [...manifest, ...paginationPublications].sort((left, right) => left.route.localeCompare(right.route, 'en'));

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

test('pagination handles empty, boundary and exact-multiple catalogs without empty numbered pages', () => {
  for (const [count, totalPages, pageSizes] of [
    [0, 0, [0]], [1, 1, [1]], [9, 1, [9]], [10, 1, [10]],
    [11, 2, [10, 1]], [20, 2, [10, 10]]
  ]) {
    const items = Array.from({ length: count }, (_, index) => index);
    const root = paginateLibraryItems(items, 1);
    assert.equal(root.totalItems, count);
    assert.equal(root.totalPages, totalPages);
    assert.equal(root.items.length, pageSizes[0]);
    for (let page = 2; page <= totalPages; page++) {
      assert.equal(paginateLibraryItems(items, page).items.length, pageSizes[page - 1]);
    }
    assert.equal(paginateLibraryItems(items, Math.max(2, totalPages + 1)), null);
  }
  for (const page of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(paginateLibraryItems([1], page), null);
  }
  assert.equal(paginateLibraryItems([1], 1, 0), null);
});

test('current catalogs generate only five numbered Library routes with expected slices', () => {
  assert.deepEqual(paginationPublications.map(({ route }) => route), [
    '/es/library/page/2', '/library/page/2', '/library/page/3', '/library/page/4', '/library/page/5'
  ]);
  assert.deepEqual(Object.fromEntries(['en', 'es', 'ar'].map((locale) => {
    const root = paginateLibraryItems(catalog.byLocale[locale], 1);
    return [locale, { total: root.totalItems, pages: root.totalPages }];
  })), {
    en: { total: 46, pages: 5 }, es: { total: 12, pages: 2 }, ar: { total: 7, pages: 1 }
  });
  assert.deepEqual([1, 2, 3, 4, 5].map((page) => paginateLibraryItems(catalog.byLocale.en, page).items.length), [10, 10, 10, 10, 6]);
  assert.deepEqual([1, 2].map((page) => paginateLibraryItems(catalog.byLocale.es, page).items.length), [10, 2]);
  assert.equal(paginateLibraryItems(catalog.byLocale.ar, 1).items.length, 7);
  for (const publication of paginationPublications) {
    assert.equal(publication.canonical, site + publication.route);
    assert.equal(publication.sitemapEligible, true);
    assert.deepEqual(publication.translations, []);
  }
});

test('generated page inventory follows catalog growth and removal without manual routes', () => {
  const english = catalog.byLocale.en;
  const withFiveMore = [...english, ...english.slice(0, 5)];
  const grown = { ...catalog, byLocale: { ...catalog.byLocale, en: withFiveMore } };
  assert.ok(createLibraryPaginationPublications(grown, manifest, site).some(({ route }) => route === '/library/page/6'));
  const reduced = { ...catalog, byLocale: { ...catalog.byLocale, en: english.slice(0, 40) } };
  assert.deepEqual(createLibraryPaginationPublications(reduced, manifest, site)
    .filter(({ libraryPage }) => libraryPage.locale === 'en').map(({ route }) => route), [
    '/library/page/2', '/library/page/3', '/library/page/4'
  ]);
});

test('page routes reject invalid numbers and generated descriptors reject reserved-family collisions', () => {
  assert.equal(libraryPageRoute('en', 1), '/library');
  assert.equal(libraryPageRoute('es', 2), '/es/library/page/2');
  for (const page of [0, -1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => libraryPageRoute('en', page), /Invalid Library page number/);
  }
  const root = manifest.find((page) => page.route === '/library');
  assert.throws(() => createLibraryPaginationPublications(catalog, [
    ...manifest,
    { ...root, route: '/library/page/2', url: `${site}/library/page/2`, canonical: `${site}/library/page/2` }
  ], site), /Reserved Library pagination route collision/);
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
  assert.equal(paginateLibraryItems(fixture.byLocale.en, 1).totalItems, 1);
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

test('Library roots and numbered pages render exact slices with progressive search controls', () => {
  for (const [route, locale, count] of [
    ['/library', 'en', 10], ['/library/page/2', 'en', 10], ['/library/page/3', 'en', 10],
    ['/library/page/4', 'en', 10], ['/library/page/5', 'en', 6],
    ['/es/library', 'es', 10], ['/es/library/page/2', 'es', 2], ['/ar/library', 'ar', 7]
  ]) {
    const $ = load(artifacts.get('staging').html.get(route));
    assert.equal($('.blog-list .blog-card').length, count, route);
    assert.equal($('[data-library-search][hidden]').length, 1, route);
    assert.equal($('noscript').length, 1, route);
    assert.match($('noscript').html(), /library-search__noscript/, route);
    assert.equal($('html').attr('lang'), locale, route);
    assert.equal($('html').attr('dir'), locale === 'ar' ? 'rtl' : 'ltr', route);
    assert.equal($('main h1').length, 1, route);
    assert.ok($('#library-archive-' + locale + ' .blog-list').length, route);
  }
});

test('generated Library routes contain every eligible article exactly once and omit invalid pages', () => {
  const html = artifacts.get('staging').html;
  const routeGroups = {
    en: ['/library', '/library/page/2', '/library/page/3', '/library/page/4', '/library/page/5'],
    es: ['/es/library', '/es/library/page/2'],
    ar: ['/ar/library']
  };
  for (const [locale, routes] of Object.entries(routeGroups)) {
    const links = routes.flatMap((route) => {
      const $ = load(html.get(route));
      return $('.blog-list .blog-card h3 a').map((_, link) => $(link).attr('href')).get();
    });
    assert.equal(links.length, catalog.byLocale[locale].length, locale);
    assert.equal(new Set(links).size, links.length, locale);
    assert.deepEqual(links, catalog.byLocale[locale].map(({ route }) => route), locale);
  }
  for (const route of [
    '/library/page/1', '/library/page/6', '/library/page/0', '/library/page/02', '/library/page/not-a-number',
    '/es/library/page/1', '/es/library/page/3', '/ar/library/page/1', '/ar/library/page/2'
  ]) assert.ok(!html.has(route), route);
});

test('pagination navigation uses roots for page 1, valid boundaries, aria-current and localized labels', () => {
  const html = artifacts.get('staging').html;
  for (const [route, current, previous, next] of [
    ['/library', '1', null, '/library/page/2'],
    ['/library/page/3', '3', '/library/page/2', '/library/page/4'],
    ['/library/page/5', '5', '/library/page/4', null],
    ['/es/library', '1', null, '/es/library/page/2'],
    ['/es/library/page/2', '2', '/es/library', null]
  ]) {
    const $ = load(html.get(route));
    const pager = $('.library-pagination');
    assert.equal(pager.length, 1, route);
    assert.equal(pager.find('[aria-current="page"]').text(), current, route);
    assert.equal(pager.find('a[rel="prev"]').attr('href'), previous ?? undefined, route);
    assert.equal(pager.find('a[rel="next"]').attr('href'), next ?? undefined, route);
    assert.equal(pager.find('a[href$="/page/1"]').length, 0, route);
    assert.ok(pager.attr('aria-label'), route);
  }
  assert.equal(load(html.get('/ar/library'))('.library-pagination').length, 0);
  assert.match(load(html.get('/es/library'))('.library-pagination').attr('aria-label'), /biblioteca/i);
  assert.equal(load(html.get('/ar/library'))('html').attr('dir'), 'rtl');
});

test('numbered pages keep full-locale search indexes and hide cards plus pager through one archive boundary', () => {
  for (const [route, locale, expectedIndexCount] of [
    ['/library/page/3', 'en', 46], ['/es/library/page/2', 'es', 12], ['/ar/library', 'ar', 7]
  ]) {
    const $ = load(artifacts.get('staging').html.get(route));
    const search = $('[data-library-search]');
    assert.equal(search.attr('data-archive-id'), `library-archive-${locale}`, route);
    assert.equal($(`#library-archive-${locale} .blog-list`).length, 1, route);
    assert.equal($(`#library-archive-${locale} .library-pagination`).length, locale === 'ar' ? 0 : 1, route);
    assert.equal(artifacts.get('staging').indexes[locale].length, expectedIndexCount, route);
  }
});

test('page-1 redirect registry preserves service aliases and defines only three Library aliases', async () => {
  const redirects = JSON.parse(await readFile(path.join(project, 'src/data/redirects.json'), 'utf8'));
  assert.deepEqual(redirects.slice(0, 3).map(({ from, to, status }) => ({ from, to, status })), [
    { from: '/aba', to: '/aba-therapy', status: 301 },
    { from: '/autismevaluations', to: '/autism-evaluations', status: 301 },
    { from: '/learnersocialclub', to: '/learner-social-club', status: 301 }
  ]);
  assert.deepEqual(redirects.slice(3).map(({ from, to, status }) => ({ from, to, status })), [
    { from: '/library/page/1', to: '/library', status: 301 },
    { from: '/es/library/page/1', to: '/es/library', status: 301 },
    { from: '/ar/library/page/1', to: '/ar/library', status: 301 }
  ]);
  assert.equal(new Set(redirects.map(({ from }) => from)).size, redirects.length);
  const rewrites = await readFile(path.join(project, 'reports/nginx-rewrites.conf'), 'utf8');
  for (const { from, to } of redirects.slice(3)) assert.ok(rewrites.includes(`rewrite ^${from}$ ${to} permanent;`));
});

test('/search is a noindex static Library-only compatibility route in both build modes', () => {
  const publication = createLibrarySearchPublication(site);
  for (const mode of ['staging', 'indexing']) {
    const { html, sitemap } = artifacts.get(mode);
    assert.equal(html.size, routeManifest.filter((item) => item.eligible).length + 1);
    const $ = load(html.get('/search'));
    assert.equal($('link[rel="canonical"]').attr('href'), `${site}/search`);
    assert.equal($('meta[name="robots"]').attr('content'), robotsFor(publication, mode === 'indexing'));
    assert.equal($('link[hreflang]').length, 0);
    assert.equal($('[data-library-search][data-mode="legacy"]').length, 1);
    assert.equal($('main h1').length, 1);
    assert.match($('main').text(), /Library articles/);
    assert.ok(!sitemap.includes(`${site}/search`));
    assert.equal(sitemap, renderSitemap(routeManifest, mode === 'indexing'));
  }
});

test('numbered pages are self-canonical, production-indexable, sitemap-listed and never gain hreflang', () => {
  for (const mode of ['staging', 'indexing']) {
    const { html, sitemap } = artifacts.get(mode);
    for (const publication of paginationPublications) {
      const $ = load(html.get(publication.route));
      assert.equal($('link[rel="canonical"]').attr('href'), publication.url, publication.route);
      assert.equal($('meta[name="robots"]').attr('content'), robotsFor(publication, mode === 'indexing'), publication.route);
      assert.equal($('link[hreflang]').length, 0, publication.route);
      assert.equal(sitemap.includes(`<loc>${publication.url}</loc>`), mode === 'indexing', publication.route);
      assert.match($('title').text(), /(?:Page|Página) \d+$/u, publication.route);
    }
  }
  for (const locale of ['en', 'es', 'ar']) {
    const root = libraryPageRoute(locale, 1);
    assert.equal(load(artifacts.get('indexing').html.get(root))('link[hreflang]').length > 0, true, root);
  }
});

test('client source uses textContent and contains no analytics, cookies, external search, or innerHTML sink', async () => {
  const source = await readFile(path.join(project, 'src/components/LibrarySearch.astro'), 'utf8');
  assert.match(source, /textContent/);
  assert.doesNotMatch(source, /innerHTML|document\.cookie|localStorage|sessionStorage|analytics|HubSpot/i);
  assert.match(source, /URLSearchParams/);
  assert.match(source, /popstate|hashchange/);
});
