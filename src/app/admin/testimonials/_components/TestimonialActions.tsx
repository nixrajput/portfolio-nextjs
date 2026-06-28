"use client";

import { useState } from "react";
import { Check, X, Star, Trash2, ExternalLink } from "lucide-react";
import {
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  toggleFeatured,
} from "@/lib/testimonials/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { BrandInitialsAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/admin/ui";

export type AdminTestimonial = {
  id: string;
  name: string;
  relationship: string;
  content: string;
  imageUrl: string | null;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  linkedinUrl: string | null;
  githubUrl: string | null;
  xUrl: string | null;
  instagramUrl: string | null;
  websiteUrl: string | null;
};

const actionBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";

/**
 * Opens a dialog showing the full testimonial, with moderation actions inside.
 * Every action (approve / reject / feature / delete) is confirmed via an
 * AlertDialog before it runs.
 */
export default function TestimonialActions({ testimonial }: { testimonial: AdminTestimonial }) {
  const [open, setOpen] = useState(false);
  const t = testimonial;

  const socials = [
    { label: "LinkedIn", url: t.linkedinUrl },
    { label: "GitHub", url: t.githubUrl },
    { label: "X", url: t.xUrl },
    { label: "Instagram", url: t.instagramUrl },
    { label: "Website", url: t.websiteUrl },
  ].filter((s) => s.url);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-border text-foreground hover:bg-surface-2 shrink-0 self-start rounded-lg border px-3 py-1.5 text-xs font-medium transition"
      >
        View
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Testimonial</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <BrandInitialsAvatar name={t.name} src={t.imageUrl} className="size-12" />
                <div className="min-w-0">
                  <div className="text-foreground font-medium">{t.name}</div>
                  <div className="text-muted text-sm">{t.relationship}</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <StatusBadge status={t.status} />
                  {t.featured ? <Badge tone="brand">Featured</Badge> : null}
                </div>
              </div>

              <blockquote className="border-border text-foreground/90 border-l-2 pl-3 text-sm leading-relaxed">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {socials.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border text-muted hover:text-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition"
                    >
                      {s.label}
                      <ExternalLink className="size-3" aria-hidden />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </DialogBody>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
            {t.status !== "approved" ? (
              <ConfirmButton
                title="Approve testimonial?"
                description="It will become publicly visible on your portfolio."
                confirmLabel="Approve"
                tone="brand"
                onConfirm={() => approveTestimonial(t.id)}
                className={`${actionBtn} bg-emerald-600 text-white hover:bg-emerald-700`}
              >
                <Check className="size-4" aria-hidden />
                Approve
              </ConfirmButton>
            ) : null}
            {t.status !== "rejected" ? (
              <ConfirmButton
                title="Reject testimonial?"
                description="It will be hidden from the site. You can approve it later."
                confirmLabel="Reject"
                tone="danger"
                onConfirm={() => rejectTestimonial(t.id)}
                className={`${actionBtn} bg-amber-600 text-white hover:bg-amber-700`}
              >
                <X className="size-4" aria-hidden />
                Reject
              </ConfirmButton>
            ) : null}
            <ConfirmButton
              title={t.featured ? "Unfeature testimonial?" : "Feature testimonial?"}
              description={
                t.featured
                  ? "It will no longer be highlighted first."
                  : "It will be highlighted at the front of the list."
              }
              confirmLabel={t.featured ? "Unfeature" : "Feature"}
              tone="neutral"
              onConfirm={() => toggleFeatured(t.id, !t.featured)}
              className={`${actionBtn} border-border text-foreground hover:bg-surface-2 border`}
            >
              <Star className="size-4" aria-hidden />
              {t.featured ? "Unfeature" : "Feature"}
            </ConfirmButton>
            <ConfirmButton
              title="Delete testimonial?"
              description="This permanently removes the testimonial. This cannot be undone."
              confirmLabel="Delete"
              tone="danger"
              onConfirm={() => deleteTestimonial(t.id)}
              className={`${actionBtn} text-red-600 hover:bg-red-500/10`}
            >
              <Trash2 className="size-4" aria-hidden />
              Delete
            </ConfirmButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function StatusBadge({ status }: { status: AdminTestimonial["status"] }) {
  if (status === "pending") return <Badge tone="warning">Pending</Badge>;
  if (status === "approved") return <Badge tone="success">Approved</Badge>;
  return (
    <span className="inline-flex items-center rounded-full bg-red-500/12 px-2 py-0.5 text-xs font-medium text-red-500">
      Rejected
    </span>
  );
}
