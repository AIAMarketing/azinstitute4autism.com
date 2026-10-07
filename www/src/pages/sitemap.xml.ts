import { allowIndexing, getPublicationManifest } from '../utils/publication';
import { renderSitemap } from '../utils/publication-policy';

export async function GET() {
  return new Response(renderSitemap(await getPublicationManifest(), allowIndexing), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
