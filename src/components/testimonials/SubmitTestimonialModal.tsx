"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitTestimonialForm } from "./SubmitTestimonialForm";

export function SubmitTestimonialModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Leave a testimonial</DialogTitle>
        </DialogHeader>
        <SubmitTestimonialForm onSuccess={() => setTimeout(() => setOpen(false), 1500)} />
      </DialogContent>
    </Dialog>
  );
}
