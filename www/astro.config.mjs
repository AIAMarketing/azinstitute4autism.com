import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.azinstitute4autism.com',
  trailingSlash: 'never',
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});
