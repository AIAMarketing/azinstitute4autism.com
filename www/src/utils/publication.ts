import { getCollection, type CollectionEntry } from 'astro:content';
import site from '../data/site.json';
import { createPublicationManifest, normalizeRoute } from './publication-policy';
import { createLibraryCatalog } from './library-catalog';
import { createLibraryPaginationPublications } from './library-pagination';
import { createLibrarySearchPublication } from './search-publication';

export const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

export async function getPublicationManifest() {
  const [pages, posts] = await Promise.all([getCollection('pages'), getCollection('blog')]);
  return createPublicationManifest([...pages, ...posts], site.url);
}

export async function getLibraryPaginationManifest(
  manifest?: Awaited<ReturnType<typeof getPublicationManifest>>
) {
  manifest ??= await getPublicationManifest();
  const authors = await getCollection('authors');
  const catalog = createLibraryCatalog(
    manifest as Parameters<typeof createLibraryCatalog<CollectionEntry<'blog'>>>[0],
    authors
  );
  return createLibraryPaginationPublications(catalog, manifest, site.url);
}

/** Content publications plus deterministic generated archive routes. */
export async function getRoutePublicationManifest() {
  const content = await getPublicationManifest();
  const pagination = await getLibraryPaginationManifest(content);
  return [...content, ...pagination].sort((left, right) => left.route.localeCompare(right.route, 'en'));
}

export async function getPublication(route: string) {
  const normalized = normalizeRoute(route);
  if (normalized === '/search') return createLibrarySearchPublication(site.url);
  const publication = (await getRoutePublicationManifest()).find((page) => page.route === normalized);
  if (!publication?.eligible) throw new Error(`Route is not published: ${normalized}`);
  return publication;
}
