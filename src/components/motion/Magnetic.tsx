"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PULL_X = 0.22;
const PULL_Y = 0.3;

/**
 * Magnetic hover: translates the wrapped element toward the cursor while
 * hovered (mouse pointers only), springing back on leave. Transform-only,
 * so it composes with the child's own hover styles.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const onPointerMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || reduced || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * PULL_X}px, ${dy * PULL_Y}px)`;
  };

  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}
