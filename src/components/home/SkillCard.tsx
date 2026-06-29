"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SkillCard({ name, iconPath }: { name: string; iconPath: string }) {
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
          className="object-contain p-1"
          onError={() => {}}
        />
      </span>
      <span className="text-foreground/80 text-center text-xs leading-snug font-medium">
        {name}
      </span>
    </motion.li>
  );
}
