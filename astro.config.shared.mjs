import { fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Settings both sites share. Each site's own config (astro.config.<site>.mjs) adds its
// folders and address. Run one site with: astro dev --config astro.config.<site>.mjs
export function siteConfig({ name, site, port }) {
  return {
    site,
    srcDir: `./sites/${name}`,
    publicDir: `./sites/${name}/public`,
    outDir: `./dist/${name}`,
    cacheDir: `./node_modules/.astro/${name}`,
    output: 'static',
    trailingSlash: 'ignore',
    server: { port },
    integrations: [sitemap({ filter: (page) => !page.includes('/thanks') })],
    // Fonts are downloaded at build time and served from the site itself: no render-blocking
    // request to Google, and metric-matched fallbacks keep text from jumping when they load.
    fonts: [
      { provider: fontProviders.google(), name: 'Oswald', cssVariable: '--font-oswald', weights: [500, 600, 700], subsets: ['latin'], fallbacks: ['sans-serif'] },
      { provider: fontProviders.google(), name: 'Source Sans 3', cssVariable: '--font-source-sans', weights: [400, 600, 700], subsets: ['latin'], fallbacks: ['sans-serif'] },
    ],
    // Small pages: inline the CSS so first paint needs no extra request.
    build: { inlineStylesheets: 'always' },
    vite: { plugins: [tailwindcss()] },
  };
}
