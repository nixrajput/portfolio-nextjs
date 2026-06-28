"use client";

import { useTransition } from "react";
import {
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  toggleFeatured,
} from "@/lib/testimonials/actions";

type Props = {
  id: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
};

export default function TestimonialActions({ id, status, featured }: Props) {
  const [isPending, startTransition] = useTransition();

  function run(fn: () => Promise<void>) {
    startTransition(() => {
      void fn();
    });
  }

  return (
    <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
      {status !== "approved" && (
        <button
          disabled={isPending}
          onClick={() => run(() => approveTestimonial(id))}
          className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          Approve
        </button>
      )}
      {status !== "rejected" && (
        <button
          disabled={isPending}
          onClick={() => run(() => rejectTestimonial(id))}
          className="rounded bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-700 disabled:opacity-50"
        >
          Reject
        </button>
      )}
      <button
        disabled={isPending}
        onClick={() => run(() => toggleFeatured(id, !featured))}
        className="hover:bg-muted rounded border px-3 py-1 text-xs font-medium disabled:opacity-50"
      >
        {featured ? "Unfeature" : "Feature"}
      </button>
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm("Delete this testimonial?")) {
            run(() => deleteTestimonial(id));
          }
        }}
        className="rounded px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
