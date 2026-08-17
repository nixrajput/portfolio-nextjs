"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={goToTop}
          aria-label="Scroll to top"
          initial={reduce ? false : { opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          className="group border-border bg-surface fixed right-6 bottom-6 z-40 grid size-12 place-items-center overflow-hidden rounded-full border [filter:drop-shadow(0_6px_20px_rgb(var(--brand-mid-rgb)/0.35))] backdrop-blur-md sm:right-8 sm:bottom-8"
        >
          {/* Gradient wash that fades in on hover */}
          <span
            aria-hidden
            className="absolute inset-0 bg-(image:--gradient-brand) opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* Arrow lifts and turns white as the gradient fills */}
          <ArrowUp
            className="text-foreground relative size-5 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:text-white motion-reduce:transform-none"
            aria-hidden
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
