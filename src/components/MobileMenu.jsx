import { Link } from "react-router-dom";
import { useOverlay } from "../lib/overlay";

export default function MobileMenu({ onClose, onFabric }) {
  const panelRef = useOverlay(true, onClose);

  return (
    <div
      className="screen-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      ref={panelRef}
    >
      <div className="screen-overlay-top">
        <span className="wordmark">NAKSHA</span>
        <button type="button" className="text-btn" onClick={onClose}>
          CLOSE
        </button>
      </div>
      <nav className="menu-links" aria-label="Menu">
        <Link to="/shop" onClick={onClose}>
          SHOP
        </Link>
        <Link to="/shop" onClick={onClose}>
          DROP 01
        </Link>
        <a href="#fabric" onClick={onFabric}>
          FABRIC
        </a>
        <Link to="/about" onClick={onClose}>
          ABOUT
        </Link>
        <Link to="/contact" onClick={onClose}>
          CONTACT
        </Link>
      </nav>
    </div>
  );
}
