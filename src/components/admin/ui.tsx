import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Admin UI primitives — branded form fields, cards, tables, and badges shared
// across the admin CRUD pages. Built on the same semantic tokens + gradient as
// the public site so the panel feels like part of the product.
// ---------------------------------------------------------------------------

const fieldBase =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground " +
  "placeholder:text-muted/70 transition focus:outline-none focus:ring-2 focus:ring-ring " +
  "focus:border-transparent disabled:opacity-60";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  // Vertically resizable, but capped: the user can drag it taller up to
  // max-h, after which it stops growing and the content scrolls.
  return (
    <textarea
      {...props}
      className={cn(fieldBase, "max-h-60 resize-y overflow-y-auto", props.className)}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(fieldBase, "cursor-pointer", props.className)} />;
}

/** A labeled field wrapper: label on top, control below, optional hint. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-foreground text-sm font-medium">{label}</span>
      {children}
      {hint ? <span className="text-muted text-xs">{hint}</span> : null}
    </label>
  );
}

/** A checkbox with an inline label, styled to match the brand accent. */
export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4 accent-[var(--color-brand-violet)]"
      />
      <span className="text-foreground">{label}</span>
    </label>
  );
}

/** A surface card for grouping admin content (forms, lists). */
export function Panel({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-border bg-surface rounded-2xl border p-5 sm:p-6", className)}>
      {title ? (
        <div className="mb-4">
          <h3 className="text-foreground text-base font-semibold">{title}</h3>
          {description ? <p className="text-muted mt-0.5 text-sm">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/** Gradient primary submit button for admin forms. */
export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className={cn(
        "relative isolate inline-flex items-center justify-center gap-2 self-start overflow-hidden rounded-lg",
        "border border-white/15 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm",
        "transition-[transform,box-shadow] duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5",
        "before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-brand)] before:opacity-90",
        "before:transition-opacity hover:before:opacity-100",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      {children}
    </button>
  );
}

/** A small status/category badge. */
export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "brand" | "success" | "warning";
}) {
  const tones: Record<string, string> = {
    muted: "bg-foreground/8 text-muted",
    brand: "bg-[var(--color-brand-violet)]/12 text-[var(--color-brand-violet)]",
    success: "bg-emerald-500/12 text-emerald-500",
    warning: "bg-amber-500/12 text-amber-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export type AdminRow = {
  id: number | string;
  primary: ReactNode;
  meta?: ReactNode;
  badges?: ReactNode;
  /** Optional extra row actions (e.g. an edit dialog) rendered before Delete. */
  actions?: ReactNode;
};

/**
 * A list of records as styled rows with a per-row delete form, using the
 * standard server-action delete contract (hidden `id` field).
 */
export function RecordList({
  rows,
  deleteAction,
  empty = "Nothing here yet.",
}: {
  rows: AdminRow[];
  deleteAction: (formData: FormData) => Promise<void>;
  empty?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="border-border text-muted rounded-xl border border-dashed p-8 text-center text-sm">
        {empty}
      </div>
    );
  }
  return (
    <ul className="divide-border border-border divide-y overflow-hidden rounded-xl border">
      {rows.map((row) => (
        <li
          key={row.id}
          className="bg-background hover:bg-surface-2 flex items-center justify-between gap-4 px-4 py-3 transition"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-foreground truncate font-medium">{row.primary}</span>
              {row.badges}
            </div>
            {row.meta ? <span className="text-muted truncate text-xs">{row.meta}</span> : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {row.actions}
            <form action={deleteAction}>
              <input type="hidden" name="id" value={row.id} />
              <button
                type="submit"
                className="text-muted rounded-md px-2 py-1 text-xs font-medium transition hover:bg-red-500/10 hover:text-red-500"
              >
                Delete
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
