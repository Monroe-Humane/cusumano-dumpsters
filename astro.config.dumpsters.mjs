import { defineConfig } from 'astro/config';
import { siteConfig } from './astro.config.shared.mjs';

// Address changes also go in robots.txt, data/site.json (url) and sites/construction/data/site.json (links.dumpsterSite).
export default defineConfig(siteConfig({ name: 'dumpsters', site: 'https://cusdump.com', port: 4322 }));
