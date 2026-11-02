"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { useUI } from "@/store/ui";

/**
 * Inertia scrolling on desktop (touch devices keep native scrolling).
 * Paused while the intro, cart or reservation overlay is up.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: { offset: -72 },
      autoRaf: true,
    });

    const sync = () => {
      const { cartOpen, reservationOpen, introDone } = useUI.getState();
      if (cartOpen || reservationOpen || !introDone) lenis.stop();
      else lenis.start();
    };
    sync();
    const unsubscribe = useUI.subscribe(sync);

    return () => {
      unsubscribe();
      lenis.destroy();
    };
  }, []);

  return null;
}
