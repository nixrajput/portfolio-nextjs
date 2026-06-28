import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import type { Testimonial } from "@/db/schema";
import TestimonialActions from "./_components/TestimonialActions";

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
    <div className="grid gap-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        {pendingCount > 0 && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-medium text-amber-800">
            {pendingCount} pending
          </span>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="text-muted-foreground text-sm">No testimonials yet.</p>
      ) : (
        <ul className="grid gap-3">
          {sorted.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start"
            >
              {/* Avatar placeholder — initials */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-semibold text-white select-none">
                {t.name
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((p) => p[0]?.toUpperCase() ?? "")
                  .join("")}
              </span>

              <div className="grid min-w-0 flex-1 gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted-foreground text-xs">{t.relationship}</span>
                  <StatusBadge status={t.status} />
                  {t.featured && (
                    <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-3 text-sm">{t.content}</p>
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
  if (status === "pending") {
    return (
      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
        Pending
      </span>
    );
  }
  if (status === "approved") {
    return (
      <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800">
        Approved
      </span>
    );
  }
  return (
    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800">
      Rejected
    </span>
  );
}
