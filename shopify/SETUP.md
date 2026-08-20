# Connecting the demo to a real Shopify dev store

About 15 minutes, no billing required. When you're done, the demo pulls live
prices and stock from Shopify and the CHECKOUT button lands on Shopify's real
hosted checkout.

## 1. Create the dev store

1. Sign in (or sign up, free) at https://partners.shopify.com
2. Stores → Add store → **Create development store** → "Create a store to test
   and build".
3. Store name: anything (e.g. `naksha-demo`). **Set the store's location /
   currency to India (INR)** so prices match the demo.

## 2. Import the catalogue

1. In the store admin: **Products → Import** and upload
   `shopify/products.csv` from this repo.
2. Publish everything to the Online Store channel (the CSV marks products
   active; Shopify may ask once).

The CSV carries all 5 products with Color × Size variants, INR prices, and
sold-out sizes at zero inventory. Handles match the demo's URL slugs — do not
rename them.

## 3. Create a Storefront API token

1. Admin → **Settings → Apps and sales channels → Develop apps** →
   "Allow custom app development" → **Create an app** (name: `naksha-demo`).
2. Configuration → **Storefront API** → enable the scopes:
   `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`,
   `unauthenticated_read_checkouts`.
3. **Install app**, then copy the **Storefront API access token**
   (this token type is safe to ship in client-side code).

## 4. Wire it up

Create `.env.local` in the repo root:

```
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=paste-token-here
```

Then rebuild and redeploy (`npm run build`, push `dist` to `gh-pages`), or run
`npm run dev` to see it locally. That's the whole switch — the demo detects
the credentials at build time.

## What changes when it's live

- Prices and per-size availability on the shop grid, PDPs, and bag come from
  the Storefront API (`src/lib/shopify.js`).
- CHECKOUT builds a real Shopify cart via `cartCreate` and redirects to the
  hosted checkout with the right line items.
- If the store is unreachable, the demo falls back to local data silently —
  it never breaks in front of the client.

## The dev-store password page

Development stores keep their storefront password until the store is put on a
paid plan — it cannot be switched off. This only affects the final checkout
page (the demo itself browses via the Storefront API and is never blocked).

The standard agency workaround:

1. Admin → Online Store → Preferences → set the password to something clean,
   e.g. `naksha`.
2. Before demoing checkout, open https://naksha-demo.myshopify.com once in the
   same browser and enter the password. Shopify remembers it for the session,
   and CHECKOUT from the demo then goes straight to the real checkout page.
3. Tell the client the same: "store preview password: naksha". Clients are
   used to password-gated previews; the wall disappears automatically the day
   the store goes on a plan.
