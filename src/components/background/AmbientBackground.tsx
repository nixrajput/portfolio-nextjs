"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Brand hues shared by both layers.
const BRAND: ReadonlyArray<readonly [number, number, number]> = [
  [21, 94, 117], // deep teal   #155e75
  [8, 145, 178], // cyan-teal   #0891b2
  [34, 211, 238], // ice        #22d3ee
];

// Nebula blobs: wide orbits on purpose - centers may overshoot the viewport
// (-15%..115%) so the gradients bleed past the edges and light the corners.
const BLOBS = [
  { c: 0, r: 0.55, sp: 0.1, sw: 0.42, ox: 0.25, oy: 0.25 },
  { c: 1, r: 0.5, sp: 0.08, sw: 0.48, ox: 0.75, oy: 0.4 },
  { c: 2, r: 0.46, sp: 0.12, sw: 0.4, ox: 0.5, oy: 0.8 },
] as const;

const IDLE_AFTER_MS = 3500;

/**
 * Whole-page ambient background: a lagging three-blob gradient nebula
 * (45% autonomous drift + 55% pointer pull) plus a tight glow locked to the
 * eased pointer. Dark theme composites additively ("lighter" - projected
 * light); light theme multiplies ("multiply" - pigment on paper) so the
 * moving gradient stays visible on a light ground. After 3.5s without input
 * the target tours the viewport on a slow Lissajous path (keeps mobile and
 * idle readers alive). Reduced motion renders a single static frame.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  // Read per-frame via ref so a theme switch needs no effect re-subscription.
  const darkRef = useRef(true);
  useEffect(() => {
    darkRef.current = resolvedTheme !== "light";
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Capture as non-null locals so they stay narrowed inside the closures.
    const cv = canvas;
    const ctx = context;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ptr = {
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.42,
      tx: window.innerWidth / 2,
      ty: window.innerHeight * 0.42,
    };
    let lastInput = -Infinity;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Resizing clears the bitmap; without a loop (reduced motion) the
      // canvas would stay blank until the next frame that never comes.
      if (reduced) draw(0);
    }

    function draw(t: number) {
      const dark = darkRef.current;
      const m = Math.max(w, h);
      ctx.clearRect(0, 0, w, h);

      // Nebula (the slow layer).
      ctx.globalCompositeOperation = dark ? "lighter" : "multiply";
      BLOBS.forEach((b, i) => {
        const dx = b.ox + Math.cos(t * b.sp + i * 2.1) * b.sw;
        const dy = b.oy + Math.sin(t * b.sp * 0.9 + i * 2.1) * b.sw;
        const cx = (dx * 0.45 + (ptr.x / w) * 0.55) * w;
        const cy = (dy * 0.45 + (ptr.y / h) * 0.55) * h;
        const R = b.r * m;
        const col = BRAND[b.c];
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, `rgba(${col.join(",")},0.30)`);
        g.addColorStop(1, `rgba(${col.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pointer glow (the sharp layer) - still under the theme blend mode.
      const GR = Math.min(260, m * 0.28);
      const g1 = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, GR);
      if (dark) {
        g1.addColorStop(0, "rgba(34,211,238,0.17)");
        g1.addColorStop(0.55, "rgba(8,145,178,0.10)");
        g1.addColorStop(1, "rgba(21,94,117,0)");
      } else {
        g1.addColorStop(0, "rgba(21,94,117,0.20)");
        g1.addColorStop(0.55, "rgba(8,145,178,0.10)");
        g1.addColorStop(1, "rgba(8,145,178,0)");
      }
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(ptr.x, ptr.y, GR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }

    resize();
    window.addEventListener("resize", resize);

    // Reduced motion: one static frame, no tracking, no loop.
    if (reduced) {
      draw(0);
      return () => window.removeEventListener("resize", resize);
    }

    const onInput = (e: PointerEvent) => {
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
      lastInput = performance.now();
    };
    window.addEventListener("pointermove", onInput, { passive: true });
    window.addEventListener("pointerdown", onInput, { passive: true });

    let raf = 0;
    let running = true;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      // Idle wander: without input the target tours the whole viewport
      // (corners included) on a slow Lissajous path - this is also what
      // animates the scene on touch devices.
      const idle = now - lastInput > IDLE_AFTER_MS;
      if (idle) {
        ptr.tx = w * (0.5 + 0.46 * Math.sin(t * 0.31));
        ptr.ty = h * (0.5 + 0.44 * Math.cos(t * 0.23));
      }
      const k = idle ? 0.03 : 0.09;
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;
      draw(t);
      if (running) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onInput);
      window.removeEventListener("pointerdown", onInput);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  // The ambient scene is public-site language; admin keeps a plain ground.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="ambient-bg"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
