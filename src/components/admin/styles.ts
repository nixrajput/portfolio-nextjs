import { cn } from "@/utils/cn";

/**
 * In its own module with no component imports, to avoid a circular import between ui.tsx,
 * RecordDeleteButton and ConfirmButton, which all need this gradient.
 */
export const gradientButtonBase = cn(
  "relative isolate overflow-hidden rounded-lg border border-white/15",
  "text-sm font-medium text-white shadow-sm backdrop-blur-sm",
  "before:absolute before:inset-0 before:-z-10 before:bg-(image:--gradient-brand) before:opacity-90",
  "before:transition-opacity hover:before:opacity-100",
  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
);
