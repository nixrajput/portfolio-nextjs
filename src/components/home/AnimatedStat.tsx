"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A single About stat that counts up from 0 when it scrolls into view. The
 * count duration scales with the number's magnitude (see useCountUp), so small
 * and large stats feel consistent. A trailing "+" is kept for values >= 100.
 */
export function AnimatedStat({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [armed, setArmed] = useState(false);
  // Start counting only after the reveal has settled (the small delay).
  const count = useCountUp(value, armed);
  const display = value >= 100 ? `${count}+` : `${count}`;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onAnimationComplete={() => setArmed(true)}
      className="flex flex-col items-center gap-1 px-2 py-2 text-center sm:px-4"
    >
      <span className="gradient-text text-3xl font-bold tabular-nums sm:text-4xl md:text-5xl">
        {display}
      </span>
      <span className="text-muted text-xs sm:text-sm">{label}</span>
    </motion.div>
  );
}
