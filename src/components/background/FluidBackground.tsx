"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Brand blobs — soft radial gradients drifting and easing toward the cursor,
// blended additively for a fluid look. Colors match the brand gradient.
const BLOBS = [
  { color: "124,58,237", r: 0.42, speed: 0.06, sway: 0.18 }, // violet
  { color: "6,182,212", r: 0.36, speed: 0.05, sway: 0.22 }, // cyan
  { color: "236,72,153", r: 0.32, speed: 0.07, sway: 0.16 }, // pink
  { color: "124,58,237", r: 0.28, speed: 0.045, sway: 0.2 }, // violet (small)
] as const;

/**
 * Whole-page fluid background: a fixed canvas of soft brand-colored blobs that
 * drift on their own and ease toward the cursor, blended additively. Pauses
 * when the tab is hidden, redraws on resize, and renders a single static frame
 * under reduced motion (no animation, no cursor tracking).
 */
export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

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

    // Pointer (eased) and per-blob phase offsets.
    const pointer = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 };
    const phases = BLOBS.map((_, i) => (i * Math.PI * 2) / BLOBS.length);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // Ease pointer toward target.
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const minDim = Math.min(w, h);
      BLOBS.forEach((b, i) => {
        const ph = phases[i];
        // Autonomous drift + a pull toward the cursor.
        const driftX = 0.5 + Math.cos(t * b.speed + ph) * b.sway;
        const driftY = 0.45 + Math.sin(t * b.speed * 0.9 + ph) * b.sway;
        const cx = (driftX * 0.6 + pointer.x * 0.4) * w;
        const cy = (driftY * 0.6 + pointer.y * 0.4) * h;
        const radius = b.r * minDim;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(${b.color}, 0.5)`);
        g.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
    }

    resize();
    window.addEventListener("resize", resize);

    // Reduced motion: one static frame, no tracking, no loop.
    if (reduced) {
      draw(0);
      return () => window.removeEventListener("resize", resize);
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let running = true;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      draw((now - start) / 1000);
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
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="fluid-bg"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-50 blur-3xl dark:opacity-60"
    />
  );
}
