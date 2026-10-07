// Builds the dumpster site's social share image (sites/dumpsters/public/og.png, 1200×630).
// Prices come from sites/dumpsters/data/site.json, so re-run after changing them:
//   node scripts/og-dumpsters.mjs
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const site = JSON.parse(await readFile(new URL('../sites/dumpsters/data/site.json', import.meta.url), 'utf8'));
const from = Math.min(...site.sizes.flatMap((s) => Object.values(s.prices)));
const sizes = site.sizes.map((s) => s.yards).join(' · ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0v36" fill="none" stroke="#fff" stroke-opacity=".05" stroke-width="2"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="#121c15"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect y="0" width="1200" height="10" fill="#8cc63f"/>

  <text x="72" y="130" fill="#8cc63f" font-family="Arial, sans-serif" font-weight="700" font-size="26" letter-spacing="5">CUSUMANO DUMPSTER RENTALS</text>
  <text x="72" y="215" fill="#fff" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="72">Dumpster rentals</text>
  <text x="72" y="295" fill="#fff" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="72">in Monroe County</text>
  <text x="72" y="365" fill="#b9c6bb" font-family="Arial, sans-serif" font-size="32">${sizes} yard · 3, 5 or 7 days · same-day drop-off</text>

  <rect x="72" y="420" width="250" height="120" rx="18" fill="#8cc63f"/>
  <text x="197" y="462" text-anchor="middle" fill="#1a241d" font-family="Arial, sans-serif" font-weight="700" font-size="22" letter-spacing="2">FROM</text>
  <text x="197" y="522" text-anchor="middle" fill="#1a241d" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="60">$${from}</text>
  <text x="352" y="472" fill="#fff" font-family="Arial, sans-serif" font-weight="700" font-size="34">Call or text</text>
  <text x="352" y="522" fill="#fff" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="44">${site.contact.phone}</text>

  <g transform="translate(760 330) scale(0.78)">
    <rect x="95" y="232" width="400" height="24" rx="4" fill="#2b332d"/>
    <path d="M60 250h40" stroke="#c9d3c4" stroke-width="10" stroke-linecap="round"/>
    <path d="M100 90h390l-12 145H112z" fill="#3f8a2f"/>
    <path d="M100 90h390v18H100z" fill="#2f6e23"/>
    <g stroke="#2f6e23" stroke-width="6"><path d="M160 108v125"/><path d="M220 108v125"/><path d="M280 108v125"/><path d="M340 108v125"/><path d="M400 108v125"/><path d="M455 108v125"/></g>
    <circle cx="330" cy="266" r="30" fill="#1a1d1b"/><circle cx="330" cy="266" r="13" fill="#9aa39b"/>
    <circle cx="400" cy="266" r="30" fill="#1a1d1b"/><circle cx="400" cy="266" r="13" fill="#9aa39b"/>
  </g>
</svg>`;

const out = new URL('../sites/dumpsters/public/og.png', import.meta.url);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out.pathname.replace(/^\/([A-Za-z]:)/, '$1'));
console.log('Wrote sites/dumpsters/public/og.png');
