import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBag } from "../lib/bag";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { count, openDrawer } = useBag();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const goFabric = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    navigate("/", { state: { scrollTo: "fabric" } });
  };

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header className={`site-header${transparent ? " is-top" : ""}`}>
        <div className="header-inner wrap">
          <Link to="/" className="wordmark" aria-label="NAKSHA home">
            NAKSHA
          </Link>
          <nav className="main-nav" aria-label="Primary">
            <Link to="/shop">SHOP</Link>
            <Link to="/shop">DROP 01</Link>
            <a href="#fabric" onClick={goFabric}>
              FABRIC
            </a>
            <Link to="/about">ABOUT</Link>
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="text-btn search-btn"
              onClick={() => setSearchOpen(true)}
            >
              SEARCH
            </button>
            <button type="button" className="text-btn" onClick={openDrawer}>
              BAG ({count})
            </button>
            <button
              type="button"
              className="menu-btn"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <MobileMenu onClose={closeMenu} onFabric={goFabric} />}
      {searchOpen && <SearchOverlay onClose={closeSearch} />}
    </>
  );
}
