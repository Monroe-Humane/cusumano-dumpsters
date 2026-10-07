import { defineConfig } from 'astro/config';
import { siteConfig } from './astro.config.shared.mjs';

export default defineConfig(siteConfig({ name: 'construction', site: 'https://cusumanohi.com', port: 4321 }));
