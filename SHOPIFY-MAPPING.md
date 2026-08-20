# NAKSHA demo → Shopify mapping

Everything on screen in this demo is buildable on Shopify without custom apps.
This table is the paper trail for the client conversation.

| What's on screen | Shopify reality |
|---|---|
| Products, prices, images | Products + media in admin |
| Colour / size options | Native variants (2 options, up to 100 combinations) |
| GSM, model height, care | Metafields on the product |
| Category chips on `/shop` | Collections (automated by tag) |
| Size filter, sort | Native Search & Discovery app filters |
| Bag drawer | Cart AJAX API — standard in Dawn |
| Free shipping meter | Cart subtotal + shipping rate at ₹1,999 |
| Checkout | Shopify's hosted checkout. Not rebuildable, not restyleable beyond branding. |
| Payments | Third-party gateway (Razorpay / PayU / Cashfree) — **Shopify Payments is not available in India**, so plan on a gateway plus Shopify's transaction fee |
| Newsletter | Customer signup / email app |
| Contact form | Native `contact` form template |
| Policy pages | Shopify's policy generator |
| Marquee, reveals, split sections | Custom Liquid sections in a Dawn-based theme |

## This demo already talks to Shopify

The demo is wired for a live connection through the **Storefront API** — the
same API every headless Shopify build (Hydrogen included) uses:

- `src/lib/shopify.js` holds the GraphQL client, catalogue query, and
  `cartCreate` mutation.
- With a dev store connected (see `shopify/SETUP.md`), prices and per-size
  availability on every page come live from Shopify, and **CHECKOUT creates a
  real Shopify cart and redirects to the hosted checkout**.
- `shopify/products.csv` imports the full NAKSHA catalogue (5 products,
  53 variants, sold-out sizes at zero inventory) into any store in one step.
  Product handles match the demo's slugs, so the mapping is one-to-one.

Two production paths from here:

1. **Theme build (recommended for this catalogue size):** rebuild these five
   templates as custom Liquid sections on a Dawn base. Everything in the table
   above applies directly.
2. **Headless (this demo's architecture):** keep the React front end, serve
   catalogue + cart from the Storefront API, hand off to Shopify checkout.
   More flexible, more maintenance — usually overkill for five styles, and
   saying so to the client is part of the credibility.
