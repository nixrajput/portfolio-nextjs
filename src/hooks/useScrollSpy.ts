"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently considered "active".
 * Active = the last section whose top has scrolled past `offsetPx` from the
 * viewport top. Pure DOM read; no IntersectionObserver so it is deterministic
 * to unit-test against a stubbed `getBoundingClientRect`.
 */
export function pickActive(ids: string[], tops: Record<string, number>, offsetPx: number): string {
  let active = ids[0] ?? "";
  for (const id of ids) {
    const top = tops[id];
    if (top === undefined) continue;
    if (top - offsetPx <= 0) active = id;
  }
  return active;
}

export function useScrollSpy(ids: string[], offsetPx = 120): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    let ticking = false;
    const compute = () => {
      const tops: Record<string, number> = {};
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) tops[id] = el.getBoundingClientRect().top;
      }
      setActive(pickActive(ids, tops, offsetPx));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offsetPx]);

  return active;
}
