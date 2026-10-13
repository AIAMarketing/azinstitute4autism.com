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
import { createAuthorResolver } from '../src/utils/authors.ts';
import { authorPageRoute, createAuthorArchivePublications } from '../src/utils/author-archives.ts';
import { redirectArtifacts, redirects as approvedRedirects, validateRedirects } from './generate-redirects.mjs';
import { resolveNavigationDestination, visitorLanguageChoices } from '../src/utils/visitor-navigation.ts';

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
    return { id: file.replace(/^src\/content\/authors\//, '').replace(/\.mdx?$/, ''), data: parsed.data, body: parsed.content };
  }));
}

const entries = await contentEntries();
const manifest = createPublicationManifest(entries, site);
const authors = await authorEntries();
const catalog = createLibraryCatalog(manifest, authors);
const paginationPublications = createLibraryPaginationPublications(catalog, manifest, site);
const authorPublications = createAuthorArchivePublications(catalog, authors, [...manifest, ...paginationPublications], site);
const routeManifest = [...manifest, ...paginationPublications, ...authorPublications].sort((left, right) => left.route.localeCompare(right.route, 'en'));

function record(overrides = {}) {
  return {
    url: '/library/example', locale: 'en', title: 'Autism Support Guide', description: 'Practical family resources',
    headings: ['Planning Daily Routines'], category: 'Library', tags: [], author: { name: 'Rula Diab', slug: 'rula-diab' },
    publishedAt: '2026-01-01', ...overrides
  };
}

const phase6CArticles = [
  ['autism-after-school-meltdowns', '2026-09-01', '2026-09-02'],
  ['autism-back-to-school-transition', '2026-09-10', '2026-09-10'],
  ['autism-daily-living-skills-challenges', '2026-07-01', '2026-07-09'],
  ['autism-social-skills-by-age', '2026-09-24', '2026-09-24'],
  ['does-aba-therapy-replace-school', '2026-07-08', '2026-07-22'],
  ['halloween-and-autism', '2026-10-01', '2026-10-03'],
  ['how-many-hours-aba-child-need', '2026-09-08', '2026-09-08'],
  ['picky-eating-autism-parent-guide', '2026-08-01', '2026-10-03'],
  ['sleep-issues-autistic-children', '2026-09-28', '2026-09-28']
];

test('actual catalog groups every eligible post by locale and preserves syndicated noindex records', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(catalog.byLocale).map(([locale, items]) => [locale, items.length])), { en: 55, es: 12, ar: 7 });
  assert.equal(catalog.all.length, 74);
  for (const slug of ['community-highlight-meet-rula-diab', 'new-aia-scottsdale-office']) {
    assert.ok(catalog.byLocale.en.some(({ search }) => search.url === `/library/${slug}`));
  }
  assert.equal(new Set(catalog.all.map(({ route }) => route)).size, 74);
  assert.ok(catalog.all.every(({ search }) => search.author.name === 'Rula Diab'));
});

test('all nine Phase 6C records are source-backed, public English articles with complete collection metadata', async () => {
  for (const [slug, date, updatedDate] of phase6CArticles) {
    const entry = entries.find((item) => item.collection === 'blog' && item.id === `en/${slug}`);
    assert.ok(entry, slug);
    assert.equal(entry.data.slug, slug);
    assert.equal(entry.data.lang, 'en');
    assert.equal(entry.data.author, 'rula-diab');
    assert.equal(entry.data.category, 'Library');
    assert.equal(entry.data.draft, false);
    assert.equal(entry.data.date, date);
    assert.equal(entry.data.updatedDate, updatedDate);
    assert.equal(entry.data.canonical, `${site}/library/${slug}`);
    assert.equal(entry.data.translationKey, undefined);
    assert.ok(entry.data.title && entry.data.description && entry.data.featuredImage && entry.data.alt);
    assert.match(entry.body, /<FAQAccordion/);
    assert.ok(catalog.byLocale.en.find((item) => item.route === `/library/${slug}`).search.headings.length > 0);
    await readFile(path.join(project, 'public', entry.data.featuredImage));
  }
});

test('Phase 6C.2 material reconciliations retain the complete source-backed structure', async () => {
  const expected = [
    {
      id: 'en/aba-school-readiness-arizona',
      title: 'ABA School Readiness in Arizona: A Parent Guide',
      displayH1: 'ABA School Readiness for Autistic Children in Arizona',
      updatedDate: '2026-09-17', faqCount: 9, tableCount: 1,
      images: ['school-readiness-supports-infographic.webp', 'one-to-one-to-group-progression.webp'],
      headings: ['What Does School Readiness Mean in Arizona?', 'How ABA Therapy May Support School Readiness', 'How AIA Can Help With School Readiness']
    },
    {
      id: 'es/aba-school-readiness-arizona',
      title: 'Preparación escolar y autismo en Arizona: guía para familias',
      displayH1: 'Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA',
      updatedDate: '2026-09-25', faqCount: 9, tableCount: 1,
      images: ['school-readiness-supports-infographic_es.webp', 'one-to-one-to-group-progression_es.webp'],
      headings: ['¿Qué significa estar preparado para la escuela en Arizona?', 'Cómo puede ayudar la terapia ABA con la preparación escolar', 'Cómo puede ayudar AIA con la preparación escolar']
    },
    {
      id: 'en/aba-school-readiness-guide',
      title: 'Antecedent Interventions & Consequence Strategies in ABA',
      displayH1: 'Antecedent and Consequence Interventions in ABA: Strategies and Examples',
      updatedDate: '2026-08-13', faqCount: 6, tableCount: 3,
      images: ['antecedent-behavior-consequence.webp', 'reduce-environmental-distractions.webp', 'reinforcement-replacement-behavior.webp'],
      headings: ['What are antecedents and consequences in ABA?', 'How antecedent and consequence strategies fit with proactive and reactive ABA', 'Individualized ABA support at AIA']
    },
    {
      id: 'ar/aba-school-readiness-guide',
      title: 'التدخلات التمهيدية واستراتيجيات العواقب في تحليل السلوك التطبيقي',
      displayH1: 'التدخلات التمهيدية وتدخلات العواقب في تحليل السلوك التطبيقي: استراتيجيات وأمثلة',
      updatedDate: undefined, faqCount: 6, tableCount: 3,
      images: ['antecedent-behavior-consequence_ar.svg', 'reduce-environmental-distractions_ar.svg', 'reinforcement-replacement-behavior_ar.svg'],
      headings: ['ما المقدمات والعواقب في تحليل السلوك التطبيقي؟', 'ما استراتيجيات العواقب في تحليل السلوك التطبيقي؟', 'كيف ترتبط استراتيجيات المقدمات والعواقب بتحليل السلوك التطبيقي الاستباقي والتفاعلي؟']
    },
    {
      id: 'en/autism-fall-break-routine-tips-halloween-thanksgiving',
      title: 'Autism and Fall Break: Routines and Transition Tips',
      displayH1: 'Autism and Fall Break: How to Keep Routines Calm and Predictable',
      updatedDate: '2026-10-03', faqCount: 6, tableCount: 2,
      images: ['trick-or-treat-porch-800x.jpg', 'quiet-nature-walk-800x.jpg'],
      headings: ['Why breaks feel hard for autistic learners', 'Halloween strategies that reduce overload', 'Conclusion & Next Steps']
    }
  ];

  for (const item of expected) {
    const entry = entries.find(({ collection, id }) => collection === 'blog' && id === item.id);
    assert.ok(entry, item.id);
    assert.equal(entry.data.title, item.title);
    assert.equal(entry.data.displayH1, item.displayH1);
    assert.equal(entry.data.updatedDate, item.updatedDate);
    assert.equal((entry.body.match(/["']question["']\s*:/gu) ?? []).length, item.faqCount, item.id);
    assert.equal((entry.body.match(/<table>/gu) ?? []).length, item.tableCount, item.id);
    for (const heading of item.headings) assert.ok(entry.body.includes(`>${heading}</h`), `${item.id}: ${heading}`);
    for (const image of item.images) {
      assert.ok(entry.body.includes(`/assets/images/${image}`), `${item.id}: ${image}`);
      await readFile(path.join(project, 'public/assets/images', image));
    }
  }

  assert.equal(entries.filter(({ collection, id }) => collection === 'blog' && id === 'en/aba-school-readiness-guide').length, 1);
  assert.equal(entries.filter(({ collection, id }) => collection === 'blog' && id === 'ar/aba-school-readiness-guide').length, 1);
  assert.match(entries.find(({ id }) => id === 'en/autism-fall-break-routine-tips-halloween-thanksgiving').body,
    /\[Halloween and autism\]\(\/library\/halloween-and-autism\)/u);
});

test('Phase 6C.3 reconciles audited article metadata and Arabic visual translations', async () => {
  const blog = entries.filter(({ collection }) => collection === 'blog');
  assert.equal(blog.length, 74);
  assert.ok(blog.every(({ data }) => typeof data.alt === 'string' && data.alt.trim()),
    'Every currently audited featured image is informative and has a deliberate localized description');

  const missingModified = blog.filter(({ data }) => data.updatedDate === undefined).map(({ id }) => id);
  assert.deepEqual(missingModified, ['ar/aba-school-readiness-guide'],
    'The newly translated Arabic article must not inherit the superseded public article timestamp');

  const headings = new Map([
    ['ar/first-then-cards-autism-transitions', 'بطاقات "أولًا/ثم": تسهيل الانتقال بين الأنشطة للأطفال المصابين بالتوحّد'],
    ['es/executive-functioning-skills-autism', 'Habilidades de funcionamiento ejecutivo y autismo'],
    ['es/parents-guide-to-autism-and-aba', 'Guía de Autismo para Padres y Cuidadores'],
    ['en/communication-social-skills-autistic-children-guide', 'Building Communication & Social Skills in Autistic Children: A Practical Guide for Families'],
    ['en/executive-functioning-skills-autism', 'Executive Functioning Skills and Autism'],
    ['en/individualized-aba-therapy', 'Individualized Care Plans in ABA Therapy'],
    ['en/parents-guide-to-autism-and-aba', 'Autism Guide for Parents and Caregivers']
  ]);
  for (const [id, displayH1] of headings) assert.equal(blog.find((entry) => entry.id === id).data.displayH1, displayH1, id);

  const descriptions = new Map([
    ['en/aba-therapy-benefits', "Discover how ABA therapy, tailored to each child's unique needs, can enhance social skills, communication, and independence in children with autism."],
    ['en/community-highlight-meet-rula-diab', "Read about Rula Diab's mission to make ABA therapy accessible to children with Autism Spectrum Disorder through her Arizona Institute for Autism."],
    ['en/new-aia-scottsdale-office', "Discover how Arizona Institute for Autism's new Scottsdale office expands autism services, empowering lives with integrity and excellence. Learn more!"],
    ['en/november-2022-aia-update', "Nov 2022: Arizona Institute for Autism expresses gratitude to families for their support and commitment, highlighting the community's strength and unity."]
  ]);
  for (const [id, description] of descriptions) assert.equal(blog.find((entry) => entry.id === id).data.description, description, id);

  const arabic = blog.find(({ id }) => id === 'ar/aba-school-readiness-guide');
  assert.equal((arabic.body.match(/class="article-diagram-scroll"/gu) ?? []).length, 3);
  assert.equal((arabic.body.match(/role="region"/gu) ?? []).length, 3);
  assert.equal((arabic.body.match(/tabindex="0"/gu) ?? []).length, 3);
  for (const name of ['antecedent-behavior-consequence_ar.svg', 'reduce-environmental-distractions_ar.svg', 'reinforcement-replacement-behavior_ar.svg']) {
    assert.ok(arabic.body.includes(`/assets/images/${name}`), name);
    const svg = await readFile(path.join(project, 'public/assets/images', name), 'utf8');
    assert.match(svg, /^<svg/u);
    assert.match(svg, /data:image\/webp;base64,/u, `${name} embeds its exact source-backed raster`);
    assert.match(svg, /[\u0600-\u06ff]/u, `${name} contains Arabic visual labels`);
  }
  assert.doesNotMatch(arabic.body, /\/assets\/images\/(?:antecedent-behavior-consequence|reduce-environmental-distractions|reinforcement-replacement-behavior)\.webp/u);
});

test('catalog ordering is date descending with route ascending as the stable tie-breaker', () => {
  for (let index = 1; index < catalog.all.length; index++) {
    const previous = catalog.all[index - 1].search;
    const current = catalog.all[index].search;
    const dateOrder = Date.parse(previous.publishedAt) - Date.parse(current.publishedAt);
    assert.ok(dateOrder > 0 || (dateOrder === 0 && previous.url.localeCompare(current.url, 'en') < 0));
  }
});

test('author resolution is exact by locale and slug, keeps identity separate, and rejects invalid or ambiguous data', () => {
  const resolve = createAuthorResolver(authors);
  for (const locale of ['en', 'es', 'ar']) {
    const author = resolve(locale, 'rula-diab');
    assert.equal(author.name, 'Rula Diab');
    assert.equal(author.displayName, authors.find(({ data }) => data.lang === locale).data.displayName);
    assert.equal(author.archiveRoute, `${locale === 'en' ? '' : '/' + locale}/library/author/rula-diab`);
    assert.equal(author.avatar, '/assets/images/rula-diab-avatar.jpg');
  }
  assert.throws(() => resolve('fr', 'rula-diab'), /Missing or ambiguous/);
  assert.throws(() => resolve('en', 'Rula-Diab'), /Missing or ambiguous/);
  assert.throws(() => createAuthorResolver([...authors, authors[0]]), /Missing or ambiguous/);
  const source = authors[0];
  for (const override of [{ name: ' ' }, { name: 4 }, { displayName: '' }, { displayName: ' \t' },
    { slug: '../other' }, { slug: 'name/page/2' }, { slug: '%72ula' }, { lang: 'fr' },
    { avatar: 'https://example.org/image.jpg' }, { description: 1 }]) {
    assert.throws(() => createAuthorResolver([{ ...source, data: { ...source.data, ...override } }]), /Invalid author/);
  }
  const plain = { id: 'en/another', data: { lang: 'en', slug: 'another', name: 'Another Author' } };
  assert.equal(createAuthorResolver([plain])('en', 'another').displayName, 'Another Author');
});

test('visitor language navigation resolves explicit content and author relationships without changing SEO translations', () => {
  const englishAuthor = routeManifest.find(({ route }) => route === '/library/author/rula-diab');
  const englishAuthorPage = routeManifest.find(({ route }) => route === '/library/author/rula-diab/page/5');
  assert.deepEqual(englishAuthor.translations, []);
  assert.deepEqual(visitorLanguageChoices(englishAuthor, routeManifest), [
    { lang: 'en', route: '/library/author/rula-diab', current: true, kind: 'equivalent' },
    { lang: 'es', route: '/es/library/author/rula-diab', current: false, kind: 'equivalent' },
    { lang: 'ar', route: '/ar/library/author/rula-diab', current: false, kind: 'equivalent' }
  ]);
  assert.deepEqual(visitorLanguageChoices(englishAuthorPage, routeManifest), [
    { lang: 'en', route: '/library/author/rula-diab', current: true, kind: 'section-root' },
    { lang: 'es', route: '/es/library/author/rula-diab', current: false, kind: 'section-root' },
    { lang: 'ar', route: '/ar/library/author/rula-diab', current: false, kind: 'section-root' }
  ]);
  const libraryPage = routeManifest.find(({ route }) => route === '/library/page/2');
  assert.deepEqual(visitorLanguageChoices(libraryPage, routeManifest).map(({ route, kind }) => ({ route, kind })), [
    { route: '/library', kind: 'section-root' },
    { route: '/es/library', kind: 'section-root' },
    { route: '/ar/library', kind: 'section-root' }
  ]);
  const untranslated = routeManifest.find(({ route }) => route === '/library/new-aia-scottsdale-office');
  assert.deepEqual(visitorLanguageChoices(untranslated, routeManifest), []);
});

test('menu destinations prefer eligible locale publications and expose deliberate fallbacks', () => {
  assert.deepEqual(resolveNavigationDestination('/library', 'ar', routeManifest), {
    href: '/ar/library', lang: 'ar', fallback: false, source: 'translation'
  });
  assert.deepEqual(resolveNavigationDestination('/ar/library', 'ar', routeManifest), {
    href: '/ar/library', lang: 'ar', fallback: false, source: 'exact'
  });
  assert.deepEqual(resolveNavigationDestination('/ar', 'ar', routeManifest), {
    href: '/', lang: 'en', fallback: true, source: 'explicit-fallback'
  });
  assert.deepEqual(resolveNavigationDestination('/team', 'ar', routeManifest), {
    href: '/team', lang: 'en', fallback: true, source: 'explicit-fallback'
  });
  assert.equal(resolveNavigationDestination('/missing', 'es', routeManifest), null);
  assert.deepEqual(resolveNavigationDestination('/library', 'es', [{
    ...routeManifest.find(({ route }) => route === '/library'), translations: []
  }]), { href: '/library', lang: 'en', fallback: true, source: 'explicit-fallback' },
  'Missing explicit equivalence falls back to the known published source instead of guessing /es/library');
});

test('author archives automatically follow multiple authors, exact locale references, draft removal and growth', () => {
  const author = (locale, slug) => ({ id: `${locale}/${slug}`, data: { lang: locale, slug, name: `${locale} ${slug}` } });
  const sources = [author('en', 'one'), author('es', 'one'), author('en', 'two'), author('en', 'empty'), author('en', 'draft-only')];
  const post = (slug, authorSlug, lang = 'en', draft = false) => ({
    id: `${lang}/${slug}`, collection: 'blog',
    data: { lang, slug, title: slug, date: '2026-01-01', author: authorSlug, draft }
  });
  const posts = [...Array.from({ length: 11 }, (_, i) => post(`post-${String(i).padStart(2, '0')}`, 'one')),
    post('spanish', 'one', 'es'), post('another', 'two'), post('unpublished', 'draft-only', 'en', true)];
  const generate = (records) => {
    const m = createPublicationManifest(records, site);
    return createAuthorArchivePublications(createLibraryCatalog(m, sources), sources, m, site);
  };
  const generated = generate(posts);
  assert.deepEqual(generated.map(({ route }) => route), [
    '/es/library/author/one', '/library/author/one', '/library/author/one/page/2', '/library/author/two'
  ]);
  assert.equal(generated.find(({ route }) => route === '/library/author/one').authorPage.totalItems, 11);
  assert.ok(!generate(posts.slice(1)).some(({ route }) => route.endsWith('/page/2')));
  assert.ok(!generate(posts.map((p, i) => i === 0 ? { ...p, data: { ...p.data, draft: true } } : p))
    .some(({ route }) => route.endsWith('/page/2')));
  assert.equal(generate([]).length, 0);
  assert.ok(generate([...posts, post('new-author-post', 'empty')]).some(({ route }) => route === '/library/author/empty'));
});

test('author descriptors reject reserved routes including drafts, duplicate canonical targets, and invalid page paths', () => {
  const root = manifest.find(({ route }) => route === '/library');
  for (const route of ['/library/author', '/library/author/rula-diab', '/library/author/rula-diab/page/02', '/es/library/author/unknown']) {
    assert.throws(() => createAuthorArchivePublications(catalog, authors, [...manifest, { ...root, route, eligible: false }], site), /Reserved author archive route collision/);
  }
  assert.throws(() => createAuthorArchivePublications(catalog, authors, [
    ...manifest, { ...root, route: '/other', canonical: `${site}/library/author/rula-diab` }
  ], site), /Duplicate canonical/);
  for (const page of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '02', '2']) {
    assert.throws(() => authorPageRoute('/library/author/rula-diab', page), /Invalid author page/);
  }
  assert.throws(() => authorPageRoute('/library/author/../bad', 1), /Invalid author archive root/);
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

test('current catalogs generate six English and two Spanish Library pages with expected slices', () => {
  assert.deepEqual(paginationPublications.map(({ route }) => route), [
    '/es/library/page/2', '/library/page/2', '/library/page/3', '/library/page/4', '/library/page/5', '/library/page/6'
  ]);
  assert.deepEqual(Object.fromEntries(['en', 'es', 'ar'].map((locale) => {
    const root = paginateLibraryItems(catalog.byLocale[locale], 1);
    return [locale, { total: root.totalItems, pages: root.totalPages }];
  })), {
    en: { total: 55, pages: 6 }, es: { total: 12, pages: 2 }, ar: { total: 7, pages: 1 }
  });
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((page) => paginateLibraryItems(catalog.byLocale.en, page).items.length), [10, 10, 10, 10, 10, 5]);
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
  const withSixMore = [...english, ...english.slice(0, 6)];
  const grown = { ...catalog, byLocale: { ...catalog.byLocale, en: withSixMore } };
  assert.ok(createLibraryPaginationPublications(grown, manifest, site).some(({ route }) => route === '/library/page/7'));
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

test('heading extraction includes visible Markdown and literal HTML headings while ignoring code and MDX implementation', () => {
  assert.deepEqual(extractMarkdownHeadings(`## Visible **heading**\n\n\`\`\`md\n## Hidden code\n\`\`\`\n## [Linked heading](/path)\n<h2 id="source-anchor">Source heading</h2>\n## <Widget script="ignored" />\n## ![Image heading](/image.jpg)`), [
    'Visible heading', 'Linked heading', 'Source heading', 'Image heading'
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
  assert.deepEqual(Object.fromEntries(Object.entries(first).map(([locale, records]) => [locale, records.length])), { en: 55, es: 12, ar: 7 });
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
    ['/library/page/4', 'en', 10], ['/library/page/5', 'en', 10], ['/library/page/6', 'en', 5],
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
    en: ['/library', '/library/page/2', '/library/page/3', '/library/page/4', '/library/page/5', '/library/page/6'],
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
    '/library/page/1', '/library/page/7', '/library/page/0', '/library/page/02', '/library/page/not-a-number',
    '/es/library/page/1', '/es/library/page/3', '/ar/library/page/1', '/ar/library/page/2'
  ]) assert.ok(!html.has(route), route);
});

test('pagination navigation uses roots for page 1, valid boundaries, aria-current and localized labels', () => {
  const html = artifacts.get('staging').html;
  for (const [route, current, previous, next] of [
    ['/library', '1', null, '/library/page/2'],
    ['/library/page/3', '3', '/library/page/2', '/library/page/4'],
    ['/library/page/5', '5', '/library/page/4', '/library/page/6'],
    ['/library/page/6', '6', '/library/page/5', null],
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
    ['/library/page/3', 'en', 55], ['/es/library/page/2', 'es', 12], ['/ar/library', 'ar', 7]
  ]) {
    const $ = load(artifacts.get('staging').html.get(route));
    const search = $('[data-library-search]');
    assert.equal(search.attr('data-archive-id'), `library-archive-${locale}`, route);
    assert.equal($(`#library-archive-${locale} .blog-list`).length, 1, route);
    assert.equal($(`#library-archive-${locale} .library-pagination`).length, locale === 'ar' ? 0 : 1, route);
    assert.equal(artifacts.get('staging').indexes[locale].length, expectedIndexCount, route);
  }
});

test('redirect registry preserves service aliases and defines all six page-one aliases', async () => {
  const redirects = JSON.parse(await readFile(path.join(project, 'src/data/redirects.json'), 'utf8'));
  const expected = [
    { from: '/aba', to: '/aba-therapy', status: 301 },
    { from: '/autismevaluations', to: '/autism-evaluations', status: 301 },
    { from: '/learnersocialclub', to: '/learner-social-club', status: 301 },
    { from: '/library/page/1', to: '/library', status: 301 },
    { from: '/es/library/page/1', to: '/es/library', status: 301 },
    { from: '/ar/library/page/1', to: '/ar/library', status: 301 },
    { from: '/library/author/rula-diab/page/1', to: '/library/author/rula-diab', status: 301 },
    { from: '/es/library/author/rula-diab/page/1', to: '/es/library/author/rula-diab', status: 301 },
    { from: '/ar/library/author/rula-diab/page/1', to: '/ar/library/author/rula-diab', status: 301 }
  ];
  assert.deepEqual(redirects.map(({ from, to, status }) => ({ from, to, status })), expected);
  assert.deepEqual(redirects, approvedRedirects);
  const generatedRoutes = routeManifest.filter(({ eligible }) => eligible).map(({ route }) => route).concat('/search');
  assert.doesNotThrow(() => validateRedirects(redirects, generatedRoutes));
  const rendered = redirectArtifacts(redirects);
  assert.equal(await readFile(path.join(project, 'src/data/redirects.json'), 'utf8'), rendered.json);
  assert.equal(await readFile(path.join(project, 'reports/redirect-map.csv'), 'utf8'), rendered.csv);
  assert.equal(await readFile(path.join(project, 'reports/nginx-rewrites.conf'), 'utf8'), rendered.nginx);
  assert.ok(!redirects.some(({ from }) => /\/page\/[2-9]\d*$/.test(from)));
});

test('redirect validation rejects duplicate, unsafe, chained, cyclic and non-generated routes', () => {
  const redirect = (from, to, overrides = {}) => ({ from, to, status: 301, reason: 'Fixture', ...overrides });
  assert.throws(() => validateRedirects([redirect('/old', '/target'), redirect('/old', '/other')]), /Duplicate redirect source/);
  assert.throws(() => validateRedirects([redirect('/same', '/same')]), /Self-redirect/);
  assert.throws(() => validateRedirects([redirect('/one', '/two'), redirect('/two', '/three')]), /chain or cycle/);
  assert.throws(() => validateRedirects([redirect('/one', '/two'), redirect('/two', '/one')]), /chain or cycle/);
  assert.throws(() => validateRedirects([redirect('/old/', '/target')]), /not normalized/);
  assert.throws(() => validateRedirects([redirect('/es/old', '/target')]), /changes locale/);
  assert.throws(() => validateRedirects([redirect('/old', '/target', { status: 302 })]), /HTTP 301/);
  assert.throws(() => validateRedirects([redirect('/old', '/missing')], ['/target']), /target is not a generated route/);
  assert.throws(() => validateRedirects([redirect('/old', '/target')], ['/old', '/target']), /source collides/);
});

test('redirect-only aliases generate no HTML, canonical, sitemap or hreflang entry', () => {
  for (const mode of ['staging', 'indexing']) {
    const { html, sitemap } = artifacts.get(mode);
    for (const { from, to } of approvedRedirects) {
      assert.ok(!html.has(from), from);
      assert.ok(html.has(to), to);
      assert.ok(!sitemap.includes(`<loc>${site}${from}</loc>`), from);
    }
  }
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

test('nine author archives contain all and only matching eligible posts in stable ten-item slices', () => {
  const expected = {
    en: [10, 10, 10, 10, 10, 5], es: [10, 2], ar: [7]
  };
  assert.equal(authorPublications.length, 9);
  assert.deepEqual(authorPublications.map(({ route }) => route), [
    '/ar/library/author/rula-diab',
    '/es/library/author/rula-diab',
    '/es/library/author/rula-diab/page/2',
    '/library/author/rula-diab',
    '/library/author/rula-diab/page/2',
    '/library/author/rula-diab/page/3',
    '/library/author/rula-diab/page/4',
    '/library/author/rula-diab/page/5',
    '/library/author/rula-diab/page/6'
  ]);
  const html = artifacts.get('staging').html;
  assert.equal(html.size, 121);
  for (const [locale, sizes] of Object.entries(expected)) {
    const author = createAuthorResolver(authors)(locale, 'rula-diab');
    const links = [];
    for (const [index, count] of sizes.entries()) {
      const route = authorPageRoute(author.archiveRoute, index + 1);
      const $ = load(html.get(route));
      const cards = $('.blog-list .blog-card');
      assert.equal(cards.length, count, route);
      links.push(...cards.find('h3 a').map((_, a) => $(a).attr('href')).get());
      assert.equal($('main h1').length, 1, route);
      assert.equal($('#author-heading').prop('tagName'), 'H2');
      assert.equal($('#author-heading').text(), author.displayName);
      assert.equal($('.author-biography').text().trim(), author.entry.body.trim(), route);
      assert.equal($('.author-profile__avatar').attr('src'), author.avatar);
      assert.equal($('.author-profile__avatar').attr('alt'), author.displayName);
      assert.equal($('html').attr('lang'), locale);
      assert.equal($('html').attr('dir'), locale === 'ar' ? 'rtl' : 'ltr');
      assert.equal($('[data-library-search]').length, 0, 'No new archive search enhancement');
      assert.equal($('.library-pagination').length, sizes.length > 1 ? 1 : 0);
      if (sizes.length > 1) {
        assert.equal($('.library-pagination [aria-current="page"]').text(), String(index + 1));
        assert.equal($('.library-pagination [rel=prev]').attr('href'), index ? authorPageRoute(author.archiveRoute, index) : undefined);
        assert.equal($('.library-pagination [rel=next]').attr('href'), index + 1 < sizes.length ? authorPageRoute(author.archiveRoute, index + 2) : undefined);
        assert.ok($('.library-pagination [aria-current="page"]').attr('aria-label'));
      }
      assert.equal($('a[href$="/page/1"]').length, 0);
      for (const image of $('main img').toArray()) assert.ok(image.attribs.src.startsWith('/assets/'));
    }
    assert.deepEqual(links, catalog.byLocale[locale].map(({ route }) => route));
    assert.equal(new Set(links).size, links.length);
    for (const suffix of ['/page/1', '/page/0', '/page/-1', '/page/2.5', '/page/02', '/page/abc', '/page/999999', `/page/${sizes.length + 1}`]) {
      assert.ok(!html.has(author.archiveRoute + suffix), suffix);
    }
    assert.ok(!html.has(author.archiveRoute.replace('rula-diab', 'unknown')));
  }
});

test('every card and post byline uses its resolved locale author without nested links or altered Person identity', () => {
  const html = artifacts.get('staging').html;
  const resolve = createAuthorResolver(authors);
  for (const [route, source] of html) {
    const $ = load(source);
    for (const card of $('.blog-card').toArray()) {
      const articleRoute = $(card).find('h3 a').attr('href');
      const item = catalog.all.find(({ route }) => route === articleRoute);
      assert.ok(item, articleRoute);
      const author = resolve(item.entry.data.lang, item.entry.data.author);
      assert.equal($(card).find('a[rel=author]').attr('href'), author.archiveRoute, route);
      assert.equal($(card).find('a[rel=author]').text(), author.displayName, route);
      assert.equal($(card).find('.blog-card-meta img').attr('src'), author.avatar);
      assert.equal($(card).find('.blog-card-meta img').attr('alt'), '');
      assert.ok(html.has(author.archiveRoute));
      assert.equal($(card).find('a a').length, 0);
      assert.equal($(card).find('a.text-link').attr('href'), articleRoute);
    }
  }
  for (const item of catalog.all) {
    const $ = load(html.get(item.route));
    const author = resolve(item.entry.data.lang, item.entry.data.author);
    assert.equal($('.article-byline a[rel=author]').attr('href'), author.archiveRoute, item.route);
    assert.equal($('.article-byline a').text(), author.displayName);
    assert.equal($('.article-byline img').attr('src'), author.avatar);
    const schema = $('script[type="application/ld+json"]').toArray().map(s => JSON.parse($(s).text())).find(x => x['@type'] === 'BlogPosting');
    if (manifest.find(x => x.route === item.route).sitemapEligible) assert.deepEqual(schema.author, { '@type': 'Person', name: author.name });
    else assert.equal(schema, undefined, item.route);
  }
});

test('author publication descriptors and HTML obey noindex, self-canonical, sitemap and translation exclusions in both modes', () => {
  for (const mode of ['staging', 'indexing']) {
    const { html, sitemap } = artifacts.get(mode);
    assert.equal((sitemap.match(/<url>/g) ?? []).length, mode === 'indexing' ? 107 : 0);
    let hreflang = 0, pages = 0;
    for (const source of html.values()) {
      const $ = load(source), count = $('link[hreflang]').length;
      hreflang += count; if (count) pages++;
      if (mode === 'staging') assert.equal($('meta[name=robots]').attr('content'), 'noindex,nofollow');
    }
    assert.equal(hreflang, mode === 'indexing' ? 174 : 0);
    assert.equal(pages, mode === 'indexing' ? 53 : 0);
    for (const publication of authorPublications) {
      assert.equal(publication.eligible, true);
      assert.equal(publication.noindex, true);
      assert.equal(publication.externalCanonical, false);
      assert.equal(publication.sitemapEligible, false);
      const $ = load(html.get(publication.route));
      assert.equal($('link[rel=canonical]').attr('href'), site + publication.route);
      assert.equal($('meta[name=robots]').attr('content'), mode === 'indexing' ? 'noindex,follow' : 'noindex,nofollow');
      assert.equal($('link[hreflang]').length, 0);
      assert.equal($('.lang-switcher__menu').length, 1);
      assert.deepEqual($('.lang-switcher__menu a').map((_, link) => $(link).attr('href')).get(), [
        '/library/author/rula-diab', '/es/library/author/rula-diab', '/ar/library/author/rula-diab'
      ]);
      assert.equal($('head link[hreflang]').length, 0, 'Visitor navigation must not enable author hreflang');
      assert.ok(!sitemap.includes(publication.url));
      if (publication.authorPage.currentPage > 1) assert.match($('title').text(), /(?:Page|Página) \d+$/u);
    }
  }
});

test('generated multilingual navigation, disclosure semantics and RTL contact isolation remain usable without JavaScript', async () => {
  const html = artifacts.get('staging').html;
  for (const [route, locale, library] of [
    ['/library/author/rula-diab', 'en', '/library'],
    ['/es/library/author/rula-diab', 'es', '/es/library'],
    ['/ar/library/author/rula-diab', 'ar', '/ar/library']
  ]) {
    const $ = load(html.get(route));
    assert.equal($('html').attr('lang'), locale);
    assert.equal($('html').attr('dir'), locale === 'ar' ? 'rtl' : 'ltr');
    assert.equal($('.lang-switcher details > summary').length, 1);
    assert.equal($('.lang-switcher [role=listbox]').length, 0);
    assert.deepEqual($('.lang-switcher__menu a').map((_, link) => $(link).attr('href')).get(), [
      '/library/author/rula-diab', '/es/library/author/rula-diab', '/ar/library/author/rula-diab'
    ]);
    assert.ok($('.header-inner > .main-nav > ul > li > a').toArray().some((link) => $(link).attr('href') === library));
    assert.equal($('.mobile-nav details, details.mobile-nav').length, 1);
    assert.ok($('.mobile-nav a').toArray().some((link) => $(link).attr('href') === library));
    for (const destination of $('.lang-switcher a, .main-nav a, .site-footer a').toArray()
      .map((link) => $(link).attr('href')).filter((href) => href?.startsWith('/'))) {
      assert.ok(html.has(destination), `${route} links to unpublished ${destination}`);
    }
  }
  const arabic = load(html.get('/ar/library/author/rula-diab'));
  assert.equal(arabic('.main-nav a[href="/ar"]').length, 0);
  assert.equal(arabic('.main-nav a[href="/"][hreflang="en"]').length > 0, true);
  assert.equal(arabic('.main-nav a[href="/"][lang="en"]').length, 0,
    'Only the fallback annotation, rather than the localized link label, is marked as English');
  assert.equal(arabic('.footer-contact-value[dir="ltr"]').length, 3);
  for (const route of ['/library', '/es/library', '/ar/library/author/rula-diab']) {
    const footer = load(html.get(route));
    const address = footer('address.footer-contact-value[dir="ltr"] > bdi[dir="ltr"]');
    assert.equal(address.length, 1);
    assert.equal(address.find('br').length, 1);
    assert.equal(address.clone().find('br').replaceWith('\n').end().text().replace(/\s*\n\s*/u, '\n').trim(),
      '8901 E Raintree Dr Ste 160,\nScottsdale, AZ 85260');
  }
  assert.equal(arabic('.footer-contact-value').toArray().every((node) => arabic(node).css('unicode-bidi') === undefined), true,
    'Direction isolation is supplied by component CSS, not unsafe inline styles');
  assert.match(await readFile(path.join(project, 'src/components/Footer.astro'), 'utf8'), /unicode-bidi:\s*isolate/);
});

test('search indexes remain demand-loaded and navigation changes introduce no tracking or external query transmission', async () => {
  const source = await readFile(path.join(project, 'src/components/LibrarySearch.astro'), 'utf8');
  assert.match(source, /if \(!query\.trim\(\)\)[\s\S]*return;/);
  assert.match(source, /locales\.map\(\(item\) => loadIndex\(base, item\)\)/);
  assert.doesNotMatch(source, /fetch\((?!`\$\{base\}\/\$\{locale\}\.json`)/);
  for (const route of ['/library', '/es/library', '/ar/library']) {
    const $ = load(artifacts.get('staging').html.get(route));
    assert.equal($('link[rel=preload][href*="/assets/search/library/"]').length, 0);
    assert.equal($('script[src*="/assets/search/library/"]').length, 0);
  }
});

test('client source uses textContent and contains no analytics, cookies, external search, or innerHTML sink', async () => {
  const source = await readFile(path.join(project, 'src/components/LibrarySearch.astro'), 'utf8');
  assert.match(source, /textContent/);
  assert.doesNotMatch(source, /innerHTML|document\.cookie|localStorage|sessionStorage|analytics|HubSpot/i);
  assert.match(source, /URLSearchParams/);
  assert.match(source, /popstate|hashchange/);
});

test('article footer relationships resolve through the publication manifest and render in their curated order', async () => {
  const footers = JSON.parse(await readFile(path.join(project, 'src/data/blog-footers.json'), 'utf8'));
  const html = artifacts.get('staging').html;
  for (const item of catalog.all) {
    const footer = footers[item.entry.id];
    assert.ok(footer, item.route);
    const relatedRoutes = footer.related.map(({ href }) => href);
    assert.equal(new Set(relatedRoutes).size, relatedRoutes.length, `${item.route}: duplicate recommendation`);
    for (const link of [footer.previous, footer.next, ...footer.related].filter(Boolean)) {
      const target = manifest.find(({ route }) => route === link.href);
      assert.ok(target?.eligible && target.entry.collection === 'blog', `${item.route}: unpublished article ${link.href}`);
      assert.equal(target.entry.data.lang, item.entry.data.lang, `${item.route}: unintended locale change`);
      assert.notEqual(link.href, item.route, `${item.route}: self-recommendation`);
      assert.ok(link.title.trim(), item.route);
    }
    const $ = load(html.get(item.route));
    for (const type of ['previous', 'next']) {
      const anchor = $(`.post-pagination__item--${type} a`);
      assert.equal(anchor.length, footer[type] ? 1 : 0, `${item.route}: ${type}`);
      if (footer[type]) {
        assert.equal(anchor.attr('href'), footer[type].href);
        assert.equal(anchor.text(), footer[type].title);
      }
    }
    assert.deepEqual($('.related-post h3 a').map((_, a) => ({ title: $(a).text(), href: $(a).attr('href') })).get(),
      footer.related.map(({ title, href }) => ({ title, href })), item.route);
    for (const post of footer.related) await readFile(path.join(project, 'public', post.image));
  }
});

test('source-backed school, antecedent, fall-break and new-article footer recommendations stay distinct', async () => {
  const footers = JSON.parse(await readFile(path.join(project, 'src/data/blog-footers.json'), 'utf8'));
  const related = (id) => footers[id].related.map(({ href }) => href);
  assert.deepEqual(related('en/aba-school-readiness-arizona'), [
    '/library/autism-evaluation-what-to-expect', '/library/does-aba-therapy-replace-school', '/library/emotional-regulation-aba'
  ]);
  assert.deepEqual(related('es/aba-school-readiness-arizona'), [
    '/es/library/emotional-regulation-aba', '/es/library/autism-evaluation-what-to-expect', '/es/library/social-pragmatic-communication-autism'
  ]);
  assert.deepEqual(related('en/aba-school-readiness-guide'), [
    '/library/does-aba-therapy-replace-school', '/library/behavior-management-functions-guide', '/library/proactive-reactive-aba-strategies-guide'
  ]);
  assert.deepEqual(related('en/autism-fall-break-routine-tips-halloween-thanksgiving'), [
    '/library/aac-visual-supports-autism', '/library/halloween-and-autism', '/library/autism-social-skills-by-age'
  ]);
  for (const locale of ['en', 'es', 'ar']) {
    const target = entries.find(({ id, collection }) => collection === 'blog' && id === `${locale}/${locale === 'ar' ? 'aba-school-readiness-guide' : 'aba-school-readiness-arizona'}`);
    const route = `${locale === 'en' ? '' : `/${locale}`}/library/${target.data.slug}`;
    for (const footer of Object.values(footers)) {
      for (const link of [footer.previous, footer.next, ...footer.related].filter(Boolean)) {
        if (link.href === route) assert.equal(link.title, target.data.displayH1);
      }
    }
  }
  assert.equal(footers['en/autism-friendships-social-play-support'].next.href, '/library/autism-daily-living-skills-challenges');
  assert.ok(related('en/halloween-and-autism').includes('/library/autism-fall-break-routine-tips-halloween-thanksgiving'));
});

test('all rendered article-body internal links resolve to eligible publications, assets and unique fragments', async () => {
  const html = artifacts.get('staging').html;
  const targets = new Map(routeManifest.filter(({ eligible }) => eligible).map((item) => [item.route, item]));
  for (const item of catalog.all) {
    const $ = load(html.get(item.route));
    const ids = $('[id]').map((_, element) => $(element).attr('id')).get();
    assert.equal(new Set(ids).size, ids.length, `${item.route}: duplicate fragment IDs`);
    for (const anchor of $('.blog-post-body a[href]').toArray()) {
      const raw = $(anchor).attr('href');
      const url = new URL(raw, `${site}${item.route}`);
      if (url.origin !== new URL(site).origin) continue;
      assert.notEqual(url.pathname, '/index', `${item.route}: link to noncanonical homepage alias`);
      assert.equal(url.searchParams.has('hsLang'), false, `${item.route}: unnecessary HubSpot language query`);
      if (url.pathname.startsWith('/assets/')) {
        await readFile(path.join(project, 'public', decodeURIComponent(url.pathname)));
        continue;
      }
      const targetRoute = url.pathname.replace(/\/$/u, '') || '/';
      assert.ok(targets.get(targetRoute)?.eligible, `${item.route}: unpublished destination ${raw}`);
      assert.ok(html.has(targetRoute), `${item.route}: missing rendered destination ${raw}`);
      if (url.hash) {
        const target = load(html.get(targetRoute));
        const id = decodeURIComponent(url.hash.slice(1));
        assert.equal(target('[id]').filter((_, element) => target(element).attr('id') === id).length, 1,
          `${item.route}: missing/ambiguous fragment ${raw}`);
      }
    }
  }
});

test('Halloween translations, exact references and functional image links preserve the bounded reconciliation', () => {
  const html = artifacts.get('staging').html;
  const obsoleteReferences = new Set([
    'https://www.cdc.gov/autism/signs-symptoms/index',
    'https://www.cdc.gov/autism/hcp/diagnosis/screening',
    'https://www.iidc.indiana.edu/irca/articles/observing-behavior-using-a-b-c-data',
    'https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs'
  ]);
  for (const item of catalog.all) {
    const $ = load(html.get(item.route));
    for (const anchor of $('.blog-post-body a[href]').toArray()) {
      assert.equal(obsoleteReferences.has($(anchor).attr('href')), false, `${item.route}: obsolete external reference, including FAQ answers`);
    }
  }
  for (const locale of ['en', 'es', 'ar']) {
    const route = `${locale === 'en' ? '' : `/${locale}`}/library/autism-self-advocacy-skills-aba`;
    const $ = load(html.get(route));
    const link = $('.blog-post-body a[href="/library/halloween-and-autism"]');
    assert.equal(link.length, 1, route);
    if (locale === 'es') assert.match(link.text(), /en inglés/u);
    if (locale === 'ar') assert.match(link.text(), /بالإنجليزية/u);
    const firstThen = load(html.get(`${locale === 'en' ? '' : `/${locale}`}/library/first-then-cards-autism-transitions`));
    assert.equal(firstThen(`.blog-post-body a[href="${locale === 'en' ? '' : `/${locale}`}/library/first-then-cards-autism-transitions"]`).length, 1);
  }
  for (const slug of ['aac-visual-supports-autism', 'autism-fall-break-routine-tips-halloween-thanksgiving']) {
    const $ = load(html.get(`/library/${slug}`));
    assert.equal($('.blog-post-body a[href="/library/halloween-and-autism"]').length, 1);
  }
  for (const locale of ['en', 'es']) {
    const $ = load(html.get(`${locale === 'en' ? '' : `/${locale}`}/library/autism-evaluation-what-to-expect`));
    assert.equal($('.blog-post-body a[href="https://www.cdc.gov/autism/hcp/diagnosis/screening.html"]').length, 1);
    const table = $('.blog-post-body table');
    assert.equal(table.length, 1, 'Screening/evaluation/diagnosis must retain its source table relationships');
    assert.equal(table.find('thead th').length, 3);
    assert.equal(table.find('tbody tr').length, 3);
    assert.deepEqual(table.find('tbody tr').toArray().map(row => $(row).find('td').first().text()),
      locale === 'en' ? ['Screening', 'Evaluation', 'Diagnosis'] : ['Detección', 'Evaluación', 'Diagnóstico']);
    assert.equal(table.find('tbody tr').first().find('a[href="https://www.cdc.gov/autism/hcp/diagnosis/screening.html"]').length, 1);
  }
  const abc = load(html.get('/library/behavior-modification-techniques-reinforcement-theory'));
  assert.equal(abc('.blog-post-body a[href="/assets/images/abc-data-template-download.png"] img').length, 1);
  assert.equal(abc('.blog-post-body a[href="https://www.iidc.indiana.edu/irca/articles/observing-behavior-using-a-b-c-data.html"]').length, 1);
  const play = load(html.get('/library/play-leisure-skills'));
  for (const asset of ['play-appearance-infographic.png', 'how-to-support-playtime.png']) {
    assert.equal(play(`.blog-post-body a[href="/assets/images/${asset}"] img`).length, 1);
    assert.equal(play(`.blog-post-body > p > img[src="/assets/images/${asset}"]`).length, 0, 'No duplicated lightbox expansion');
  }
  assert.equal(play('.blog-post-body a[href^="#"]').length, 0, 'No orphaned lightbox anchors');
  const playFaq = play('script[type="application/ld+json"]').toArray()
    .map(element => JSON.parse(play(element).text())).find(entity => entity['@type'] === 'FAQPage');
  assert.equal(playFaq.mainEntity.length, 4);
  assert.doesNotMatch(playFaq.mainEntity.at(-1).acceptedAnswer.text, /Schedule a free consultation/u,
    'The source closing CTA is outside the final FAQ answer');
  assert.equal(play('.blog-post-body > p > a[href="/client-consultation"]').last().text(), 'Schedule a free consultation');
  const hours = load(html.get('/library/how-many-hours-aba-child-need'));
  assert.ok(hours('.blog-post-body a[href="/client-consultation"]').length > 0);
  assert.equal(hours('.blog-post-body a[href="/lp/early-intervention"]').length, 0, 'Phase 9 ownership gate remains unresolved');
});

test('article headings exclude adjacent prose while preserving source list structure', () => {
  const html = artifacts.get('staging').html;
  for (const [locale, heading] of [['en', 'The questions parents ask us every week'], ['es', 'Las preguntas que los padres nos hacen cada semana']]) {
    const $ = load(html.get(`${locale === 'en' ? '' : `/${locale}`}/library/social-pragmatic-communication-autism`));
    const firstHeading = $('.blog-post-body h2').first();
    assert.equal(firstHeading.text(), heading);
    assert.equal(firstHeading.next().prop('tagName'), 'P');
    assert.ok(firstHeading.next().text().length > 60);
  }
  const $ = load(html.get('/library/aba-toilet-training-child-autism'));
  const subheadings = $('.blog-post-body li h3');
  assert.equal(subheadings.length, 10);
  for (const element of subheadings.toArray()) {
    assert.match($(element).text(), /:$/u);
    assert.ok($(element).parent().text().length > $(element).text().length);
  }
});
