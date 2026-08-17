"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Logo } from "@/components/brand/Logo";
import { AppearanceMenu } from "./AppearanceMenu";
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
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

/**
 * Slim fixed top bar: brand mark (glow hover) / status line / theme toggle +
 * MENU button opening the full-screen MenuOverlay - the sole navigation
 * paradigm at every viewport (no inline section links).
 */
export function SiteNav({
  tagline,
  socials,
  hidden = [],
  sections = SECTIONS,
}: {
  /** Motto shown center-stage in the top bar and menu footer. */
  tagline?: string;
  socials: { platform: string; url: string }[];
  hidden?: string[];
  sections?: MenuSection[];
}) {
  const visibleSections = useMemo(
    () => sections.filter((s) => !hidden.includes(s.id)),
    [sections, hidden],
  );
  // Stable identities: useScrollSpy re-subscribes its listeners whenever the
  // ids array changes, and MenuOverlay's keydown trap re-binds on onClose.
  const ids = useMemo(() => visibleSections.map((s) => s.id), [visibleSections]);
  const active = useScrollSpy(ids);
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Blur-on-scroll backdrop, same trigger as the previous navbar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        aria-label="Primary"
        initial={reduce ? false : { y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.9 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Same gutters as the hero/sections so nav edges align with content */}
        <div className="site-container relative flex h-16 w-full items-center justify-between">
          {/* One opacity-faded layer: the border is always 1px and the blur always mounted,
              so scrolling shifts no layout - only this layer's opacity cross-fades. */}
          <div
            aria-hidden
            className={cn(
              // Low tint + blur so the ambient page shows through and the bar
              // reads as a subtle scrim, not a distinct block over the sections.
              "bg-background/45 border-border/70 pointer-events-none absolute inset-x-0 top-0 -bottom-px border-b backdrop-blur-xl transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />
          <Link
            href="/"
            aria-label="Home"
            className="relative z-10 shrink-0 [filter:drop-shadow(0_0_12px_rgb(var(--brand-mid-rgb)/0.4))] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:-rotate-4 hover:[filter:drop-shadow(0_0_16px_rgb(var(--brand-bright-rgb)/0.55))]"
          >
            <Logo />
          </Link>

          {tagline && (
            <span className="text-muted relative z-10 hidden items-center gap-2.5 font-mono text-xs tracking-[0.18em] uppercase md:flex">
              <span aria-hidden className="gradient-text">
                ✦
              </span>
              {tagline}
            </span>
          )}

          <span className="relative z-10 flex items-center gap-2">
            <AppearanceMenu />
            <Magnetic>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                onClick={() => setMenuOpen((o) => !o)}
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
        onClose={closeMenu}
        active={active}
        sections={visibleSections}
        socials={socials}
        statusLine={tagline}
      />
    </>
  );
}

export default SiteNav;
