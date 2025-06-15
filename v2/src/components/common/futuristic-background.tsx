"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef } from "react";

interface FuturisticBackgroundProps {
  className?: string;
  opacity?: number;
}

export const FuturisticBackground = ({
  className,
  opacity = 0.15,
}: FuturisticBackgroundProps) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-0 z-[-1] overflow-hidden transition-colors duration-500",
        className
      )}
      initial={{ opacity }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
    >
      {/* Gradient background (light & dark mode) */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
          `,
          opacity,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Concentric semi-circles */}
      <div className="text-primary dark:text-primary">
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="1600"
          height="1600"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="fade-out" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="var(--primary)"
                stopOpacity={opacity}
              />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={opacity}
              />
            </radialGradient>
          </defs>

          <g fill="none" stroke="var(--primary)" strokeOpacity={opacity}>
            {[...Array(5)].map((_, i) => (
              <circle key={i} cx="400" cy="400" r={(i + 1) * 64} />
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
};
