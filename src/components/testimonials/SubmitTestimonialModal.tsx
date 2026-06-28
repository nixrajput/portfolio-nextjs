"use client";

import { useState, isValidElement, cloneElement, type ReactElement, type MouseEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { SubmitTestimonialForm, TESTIMONIAL_FORM_ID } from "./SubmitTestimonialForm";

/**
 * Controlled modal. We do NOT use Radix `DialogTrigger asChild` (its Slot
 * composition was dropping the trigger Button's gradient className, rendering
 * an invisible button). Instead we clone the trigger child to attach an
 * onClick that opens the controlled Dialog — the Button keeps all its own
 * styling intact.
 *
 * Layout: fixed header → scrollable form fields → fixed footer with submit.
 * The submit button uses the HTML `form` attribute so it lives outside the
 * <form> element while still triggering its submit handler.
 */
export function SubmitTestimonialModal({
  children,
}: {
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
          <DialogBody>
            <SubmitTestimonialForm
              onSuccess={() => setTimeout(() => setOpen(false), 1500)}
              onStateChange={(s) => setSubmitting(s === "submitting")}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              type="submit"
              form={TESTIMONIAL_FORM_ID}
              variant="primary"
              size="md"
              disabled={submitting}
              className="w-full rounded-lg"
            >
              {submitting ? "Submitting…" : "Submit testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
