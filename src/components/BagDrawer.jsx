import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FREE_SHIPPING_THRESHOLD, useBag } from "../lib/bag";
import { useLiveCatalogue } from "../lib/live";
import { createCheckout, resolveVariantId } from "../lib/shopify";
import { rupees } from "../lib/format";
import { useOverlay } from "../lib/overlay";
import { bySlug } from "../data/products";
import SmartImage from "./SmartImage";

export default function BagDrawer() {
  const bag = useBag();
  const { catalogue, live } = useLiveCatalogue();
  const { drawerOpen, closeDrawer } = bag;
  const panelRef = useOverlay(drawerOpen, closeDrawer);
  const [view, setView] = useState("bag");
  const [checkoutError, setCheckoutError] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      setView("bag");
      setCheckoutError(null);
      setCheckingOut(false);
    }
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  // With a connected dev store, CHECKOUT builds a real Shopify cart and
  // redirects to the hosted checkout. Without one (or if the store is
  // unreachable), it shows the platform-boundary panel instead.
  async function onCheckout() {
    if (!live || !catalogue) {
      setView("handoff");
      return;
    }
    setCheckingOut(true);
    try {
      const lines = bag.items.map((item) => {
        const id = resolveVariantId(catalogue, item);
        if (!id) throw new Error(`no Shopify variant found for ${item.name}`);
        return { merchandiseId: id, quantity: item.qty };
      });
      const url = await createCheckout(lines);
      window.location.href = url;
    } catch (err) {
      setCheckingOut(false);
      setCheckoutError(err.message);
      setView("handoff");
    }
  }

  return (
    <>
      <div className="scrim" onClick={closeDrawer} aria-hidden="true" />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Bag"
        ref={panelRef}
      >
        <div className="drawer-head">
          <span className="meta meta-dark">BAG ({bag.count})</span>
          <button type="button" className="text-btn" onClick={closeDrawer}>
            CLOSE
          </button>
        </div>
        {view === "handoff" ? (
          <HandoffPanel error={checkoutError} onBack={() => setView("bag")} />
        ) : bag.items.length === 0 ? (
          <EmptyPanel onClose={closeDrawer} />
        ) : (
          <BagPanel bag={bag} checkingOut={checkingOut} onCheckout={onCheckout} />
        )}
      </aside>
    </>
  );
}

function BagPanel({ bag, onCheckout, checkingOut }) {
  const remaining = FREE_SHIPPING_THRESHOLD - bag.subtotal;
  const progress = Math.min(100, (bag.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div className="drawer-body">
        {bag.items.map((item) => {
          const key = bag.lineKey(item);
          const product = bySlug(item.slug);
          return (
            <div className="bag-line" key={key}>
              <div className="bag-line-media">
                <SmartImage
                  file={product ? product.images[0] : ""}
                  alt={`${item.name} in ${item.color}`}
                  label={item.name}
                  ratio="4 / 5"
                />
              </div>
              <div className="bag-line-info">
                <span className="bag-line-name">{item.name}</span>
                <span className="bag-line-variant">
                  {item.color} / {item.size}
                </span>
                <div className="qty-stepper">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => bag.setQty(key, item.qty - 1)}
                  >
                    −
                  </button>
                  <span aria-live="polite">{item.qty}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => bag.setQty(key, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="bag-remove"
                  onClick={() => bag.removeItem(key)}
                >
                  REMOVE
                </button>
              </div>
              <span className="bag-line-price">
                {rupees(item.price * item.qty)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="drawer-foot">
        <div className="ship-meter">
          {remaining > 0 ? (
            <p>{rupees(remaining)} away from free shipping</p>
          ) : (
            <p>Free shipping unlocked.</p>
          )}
          <div className="ship-meter-bar">
            <div className="ship-meter-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="subtotal-row">
          <span>SUBTOTAL</span>
          <span className="price">{rupees(bag.subtotal)}</span>
        </div>
        <p className="meta">Shipping calculated at checkout.</p>
        <button
          type="button"
          className="btn btn-solid add-btn"
          onClick={onCheckout}
          disabled={checkingOut}
        >
          {checkingOut ? "OPENING SHOPIFY CHECKOUT" : "CHECKOUT"}
        </button>
      </div>
    </>
  );
}

function HandoffPanel({ error, onBack }) {
  return (
    <div className="drawer-handoff">
      <h3>This is where Shopify takes over.</h3>
      <p className="body-copy">
        In the live store, this button hands the cart to Shopify&rsquo;s hosted
        checkout — UPI, cards, netbanking, wallets and COD, with the
        store&rsquo;s own domain and branding on it. It&rsquo;s PCI-compliant
        out of the box and it isn&rsquo;t something a developer rebuilds.
      </p>
      {error && <p className="meta">Live checkout unavailable: {error}</p>}
      <button type="button" className="btn btn-ghost" onClick={onBack}>
        BACK TO BAG
      </button>
    </div>
  );
}

function EmptyPanel({ onClose }) {
  return (
    <div className="drawer-empty">
      <p className="body-copy">NOTHING IN THE BAG YET.</p>
      <Link to="/shop" className="btn btn-solid" onClick={onClose}>
        SHOP DROP 01
      </Link>
    </div>
  );
}
