"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ServiceRow } from "./Services";

const ICON_NAMES = new Set<string>(iconNames);

/** A lucide icon name ("code") or the older component name ("Code2"); anything else is null. */
export function toIconName(name: string | null): IconName | null {
  const kebab = (name ?? "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase();
  return ICON_NAMES.has(kebab) ? (kebab as IconName) : null;
}

// Holds the icon's box while DynamicIcon fetches that one icon's chunk.
function IconPlaceholder() {
  return <span className="size-5" aria-hidden />;
}

export function ServiceCard({ service }: { service: ServiceRow }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const iconName = toIconName(service.icon);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 15,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 15,
  });

  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  const glowBg = useTransform([glowX, glowY] as const, ([x, y]) => {
    return `radial-gradient(220px circle at ${x} ${y}, color-mix(in oklab, var(--color-brand-deep) 22%, transparent), transparent 70%)`;
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className="group border-border bg-surface relative flex h-full flex-col overflow-hidden rounded-3xl border p-6"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        style={{ background: glowBg }}
      />
      <div className="relative z-10">
        <span className="inline-grid size-11 place-items-center rounded-2xl bg-(image:--gradient-brand) text-white">
          {iconName ? (
            <DynamicIcon
              name={iconName}
              className="size-5"
              aria-hidden
              fallback={IconPlaceholder}
            />
          ) : (
            <Sparkles className="size-5" aria-hidden />
          )}
        </span>
        <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
        <p className="text-foreground/70 mt-2 text-sm">{service.description}</p>
      </div>
    </motion.div>
  );
}
