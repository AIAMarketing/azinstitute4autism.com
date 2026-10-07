import { allowIndexing } from '../utils/publication';
import site from '../data/site.json';

const body = allowIndexing
  ? [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${new URL('/sitemap.xml', site.url).href}`,
      ''
    ].join('\n')
  : [
      'User-agent: *',
      'Allow: /',
      '# Staging and migration builds emit meta robots noindex,nofollow.',
      ''
    ].join('\n');

export function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
