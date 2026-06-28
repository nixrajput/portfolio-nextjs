"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const blobs = [
  {
    // Violet — top-left
    className: "absolute -left-[20%] -top-[20%] h-[70vh] w-[70vh]",
    background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
    animation: "aurora-drift-a",
    duration: "28s",
  },
  {
    // Cyan — top-right
    className: "absolute -right-[15%] -top-[10%] h-[60vh] w-[60vh]",
    background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
    animation: "aurora-drift-b",
    duration: "35s",
  },
  {
    // Pink — bottom-center
    className: "absolute bottom-[-15%] left-[30%] h-[55vh] w-[55vh]",
    background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
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
            filter: "blur(80px)",
            animation: reduced
              ? undefined
              : `${blob.animation} ${blob.duration} ease-in-out infinite`,
            animationPlayState: reduced ? "paused" : "running",
            rotate: reduced ? 0 : hue,
          }}
        />
      ))}
    </div>
  );
}
