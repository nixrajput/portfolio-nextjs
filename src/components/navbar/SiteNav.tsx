"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "@/components/motion/Magnetic";
import { MenuOverlay, type MenuSection } from "./MenuOverlay";

const SECTIONS: MenuSection[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

/**
 * Slim fixed top bar: brand mark (glow hover) / status line / theme toggle +
 * MENU button opening the full-screen MenuOverlay - the sole navigation
 * paradigm at every viewport (no inline section links).
 */
export function SiteNav({
  location,
  availability,
  socials,
  sections = SECTIONS,
}: {
  location?: string | null;
  availability?: string | null;
  socials: { platform: string; url: string }[];
  sections?: MenuSection[];
}) {
  const active = useScrollSpy(sections.map((s) => s.id));
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Blur-on-scroll backdrop, same trigger as the previous navbar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const statusLine = location ? `${location}${availability ? ` · ${availability}` : ""}` : "";

  return (
    <>
      <motion.nav
        aria-label="Primary"
        initial={reduce ? false : { y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.9 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-background/70 border-border border-b backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="flex h-16 w-full items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0 [filter:drop-shadow(0_0_12px_rgba(124,58,237,0.4))] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:-rotate-4 hover:[filter:drop-shadow(0_0_16px_rgba(236,72,153,0.55))]"
          >
            <Logo />
          </Link>

          {statusLine && (
            <span className="text-muted hidden items-center gap-2.5 font-mono text-xs tracking-[0.08em] uppercase md:flex">
              <span
                aria-hidden
                className="size-[7px] animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none"
              />
              {statusLine}
            </span>
          )}

          <span className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                onClick={() => setMenuOpen(true)}
                className="text-foreground group flex items-center gap-2.5 rounded-full px-3 py-2 font-mono text-xs tracking-[0.14em] uppercase"
              >
                Menu
                <span aria-hidden className="flex flex-col gap-1">
                  <span className="bg-foreground block h-[1.5px] w-[22px]" />
                  <span className="bg-foreground block h-[1.5px] w-[22px] transition-[width] duration-300 group-hover:w-[14px]" />
                </span>
              </button>
            </Magnetic>
          </span>
        </div>
      </motion.nav>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={active}
        sections={sections}
        socials={socials}
        statusLine={statusLine || undefined}
      />
    </>
  );
}

export default SiteNav;
