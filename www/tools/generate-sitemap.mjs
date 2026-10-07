import { build } from 'astro';
import { fileURLToPath } from 'node:url';

// Compatibility command: the build generates sitemap.xml from the same
// publication manifest as HTML routes. Never maintain a second public copy.
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
await build({ root });
