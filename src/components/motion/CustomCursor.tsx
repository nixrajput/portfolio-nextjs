"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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
 * Site-wide custom cursor for fine pointers: a dot locked to the raw pointer
 * plus a ring easing behind it (scaled up over interactive elements). Theme
 * aware: cyan dot / violet ring on dark, violet dot / pink ring on light.
 * Renders nothing on touch devices or under reduced motion; hides the native
 * cursor via the `cursor-hidden` class on <html> only while active.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  const active = fine && !reduced;

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("cursor-hidden");

    // Start off-screen until the first pointer event.
    const pos = { x: -100, y: -100, rx: -100, ry: -100 };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };
    const onOver = (e: PointerEvent) => {
      const hot = Boolean((e.target as Element | null)?.closest?.(HOT_SELECTOR));
      if (ringRef.current) {
        ringRef.current.style.scale = hot ? "1.7" : "1";
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    let raf = 0;
    const loop = () => {
      pos.rx += (pos.x - pos.rx) * 0.18;
      pos.ry += (pos.y - pos.ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.rx}px, ${pos.ry}px)`;
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
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-[3px] -ml-[3px] size-1.5 rounded-full"
        style={{ background: dark ? "#06b6d4" : "#7c3aed" }}
      />
      <div
        ref={ringRef}
        data-cursor-part="ring"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-[17px] -ml-[17px] size-[34px] rounded-full border-[1.5px] transition-[scale,border-color] duration-250"
        style={{ borderColor: dark ? "rgba(124,58,237,0.8)" : "rgba(219,39,119,0.75)" }}
      />
    </>
  );
}
