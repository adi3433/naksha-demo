// Generates shopify/products.csv from src/data/products.js so the dev store
// catalogue can never drift from the demo catalogue.
// Run: node scripts/generate-shopify-csv.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { products } from "../src/data/products.js";

const HEADERS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Variant SKU",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Status"
];

const IN_STOCK_QTY = 25;

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function bodyHtml(product) {
  const items = product.details.map((d) => `<li>${d}</li>`).join("");
  return `<p>${product.short}</p><ul>${items}</ul><p>${product.care}</p>`;
}

function sku(product, color, size) {
  const c = color.replace(/\s+/g, "").slice(0, 4).toUpperCase();
  return `NK-${product.slug.split("-").map((w) => w[0]).join("").toUpperCase()}-${c}-${size}`;
}

const rows = [HEADERS];

for (const product of products) {
  let first = true;
  for (const color of product.colors) {
    for (const size of product.sizes) {
      const soldOut = product.soldOutSizes.includes(size);
      rows.push([
        product.slug,
        first ? product.name : "",
        first ? bodyHtml(product) : "",
        first ? "NAKSHA" : "",
        first ? product.category : "",
        first ? `${product.category}, Drop 01, ${product.gsm}` : "",
        first ? "TRUE" : "",
        "Color",
        color.name,
        "Size",
        size,
        sku(product, color.name, size),
        "shopify",
        soldOut ? 0 : IN_STOCK_QTY,
        "deny",
        "manual",
        product.price,
        "TRUE",
        "TRUE",
        first ? "active" : ""
      ]);
      first = false;
    }
  }
}

const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n") + "\n";
await mkdir(new URL("../shopify/", import.meta.url), { recursive: true });
await writeFile(new URL("../shopify/products.csv", import.meta.url), csv, "utf8");
console.log(
  `Wrote shopify/products.csv: ${products.length} products, ${rows.length - 1} variant rows`
);
