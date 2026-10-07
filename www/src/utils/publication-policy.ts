export interface PublicationEntry {
  id: string;
  collection: 'pages' | 'blog';
  data: {
    lang: string;
    slug: string;
    draft?: boolean;
    noindex?: boolean;
    canonical?: string;
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
  return entries.map((entry) => {
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
    return { ...publication, entry };
  }).sort((a, b) => a.route.localeCompare(b.route, 'en'));
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
