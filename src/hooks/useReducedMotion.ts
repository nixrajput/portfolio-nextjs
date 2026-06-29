import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's `prefers-reduced-motion` setting. The canonical hook for
 * gating animations across v2 components.
 */
export function useReducedMotion(): boolean {
  // Lazy initializer reads the current preference once on mount (guarded for
  // SSR). The effect then only *subscribes* to changes — no synchronous
  // setState in the effect body (satisfies react-hooks/set-state-in-effect).
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
