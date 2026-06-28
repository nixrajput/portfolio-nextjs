"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/utils/cn";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "./ThemeToggle";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type NavSection = { id: string; label: string };

const SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export function FloatingNavbar({
  resumeUrl,
  sponsorUrl,
  sections = SECTIONS,
}: {
  resumeUrl?: string;
  sponsorUrl?: string;
  sections?: NavSection[];
}) {
  const ids = sections.map((s) => s.id);
  const active = useScrollSpy(ids);
  const reduce = useReducedMotion();

  return (
    <motion.nav
      aria-label="Primary"
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-fit max-w-[calc(100vw-1rem)] items-center gap-1 rounded-full border border-white/15 bg-white/60 px-2 py-1.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
    >
      <ul className="hidden items-center gap-0.5 md:flex">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              <Link
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="bg-foreground/10 absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <span className="bg-foreground/15 mx-1 hidden h-5 w-px md:block" />

      <ThemeToggle />

      {resumeUrl && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/80 hover:bg-foreground/10 hover:text-foreground rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
        >
          Resume
        </a>
      )}

      {sponsorUrl && (
        <a
          href={sponsorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-brand)] px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <Heart className="size-3.5" aria-hidden /> Sponsor
        </a>
      )}
    </motion.nav>
  );
}

export default FloatingNavbar;
