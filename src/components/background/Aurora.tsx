"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const blobs = [
  {
    // Violet — top-left corner
    className: "absolute -left-[10%] -top-[10%] h-[45vh] w-[45vh]",
    background: "radial-gradient(circle, #7c3aed 0%, transparent 60%)",
    animation: "aurora-drift-a",
    duration: "28s",
  },
  {
    // Cyan — top-right corner
    className: "absolute -right-[8%] -top-[8%] h-[38vh] w-[38vh]",
    background: "radial-gradient(circle, #06b6d4 0%, transparent 60%)",
    animation: "aurora-drift-b",
    duration: "35s",
  },
  {
    // Pink — top-center, small accent
    className: "absolute left-[30%] -top-[8%] h-[32vh] w-[32vh]",
    background: "radial-gradient(circle, #ec4899 0%, transparent 60%)",
    animation: "aurora-drift-c",
    duration: "42s",
  },
] as const;

export function Aurora() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  // Subtle hue-rotate on scroll — kept for compatibility but tuned down
  const hue = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div
      data-testid="aurora"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          data-testid={i === 0 ? "aurora-blob" : undefined}
          className={blob.className}
          style={{
            background: blob.background,
            filter: "blur(90px)",
            animation: reduced
              ? undefined
              : `${blob.animation} ${blob.duration} ease-in-out infinite`,
            animationPlayState: reduced ? "paused" : "running",
            rotate: reduced ? 0 : hue,
          }}
        />
      ))}
      {/* Vignette: fades the lower 60% of the aurora toward the base
          background so content sections (skills/projects/etc.) sit on a
          calm, high-contrast backdrop. Must stay at full opacity — it is
          excluded from the blob-opacity rule via data-aurora-vignette. */}
      <div
        data-aurora-vignette
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
