"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BRAND, hexToRgb } from "@/lib/brand";
import { usePalette } from "@/hooks/usePalette";

type Ramp = ReadonlyArray<readonly [number, number, number]>;

// brand.ts supplies the DEFAULT ramp, used for the very first frame and as the fallback
// if a variable is ever missing. The live values are read from CSS below, because a
// visitor can change the palette at runtime and a canvas cannot inherit a CSS variable.
const DEFAULT_RAMP: Ramp = [hexToRgb(BRAND.deep), hexToRgb(BRAND.mid), hexToRgb(BRAND.bright)];

/** Read the current ramp off <html>, falling back per-slot to the default. */
function readRamp(): Ramp {
  const cs = getComputedStyle(document.documentElement);
  return (["--brand-deep", "--brand-mid", "--brand-bright"] as const).map((token, i) => {
    const hex = cs.getPropertyValue(token).trim();
    return /^#[0-9a-fA-F]{6}$/.test(hex) ? hexToRgb(hex) : DEFAULT_RAMP[i];
  });
}

const rgba = (c: readonly [number, number, number], a: number) => `rgba(${c.join(",")},${a})`;

// Orbits overshoot the viewport on purpose so the gradients light the corners. Radii stay
// under 0.42: at 1440px the old 0.46-0.55 spanned most of the screen, so the falloff never
// landed anywhere and the scene read as one flat field.
const BLOBS = [
  { c: 0, r: 0.42, sp: 0.1, sw: 0.42, ox: 0.25, oy: 0.25 },
  { c: 1, r: 0.38, sp: 0.08, sw: 0.48, ox: 0.75, oy: 0.4 },
  { c: 2, r: 0.34, sp: 0.12, sw: 0.4, ox: 0.5, oy: 0.8 },
] as const;

// Per-theme because the blend modes are not equally strong: `lighter` on near-black falls off
// fast, while `multiply` on paper accumulates - one shared 0.30 tinted the whole viewport.
const NEBULA = {
  dark: { core: 0.26, mid: 0.1 },
  light: { core: 0.13, mid: 0.05 },
} as const;

const GLOW = {
  dark: { core: 0.16, mid: 0.09 },
  light: { core: 0.11, mid: 0.055 },
} as const;

const IDLE_AFTER_MS = 3500;

/**
 * Three-blob gradient nebula (45% autonomous drift + 55% pointer pull) plus a glow on the
 * eased pointer. Dark composites additively, light multiplies. After 3.5s idle the target
 * tours the viewport on a Lissajous path, which is also what animates it on touch devices.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const { palette } = usePalette();
  // Read per-frame via refs so a theme or palette switch needs no effect re-subscription
  // (tearing down the rAF loop would restart the drift animation from t=0).
  const darkRef = useRef(true);
  useEffect(() => {
    darkRef.current = resolvedTheme !== "light";
  }, [resolvedTheme]);

  const rampRef = useRef<Ramp>(DEFAULT_RAMP);
  // Set by the render effect below so a theme/palette change can force a repaint. Under
  // reduced motion there is no animation loop, so nothing would otherwise pick the new
  // colours up and the static frame would keep the old palette indefinitely.
  const redrawRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    // resolvedTheme is a dependency because the ramp variables can be redefined per
    // theme, not only per palette.
    rampRef.current = readRamp();
    redrawRef.current?.();
  }, [palette, resolvedTheme]);

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
      const ramp = rampRef.current;
      const m = Math.max(w, h);
      ctx.clearRect(0, 0, w, h);

      // Nebula (the slow layer).
      ctx.globalCompositeOperation = dark ? "lighter" : "multiply";
      const neb = dark ? NEBULA.dark : NEBULA.light;
      BLOBS.forEach((b, i) => {
        const dx = b.ox + Math.cos(t * b.sp + i * 2.1) * b.sw;
        const dy = b.oy + Math.sin(t * b.sp * 0.9 + i * 2.1) * b.sw;
        const cx = (dx * 0.45 + (ptr.x / w) * 0.55) * w;
        const cy = (dy * 0.45 + (ptr.y / h) * 0.55) * h;
        const R = b.r * m;
        const col = ramp[b.c];
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        // Three stops, not two: a linear 0 -> 0 ramp reads as a flat soft disc, while a
        // mid stop below half the core alpha concentrates colour near the centre and
        // lets the outer half fade to nothing, which is what makes the edges breathe.
        g.addColorStop(0, rgba(col, neb.core));
        g.addColorStop(0.5, rgba(col, neb.mid));
        g.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pointer glow (the sharp layer) - still under the theme blend mode.
      const GR = Math.min(260, m * 0.28);
      const g1 = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, GR);
      const [deep, mid, bright] = ramp;
      if (dark) {
        // Dark projects light: brightest hue at the core, fading through the ramp.
        g1.addColorStop(0, rgba(bright, GLOW.dark.core));
        g1.addColorStop(0.55, rgba(mid, GLOW.dark.mid));
        g1.addColorStop(1, rgba(deep, 0));
      } else {
        // Light multiplies pigment, so the core is the deepest hue instead.
        g1.addColorStop(0, rgba(deep, GLOW.light.core));
        g1.addColorStop(0.55, rgba(mid, GLOW.light.mid));
        g1.addColorStop(1, rgba(mid, 0));
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
      // Only the static case needs this: the animation loop below repaints every frame
      // and picks a new ramp up on its own.
      redrawRef.current = () => draw(0);
      return () => {
        redrawRef.current = null;
        window.removeEventListener("resize", resize);
      };
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
