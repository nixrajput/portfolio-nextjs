import { db } from "@/db/client";
import { profile } from "@/db/schema";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SectionVisibilityToggles } from "@/components/admin/SectionVisibilityToggles";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [row] = await db
    .select({ sectionVisibility: profile.sectionVisibility })
    .from(profile)
    .limit(1);
  const sectionVisibility = (row?.sectionVisibility ?? {}) as Record<string, boolean>;

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Settings"
        description="Control what appears on your public portfolio."
      />

      <section className="border-border bg-surface rounded-2xl border p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-foreground font-semibold">Homepage sections</h2>
          <p className="text-muted mt-0.5 text-sm">
            Turn a section on or off. Changes save instantly; a hidden section never loads on the
            site or its menu.
          </p>
        </div>
        <SectionVisibilityToggles visibility={sectionVisibility} />
      </section>
    </div>
  );
}
