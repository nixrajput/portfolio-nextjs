"use client";

import { useEffect } from "react";

/**
 * On a direct load or reload of a URL with a hash (e.g. /#testimonials), the
 * browser performs its native hash jump before the page reaches its final
 * height — below-the-fold sections are still painting and scroll-reveal
 * animations are still settling heights — so it lands in the wrong place.
 *
 * This re-scrolls to the hash target after layout has stabilized (two animation
 * frames), using an instant scroll so the page simply starts at the right spot.
 * In-page nav clicks still use the CSS `scroll-behavior: smooth`.
 */
export function HashScrollFix() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    const frames: number[] = [];

    // Wait two frames so dynamically-imported sections have painted and the
    // reveal animations have set their final heights before we measure.
    frames.push(
      requestAnimationFrame(() => {
        frames.push(
          requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
          }),
        );
      }),
    );

    return () => frames.forEach(cancelAnimationFrame);
  }, []);

  return null;
}
