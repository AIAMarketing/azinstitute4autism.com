import type { LibraryLocale, LibrarySearchRecord } from './library-catalog';

export interface LibrarySearchMatch {
  record: LibrarySearchRecord;
  score: number;
}

export interface LegacyLibrarySearchState {
  query: string;
  language: LibraryLocale | 'all';
  offset: number;
  types: string[];
}

const combiningMarks = /\p{M}+/gu;
const punctuation = /[\p{P}\p{S}]+/gu;

/** Build a comparison-only key while preserving the original record for display. */
export function normalizeLibrarySearchText(value: unknown, locale: LibraryLocale): string {
  return String(value ?? '')
    .normalize('NFKC')
    .toLocaleLowerCase(locale)
    .normalize('NFD')
    .replace(combiningMarks, '')
    .replace(/\u0640/gu, '')
    .normalize('NFC')
    .replace(punctuation, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function words(value: string): Set<string> {
  return new Set(value.split(' ').filter(Boolean));
}

function tokenScore(token: string, fields: Array<{ text: string; weight: number }>): number {
  let score = 0;
  for (const field of fields) {
    const fieldWords = words(field.text);
    if (fieldWords.has(token)) score = Math.max(score, field.weight);
    // Three-character partial tokens support attached Arabic particles and
    // ordinary word prefixes without introducing fuzzy edits or stemming.
    else if (token.length >= 3 && [...fieldWords].some((word) => word.includes(token))) {
      score = Math.max(score, Math.floor(field.weight * 0.6));
    }
  }
  return score;
}

export function searchLibrary(records: LibrarySearchRecord[], query: unknown): LibrarySearchMatch[] {
  const locale = records[0]?.locale ?? 'en';
  const normalizedQuery = normalizeLibrarySearchText(query, locale);
  if (!normalizedQuery) return [];
  const tokens = [...new Set(normalizedQuery.split(' ').filter(Boolean))];

  return records.flatMap((record) => {
    const title = normalizeLibrarySearchText(record.title, record.locale);
    const headings = normalizeLibrarySearchText(record.headings.join(' '), record.locale);
    const description = normalizeLibrarySearchText(record.description, record.locale);
    const categoryTags = normalizeLibrarySearchText([record.category, ...record.tags].join(' '), record.locale);
    const author = normalizeLibrarySearchText(`${record.author.name} ${record.author.slug}`, record.locale);
    const fields = [
      { text: title, weight: 100 },
      { text: headings, weight: 60 },
      { text: description, weight: 30 },
      { text: categoryTags, weight: 20 },
      { text: author, weight: 10 }
    ];
    const scores = tokens.map((token) => tokenScore(token, fields));
    if (scores.some((score) => score === 0)) return [];
    const phrase = title === normalizedQuery ? 1000 : title.includes(normalizedQuery) ? 500 : 0;
    return [{ record, score: phrase + scores.reduce((total, score) => total + score, 0) }];
  }).sort((left, right) => right.score - left.score
    || Date.parse(right.record.publishedAt) - Date.parse(left.record.publishedAt)
    || left.record.url.localeCompare(right.record.url, 'en'));
}

/** Parse legacy state without treating compatibility content types as search scope. */
export function parseLegacyLibrarySearchState(value: string | URLSearchParams): LegacyLibrarySearchState {
  const params = typeof value === 'string' ? new URLSearchParams(value) : value;
  const query = params.has('term') ? params.get('term') ?? '' : params.get('q') ?? '';
  const requestedLanguage = params.get('lang');
  const language = requestedLanguage && ['en', 'es', 'ar'].includes(requestedLanguage)
    ? requestedLanguage as LibraryLocale
    : 'all';
  const rawOffset = Number(params.get('offset'));
  const offset = Number.isInteger(rawOffset) && rawOffset >= 0 && rawOffset % 10 === 0 ? rawOffset : 0;
  return { query, language, offset, types: params.getAll('type') };
}

export function boundedSearchOffset(resultCount: number, requestedOffset: number, pageSize = 10): number {
  if (!Number.isInteger(resultCount) || resultCount <= 0 || !Number.isInteger(pageSize) || pageSize <= 0) return 0;
  const validOffset = Number.isInteger(requestedOffset) && requestedOffset >= 0 && requestedOffset % pageSize === 0
    ? requestedOffset
    : 0;
  return Math.min(validOffset, Math.floor((resultCount - 1) / pageSize) * pageSize);
}
