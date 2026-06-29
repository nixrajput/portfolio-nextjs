"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ServiceRow } from "./Services";

function resolveIcon(name: string | null): React.ComponentType<LucideProps> {
  if (!name) return Icons.Sparkles;
  const Comp = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  return Comp ?? Icons.Sparkles;
}

export function ServiceCard({ service }: { service: ServiceRow }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const iconComp = resolveIcon(service.icon);
  const iconElement = React.createElement(iconComp, { className: "size-5", "aria-hidden": true });

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
    return `radial-gradient(220px circle at ${x} ${y}, color-mix(in oklab, var(--color-brand-violet) 22%, transparent), transparent 70%)`;
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
          {iconElement}
        </span>
        <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
        <p className="text-foreground/70 mt-2 text-sm">{service.description}</p>
      </div>
    </motion.div>
  );
}
