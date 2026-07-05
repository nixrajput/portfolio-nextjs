"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// Icons that are white/monochrome glyphs — invisible on the light-theme
// surface. Invert them in light mode so they read as dark.
const INVERT_IN_LIGHT = /nextjs|next-js|next\.|vercel|express|flask|github|apple/i;

export function SkillCard({ name, iconPath }: { name: string; iconPath: string }) {
  const invertLight = INVERT_IN_LIGHT.test(iconPath) || INVERT_IN_LIGHT.test(name);
  return (
    <motion.li
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="border-border bg-surface hover:border-foreground/20 hover:bg-surface-2 flex h-full flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span className="bg-surface-2 relative flex size-12 items-center justify-center rounded-xl p-1.5">
        <Image
          src={iconPath}
          alt=""
          fill
          sizes="48px"
          // unoptimized: icons are tiny (no optimizer gain) and this serves
          // static paths, remote raster, and remote/uploaded SVG uniformly
          // without the next/image SVG restriction.
          unoptimized
          className={cn(
            "object-contain p-1",
            // Light theme: invert white glyphs to dark; dark theme leaves them.
            invertLight && "invert dark:invert-0",
          )}
          onError={() => {}}
        />
      </span>
      <span className="text-foreground/80 text-center text-xs leading-snug font-medium">
        {name}
      </span>
    </motion.li>
  );
}
