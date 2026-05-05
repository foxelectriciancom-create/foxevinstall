// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foxevinstall.com',
  integrations: [sitemap()],
  output: 'static',
  build: {
    assets: '_assets',
  },
});
