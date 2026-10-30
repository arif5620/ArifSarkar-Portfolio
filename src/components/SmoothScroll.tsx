"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Buttery inertia scrolling on desktop; phones keep native touch scrolling.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.09 });
    return () => lenis.destroy();
  }, []);
  return null;
}
