import Link from "next/link";
import { sql, eq } from "drizzle-orm";
import { FolderGit2, Briefcase, Wrench, Sparkles, MessageSquareQuote, Clock } from "lucide-react";
import { db } from "@/db/client";
import { projects, experiences, skills, services, testimonials } from "@/db/schema";

export const dynamic = "force-dynamic";

const cards = [
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/services", label: "Services", icon: Sparkles },
] as const;

export default async function AdminDashboard() {
  const [[proj], [exp], [skl], [svc], [pending], [approved]] = await Promise.all([
    db.select({ n: sql<number>`count(*)` }).from(projects),
    db.select({ n: sql<number>`count(*)` }).from(experiences),
    db.select({ n: sql<number>`count(*)` }).from(skills),
    db.select({ n: sql<number>`count(*)` }).from(services),
    db
      .select({ n: sql<number>`count(*)` })
      .from(testimonials)
      .where(eq(testimonials.status, "pending")),
    db
      .select({ n: sql<number>`count(*)` })
      .from(testimonials)
      .where(eq(testimonials.status, "approved")),
  ]);

  const counts: Record<string, number> = {
    "/admin/projects": Number(proj.n),
    "/admin/experiences": Number(exp.n),
    "/admin/skills": Number(skl.n),
    "/admin/services": Number(svc.n),
  };
  const pendingCount = Number(pending.n);
  const approvedCount = Number(approved.n);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted mt-1 text-sm">Manage everything that powers your portfolio.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="border-border bg-surface hover:border-foreground/20 hover:bg-surface-2 flex flex-col gap-3 rounded-2xl border p-5 transition"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-white">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <div>
                <div className="text-foreground text-2xl font-bold tabular-nums">
                  {counts[c.href]}
                </div>
                <div className="text-muted text-sm">{c.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Testimonials moderation highlight */}
      <Link
        href="/admin/testimonials"
        className="border-border bg-surface hover:border-foreground/20 hover:bg-surface-2 flex items-center justify-between gap-4 rounded-2xl border p-5 transition"
      >
        <div className="flex items-center gap-4">
          <span className="grid size-10 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white">
            <MessageSquareQuote className="size-5" aria-hidden />
          </span>
          <div>
            <div className="text-foreground font-semibold">Testimonials</div>
            <div className="text-muted text-sm">
              {approvedCount} live
              {pendingCount > 0 ? ` · ${pendingCount} awaiting review` : ""}
            </div>
          </div>
        </div>
        {pendingCount > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/12 px-2.5 py-1 text-xs font-medium text-amber-500">
            <Clock className="size-3.5" aria-hidden />
            {pendingCount} pending
          </span>
        ) : null}
      </Link>
    </div>
  );
}
