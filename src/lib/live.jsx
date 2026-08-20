import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchLiveCatalogue, shopifyEnabled } from "./shopify";

// Holds the live Shopify catalogue when a dev store is connected.
// Components read local product data and overlay live price + availability.
const LiveContext = createContext({ catalogue: null, live: false });

export function LiveProvider({ children }) {
  const [catalogue, setCatalogue] = useState(null);

  useEffect(() => {
    if (!shopifyEnabled) return;
    let cancelled = false;
    fetchLiveCatalogue()
      .then((map) => {
        if (!cancelled) setCatalogue(map);
      })
      .catch((err) => {
        // The demo keeps working on local data if the store is unreachable.
        console.warn("Live Shopify catalogue unavailable:", err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ catalogue, live: shopifyEnabled && catalogue !== null }),
    [catalogue]
  );

  return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>;
}

// Merge live Shopify data over a local product record.
export function useLiveProduct(product) {
  const { catalogue, live } = useContext(LiveContext);
  return useMemo(() => {
    if (!live || !product) return product;
    const remote = catalogue[product.slug];
    if (!remote) return product;
    return {
      ...product,
      price: remote.price ?? product.price,
      soldOutSizes: remote.soldOutSizes.length
        ? remote.soldOutSizes
        : product.soldOutSizes
    };
  }, [catalogue, live, product]);
}

export function useLiveCatalogue() {
  return useContext(LiveContext);
}
