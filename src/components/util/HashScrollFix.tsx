"use client";

import { useEffect } from "react";

/**
 * The native hash jump fires before the page reaches its final height - lazy sections and
 * scroll-reveal growth keep pushing the target down - so a single scroll lands wrong. Polls
 * until the target's offset is stable across several ticks instead.
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
