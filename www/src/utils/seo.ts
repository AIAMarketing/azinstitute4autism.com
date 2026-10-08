/** Resolve social assets against the public site, never a preview host or canonical. */
export function socialImageUrl(image: string | undefined, site: string): string | undefined {
  if (!image?.trim()) return undefined;
  const url = new URL(image, new URL('/', site));
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error(`Invalid social image URL: ${image}`);
  }
  return url.href;
}
