"use client";

import { useState, useTransition } from "react";
import {
  User,
  Wrench,
  Briefcase,
  FolderGit2,
  Sparkles,
  MessageSquareQuote,
  HandCoins,
  HelpCircle,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { setSectionVisibility } from "@/app/admin/actions";

// Each toggleable homepage section, with an icon and a plain description of what
// it shows - so the control reads as "what appears on my site", not raw keys.
const SECTIONS: { id: string; label: string; description: string; icon: LucideIcon }[] = [
  { id: "about", label: "About", description: "Bio, portrait, and GitHub stats", icon: User },
  { id: "skills", label: "Skills", description: "Your tech stack and tools", icon: Wrench },
  { id: "experience", label: "Experience", description: "Roles and work history", icon: Briefcase },
  { id: "projects", label: "Projects", description: "Featured repos and work", icon: FolderGit2 },
  { id: "services", label: "Services", description: "What you offer clients", icon: Sparkles },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "What people say about you",
    icon: MessageSquareQuote,
  },
  { id: "support", label: "Support", description: "Ways to support your work", icon: HandCoins },
  { id: "faq", label: "FAQ", description: "Common questions answered", icon: HelpCircle },
  { id: "contact", label: "Contact", description: "How people reach you", icon: Mail },
];

// Normalize the stored map to an explicit on/off per section (missing = visible).
function toState(visibility: Record<string, boolean>): Record<string, boolean> {
  return Object.fromEntries(SECTIONS.map((s) => [s.id, visibility[s.id] !== false]));
}

/**
 * Dashboard control: one card per toggleable homepage section. Clicking a card
 * flips its visibility and saves immediately (optimistic - the card reflects the
 * new state at once and rolls back if the save fails). A hidden section is not
 * rendered, code-split, or data-fetched on the site.
 */
export function SectionVisibilityToggles({ visibility }: { visibility: Record<string, boolean> }) {
  const [state, setState] = useState(() => toState(visibility));
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const toggle = (id: string) => {
    const next = !state[id];
    const prev = state[id];
    setState((s) => ({ ...s, [id]: next })); // optimistic
    setPendingId(id);
    startTransition(async () => {
      try {
        await setSectionVisibility({ [id]: next });
      } catch {
        setState((s) => ({ ...s, [id]: prev })); // rollback on failure
      } finally {
        setPendingId(null);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SECTIONS.map((s) => {
        const on = state[s.id];
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={`${s.label} section, ${on ? "visible" : "hidden"}`}
            onClick={() => toggle(s.id)}
            disabled={pendingId === s.id}
            className={cn(
              "group border-border bg-surface flex items-start gap-3 rounded-2xl border p-4 text-left transition",
              "hover:border-foreground/20 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
              !on && "opacity-55 saturate-0",
            )}
          >
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-lg transition-colors",
                on
                  ? "bg-(image:--gradient-brand) text-white"
                  : "bg-foreground/10 text-muted",
              )}
            >
              <Icon className="size-4.5" aria-hidden />
            </span>

            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex items-center gap-2">
                <span className="text-foreground truncate text-sm font-semibold">{s.label}</span>
                <span
                  className={cn(
                    "ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                    on ? "bg-emerald-500/12 text-emerald-500" : "bg-foreground/8 text-muted",
                  )}
                >
                  {on ? "Visible" : "Hidden"}
                </span>
              </span>
              <span className="text-muted truncate text-xs">{s.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
