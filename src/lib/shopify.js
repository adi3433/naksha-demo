// Shopify Storefront API client.
//
// The demo runs on local catalogue data until a dev store is connected.
// Set these two values in .env.local (see shopify/SETUP.md), rebuild, and the
// storefront goes live: prices and size availability come from Shopify, and
// CHECKOUT creates a real Shopify cart and hands the shopper to the hosted
// checkout. Storefront API tokens are publishable by design (they ship in
// client-side JS on every headless Shopify build).
//
//   VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
//   VITE_SHOPIFY_STOREFRONT_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2025-07";

export const shopifyEnabled = Boolean(DOMAIN && TOKEN);

async function storefront(query, variables = {}) {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) {
    throw new Error(`Storefront API responded ${res.status}`);
  }
  const json = await res.json();
  if (json.errors && json.errors.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

const CATALOGUE_QUERY = `
  query DemoCatalogue {
    products(first: 20) {
      nodes {
        handle
        variants(first: 50) {
          nodes {
            id
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

function optionValue(variant, name) {
  const found = variant.selectedOptions.find(
    (o) => o.name === name || (name === "Color" && o.name === "Colour")
  );
  return found ? found.value : "";
}

// Returns { [handle]: { price, soldOutSizes, variantIds: { "Color|Size": gid } } }
// Handles in the dev store match the local slugs (shopify/products.csv sets them).
export async function fetchLiveCatalogue() {
  const data = await storefront(CATALOGUE_QUERY);
  const map = {};
  for (const node of data.products.nodes) {
    const variants = node.variants.nodes;
    const variantIds = {};
    const sizes = new Set();
    let price = null;
    for (const variant of variants) {
      const color = optionValue(variant, "Color");
      const size = optionValue(variant, "Size");
      variantIds[`${color}|${size}`] = variant.id;
      if (size) sizes.add(size);
      if (price === null) price = Math.round(Number(variant.price.amount));
    }
    // A size is sold out only when no colour of that size is available.
    const soldOutSizes = Array.from(sizes).filter(
      (size) =>
        !variants.some(
          (variant) =>
            optionValue(variant, "Size") === size && variant.availableForSale
        )
    );
    map[node.handle] = { price, soldOutSizes, variantIds };
  }
  return map;
}

// Resolve a bag line (slug + colour + size) to a Shopify variant GID.
export function resolveVariantId(catalogue, item) {
  const remote = catalogue && catalogue[item.slug];
  if (!remote) return null;
  return (
    remote.variantIds[`${item.color}|${item.size}`] ||
    remote.variantIds[`|${item.size}`] ||
    null
  );
}

const CART_CREATE_MUTATION = `
  mutation DemoCartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`;

// Creates a real Shopify cart from the bag and returns the hosted checkout URL.
export async function createCheckout(lines) {
  const data = await storefront(CART_CREATE_MUTATION, { lines });
  const errors = data.cartCreate.userErrors;
  if (errors && errors.length) {
    throw new Error(errors[0].message);
  }
  const url = data.cartCreate.cart && data.cartCreate.cart.checkoutUrl;
  if (!url) {
    throw new Error("Shopify did not return a checkout URL");
  }
  return url;
}
