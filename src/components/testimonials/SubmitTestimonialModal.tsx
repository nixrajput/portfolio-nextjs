"use client";

import { useState, isValidElement, cloneElement, type ReactElement, type MouseEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubmitTestimonialForm } from "./SubmitTestimonialForm";

/**
 * Controlled modal. We do NOT use Radix `DialogTrigger asChild` (its Slot
 * composition was dropping the trigger Button's gradient className, rendering
 * an invisible button). Instead we clone the trigger child to attach an
 * onClick that opens the controlled Dialog — the Button keeps all its own
 * styling intact.
 */
export function SubmitTestimonialModal({
  children,
}: {
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
}) {
  const [open, setOpen] = useState(false);

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        onClick: (e: MouseEvent) => {
          children.props.onClick?.(e);
          setOpen(true);
        },
      })
    : children;

  return (
    <>
      {trigger}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Leave a testimonial</DialogTitle>
          </DialogHeader>
          <SubmitTestimonialForm onSuccess={() => setTimeout(() => setOpen(false), 1500)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
