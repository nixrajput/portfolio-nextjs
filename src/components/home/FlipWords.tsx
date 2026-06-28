"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Returns "an" if the word starts with a vowel sound, otherwise "a". */
function getArticle(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function FlipWords({
  words,
  duration = 2800,
  className,
  showArticle = false,
}: {
  words: string[];
  duration?: number;
  className?: string;
  /** When true, prepends "a"/"an" (grammar-correct) before each word. */
  showArticle?: boolean;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const advance = useCallback(() => setIndex((i) => (i + 1) % words.length), [words.length]);

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const t = setTimeout(advance, duration);
    return () => clearTimeout(t);
  }, [index, duration, advance, reduce, words.length]);

  const word = words[index] ?? "";
  const article = showArticle ? `${getArticle(word)} ` : "";

  if (reduce) {
    return (
      <span className={cn("inline-block", className)}>
        {article}
        {word}
      </span>
    );
  }

  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="block whitespace-nowrap"
        >
          {article}
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
