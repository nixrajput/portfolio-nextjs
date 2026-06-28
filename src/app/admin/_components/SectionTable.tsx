import type { ReactNode } from "react";

interface Row {
  id: number;
  label: ReactNode;
}

interface SectionTableProps {
  rows: Row[];
  deleteAction: (formData: FormData) => Promise<void>;
}

/**
 * Minimal reusable list: renders rows with a per-row delete form.
 * Each row must carry an `id` (used as the hidden field value) and a
 * `label` ReactNode shown as the row description.
 */
export function SectionTable({ rows, deleteAction }: SectionTableProps) {
  return (
    <ul className="grid gap-2">
      {rows.map((row) => (
        <li key={row.id} className="flex items-center justify-between rounded border p-3">
          <span>{row.label}</span>
          <form action={deleteAction}>
            <input type="hidden" name="id" value={row.id} />
            <button type="submit" className="text-sm text-red-600">
              Delete
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
