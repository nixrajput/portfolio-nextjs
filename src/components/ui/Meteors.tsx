"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

type MeteorSpec = { id: number; left: string; delay: string; duration: string };

function makeMeteors(n: number): MeteorSpec[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: `${Math.floor(Math.random() * 100)}%`,
    delay: `${(Math.random() * 0.6).toFixed(2)}s`,
    duration: `${(Math.random() * 4 + 4).toFixed(2)}s`,
  }));
}

/**
 * Pure CSS, hidden under prefers-reduced-motion via `motion-reduce:hidden` so no JS guard is
 * needed. Random values come from a useState lazy initialiser to stay stable across renders.
 */
export function Meteors({ number = 12, className }: { number?: number; className?: string }) {
  // Lazy initialiser runs once — acceptable location for Math.random.
  const [meteors] = useState<MeteorSpec[]>(() => makeMeteors(number));

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden",
        className,
      )}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor absolute top-0 h-0.5 w-0.5 rounded-full bg-(--brand-mid) shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          style={{
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </span>
  );
}
