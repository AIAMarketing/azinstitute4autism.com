import { normalizeRoute, type PublicationEntry, type TranslatedPublication } from './publication-policy.ts';

export type VisitorLocale = 'en' | 'es' | 'ar';

export interface VisitorPublication extends TranslatedPublication {
  entry: PublicationEntry & {
    data: PublicationEntry['data'] & { translationKey?: string };
  };
  libraryPage?: { locale: VisitorLocale; currentPage: number };
  authorPage?: {
    locale: VisitorLocale;
    currentPage: number;
    author: {
      name: string;
      archiveRoute: string;
      entry: { data: { lang: string; translationKey?: string } };
    };
  };
}

export interface NavigationDestination {
  href: string;
  lang: VisitorLocale;
  fallback: boolean;
  source: 'exact' | 'translation' | 'explicit-fallback';
}

export interface VisitorLanguageChoice {
  lang: VisitorLocale;
  route: string;
  current: boolean;
  kind: 'equivalent' | 'section-root';
}

const locales: VisitorLocale[] = ['en', 'es', 'ar'];
const explicitFallbacks = new Map<string, string>([
  // The Arabic homepage is an unpublished placeholder. Keep the visible Arabic
  // Home item, but send it to the published English root and identify the fallback.
  ['ar:/ar', '/']
]);

const isLocale = (value: string): value is VisitorLocale => locales.includes(value as VisitorLocale);
const publicationLocale = (publication: VisitorPublication): VisitorLocale => {
  const locale = publication.entry.data.lang;
  if (!isLocale(locale)) throw new Error(`Invalid publication locale for visitor navigation: ${publication.route}`);
  return locale;
};

function eligibleRoute(route: string, manifest: readonly VisitorPublication[]) {
  return manifest.find((publication) => publication.eligible && publication.route === normalizeRoute(route));
}

/** Resolve one menu target without guessing locale prefixes or relying on SEO output. */
export function resolveNavigationDestination(
  requestedRoute: string,
  locale: VisitorLocale,
  manifest: readonly VisitorPublication[]
): NavigationDestination | null {
  if (/^(?:[a-z]+:)?\/\//i.test(requestedRoute)) return null;
  const route = normalizeRoute(requestedRoute);
  const direct = eligibleRoute(route, manifest);
  if (direct && publicationLocale(direct) === locale) {
    return { href: direct.route, lang: locale, fallback: false, source: 'exact' };
  }

  if (direct) {
    const translated = direct.translations.find((candidate) => candidate.lang === locale);
    const destination = translated && eligibleRoute(translated.route, manifest);
    if (destination && publicationLocale(destination) === locale) {
      return { href: destination.route, lang: locale, fallback: false, source: 'translation' };
    }
  }

  const fallbackRoute = explicitFallbacks.get(`${locale}:${route}`);
  const fallback = eligibleRoute(fallbackRoute ?? direct?.route ?? route, manifest);
  if (!fallback) return null;
  return {
    href: fallback.route,
    lang: publicationLocale(fallback),
    fallback: publicationLocale(fallback) !== locale,
    source: 'explicit-fallback'
  };
}

function validateChoices(choices: VisitorLanguageChoice[]) {
  const seen = new Set<string>();
  for (const choice of choices) {
    if (seen.has(choice.lang)) throw new Error(`Ambiguous visitor language destination: ${choice.lang}`);
    seen.add(choice.lang);
  }
  return choices.sort((left, right) => locales.indexOf(left.lang) - locales.indexOf(right.lang));
}

/**
 * Visitor choices are deliberately separate from hreflang. Content routes use
 * the validated translation graph; archive pagination may navigate to a known
 * section root without claiming page-number equivalence.
 */
export function visitorLanguageChoices(
  current: VisitorPublication,
  manifest: readonly VisitorPublication[]
): VisitorLanguageChoice[] {
  const currentLocale = publicationLocale(current);

  if (current.authorPage) {
    const key = current.authorPage.author.entry.data.translationKey;
    if (typeof key !== 'string' || !key.trim()) return [];
    const roots = manifest.filter((publication) => publication.eligible && publication.authorPage?.currentPage === 1
      && publication.authorPage.author.entry.data.translationKey === key);
    const identity = current.authorPage.author.name;
    for (const root of roots) {
      if (root.authorPage?.author.name !== identity) {
        throw new Error(`Author translation identity mismatch: ${key}`);
      }
    }
    return validateChoices(roots.map((root) => ({
      lang: publicationLocale(root), route: root.route,
      current: publicationLocale(root) === currentLocale,
      kind: current.authorPage!.currentPage === 1 ? 'equivalent' : 'section-root'
    })));
  }

  if (current.libraryPage) {
    const roots = locales.flatMap((locale) => {
      const route = locale === 'en' ? '/library' : `/${locale}/library`;
      const root = eligibleRoute(route, manifest);
      return root ? [root] : [];
    });
    return validateChoices(roots.map((root) => ({
      lang: publicationLocale(root), route: root.route,
      current: publicationLocale(root) === currentLocale,
      kind: 'section-root'
    })));
  }

  return validateChoices(current.translations.flatMap((translation) => {
    const target = eligibleRoute(translation.route, manifest);
    if (!target || publicationLocale(target) !== translation.lang) return [];
    return [{
      lang: translation.lang as VisitorLocale, route: target.route,
      current: target.route === current.route, kind: 'equivalent' as const
    }];
  }));
}

export function fallbackLabel(locale: VisitorLocale) {
  return { en: 'English', es: 'Español', ar: 'العربية' }[locale];
}
