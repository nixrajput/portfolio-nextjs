"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  // resumeUrl and sponsorUrl accepted for backward-compat but not rendered;
  // the Sponsor CTA lives in the Hero section.
  resumeUrl: _resumeUrl, // eslint-disable-line @typescript-eslint/no-unused-vars
  sponsorUrl: _sponsorUrl, // eslint-disable-line @typescript-eslint/no-unused-vars
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
  const [scrolled, setScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Detect scroll position for blur-on-scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* ── Full-width top bar ──────────────────────────────────────────────── */}
      <motion.nav
        aria-label="Primary"
        initial={reduce ? false : { y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-background/70 border-border border-b backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="flex h-16 w-full items-center justify-between px-6 lg:px-10">
          {/* Logo — icon only, no wordmark */}
          <Link href="#hero" aria-label="Home" onClick={closeMenu} className="shrink-0">
            <Logo />
          </Link>

          {/* ── Desktop: section links + theme toggle ─────────────────────── */}
          <div className="hidden items-center gap-3 md:flex">
            <ul className="flex items-center gap-1">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id} className="relative">
                    <Link
                      href={`#${s.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted hover:text-foreground hover:bg-foreground/5",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-[image:var(--gradient-brand)]"
                          style={{ opacity: "var(--nav-pill-opacity, 0.2)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <span className="bg-border mx-1 h-5 w-px" />

            <ThemeToggle />
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
        </div>
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

              {/* Theme toggle */}
              <div className="flex items-center justify-center">
                <ThemeToggle />
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
