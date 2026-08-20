import { Link } from "react-router-dom";
import { rupees } from "../lib/format";
import { isSoldOut } from "../data/products";
import { useLiveProduct } from "../lib/live";
import SmartImage from "./SmartImage";

export default function ProductCard({ product, index = 0 }) {
  const p = useLiveProduct(product);
  const soldOut = isSoldOut(p);

  return (
    <Link
      to={`/product/${p.slug}`}
      className="product-card reveal"
      style={{ transitionDelay: `${(index % 8) * 80}ms` }}
    >
      <div className={`card-media${soldOut ? " is-soldout" : ""}`}>
        {soldOut && <span className="soldout-label">SOLD OUT</span>}
        <SmartImage
          className="card-primary"
          file={p.images[0]}
          alt={`${p.name} in ${p.colors[0].name}, worn on model, front view`}
          label={p.name}
        />
        <div className="card-alt" aria-hidden="true">
          <SmartImage file={p.images[1]} alt="" label={p.name} />
        </div>
      </div>
      <div className="card-row">
        <span className="card-name">{p.name}</span>
        <span className="price">{rupees(p.price)}</span>
      </div>
      <p className="meta card-meta">{p.gsm}</p>
      <div className="card-swatches">
        {p.colors.map((color) => (
          <i key={color.name} style={{ background: color.hex }} />
        ))}
      </div>
    </Link>
  );
}
