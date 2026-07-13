const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

const body = allowIndexing
  ? [
      'User-agent: *',
      'Allow: /',
      'Sitemap: https://www.azinstitute4autism.com/sitemap.xml',
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
