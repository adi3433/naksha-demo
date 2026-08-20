import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "naksha_bag";
const BagContext = createContext(null);

function readStoredBag() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.slug === "string" &&
        typeof item.color === "string" &&
        typeof item.size === "string" &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.qty) &&
        item.qty > 0
    );
  } catch {
    return [];
  }
}

function persistBag(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable in sandboxed hosts; the bag still works in memory.
  }
}

function lineKey(item) {
  return `${item.slug}|${item.color}|${item.size}`;
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(readStoredBag);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    persistBag(items);
  }, [items]);

  const addItem = useCallback((entry) => {
    setItems((prev) => {
      const key = lineKey(entry);
      const existing = prev.find((item) => lineKey(item) === key);
      if (existing) {
        return prev.map((item) =>
          lineKey(item) === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...entry, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((key, qty) => {
    setItems((prev) =>
      qty < 1
        ? prev.filter((item) => lineKey(item) !== key)
        : prev.map((item) => (lineKey(item) === key ? { ...item, qty } : item))
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => lineKey(item) !== key));
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    return {
      items,
      count,
      subtotal,
      lineKey,
      addItem,
      setQty,
      removeItem,
      drawerOpen,
      openDrawer,
      closeDrawer
    };
  }, [items, drawerOpen, addItem, setQty, removeItem, openDrawer, closeDrawer]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside BagProvider");
  return ctx;
}

export const FREE_SHIPPING_THRESHOLD = 1999;
