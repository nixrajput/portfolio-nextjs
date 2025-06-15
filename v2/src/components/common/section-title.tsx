"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SectionTitleProps {
  title: string;
  highlightText: string;
  description?: string;
  className?: string;
}

const SectionTitle = ({
  title,
  highlightText,
  description,
  className,
}: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("text-center", className)}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
        {title}{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
          {highlightText}
        </span>
      </h2>

      {description ? (
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
};

export default SectionTitle;
