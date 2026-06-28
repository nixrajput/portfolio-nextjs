"use client";

import { Trash2 } from "lucide-react";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

/**
 * Delete control for an admin record row: confirms in an AlertDialog, then
 * calls the section's delete server action with the row id.
 */
export function RecordDeleteButton({
  id,
  label,
  deleteAction,
}: {
  id: number | string;
  label?: string;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <ConfirmButton
      title="Delete this item?"
      description={
        label
          ? `“${label}” will be permanently removed. This cannot be undone.`
          : "This will be permanently removed. This cannot be undone."
      }
      confirmLabel="Delete"
      tone="danger"
      onConfirm={() => {
        const fd = new FormData();
        fd.set("id", String(id));
        return deleteAction(fd);
      }}
      className="text-muted rounded-md p-1.5 text-xs font-medium transition hover:bg-red-500/10 hover:text-red-500"
    >
      <Trash2 className="size-4" aria-hidden />
      <span className="sr-only">Delete</span>
    </ConfirmButton>
  );
}
