import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const goFabric = (event) => {
    event.preventDefault();
    navigate("/", { state: { scrollTo: "fabric" } });
  };

  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-cols">
            <nav aria-label="Shop">
              <h3>SHOP</h3>
              <ul>
                <li>
                  <Link to="/shop">All products</Link>
                </li>
                <li>
                  <Link to="/shop?cat=Tees">Tees</Link>
                </li>
                <li>
                  <Link to="/shop?cat=Hoodies">Hoodies</Link>
                </li>
                <li>
                  <Link to="/shop?cat=Trousers">Trousers</Link>
                </li>
                <li>
                  <Link to="/product/oversized-heavy-tee">Size guide</Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="Help">
              <h3>HELP</h3>
              <ul>
                <li>
                  <Link to="/contact">Shipping</Link>
                </li>
                <li>
                  <Link to="/contact">Returns &amp; exchange</Link>
                </li>
                <li>
                  <Link to="/contact">Track order</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="Brand">
              <h3>BRAND</h3>
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <a href="#fabric" onClick={goFabric}>
                    Fabric
                  </a>
                </li>
                <li>
                  <Link to="/about">Stockists</Link>
                </li>
                <li>
                  <Link to="/about">Careers</Link>
                </li>
              </ul>
            </nav>
            <div className="footer-brand">
              <span className="wordmark">NAKSHA</span>
              <p>Tiruppur → everywhere in India.</p>
              <ul>
                <li>
                  <Link to="/contact">Instagram</Link>
                </li>
                <li>
                  <Link to="/contact">WhatsApp</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bar">
            <span>© 2026 NAKSHA APPAREL LLP · GSTIN 33AABCN1234F1Z5</span>
            <span>Privacy · Terms · Refunds</span>
          </div>
        </div>
      </footer>
      <div className="demo-notice">
        <span className="meta">
          Concept demo. Fictional brand, fictional products, no orders are
          processed.
        </span>
      </div>
    </>
  );
}
