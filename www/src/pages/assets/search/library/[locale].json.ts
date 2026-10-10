import type { APIRoute } from 'astro';
import { getLibraryCatalog } from '../../../../utils/library';
import { libraryLocales, type LibraryLocale } from '../../../../utils/library-catalog';

export function getStaticPaths() {
  return libraryLocales.map((locale) => ({ params: { locale }, props: { locale } }));
}

export const GET: APIRoute = async ({ props }) => {
  const locale = props.locale as LibraryLocale;
  const records = (await getLibraryCatalog()).byLocale[locale].map(({ search }) => search);
  return new Response(`${JSON.stringify(records)}\n`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    }
  });
};
