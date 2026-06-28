"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, Input, Textarea, Select, CheckboxField } from "@/components/admin/ui";
import { cn } from "@/utils/cn";

export type AdminField =
  | {
      name: string;
      label: string;
      type: "text" | "url" | "number" | "textarea";
      placeholder?: string;
      hint?: string;
      required?: boolean;
      rows?: number;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      hint?: string;
    }
  | {
      name: string;
      label: string;
      type: "checkbox";
    };

/** Render one field, pre-filled from `record` when editing. */
function FieldControl({ field, record }: { field: AdminField; record?: Record<string, unknown> }) {
  const raw = record?.[field.name];

  if (field.type === "checkbox") {
    return <CheckboxField name={field.name} label={field.label} defaultChecked={Boolean(raw)} />;
  }
  if (field.type === "select") {
    return (
      <Field label={field.label} hint={field.hint}>
        <Select name={field.name} defaultValue={raw == null ? "" : String(raw)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>
    );
  }
  // Arrays (e.g. tags, description bullets) are joined for display; the section's
  // server action splits them back on submit.
  const defaultValue = Array.isArray(raw)
    ? field.type === "textarea"
      ? (raw as string[]).join("\n")
      : (raw as string[]).join(", ")
    : raw == null
      ? ""
      : String(raw);

  return (
    <Field label={field.label} hint={field.hint}>
      {field.type === "textarea" ? (
        <Textarea
          name={field.name}
          rows={field.rows ?? 3}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          required={field.required}
        />
      ) : (
        <Input
          name={field.name}
          type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          required={field.required}
        />
      )}
    </Field>
  );
}

/**
 * A create/edit dialog driven by a field config. In "create" mode it shows an
 * "Add new" trigger and blank fields; in "edit" mode an icon trigger and fields
 * pre-filled from `record`. On submit it posts to `formAction` (a server action
 * that reads the FormData) and closes.
 */
export function RecordFormDialog({
  mode,
  title,
  fields,
  formAction,
  record,
  triggerLabel,
}: {
  mode: "create" | "edit";
  title: string;
  fields: AdminField[];
  formAction: (formData: FormData) => Promise<void>;
  record?: Record<string, unknown>;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {mode === "create" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "relative isolate inline-flex items-center gap-2 self-start overflow-hidden rounded-lg",
            "border border-white/15 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm",
            "transition-[transform,box-shadow] duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5",
            "before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-brand)] before:opacity-90 hover:before:opacity-100",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
          )}
        >
          <Plus className="size-4" aria-hidden />
          {triggerLabel ?? "Add new"}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Edit"
          className="text-muted hover:bg-foreground/5 hover:text-foreground rounded-md p-1.5 transition"
        >
          <Pencil className="size-4" aria-hidden />
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <form
            action={async (formData) => {
              await formAction(formData);
              setOpen(false);
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <DialogBody>
              <div className="flex flex-col gap-4">
                {record?.id != null ? (
                  <input type="hidden" name="id" value={String(record.id)} />
                ) : null}
                {fields.map((f) => (
                  <FieldControl key={f.name} field={f} record={record} />
                ))}
              </div>
            </DialogBody>
            <DialogFooter>
              <button
                type="submit"
                className={cn(
                  "relative isolate w-full overflow-hidden rounded-lg border border-white/15 px-4 py-2.5",
                  "text-sm font-medium text-white shadow-sm backdrop-blur-sm",
                  "before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-brand)] before:opacity-90 hover:before:opacity-100",
                )}
              >
                {mode === "create" ? "Create" : "Save changes"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
