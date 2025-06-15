"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { AnimatedServiceCard } from "../home/ui/AnimatedServiceCard";

export const HoverLayoutGrid = ({
  cards,
  className,
}: {
  cards: any[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 md:grid-cols-2 mt-16 gap-4",
        className
      )}
    >
      {cards.map((item, idx) => (
        <div
          key={item?.id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800/[0.5] dark:bg-slate-800/[0.5] block rounded-[var(--borderRadius)]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <AnimatedServiceCard item={item} />
        </div>
      ))}
    </div>
  );
};
