"use client";

import { useState, useTransition } from "react";
import { cn } from "@/utils/cn";
import { gradientButtonBase } from "@/components/admin/styles";
import { setSectionVisibility } from "@/app/admin/actions";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "support", label: "Support" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

// Normalize the stored map to an explicit on/off per section (missing = visible).
function toState(visibility: Record<string, boolean>): Record<string, boolean> {
  return Object.fromEntries(SECTIONS.map((s) => [s.id, visibility[s.id] !== false]));
}

/**
 * Dashboard control: a switch per toggleable homepage section. Changes are held
 * locally and persisted only when the user clicks Save (Save is disabled until
 * something changes). A section is visible unless explicitly false.
 */
export function SectionVisibilityToggles({ visibility }: { visibility: Record<string, boolean> }) {
  const [saved, setSaved] = useState(() => toState(visibility));
  const [draft, setDraft] = useState(saved);
  const [pending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);

  const dirty = SECTIONS.some((s) => draft[s.id] !== saved[s.id]);

  const set = (id: string, on: boolean) => {
    setDraft((d) => ({ ...d, [id]: on }));
    setJustSaved(false);
  };

  const save = () => {
    startTransition(async () => {
      await setSectionVisibility(draft);
      setSaved(draft);
      setJustSaved(true);
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {SECTIONS.map((s) => (
          <SectionSwitch
            key={s.id}
            label={s.label}
            on={draft[s.id]}
            onChange={(on) => set(s.id, on)}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        {dirty ? (
          <span className="text-muted text-sm">Unsaved changes</span>
        ) : justSaved ? (
          <span className="text-sm text-emerald-500">Saved</span>
        ) : null}
        <button
          type="button"
          onClick={save}
          disabled={!dirty || pending}
          className={cn(
            gradientButtonBase,
            "px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function SectionSwitch({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-foreground text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={`${label} section visible`}
        onClick={() => onChange(!on)}
        className={cn(
          "focus-visible:ring-ring relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none",
          on ? "bg-(image:--gradient-brand)" : "bg-foreground/20",
        )}
      >
        <span
          className={cn(
            "inline-block size-5 rounded-full bg-white shadow-sm transition-transform",
            on ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
    </label>
  );
}
