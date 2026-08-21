import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bySlug, products } from "../data/products";
import { useBag } from "../lib/bag";
import { useLiveProduct } from "../lib/live";
import { rupees } from "../lib/format";
import { useRevealScope } from "../lib/reveal";
import ProductCard from "../components/ProductCard";
import SectionRule from "../components/SectionRule";
import SizeGuide from "../components/SizeGuide";
import SmartImage from "../components/SmartImage";

const IMAGE_ALTS = [
  "worn on model, front view",
  "worn on model, back three-quarter view",
  "fabric close-up"
];

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const local = bySlug(slug);
  const p = useLiveProduct(local);
  const { addItem, openDrawer } = useBag();

  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [barVisible, setBarVisible] = useState(false);

  const pageRef = useRef(null);
  const galleryRef = useRef(null);
  const addBtnRef = useRef(null);
  const addedTimer = useRef(null);

  useRevealScope(pageRef, [slug]);

  useEffect(() => {
    setColorIndex(0);
    setSize(null);
    setAdded(false);
    setActiveDot(0);
  }, [slug]);

  useEffect(() => {
    if (!local) navigate("/shop", { replace: true });
  }, [local, navigate]);

  // A scroll listener rather than an IntersectionObserver: fast flicks can
  // move the button across the whole viewport between frames, which never
  // fires an intersection change, so the bar would fail to appear.
  useEffect(() => {
    const onScroll = () => {
      const btn = addBtnRef.current;
      if (!btn) return;
      setBarVisible(btn.getBoundingClientRect().bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  if (!local) return null;

  const selectedColor = p.colors[Math.min(colorIndex, p.colors.length - 1)];
  const others = products.filter((item) => item.slug !== slug).slice(0, 3);

  function onGalleryScroll() {
    const el = galleryRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveDot(Math.round(el.scrollLeft / el.clientWidth));
  }

  function addToBag() {
    if (!size) return;
    addItem({
      slug: p.slug,
      name: p.name,
      price: p.price,
      color: selectedColor.name,
      size
    });
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1200);
    openDrawer();
  }

  const buttonLabel = !size ? "SELECT A SIZE" : added ? "ADDED" : "ADD TO BAG";

  return (
    <div className="page-pad" ref={pageRef}>
      <div className="wrap">
        <div className="pdp">
          <div className="pdp-left">
            <div
              className="pdp-gallery"
              ref={galleryRef}
              onScroll={onGalleryScroll}
            >
              {p.images.map((file, index) => (
                <SmartImage
                  key={file}
                  file={file}
                  alt={`${p.name} in ${selectedColor.name}, ${
                    IMAGE_ALTS[index] || "detail view"
                  }`}
                  label={`${p.name} / ${index + 1}`}
                  ratio="4 / 5"
                  eager={index === 0}
                />
              ))}
            </div>
            <div className="pdp-dots" aria-hidden="true">
              {p.images.map((file, index) => (
                <i
                  key={file}
                  className={index === activeDot ? "is-active" : undefined}
                />
              ))}
            </div>
          </div>

          <div className="buy-panel">
            <p className="meta breadcrumb">
              <Link to="/shop">SHOP</Link> /{" "}
              <Link to={`/shop?cat=${p.category}`}>
                {p.category.toUpperCase()}
              </Link>
            </p>
            {p.badge && <p className="meta pdp-badge">{p.badge}</p>}
            <h1 className="display display-pdp">{p.name}</h1>
            <div className="pdp-price">
              <span className="price">{rupees(p.price)}</span>
              <span className="meta">MRP incl. of all taxes</span>
            </div>
            <p className="body-copy">{p.short}</p>
            <div className="pdp-hair" />

            <div className="option-block">
              <span className="meta">
                COLOUR — {selectedColor.name.toUpperCase()}
              </span>
              <div className="swatch-row">
                {p.colors.map((color, index) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`swatch${
                      index === colorIndex ? " is-selected" : ""
                    }`}
                    style={{ background: color.hex }}
                    aria-label={`Colour ${color.name}`}
                    aria-pressed={index === colorIndex}
                    onClick={() => setColorIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="option-block">
              <div className="option-label-row">
                <span className="meta">SIZE</span>
                <button
                  type="button"
                  className="text-btn"
                  style={{ minHeight: 0, color: "var(--ash)" }}
                  onClick={() => setGuideOpen(true)}
                >
                  SIZE GUIDE
                </button>
              </div>
              <div className="size-row">
                {p.sizes.map((option) => {
                  const soldOut = p.soldOutSizes.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`size-btn${
                        size === option ? " is-selected" : ""
                      }`}
                      disabled={soldOut}
                      aria-pressed={size === option}
                      aria-label={
                        soldOut ? `Size ${option}, sold out` : `Size ${option}`
                      }
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-solid add-btn"
              disabled={!size}
              onClick={addToBag}
              ref={addBtnRef}
            >
              {buttonLabel}
            </button>

            <dl className="delivery-strip">
              <div className="spec-row">
                <dt className="meta">Style</dt>
                <dd>
                  NK-
                  {p.slug
                    .split("-")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                  -{selectedColor.name.replace(/\s+/g, "").slice(0, 4).toUpperCase()}{" "}
                  · {p.gsm}
                </dd>
              </div>
              <div className="spec-row">
                <dt className="meta">Delivery</dt>
                <dd>2–5 days · Free over ₹1,999</dd>
              </div>
              <div className="spec-row">
                <dt className="meta">Returns</dt>
                <dd>7-day exchange, pickup included</dd>
              </div>
              <div className="spec-row">
                <dt className="meta">Payment</dt>
                <dd>UPI · Cards · Netbanking · COD</dd>
              </div>
            </dl>

            <div>
              <details className="accordion" open>
                <summary>
                  DETAILS
                  <span className="chev" aria-hidden="true" />
                </summary>
                <div className="accordion-body">
                  <ul>
                    {p.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>
              <details className="accordion">
                <summary>
                  SIZE &amp; FIT
                  <span className="chev" aria-hidden="true" />
                </summary>
                <div className="accordion-body">
                  <p>{p.model}</p>
                  <p style={{ marginTop: 8 }}>Fit: boxy, oversized</p>
                </div>
              </details>
              <details className="accordion">
                <summary>
                  CARE
                  <span className="chev" aria-hidden="true" />
                </summary>
                <div className="accordion-body">
                  <p>{p.care}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <figure className="pdp-detail-image reveal">
        <SmartImage
          file="detail-bartack.jpg"
          alt="Close-up of bar-tack stitching reinforcing a side seam"
          label="DETAIL / BAR-TACK"
          ratio="3 / 2"
        />
        <figcaption className="meta">
          BAR-TACKED AT EVERY STRESS POINT.
        </figcaption>
      </figure>

      <section className="home-section">
        <div className="wrap">
          <SectionRule label="04 — MORE" />
          <div className="section-head">
            <h2 className="display display-section">WEARS WELL WITH.</h2>
          </div>
          <div className="more-grid">
            {others.map((item, index) => (
              <ProductCard key={item.slug} product={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div className={`sticky-buy-bar${barVisible ? " is-visible" : ""}`}>
        <span className="price">{rupees(p.price)}</span>
        <button
          type="button"
          className="btn btn-solid"
          disabled={!size}
          onClick={addToBag}
        >
          {buttonLabel}
        </button>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
