"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type MenuSection = { id: string; label: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen navigation dialog: numbered display-scale section links with a
 * staggered rise-in, gradient hover/active fill, socials + status footer.
 * One paradigm for every viewport (this IS the mobile menu too).
 */
export function MenuOverlay({
  open,
  onClose,
  active,
  sections,
  socials,
  statusLine,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
  sections: MenuSection[];
  socials: { platform: string; url: string }[];
  statusLine?: string;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll lock + focus management while open: focus moves to the close
  // button, and returns to whatever triggered the dialog (WAI-ARIA APG).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      trigger?.focus?.();
    };
  }, [open]);

  // Escape closes; Tab cycles within the dialog (focus trap).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[60] flex flex-col bg-(--overlay-bg) p-5 backdrop-blur-xl sm:p-10"
        >
          <div className="flex items-center justify-end">
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="border-border text-foreground hover:border-foreground grid size-11 place-items-center rounded-full border transition-[border-color,transform] duration-300 hover:rotate-90"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <motion.span
                  initial={reduce ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.08 + i * 0.05 }}
                  className="inline-block"
                >
                  <Link
                    href={`#${s.id}`}
                    data-testid="menu-section-link"
                    aria-current={active === s.id ? "true" : undefined}
                    onClick={onClose}
                    className={cn(
                      "flex items-baseline gap-4 text-[clamp(30px,6.2vh,58px)] font-extrabold tracking-tight",
                      active === s.id
                        ? "gradient-text"
                        : "text-foreground hover:gradient-text transition-colors",
                    )}
                  >
                    <span className="text-muted font-mono text-xs font-medium tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                      {active === s.id ? " · you're here" : ""}
                    </span>
                    {s.label}
                  </Link>
                </motion.span>
              </li>
            ))}
          </ul>

          <div className="border-border text-muted flex flex-wrap items-center justify-between gap-3 border-t pt-4 font-mono text-[13px]">
            <span className="flex gap-5">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:gradient-text"
                >
                  {s.platform}
                </a>
              ))}
            </span>
            {statusLine && <span>{statusLine}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
