"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Focus close button when menu opens for accessibility
  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const overlayTransition: Transition = { duration: 0.2 };
  const panelTransition: Transition = { duration: 0.25, ease: "easeOut" };

  return (
    <>
      {/* ── Glass pill nav (shared container) ─────────────────────────────── */}
      <motion.nav
        aria-label="Primary"
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 flex w-fit max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/60 px-2 py-1.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
      >
        {/* Logo — always visible */}
        <Link href="#hero" aria-label="Go to top" onClick={closeMenu} className="shrink-0 pl-1.5">
          <Logo withWordmark />
        </Link>

        {/* ── Desktop: section links ─────────────────────────────────────── */}
        <span className="bg-foreground/15 mx-1 hidden h-5 w-px md:block" />

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

        {/* ── Desktop: action buttons ────────────────────────────────────── */}
        <span className="bg-foreground/15 mx-1 hidden h-5 w-px md:block" />

        <div className="hidden items-center gap-1 md:flex">
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
        </div>

        {/* ── Mobile: hamburger ──────────────────────────────────────────── */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMenuOpen((o) => !o)}
          className="text-foreground/80 hover:bg-foreground/10 hover:text-foreground grid size-9 shrink-0 place-items-center rounded-full transition-colors md:hidden"
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </motion.nav>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-xl md:hidden dark:bg-black/95"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={overlayTransition}
          >
            <motion.div
              className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24"
              initial={reduce ? false : { opacity: 0, y: -16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={panelTransition}
            >
              {/* Section links */}
              <ul className="flex w-full max-w-xs flex-col items-center gap-2">
                {sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id} className="w-full">
                      <Link
                        href={`#${s.id}`}
                        aria-current={isActive ? "true" : undefined}
                        onClick={closeMenu}
                        className={cn(
                          "block w-full rounded-xl px-5 py-3 text-center text-xl font-semibold transition-colors",
                          isActive
                            ? "gradient-text bg-foreground/5"
                            : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                        )}
                      >
                        {s.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Divider */}
              <span className="bg-foreground/10 h-px w-full max-w-xs" />

              {/* Action buttons */}
              <div className="flex w-full max-w-xs flex-col items-center gap-3">
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="hover:bg-foreground/10 text-foreground/80 hover:text-foreground border-foreground/10 w-full rounded-xl border px-5 py-3 text-center text-base font-medium transition-colors"
                  >
                    Resume
                  </a>
                )}

                {sponsorUrl && (
                  <a
                    href={sponsorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-5 py-3 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  >
                    <Heart className="size-4" aria-hidden /> Sponsor
                  </a>
                )}

                <div className="flex items-center justify-center pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>

            {/* Close button (top-right) */}
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="text-foreground/70 hover:bg-foreground/10 hover:text-foreground absolute top-4 right-4 grid size-10 place-items-center rounded-full transition-colors"
            >
              <X className="size-5" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingNavbar;
