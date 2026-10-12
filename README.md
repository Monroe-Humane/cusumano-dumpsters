# Cusumano websites

Two one-page sites from one folder, both static Astro + Tailwind v4, hosted on GitHub Pages.
No database, no server, no API keys.

| Site | Folder | Live address | Look |
|---|---|---|---|
| **Cusumano Home Improvements** (construction) | `sites/construction/` | https://cusumanohi.com | charcoal + logo gold |
| **Cusumano Dumpster Rentals** | `sites/dumpsters/` | https://cusdump.com | charcoal + logo lime |

Each site links to the other (header, services band, footer).

## Folder layout

```
astro.config.construction.mjs   one config per site (folders, address, dev port)
astro.config.dumpsters.mjs
astro.config.shared.mjs         settings both share
shared/                         used by both sites
  styles/base.css               design tokens and .ui-* classes. Charcoal + off-white shared; each site sets
                                one accent (--color-accent) in its styles/site.css. Oswald headings, Source Sans body.
  components/                   Icon, SectionHead, SiteHeader, Faq, Reviews, PageHeader, PrivacyPolicy
  layouts/BaseLayout.astro      <head>, meta tags, fonts, search-engine data
sites/construction/
  data/site.json                ALL text: services, gallery, FAQ, contact, address
  assets/work/                  project photos (optimized automatically at build)
  styles/site.css               imports shared/base.css (default gold accent)
sites/dumpsters/
  data/site.json                ALL text: sizes, prices, fees, materials, FAQ, full rental terms
  styles/site.css               imports shared/base.css and sets the lime accent
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

## Deploying (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds both sites:

| Site | Published to | Address |
|---|---|---|
| construction | GitHub Pages of `Monroe-Humane/cusumano-websites` (this repo) | https://cusumanohi.com |
| dumpsters | `gh-pages` branch of `Monroe-Humane/cusumano-dumpsters` | https://cusdump.com |

The dumpster push uses a deploy key: the private half is this repo's `DUMPSTERS_DEPLOY_KEY`
secret, the public half is a write deploy key on `cusumano-dumpsters`.

DNS for both domains is at GoDaddy. Each has the four GitHub Pages A records on `@`
(185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and `www` as a CNAME
to `monroe-humane.github.io`. Each site's `public/CNAME` holds its domain.

GitHub Pages ignores the `_headers` files (they were written for Cloudflare Pages).

To change the dumpster site's address, update `astro.config.dumpsters.mjs` (`site`), `url` in
`sites/dumpsters/data/site.json`, `sites/dumpsters/public/robots.txt`, `sites/dumpsters/public/CNAME`,
`cname` in the workflow and `links.dumpsterSite` in `sites/construction/data/site.json`.
