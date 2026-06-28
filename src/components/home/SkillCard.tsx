"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SkillCard({ name, iconPath }: { name: string; iconPath: string }) {
  return (
    <motion.li
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="border-foreground/10 bg-foreground/[0.03] flex flex-col items-center gap-2 rounded-2xl border p-4 backdrop-blur-sm motion-reduce:transform-none"
    >
      <span className="relative size-10">
        <Image src={iconPath} alt="" fill sizes="40px" className="object-contain" />
      </span>
      <span className="text-foreground/80 text-center text-xs font-medium">{name}</span>
    </motion.li>
  );
}
