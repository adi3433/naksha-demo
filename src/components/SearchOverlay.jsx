import { Link } from "react-router-dom";
import { useOverlay } from "../lib/overlay";

const SUGGESTED = [
  { label: "OVERSIZED HEAVY TEE", to: "/product/oversized-heavy-tee" },
  { label: "UTILITY HOODIE", to: "/product/utility-hoodie" },
  { label: "WIDE-LEG TROUSER", to: "/product/wide-leg-trouser" }
];

export default function SearchOverlay({ onClose }) {
  const panelRef = useOverlay(true, onClose);

  return (
    <div
      className="screen-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      ref={panelRef}
    >
      <div className="screen-overlay-top">
        <span className="meta meta-dark">SEARCH</span>
        <button type="button" className="text-btn" onClick={onClose}>
          CLOSE
        </button>
      </div>
      <div className="search-body">
        <label className="sr-only" htmlFor="search-input">
          Search the store
        </label>
        <input
          id="search-input"
          className="search-input"
          type="search"
          placeholder="What are you looking for?"
        />
        <div className="search-suggest">
          <p className="meta">SUGGESTED</p>
          {SUGGESTED.map((item) => (
            <Link key={item.to} to={item.to} onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
