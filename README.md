# NAKSHA — demo storefront

Concept demo for a heavyweight-basics apparel label, built as a Shopify
proposal. Five routes, working bag, live Shopify Storefront API wiring.

**Fictional brand, fictional products, no orders are processed.**

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Routes

| Route | Page |
|---|---|
| `#/` | Home — hero, drop grid, marquee, fabric, lookbook, newsletter |
| `#/shop` | Shop — category + size filters, sort, live count |
| `#/product/:slug` | PDP — gallery, variants, size guide, accordion, sticky mobile bar |
| `#/about` | About — story, process, Tiruppur |
| `#/contact` | Contact — validated form, FAQ |

Hash routing so the static build deep-links correctly on GitHub Pages.

## Photography

Drop images into `src/assets/images/` with these exact names, then rebuild.
Missing files render as clean spec-sheet placeholder blocks — never broken.

- `hero.jpg` (portrait 4:5)
- `tee-oversized-1.jpg` `-2` `-3` · `tee-washed-1/2/3` · `hoodie-1/2/3` ·
  `trouser-1/2/3` · `jacket-1/2/3` (4:5; `-1` front on-model, `-2` back or
  three-quarter — this is the hover swap, `-3` fabric close-up)
- `look-1.jpg` `look-2.jpg` (4:5) · `fabric.jpg` (4:5) · `about-1.jpg` (4:5)
- `detail-bartack.jpg` (3:2) · `factory.jpg` (3:2)

Crop to 4:5 at 1200×1500, compress under 200KB each.

## Shopify

- `SHOPIFY-MAPPING.md` — how every screen element maps to Shopify.
- `shopify/SETUP.md` — connect a free dev store in ~15 minutes; the demo then
  pulls live prices/stock and CHECKOUT lands on Shopify's real hosted checkout.
- `shopify/products.csv` — one-click catalogue import (regenerate with
  `node scripts/generate-shopify-csv.mjs`).

## Deploy

Built `dist/` is pushed to the `gh-pages` branch and served by GitHub Pages.
