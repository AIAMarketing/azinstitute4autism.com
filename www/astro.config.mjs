import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.azinstitute4autism.com',
  trailingSlash: 'never',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});
