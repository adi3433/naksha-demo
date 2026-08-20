import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { useRevealScope } from "../lib/reveal";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["ALL", "TEES", "HOODIES", "TROUSERS", "OUTERWEAR"];
// Every size value in the catalogue, in first-seen order (S–XXL, then 28–36),
// mirroring how Shopify's Search & Discovery filters enumerate option values.
const SIZES = [...new Set(products.flatMap((p) => p.sizes))];
const SORTS = [
  { value: "newest", label: "NEWEST" },
  { value: "price-asc", label: "PRICE: LOW TO HIGH" },
  { value: "price-desc", label: "PRICE: HIGH TO LOW" }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = (searchParams.get("cat") || "ALL").toUpperCase();
  const category = CATEGORIES.includes(catParam) ? catParam : "ALL";
  const [sizes, setSizes] = useState([]);
  const [sort, setSort] = useState("newest");
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "ALL" && p.category.toUpperCase() !== category) {
        return false;
      }
      if (
        sizes.length > 0 &&
        !sizes.some(
          (size) => p.sizes.includes(size) && !p.soldOutSizes.includes(size)
        )
      ) {
        return false;
      }
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sizes, sort]);

  useRevealScope(gridRef, [filtered]);

  function setCategory(next) {
    if (next === "ALL") setSearchParams({}, { replace: true });
    else setSearchParams({ cat: next }, { replace: true });
  }

  function toggleSize(size) {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
    setSizes([]);
  }

  return (
    <div className="page-pad">
      <div className="wrap shop-head">
        <p className="meta">ALL PRODUCTS ({products.length})</p>
        <h1 className="display display-section">EVERYTHING.</h1>
      </div>

      <div className="filter-bar">
        <div className="wrap filter-inner">
          <div className="chip-row" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip${category === cat ? " is-active" : ""}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="chip-row" role="group" aria-label="Filter by size">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                className={`chip chip-size${
                  sizes.includes(size) ? " is-active" : ""
                }`}
                aria-pressed={sizes.includes(size)}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="sort-box">
            <label className="meta" htmlFor="shop-sort">
              SORT
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="wrap" ref={gridRef}>
        {filtered.length === 0 ? (
          <div className="shop-empty">
            <h2>NOTHING IN THIS COMBINATION.</h2>
            <button type="button" className="text-btn" onClick={clearFilters}>
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <>
            <p className="meta shop-count" aria-live="polite">
              SHOWING {filtered.length} OF {products.length}
            </p>
            <div className="shop-grid">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
