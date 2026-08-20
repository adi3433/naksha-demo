import { useEffect } from "react";

// One shared IntersectionObserver drives every .reveal element on the page.
// Elements get .is-revealed once, then are unobserved.
let observer = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  return observer;
}

export function useRevealScope(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = root.classList.contains("reveal")
      ? [root]
      : Array.from(root.querySelectorAll(".reveal"));
    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }
    const io = getObserver();
    nodes.forEach((node) => io.observe(node));
    return () => nodes.forEach((node) => io.unobserve(node));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
