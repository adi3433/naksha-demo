import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { products } from "../data/products";
import { useRevealScope } from "../lib/reveal";
import ProductCard from "../components/ProductCard";
import Marquee from "../components/Marquee";
import Newsletter from "../components/Newsletter";
import SectionRule from "../components/SectionRule";
import SmartImage from "../components/SmartImage";

export default function Home() {
  const pageRef = useRef(null);
  const location = useLocation();
  useRevealScope(pageRef);

  useEffect(() => {
    if (location.state && location.state.scrollTo === "fabric") {
      const el = document.getElementById("fabric");
      if (el) el.scrollIntoView({ block: "start" });
    }
  }, [location.state]);

  return (
    <div ref={pageRef}>
      <section className="hero">
        <div className="hero-copy">
          <p className="meta">DROP 01 / AUTUMN 26</p>
          <h1 className="display display-hero">MADE TO BE WORN OUT.</h1>
          <p className="body-copy">
            Five pieces. Heavyweight cotton, cut and finished in Tiruppur.
            Built to be the thing you reach for every day, until it&rsquo;s
            soft in all the right places.
          </p>
          <div className="hero-ctas">
            <Link to="/shop" className="btn btn-solid">
              SHOP DROP 01
            </Link>
            <a
              href="#fabric"
              className="btn btn-ghost"
              onClick={(event) => {
                event.preventDefault();
                const el = document.getElementById("fabric");
                if (el) el.scrollIntoView({ block: "start" });
              }}
            >
              THE FABRIC
            </a>
          </div>
          <div className="hero-stats">
            <span>240–400 GSM</span>
            <span>5 STYLES</span>
            <span>S–XXL</span>
          </div>
        </div>
        <div className="hero-media">
          <SmartImage
            file="hero.jpg"
            alt="Model wearing the Oversized Heavy Tee in bone, studio portrait"
            label="NAKSHA / DROP 01"
            ratio="4 / 5"
            eager
          />
        </div>
      </section>

      <section className="home-section">
        <div className="wrap">
          <SectionRule label="01 — DROP 01" />
          <div className="section-head">
            <h2 className="display display-section">THE FIVE.</h2>
            <Link to="/shop" className="section-link">
              ALL PRODUCTS →
            </Link>
          </div>
          <div className="drop-grid">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <section className="home-section" id="fabric">
        <div className="wrap">
          <SectionRule label="02 — MATERIAL" />
          <div className="split" style={{ marginTop: 56 }}>
            <div className="split-copy">
              <h2 className="display display-section">WEIGHT YOU CAN FEEL.</h2>
              <p className="body-copy">
                Most tees in this price bracket are 140 to 180 GSM. Ours start
                at 240. The fabric is combed, compacted and sanforised before
                it&rsquo;s cut, so the garment you receive is the size it
                stays.
              </p>
              <dl className="spec-table">
                <div className="spec-row">
                  <dt className="meta">YARN</dt>
                  <dd>Combed cotton, 30s single jersey</dd>
                </div>
                <div className="spec-row">
                  <dt className="meta">WEIGHT</dt>
                  <dd>240 GSM tees · 400 GSM fleece</dd>
                </div>
                <div className="spec-row">
                  <dt className="meta">FINISH</dt>
                  <dd>Sanforised, enzyme-washed, bar-tacked</dd>
                </div>
              </dl>
            </div>
            <div className="reveal">
              <SmartImage
                file="fabric.jpg"
                alt="Macro close-up of 240 GSM combed cotton jersey"
                label="FABRIC / 240 GSM"
                ratio="4 / 5"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lookbook">
        <div className="lookbook-cell reveal">
          <SmartImage
            file="look-1.jpg"
            alt="Lookbook: Utility Hoodie in coal worn with the Wide-Leg Trouser"
            label="LOOKBOOK / 01"
            ratio="4 / 5"
          />
          <span className="lookbook-tag meta" style={{ color: "var(--bone)" }}>
            LOOKBOOK / 01
          </span>
        </div>
        <div className="lookbook-cell reveal" style={{ transitionDelay: "80ms" }}>
          <SmartImage
            file="look-2.jpg"
            alt="Lookbook: Cropped Work Jacket in bone over the Washed Boxy Tee"
            label="LOOKBOOK / 02"
            ratio="4 / 5"
          />
          <Link to="/shop" className="lookbook-link">
            VIEW ALL 12 →
          </Link>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
