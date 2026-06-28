"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Aurora() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 120, 280]);

  return (
    <div
      data-testid="aurora"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        data-testid="aurora-blob"
        className="absolute inset-[-25%] opacity-60 blur-3xl"
        style={{
          background: "var(--gradient-brand)",
          filter: reduced ? undefined : "blur(80px)",
          animation: "aurora-drift 30s linear infinite",
          animationPlayState: reduced ? "paused" : "running",
          rotate: reduced ? 0 : hue,
        }}
      />
    </div>
  );
}
