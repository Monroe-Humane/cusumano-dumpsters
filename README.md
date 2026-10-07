# Cusumano websites

Two one-page sites from one folder, both static Astro + Tailwind v4 for Cloudflare Pages.
No database, no server, no API keys.

| Site | Folder | Live address | Look |
|---|---|---|---|
| **Cusumano Home Improvements** (construction) | `sites/construction/` | https://cusumanohi.com | navy + orange |
| **Cusumano Dumpster Rentals** | `sites/dumpsters/` | placeholder: https://cusumano-dumpsters.pages.dev | green |

Each site links to the other (header, services band, footer).

## Folder layout

```
astro.config.construction.mjs   one config per site (folders, address, dev port)
astro.config.dumpsters.mjs
astro.config.shared.mjs         settings both share
shared/                         used by both sites
  styles/base.css               design tokens (colours, fonts) and .ui-* classes: buttons, cards, headings
  components/                   Icon, SectionHead, SiteHeader (sticky header + phone menu), Faq
  layouts/BaseLayout.astro      <head>, meta tags, fonts, search-engine data
sites/construction/
  data/site.json                ALL text: services, gallery, FAQ, contact, address
  assets/work/                  project photos (optimized automatically at build)
  styles/site.css               imports shared/base.css (default navy/orange)
sites/dumpsters/
  data/site.json                ALL text: sizes, prices, fees, materials, FAQ, full rental terms
  styles/site.css               imports shared/base.css and swaps in the green colours
  pages/terms.astro             the Terms & Conditions page (/terms/)
```

## Editing content

- **Construction:** `sites/construction/data/site.json`. Service groups, gallery captions,
  FAQ and contact details. The founding year (`foundedYear`) feeds the header, hero and footer.
- **Dumpsters:** `sites/dumpsters/data/site.json`. Change a price in `sizes[].prices` and the
  price cards, the live total on the request form and the Google data all update.
  The terms page is built from `terms.sections`.

### Photos (construction)

Project photos live in `sites/construction/assets/work/`. They came from the business's
Google Maps listing (originals and extras are in `D:\cusumanohi\google-photos\`). To add one,
drop the JPG in that folder and use its file name in `site.json` (`hero.image` or a
`gallery[]` entry). A wrong name fails the build with a message saying which file is missing.

The dumpster site uses a drawn trailer graphic in `sites/dumpsters/components/Hero.astro`
until there's a real photo.

## Forms

Both forms use [FormSubmit](https://formsubmit.co) and email `copernan@yahoo.com`
(`contact.formAction` in each `site.json`). The **first** message from each new domain sends
a confirmation email to that inbox; click its link once. Visitors then land on `/thanks/`.

The dumpster form is a request, not a booking: it emails size, days, quoted price, date,
address, materials and the terms agreement, and he calls to confirm. Payment is at delivery.

## Commands

```powershell
npm.cmd install
npm.cmd run dev:construction   # http://localhost:4321
npm.cmd run dev:dumpsters      # http://localhost:4322 (both can run at once)
npm.cmd run check              # type checks for both
npm.cmd run build              # dist/construction and dist/dumpsters
```

## Deploying (Cloudflare Pages)

Create **two** Pages projects from this repo:

| Project | Build command | Output directory |
|---|---|---|
| construction | `npm run build:construction` | `dist/construction` |
| dumpsters | `npm run build:dumpsters` | `dist/dumpsters` |

When the dumpster site's real address is chosen, update it in four places:
`astro.config.dumpsters.mjs` (`site`), `url` in `sites/dumpsters/data/site.json`,
`sites/dumpsters/public/robots.txt` and `links.dumpsterSite` in `sites/construction/data/site.json`.
Then point `cusumanohi.com` at the construction project (its DNS currently goes to WordPress.com).
