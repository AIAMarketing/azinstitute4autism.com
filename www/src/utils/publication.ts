import { getCollection } from 'astro:content';
import site from '../data/site.json';
import { createPublicationManifest, normalizeRoute } from './publication-policy';

export const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

export async function getPublicationManifest() {
  const [pages, posts] = await Promise.all([getCollection('pages'), getCollection('blog')]);
  return createPublicationManifest([...pages, ...posts], site.url);
}

export async function getPublication(route: string) {
  const normalized = normalizeRoute(route);
  const publication = (await getPublicationManifest()).find((page) => page.route === normalized);
  if (!publication?.eligible) throw new Error(`Route is not published: ${normalized}`);
  return publication;
}
