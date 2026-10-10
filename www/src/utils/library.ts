import { getCollection, type CollectionEntry } from 'astro:content';
import { createLibraryCatalog, type LibraryCatalog } from './library-catalog';
import { getPublicationManifest } from './publication';

let catalog: Promise<LibraryCatalog<CollectionEntry<'blog'>>> | undefined;

export function getLibraryCatalog(): Promise<LibraryCatalog<CollectionEntry<'blog'>>> {
  catalog ??= Promise.all([getPublicationManifest(), getCollection('authors')]).then(([manifest, authors]) =>
    createLibraryCatalog(
      manifest as Parameters<typeof createLibraryCatalog<CollectionEntry<'blog'>>>[0],
      authors
    )
  );
  return catalog;
}
