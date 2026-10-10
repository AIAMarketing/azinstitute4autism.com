export interface PublicationEntry {
  id: string;
  collection: 'pages' | 'blog';
  data: {
    lang: string;
    slug: string;
    draft?: boolean;
    noindex?: boolean;
    canonical?: string;
    translationKey?: string;
    displayH1?: string;
    featuredImage?: string;
    alt?: string;
  };
}

export interface Publication {
  route: string;
  url: string;
  canonical: string;
  eligible: boolean;
  noindex: boolean;
  externalCanonical: boolean;
  sitemapEligible: boolean;
}

export interface TranslationEquivalent {
  lang: string;
  route: string;
  url: string;
}

export interface TranslatedPublication extends Publication {
  translations: TranslationEquivalent[];
}

type TranslationMember = TranslatedPublication & { entry: PublicationEntry };

/** Public document paths have no query/fragment and no trailing slash except /. */
export function normalizeRoute(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//') || /[?#\\\s]/u.test(value)) {
    throw new Error(`Invalid local route: ${value}`);
  }
  const segments = value.replace(/\/+$/, '').slice(1).split('/');
  if (value.replace(/\/+$/, '') && segments.some((segment) => {
    const decoded = decodeURIComponent(segment);
    return !decoded || ['.', '..'].includes(decoded) || /[/\\?#\s]/u.test(decoded);
  })) throw new Error(`Invalid local route: ${value}`);
  return '/' + segments.map((segment) => encodeURIComponent(decodeURIComponent(segment))).join('/');
}

export function contentRoute(entry: PublicationEntry): string {
  const { lang, slug } = entry.data;
  if (!['en', 'es', 'ar'].includes(lang) || !slug || slug.startsWith('/')) {
    throw new Error(`Invalid language/slug for ${entry.collection}/${entry.id}`);
  }
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const path = entry.collection === 'blog' ? `/library/${slug}`
    : slug.replace(/\/+$/, '') === 'index' ? '/' : `/${slug}`;
  return normalizeRoute(prefix + path);
}

function canonicalUrl(value: string): URL {
  let url: URL;
  try { url = new URL(value); } catch { throw new Error(`Invalid canonical URL: ${value}`); }
  if (!/^https?:\/\//.test(value) || /\s/u.test(value) || url.username || url.password || url.hash) {
    throw new Error(`Invalid canonical URL: ${value}`);
  }
  return url;
}

export function publicationFor(entry: PublicationEntry, site: string): Publication {
  const origin = new URL(site).origin;
  const route = contentRoute(entry);
  if (/^\/(?:robots\.txt|sitemap\.xml)$/.test(route) || /^\/(?:assets|_astro)(?:\/|$)/.test(route)) {
    throw new Error(`Content route collides with a reserved utility: ${route}`);
  }
  const url = new URL(route, origin).href;
  const sourceCanonical = entry.data.canonical;
  const supplied = sourceCanonical === undefined ? new URL(url) : canonicalUrl(sourceCanonical);
  if (supplied.hostname.replace(/^www\./, '') === new URL(origin).hostname.replace(/^www\./, '') && supplied.origin !== origin) {
    throw new Error(`Local canonical must use the public origin: ${sourceCanonical}`);
  }
  const externalCanonical = supplied.origin !== origin;
  if (!externalCanonical && (supplied.search || normalizeRoute(supplied.pathname) !== route)) {
    throw new Error(`Local canonical must match its route: ${route} -> ${sourceCanonical}`);
  }
  const eligible = entry.data.draft !== true;
  const noindex = entry.data.noindex === true;
  return {
    route, url, canonical: externalCanonical ? supplied.href : url,
    eligible, noindex, externalCanonical,
    sitemapEligible: eligible && !noindex && !externalCanonical
  };
}

/** Check every entry, including drafts, so publication cannot hide collisions. */
export function createPublicationManifest<T extends PublicationEntry>(entries: T[], site: string) {
  const routes = new Map<string, string>();
  const canonicals = new Map<string, string>();
  const manifest = entries.map((entry) => {
    const publication = publicationFor(entry, site);
    const source = `${entry.collection}/${entry.id}`;
    const previous = routes.get(publication.route);
    if (previous) throw new Error(`Route collision: ${publication.route} (${previous}, ${source})`);
    routes.set(publication.route, source);
    if (publication.eligible) {
      const duplicate = canonicals.get(publication.canonical);
      if (duplicate) throw new Error(`Duplicate canonical: ${publication.canonical} (${duplicate}, ${source})`);
      canonicals.set(publication.canonical, source);
    }
    return { ...publication, entry, translations: [] as TranslationEquivalent[] };
  }).sort((a, b) => a.route.localeCompare(b.route, 'en'));

  // Keys declare equivalence within a collection, never across URL suffixes.
  // Validate even unpublished members so drafts cannot conceal ambiguity.
  const groups = new Map<string, Map<string, typeof manifest[number]>>();
  for (const page of manifest) {
    const { translationKey, lang } = page.entry.data;
    if (translationKey === undefined) continue;
    if (typeof translationKey !== 'string' || !translationKey || translationKey !== translationKey.trim()) {
      throw new Error(`Invalid translationKey: ${page.entry.collection}/${page.entry.id}`);
    }
    const key = `${page.entry.collection}:${translationKey}`;
    const group = groups.get(key) ?? new Map();
    const duplicate = group.get(lang);
    if (duplicate) throw new Error(`Ambiguous translation: ${key} (${lang}: ${duplicate.entry.id}, ${page.entry.id})`);
    group.set(lang, page);
    groups.set(key, group);
  }
  for (const group of groups.values()) {
    // Reuse the production publication gate: generated, indexable, self-canonical.
    const members = [...group.values()].filter((page) => page.sitemapEligible);
    if (members.length < 2) continue;
    const translations = members.map(({ entry, route, url }) => ({ lang: entry.data.lang, route, url }))
      .sort((a, b) => ['en', 'es', 'ar'].indexOf(a.lang) - ['en', 'es', 'ar'].indexOf(b.lang));
    for (const page of members) page.translations = translations;
  }
  validateTranslationGraph(manifest);
  return manifest;
}

/** Fail on dangling, ineligible, cross-family or nonreciprocal references. */
export function validateTranslationGraph(manifest: TranslationMember[]): void {
  const routes = new Map(manifest.map((page) => [page.route, page]));
  for (const page of manifest) {
    if (!page.translations.length) continue;
    if (!page.sitemapEligible || !page.entry.data.translationKey) {
      throw new Error(`Ineligible translation source: ${page.route}`);
    }
    const languages = new Set<string>();
    for (const translation of page.translations) {
      const target = routes.get(translation.route);
      if (!target) throw new Error(`Missing translation target: ${page.route} -> ${translation.route}`);
      if (!target.sitemapEligible) throw new Error(`Ineligible translation target: ${translation.route}`);
      if (target.entry.collection !== page.entry.collection || target.entry.data.translationKey !== page.entry.data.translationKey) {
        throw new Error(`Translation family/key mismatch: ${page.route} -> ${translation.route}`);
      }
      if (translation.lang !== target.entry.data.lang || translation.url !== target.url || languages.has(translation.lang)) {
        throw new Error(`Invalid or duplicate translation reference: ${page.route} -> ${translation.route}`);
      }
      languages.add(translation.lang);
      if (JSON.stringify(target.translations) !== JSON.stringify(page.translations)) {
        throw new Error(`Nonreciprocal translations: ${page.route} -> ${translation.route}`);
      }
    }
    if (languages.size < 2 || !page.translations.some((translation) => translation.route === page.route)) {
      throw new Error(`Translation set must include itself and an equivalent: ${page.route}`);
    }
  }
}

export function hreflangLinksFor(page: TranslatedPublication, allowIndexing: boolean) {
  // Staging keeps language navigation but emits no indexing-oriented alternates.
  if (!allowIndexing || !page.sitemapEligible || page.translations.length < 2) return [];
  const links = page.translations.map(({ lang, url }) => ({ lang, href: url }));
  // English is the project's default language; never substitute another route.
  const fallback = page.translations.find(({ lang }) => lang === 'en');
  if (fallback) links.push({ lang: 'x-default', href: fallback.url });
  return links;
}

export function robotsFor(publication: Publication, allowIndexing: boolean): string {
  if (!allowIndexing || !publication.eligible) return 'noindex,nofollow';
  return publication.noindex ? 'noindex,follow' : 'index,follow';
}

export function sitemapUrls(manifest: Publication[], allowIndexing: boolean): string[] {
  // Derive locations from local route URLs, never external canonical targets.
  return allowIndexing ? manifest.filter((page) => page.sitemapEligible).map((page) => page.url) : [];
}

export function renderSitemap(manifest: Publication[], allowIndexing: boolean): string {
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const rows = sitemapUrls(manifest, allowIndexing).map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...rows, '</urlset>', ''].join('\n');
}
