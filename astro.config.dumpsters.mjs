import { defineConfig } from 'astro/config';
import { siteConfig } from './astro.config.shared.mjs';

// Placeholder address until a domain is chosen; update robots.txt and sites/construction/data/site.json (links.dumpsterSite) too.
export default defineConfig(siteConfig({ name: 'dumpsters', site: 'https://cusumano-dumpsters.pages.dev', port: 4322 }));
