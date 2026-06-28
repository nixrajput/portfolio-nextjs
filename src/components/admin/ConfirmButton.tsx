"use client";

import { useState, useTransition, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/utils/cn";

type Tone = "danger" | "brand" | "neutral";

const toneClasses: Record<Tone, string> = {
  danger: "bg-red-600 text-white hover:bg-red-700",
  neutral: "border-border bg-surface text-foreground hover:bg-surface-2 border",
  brand:
    "relative isolate overflow-hidden border border-white/15 text-white before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-brand)] before:opacity-90 hover:before:opacity-100",
};

/**
 * A button that asks for confirmation in an AlertDialog before running an
 * action. Use for every action that mutates or destroys data in the admin
 * (approve, reject, feature, delete) so the user reconfirms first.
 *
 * `onConfirm` may be a server action; it runs inside a transition so the UI
 * stays responsive and the row refreshes when it resolves.
 */
export function ConfirmButton({
  children,
  title,
  description,
  confirmLabel,
  tone = "danger",
  onConfirm,
  className,
}: {
  children: ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  tone?: Tone;
  onConfirm: () => void | Promise<void>;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={isPending}
        className={className}
      >
        {children}
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <div className="mt-5 flex justify-end gap-2">
            <AlertDialogCancel
              className={cn(
                "border-border bg-surface text-foreground hover:bg-surface-2 rounded-lg border px-4 py-2 text-sm font-medium transition",
              )}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => startTransition(() => void onConfirm())}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition",
                toneClasses[tone],
              )}
            >
              {confirmLabel}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
