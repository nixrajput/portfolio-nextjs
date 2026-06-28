import { cn } from "@/utils/cn";

/**
 * Shared brand-gradient button base — the single source of truth for the
 * gradient pill used across admin buttons (SubmitButton, the dialog submit in
 * RecordFormDialog, and the "brand" tone in ConfirmButton). Lives in its own
 * module (no component imports) so it can be shared without creating a circular
 * import between ui.tsx, RecordDeleteButton, and ConfirmButton. Compose width
 * and layout classes via `cn`.
 */
export const gradientButtonBase = cn(
  "relative isolate overflow-hidden rounded-lg border border-white/15",
  "text-sm font-medium text-white shadow-sm backdrop-blur-sm",
  "before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-brand)] before:opacity-90",
  "before:transition-opacity hover:before:opacity-100",
  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
);
