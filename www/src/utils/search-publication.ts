import { publicationFor, type PublicationEntry, type TranslatedPublication } from './publication-policy.ts';

const entry: PublicationEntry = {
  id: 'utility/search',
  collection: 'pages',
  data: { lang: 'en', slug: 'search', draft: false, noindex: true }
};

export function createLibrarySearchPublication(site: string): TranslatedPublication & { entry: PublicationEntry } {
  return { ...publicationFor(entry, site), entry, translations: [] };
}
