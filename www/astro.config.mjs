import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import site from './src/data/site.json' with { type: 'json' };

export default defineConfig({
  site: site.url,
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
