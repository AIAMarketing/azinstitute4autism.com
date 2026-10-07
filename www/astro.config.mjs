import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://www.azinstitute4autism.com',
  trailingSlash: 'never',
  compressHTML: true,
  integrations: [mdx()],
  markdown: {
    processor: satteri({
      features: {
        headingAttributes: true,
        // No directive consumers: parsing them drops literal ratios and times.
        directive: false
      }
    }),
    shikiConfig: { theme: 'github-light' }
  }
});
