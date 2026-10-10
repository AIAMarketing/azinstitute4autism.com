import { normalizeRoute } from './publication-policy.ts';

export type AuthorLocale = 'en' | 'es' | 'ar';
export interface AuthorEntry {
  id: string;
  body?: string;
  data: {
    lang: string;
    slug: string;
    name: string;
    displayName?: string;
    description?: string;
    avatar?: string;
  };
}

export interface ResolvedAuthor<T extends AuthorEntry = AuthorEntry> {
  entry: T;
  locale: AuthorLocale;
  slug: string;
  name: string;
  displayName: string;
  description: string;
  avatar?: string;
  archiveRoute: string;
}

const nonblank = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const validSlug = (value: unknown): value is string => typeof value === 'string' && /^[\p{L}\p{N}]+(?:[-_][\p{L}\p{N}]+)*$/u.test(value);

/** One exact locale/slug index for listings, bylines, schema and archives. */
export function createAuthorResolver<T extends AuthorEntry>(records: readonly T[]) {
  const authors = new Map<string, ResolvedAuthor<T>>();
  for (const entry of records) {
    const data = entry.data;
    if (!data || !['en', 'es', 'ar'].includes(data.lang) || !validSlug(data.slug) || !nonblank(data.name)
      || (data.displayName !== undefined && !nonblank(data.displayName))
      || (data.description !== undefined && typeof data.description !== 'string')) {
      throw new Error(`Invalid author record: ${entry.id} (expected locale, safe slug and nonblank name/displayName)`);
    }
    if (data.avatar !== undefined && (typeof data.avatar !== 'string' || !data.avatar.startsWith('/assets/')
      || normalizeRoute(data.avatar) !== data.avatar)) {
      throw new Error(`Invalid author avatar: ${entry.id} (expected a normalized local /assets/ path)`);
    }
    const key = `${data.lang}:${data.slug}`;
    if (authors.has(key)) throw new Error(`Missing or ambiguous article author: ${key} (${authors.get(key)!.entry.id}, ${entry.id})`);
    authors.set(key, {
      entry, locale: data.lang as AuthorLocale, slug: data.slug, name: data.name,
      displayName: data.displayName ?? data.name, description: data.description ?? '', avatar: data.avatar,
      archiveRoute: normalizeRoute(`${data.lang === 'en' ? '' : `/${data.lang}`}/library/author/${data.slug}`)
    });
  }
  return (locale: string, slug: string): ResolvedAuthor<T> => {
    const author = authors.get(`${locale}:${slug}`);
    if (!author) throw new Error(`Missing or ambiguous article author: ${locale}:${slug} (add the corresponding locale author record)`);
    return author;
  };
}
