import { createAuthorResolver, type AuthorEntry } from './authors.ts';

export const libraryLocales = ['en', 'es', 'ar'] as const;
export type LibraryLocale = typeof libraryLocales[number];

export interface LibraryBlogEntry {
  id: string;
  collection: 'blog';
  body?: string;
  data: {
    lang: string;
    slug: string;
    title: string;
    description?: string;
    date: Date | string | number;
    author: string;
    category?: string;
    tags?: string[];
  };
}

export type LibraryAuthorEntry = AuthorEntry;

export interface LibraryPublication<TEntry extends LibraryBlogEntry = LibraryBlogEntry> {
  route: string;
  eligible: boolean;
  entry: TEntry | { collection: string };
}

export interface LibrarySearchRecord {
  url: string;
  locale: LibraryLocale;
  title: string;
  description: string;
  headings: string[];
  category: string;
  tags: string[];
  author: {
    name: string;
    slug: string;
  };
  publishedAt: string;
}

export interface LibraryCatalogItem<TEntry extends LibraryBlogEntry = LibraryBlogEntry> {
  route: string;
  entry: TEntry;
  search: LibrarySearchRecord;
}

export interface LibraryCatalog<TEntry extends LibraryBlogEntry = LibraryBlogEntry> {
  all: LibraryCatalogItem<TEntry>[];
  byLocale: Record<LibraryLocale, LibraryCatalogItem<TEntry>[]>;
}

const localeOrder = new Set<string>(libraryLocales);
const compareRoutes = (left: string, right: string) => left.localeCompare(right, 'en');

function plainHeading(value: string): string {
  if (/[<{][^>}]*(?:script|style|import|export)[^>}]*[>}]/iu.test(value)) return '';
  const text = value
    .replace(/\s+#+\s*$/u, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/`([^`]*)`/gu, '$1')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/[\*_~]/gu, '')
    .replace(/\\([\\`*{}\[\]()#+.!_>-])/gu, '$1')
    .replace(/\s+/gu, ' ')
    .trim();
  return text.length <= 300 ? text : text.slice(0, 300).trimEnd();
}

/** Extract bounded visible Markdown headings without parsing code or MDX implementation. */
export function extractMarkdownHeadings(source = ''): string[] {
  const headings: string[] = [];
  let fence: string | undefined;
  for (const line of source.split(/\r?\n/u)) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/u);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0];
      else if (fence === fenceMatch[1][0]) fence = undefined;
      continue;
    }
    if (fence) continue;
    const match = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*$/u);
    if (!match) continue;
    const heading = plainHeading(match[1]);
    if (heading && !headings.includes(heading)) headings.push(heading);
    if (headings.length === 50) break;
  }
  return headings;
}

function normalizedTags(tags: string[] | undefined): string[] {
  return [...new Set((tags ?? []).map((tag) => tag.trim()).filter(Boolean))];
}

function publishedAt(value: Date | string | number, id: string): { iso: string; time: number } {
  const date = value instanceof Date ? value : new Date(value);
  const time = date.valueOf();
  if (!Number.isFinite(time)) throw new Error(`Invalid Library publication date: ${id}`);
  return { iso: date.toISOString().slice(0, 10), time };
}

export function createLibraryCatalog<TEntry extends LibraryBlogEntry>(
  manifest: LibraryPublication<TEntry>[],
  authors: LibraryAuthorEntry[]
): LibraryCatalog<TEntry> {
  const resolveAuthor = createAuthorResolver(authors);

  const seenRoutes = new Set<string>();
  const dated: Array<LibraryCatalogItem<TEntry> & { publicationTime: number }> = [];
  for (const publication of manifest) {
    if (!publication.eligible || publication.entry.collection !== 'blog') continue;
    const entry = publication.entry as TEntry;
    const locale = entry.data.lang as LibraryLocale;
    if (!localeOrder.has(locale)) throw new Error(`Unsupported Library locale: ${entry.id}`);
    if (seenRoutes.has(publication.route)) throw new Error(`Duplicate Library route: ${publication.route}`);
    seenRoutes.add(publication.route);

    const author = resolveAuthor(locale, entry.data.author);
    const date = publishedAt(entry.data.date, entry.id);
    dated.push({
      route: publication.route,
      entry,
      publicationTime: date.time,
      search: {
        url: publication.route,
        locale,
        title: entry.data.title,
        description: entry.data.description ?? '',
        headings: extractMarkdownHeadings(entry.body),
        category: entry.data.category?.trim() ?? '',
        tags: normalizedTags(entry.data.tags),
        author: { name: author.name, slug: author.slug },
        publishedAt: date.iso
      }
    });
  }

  dated.sort((left, right) => right.publicationTime - left.publicationTime || compareRoutes(left.route, right.route));
  const all = dated.map(({ publicationTime: _publicationTime, ...item }) => item);
  const byLocale = Object.fromEntries(libraryLocales.map((locale) => [
    locale,
    all.filter((item) => item.search.locale === locale)
  ])) as Record<LibraryLocale, LibraryCatalogItem<TEntry>[]>;
  return { all, byLocale };
}
