"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOT_SELECTOR = 'a, button, [role="button"], [data-cursor="hot"]';

const FINE_QUERY = "(pointer: fine)";
// useSyncExternalStore: false on the server snapshot, live media-query value
// on the client - SSR-safe without setState-in-effect.
function subscribeFine(onChange: () => void) {
  const mql = window.matchMedia(FINE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getFine = () => window.matchMedia(FINE_QUERY).matches;
const getFineServer = () => false;

/**
 * Fine pointers only: a dot on the raw pointer plus a ring easing behind it. Colours come from
 * the brand CSS variables so it follows a runtime palette change. Renders nothing on touch or
 * under reduced motion, and hides the native cursor via `cursor-hidden` only while active.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  // Public-site only: admin keeps the native cursor for precision form work.
  const onAdmin = Boolean(pathname?.startsWith("/admin"));
  const active = fine && !reduced && !onAdmin;

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("cursor-hidden");

    // Hidden until the first pointer event so nothing renders at (0,0).
    const pos = { x: -100, y: -100, rx: -100, ry: -100, scale: 1, targetScale: 1 };
    let seen = false;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!seen) {
        // First event: snap the ring onto the pointer instead of easing
        // across the whole viewport.
        seen = true;
        pos.rx = pos.x;
        pos.ry = pos.y;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };
    const onOver = (e: PointerEvent) => {
      const hot = Boolean((e.target as Element | null)?.closest?.(HOT_SELECTOR));
      pos.targetScale = hot ? 1.7 : 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    // One rAF drives both parts: the dot locks to the raw pointer, the ring
    // eases behind it with its lag capped so it can never detach across the
    // screen (dropped frames or fast flicks would otherwise strand it).
    const MAX_LAG = 90;
    let raf = 0;
    const loop = () => {
      pos.rx += (pos.x - pos.rx) * 0.35;
      pos.ry += (pos.y - pos.ry) * 0.35;
      const dx = pos.x - pos.rx;
      const dy = pos.y - pos.ry;
      const d = Math.hypot(dx, dy);
      if (d > MAX_LAG) {
        pos.rx = pos.x - (dx / d) * MAX_LAG;
        pos.ry = pos.y - (dy / d) * MAX_LAG;
      }
      pos.scale += (pos.targetScale - pos.scale) * 0.25;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.rx}px, ${pos.ry}px) scale(${pos.scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        data-cursor-part="dot"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-[3px] -ml-[3px] size-1.5 rounded-full opacity-0"
        style={{ background: dark ? "var(--brand-bright)" : "var(--brand-deep)" }}
      />
      <div
        ref={ringRef}
        data-cursor-part="ring"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-[17px] -ml-[17px] size-[34px] rounded-full border-[1.5px] opacity-0 transition-[border-color] duration-300"
        style={{
          borderColor: dark ? "rgb(var(--brand-mid-rgb)/0.8)" : "rgb(var(--brand-deep-rgb)/0.75)",
        }}
      />
    </>
  );
}
