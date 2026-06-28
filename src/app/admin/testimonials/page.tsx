import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import type { Testimonial } from "@/db/schema";
import TestimonialActions from "./_components/TestimonialActions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/admin/ui";
import { BrandInitialsAvatar } from "@/components/ui/avatar";

export const dynamic = "force-dynamic";

const STATUS_ORDER: Record<Testimonial["status"], number> = {
  pending: 0,
  approved: 1,
  rejected: 2,
};

export default async function TestimonialsPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.createdAt));

  const sorted = [...rows].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-3">
        <AdminPageHeader title="Testimonials" description="Approve or reject submissions." />
        {pendingCount > 0 ? <Badge tone="warning">{pendingCount} pending</Badge> : null}
      </div>

      {sorted.length === 0 ? (
        <div className="border-border text-muted rounded-xl border border-dashed p-8 text-center text-sm">
          No testimonials yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((t) => (
            <li
              key={t.id}
              className="border-border bg-surface flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-start"
            >
              <BrandInitialsAvatar name={t.name} src={t.imageUrl} className="h-10 w-10 shrink-0" />

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-foreground font-medium">{t.name}</span>
                  <span className="text-muted text-xs">{t.relationship}</span>
                  <StatusBadge status={t.status} />
                  {t.featured ? <Badge tone="brand">Featured</Badge> : null}
                </div>
                <p className="text-muted line-clamp-3 text-sm">{t.content}</p>
              </div>

              <TestimonialActions id={t.id} status={t.status} featured={t.featured} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Testimonial["status"] }) {
  if (status === "pending") return <Badge tone="warning">Pending</Badge>;
  if (status === "approved") return <Badge tone="success">Approved</Badge>;
  return (
    <span className="inline-flex items-center rounded-full bg-red-500/12 px-2 py-0.5 text-xs font-medium text-red-500">
      Rejected
    </span>
  );
}
