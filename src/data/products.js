export const products = [
  {
    slug: "oversized-heavy-tee",
    name: "Oversized Heavy Tee",
    category: "Tees",
    price: 1499,
    gsm: "240 GSM",
    badge: "BEST SELLER",
    colors: [
      { name: "Bone", hex: "#EDE8DC" },
      { name: "Coal", hex: "#161616" },
      { name: "Cobalt", hex: "#1B3BFF" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOutSizes: ["S"],
    images: ["tee-oversized-1.jpg", "tee-oversized-2.jpg", "tee-oversized-3.jpg"],
    short: "Dropped shoulder, boxy body, ribbed collar that holds its shape.",
    details: [
      "240 GSM combed cotton, single jersey",
      "Dropped shoulder, boxy fit — size down for a regular fit",
      "Ribbed collar with twin-needle topstitch",
      "Bar-tacked at both side seams",
      "Sanforised: less than 3% residual shrinkage"
    ],
    care: "Machine wash cold, inside out. Tumble dry low. Do not iron the print.",
    model: "Model is 5'11\" / 180 cm, chest 38\", wearing M."
  },
  {
    slug: "washed-boxy-tee",
    name: "Washed Boxy Tee",
    category: "Tees",
    price: 1699,
    gsm: "240 GSM",
    badge: null,
    colors: [
      { name: "Faded Black", hex: "#3A3A38" },
      { name: "Sand", hex: "#C8BCA6" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOutSizes: [],
    images: ["tee-washed-1.jpg", "tee-washed-2.jpg", "tee-washed-3.jpg"],
    short: "Garment-dyed and enzyme-washed, so it arrives already broken in.",
    details: [
      "240 GSM combed cotton, garment-dyed",
      "Enzyme wash for a lived-in hand feel",
      "Boxy body, straight hem",
      "Colour settles by 5–8% after the first wash — this is intended"
    ],
    care: "Wash separately for the first two washes. Cold water only.",
    model: "Model is 5'9\" / 175 cm, chest 40\", wearing L."
  },
  {
    slug: "utility-hoodie",
    name: "Utility Hoodie",
    category: "Hoodies",
    price: 3299,
    gsm: "400 GSM",
    badge: "NEW",
    colors: [
      { name: "Coal", hex: "#161616" },
      { name: "Ash", hex: "#8C8A84" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOutSizes: ["XXL"],
    images: ["hoodie-1.jpg", "hoodie-2.jpg", "hoodie-3.jpg"],
    short: "400 GSM brushed fleece, two-panel hood, kangaroo pocket with a hidden divider.",
    details: [
      "400 GSM brushed-back cotton fleece",
      "Two-panel hood, flat drawcord with metal tips",
      "Kangaroo pocket, internally divided",
      "Ribbed cuffs and hem, 5% elastane"
    ],
    care: "Machine wash cold. Do not bleach. Dry flat in shade.",
    model: "Model is 6'0\" / 183 cm, chest 40\", wearing L."
  },
  {
    slug: "wide-leg-trouser",
    name: "Wide-Leg Trouser",
    category: "Trousers",
    price: 2899,
    gsm: "280 GSM",
    badge: null,
    colors: [
      { name: "Coal", hex: "#161616" },
      { name: "Khaki", hex: "#7C7256" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    soldOutSizes: [],
    images: ["trouser-1.jpg", "trouser-2.jpg", "trouser-3.jpg"],
    short: "Single-pleat, wide through the thigh, breaks clean at the ankle.",
    details: [
      "280 GSM cotton twill, mid-weight",
      "Single forward pleat, no-roll waistband",
      "Deep slash pockets, one welt pocket at the back",
      "Unfinished inseam — 2 inches of length to alter"
    ],
    care: "Machine wash cold. Warm iron on the reverse.",
    model: "Model is 5'11\" / 180 cm, waist 32\", wearing 32."
  },
  {
    slug: "cropped-work-jacket",
    name: "Cropped Work Jacket",
    category: "Outerwear",
    price: 4499,
    gsm: "320 GSM",
    badge: "5 LEFT",
    colors: [
      { name: "Coal", hex: "#161616" },
      { name: "Bone", hex: "#EDE8DC" }
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOutSizes: ["S", "XL"],
    images: ["jacket-1.jpg", "jacket-2.jpg", "jacket-3.jpg"],
    short: "Boxy chore jacket, cropped at the hip, four pockets that actually hold things.",
    details: [
      "320 GSM cotton canvas, unlined",
      "Four patch pockets, two chest, two hip",
      "Corozo buttons, chain-stitched shanks",
      "Triple-needle felled seams throughout"
    ],
    care: "Spot clean or dry clean. Canvas softens with wear.",
    model: "Model is 5'8\" / 173 cm, chest 36\", wearing M."
  }
];

export function bySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function isSoldOut(product) {
  return product.sizes.every((s) => product.soldOutSizes.includes(s));
}
