"use client";

import { useState, isValidElement, cloneElement, type ReactElement, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SubmitTestimonialForm, TESTIMONIAL_FORM_ID } from "./SubmitTestimonialForm";

/**
 * Controlled rather than `DialogTrigger asChild`: Radix's Slot dropped the trigger Button's
 * gradient className and rendered an invisible button, so the child is cloned instead. Success
 * state lives here, not in the form, so the whole header/body/footer can swap.
 */
export function SubmitTestimonialModal({
  children,
}: {
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    // Reset to a fresh form once the dialog has closed, so re-opening never
    // shows the previous success panel.
    if (!next) {
      setTimeout(() => {
        setSubmitted(false);
        setSubmitting(false);
      }, 200);
    }
  }

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
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl">
          {submitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Thank you - truly</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <div className="flex flex-col items-center gap-5 py-4 text-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="relative grid size-16 place-items-center rounded-full"
                  >
                    <span className="absolute inset-0 rounded-full bg-(image:--gradient-brand) opacity-90" />
                    <Check className="relative h-8 w-8 text-white" strokeWidth={2.5} aria-hidden />
                  </motion.span>

                  <div className="space-y-2">
                    <p className="text-foreground text-lg leading-snug font-semibold">
                      Your words mean a lot.
                    </p>
                    <p className="text-muted mx-auto max-w-sm text-sm leading-relaxed">
                      I read every testimonial myself before it goes live. Once I&apos;ve had a
                      chance to review yours, it&apos;ll appear right here on the site - usually
                      within a day or two. Thank you for taking the time to share it.
                    </p>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="primary" size="md" className="w-full rounded-lg">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Share your experience</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <SubmitTestimonialForm
                  onSuccess={() => setSubmitted(true)}
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
