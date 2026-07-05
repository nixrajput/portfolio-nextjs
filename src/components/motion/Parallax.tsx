"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Subtle scroll parallax: translates its children on the Y axis as the element
 * passes through the viewport. `strength` is the peak offset in px (positive =
 * moves up as you scroll down, giving a depth/lag feel). No-op under reduced
 * motion. Transform-only, so it is GPU-cheap and Lighthouse-safe.
 */
export function Parallax({
  children,
  strength = 40,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
