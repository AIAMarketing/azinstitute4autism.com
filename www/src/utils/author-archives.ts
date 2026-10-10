import { createAuthorResolver, type AuthorEntry, type ResolvedAuthor } from './authors.ts';
import { libraryLocales, type LibraryBlogEntry, type LibraryCatalog } from './library-catalog.ts';
import { paginateLibraryItems, type ContentPublication, type LibraryPageDescriptor } from './library-pagination.ts';
import { normalizeRoute, publicationFor, type PublicationEntry } from './publication-policy.ts';

export interface AuthorArchiveDescriptor<T extends AuthorEntry = AuthorEntry> extends LibraryPageDescriptor {
  author: ResolvedAuthor<T>;
}

/** A validated root and the existing positive-integer convention; page 1 has no suffix. */
export function authorPageRoute(root: string, page: number): string {
  if (!Number.isSafeInteger(page) || page < 1) throw new Error(`Invalid author page number: ${page}`);
  if (!/^\/(?:es\/|ar\/)?library\/author\/[^/]+$/.test(root) || normalizeRoute(root) !== root) {
    throw new Error(`Invalid author archive root: ${root}`);
  }
  return page === 1 ? root : `${root}/page/${page}`;
}

/** Called after the content manifest/catalog: never recursively loads either. */
export function createAuthorArchivePublications<TBlog extends LibraryBlogEntry, TAuthor extends AuthorEntry>(
  catalog: LibraryCatalog<TBlog>, authors: readonly TAuthor[], manifest: ContentPublication[], site: string
) {
  const resolve = createAuthorResolver(authors);
  const collision = manifest.find(({ route }) => /^\/(?:es\/|ar\/)?library\/author(?:\/|$)/.test(route));
  if (collision) throw new Error(`Reserved author archive route collision: ${collision.route} (${collision.entry.id})`);
  const canonicals = new Set(manifest.filter(({ eligible }) => eligible).map(({ canonical }) => canonical));
  const publications: Array<ContentPublication & { authorPage: AuthorArchiveDescriptor<TAuthor> }> = [];
  for (const locale of libraryLocales) {
    const slugs = [...new Set(catalog.byLocale[locale].map(({ entry }) => entry.data.author))].sort();
    for (const slug of slugs) {
      const author = resolve(locale, slug);
      const items = catalog.byLocale[locale].filter(({ entry }) => entry.data.author === slug);
      const first = paginateLibraryItems(items, 1)!;
      for (let page = 1; page <= first.totalPages; page++) {
        const route = authorPageRoute(author.archiveRoute, page);
        const entry: PublicationEntry = {
          id: `generated/${locale}/author/${slug}/${page}`, collection: 'pages',
          data: {
            lang: locale, slug: route.replace(/^\/(?:es\/|ar\/)?/, ''), noindex: true,
            featuredImage: author.avatar, alt: author.displayName
          }
        };
        const publication = publicationFor(entry, site);
        if (canonicals.has(publication.canonical)) throw new Error(`Duplicate canonical: ${publication.canonical}`);
        canonicals.add(publication.canonical);
        publications.push({
          ...publication, entry, translations: [],
          authorPage: { author, locale, currentPage: page, totalItems: first.totalItems, totalPages: first.totalPages }
        });
      }
    }
  }
  return publications.sort((a, b) => a.route.localeCompare(b.route, 'en'));
}
