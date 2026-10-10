import {
  publicationFor,
  type PublicationEntry,
  type TranslatedPublication
} from './publication-policy.ts';
import {
  libraryLocales,
  type LibraryCatalog,
  type LibraryBlogEntry,
  type LibraryLocale
} from './library-catalog.ts';

export const LIBRARY_PAGE_SIZE = 10;

export interface LibraryPageSlice<T> {
  currentPage: number;
  totalItems: number;
  /** Number of nonempty pages. A valid empty root archive reports zero. */
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
  items: T[];
}

export interface LibraryPageDescriptor {
  locale: LibraryLocale;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export type ContentPublication<TEntry extends PublicationEntry = PublicationEntry> = TranslatedPublication & { entry: TEntry };
export type LibraryPaginationPublication<TEntry extends PublicationEntry = PublicationEntry> = ContentPublication<TEntry> & {
  libraryPage: LibraryPageDescriptor;
};

export function paginateLibraryItems<T>(
  items: readonly T[],
  requestedPage: number,
  pageSize = LIBRARY_PAGE_SIZE
): LibraryPageSlice<T> | null {
  if (!Number.isSafeInteger(requestedPage) || requestedPage < 1
    || !Number.isSafeInteger(pageSize) || pageSize < 1) return null;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  // The unnumbered root remains a valid empty archive. Numbered routes never do.
  if ((totalPages === 0 && requestedPage !== 1) || (totalPages > 0 && requestedPage > totalPages)) return null;
  const start = (requestedPage - 1) * pageSize;
  return {
    currentPage: requestedPage,
    totalItems,
    totalPages,
    previousPage: requestedPage > 1 ? requestedPage - 1 : null,
    nextPage: requestedPage < totalPages ? requestedPage + 1 : null,
    items: items.slice(start, start + pageSize)
  };
}

export function libraryRootRoute(locale: LibraryLocale): string {
  return locale === 'en' ? '/library' : `/${locale}/library`;
}

export function libraryPageRoute(locale: LibraryLocale, page: number): string {
  if (!Number.isSafeInteger(page) || page < 1) throw new Error(`Invalid Library page number: ${page}`);
  const root = libraryRootRoute(locale);
  return page === 1 ? root : `${root}/page/${page}`;
}

/**
 * Compose generated page 2+ publications from the content manifest and catalog.
 * The content manifest stays independent, preventing a catalog/manifest cycle.
 */
export function createLibraryPaginationPublications<
  TBlog extends LibraryBlogEntry,
  TEntry extends PublicationEntry
>(
  catalog: LibraryCatalog<TBlog>,
  manifest: ContentPublication<TEntry>[],
  site: string
): LibraryPaginationPublication<TEntry>[] {
  const contentRoutes = new Map(manifest.map((page) => [page.route, `${page.entry.collection}/${page.entry.id}`]));
  const publications: LibraryPaginationPublication<TEntry>[] = [];

  for (const locale of libraryLocales) {
    const rootRoute = libraryRootRoute(locale);
    const root = manifest.find((page) => page.route === rootRoute);
    if (!root || root.entry.collection !== 'pages' || root.entry.data.lang !== locale || root.entry.data.slug !== 'library') {
      throw new Error(`Missing Library root publication: ${rootRoute}`);
    }

    // Reserve the complete family, including aliases and malformed content
    // candidates, so content can never silently shadow generated archives.
    const familyPrefix = `${rootRoute}/page`;
    const collision = manifest.find((page) => page.route === familyPrefix || page.route.startsWith(`${familyPrefix}/`));
    if (collision) throw new Error(`Reserved Library pagination route collision: ${collision.route} (${contentRoutes.get(collision.route)})`);
    if (!root.eligible) continue;

    const items = catalog.byLocale[locale];
    const first = paginateLibraryItems(items, 1);
    if (!first) throw new Error(`Unable to paginate Library root: ${rootRoute}`);
    for (let currentPage = 2; currentPage <= first.totalPages; currentPage++) {
      const page = paginateLibraryItems(items, currentPage);
      if (!page?.items.length) throw new Error(`Empty generated Library page: ${libraryPageRoute(locale, currentPage)}`);
      const synthetic: PublicationEntry = {
        id: `generated/${locale}/library/page/${currentPage}`,
        collection: 'pages',
        data: { lang: locale, slug: `library/page/${currentPage}`, draft: false }
      };
      const publication = publicationFor(synthetic, site);
      const previous = contentRoutes.get(publication.route);
      if (previous) throw new Error(`Route collision: ${publication.route} (${previous}, ${synthetic.id})`);
      contentRoutes.set(publication.route, synthetic.id);
      publications.push({
        ...publication,
        entry: root.entry,
        translations: [],
        libraryPage: {
          locale,
          currentPage,
          totalItems: page.totalItems,
          totalPages: page.totalPages
        }
      });
    }
  }

  return publications.sort((left, right) => left.route.localeCompare(right.route, 'en'));
}
