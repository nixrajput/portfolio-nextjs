"use client";

import { useEffect } from "react";

/**
 * On a direct load or reload of a URL with a hash (e.g. /#testimonials), the
 * browser's native hash jump fires before the page reaches its final height:
 * below-the-fold sections are lazy-loaded (next/dynamic) and scroll-reveal
 * animations start collapsed and grow, which keeps pushing the target down. A
 * single scroll lands in the wrong place.
 *
 * So we poll: re-scroll to the target on a short interval (instant scroll) and
 * stop only once its offset has been stable across several ticks, or after a
 * max duration. This adapts to however long hydration + reveal growth takes.
 * In-page nav clicks still use the CSS `scroll-behavior: smooth`.
 */
export function HashScrollFix() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));

    let lastTop = Number.NaN;
    let stableTicks = 0;
    let elapsed = 0;
    const STEP = 100;
    const MAX = 3000; // give up after 3s
    const STABLE_REQUIRED = 4; // ~400ms of no movement

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        const top = Math.round(el.getBoundingClientRect().top);
        if (Math.abs(top - lastTop) < 2) stableTicks += 1;
        else stableTicks = 0;
        lastTop = top;
        if (stableTicks >= STABLE_REQUIRED) {
          clearInterval(timer);
          return;
        }
      }
      elapsed += STEP;
      if (elapsed >= MAX) clearInterval(timer);
    };

    const timer = setInterval(tick, STEP);
    tick();

    return () => clearInterval(timer);
  }, []);

  return null;
}
