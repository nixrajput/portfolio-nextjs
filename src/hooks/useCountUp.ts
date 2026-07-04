"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Count-up animation toward `target`, started when `active` first becomes true.
 * Duration scales with magnitude (a bigger number counts for longer, so the
 * per-tick step feels comparable across 4, 60, and 300+), clamped to a sane
 * range. Eased out for a natural settle. Returns the final value immediately
 * under reduced motion.
 */
export function useCountUp(target: number, active: boolean): number {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce || !active || started.current) return;
    started.current = true;

    // Magnitude-scaled duration: ~900ms for small counts up to ~2000ms for
    // large ones, so a 4 doesn't finish in one frame and a 300 isn't sluggish.
    const duration = Math.min(2000, Math.max(900, Math.log10(target + 1) * 700));
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduce]);

  // Reduced motion returns the final value directly (no animation, no setState).
  return reduce ? target : value;
}
