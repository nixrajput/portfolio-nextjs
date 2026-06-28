import { db } from "@/db/client";
import { profile } from "@/db/schema";
import { updateProfile } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Panel, Field, Input, Textarea, SubmitButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function ProfileEditor() {
  // Profile is a singleton — read the first row (its serial id can drift after
  // a reseed, so don't filter by a hardcoded id).
  const [row] = await db.select().from(profile).limit(1);

  async function action(formData: FormData) {
    "use server";
    await updateProfile({
      name: String(formData.get("name")),
      headline: String(formData.get("headline")),
      bio: String(formData.get("bio")),
      summary: String(formData.get("summary")),
      stats: row?.stats ?? {},
      roles: row?.roles ?? [],
      resumeUrl: (formData.get("resumeUrl") as string) || null,
      avatarUrl: (formData.get("avatarUrl") as string) || null,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Profile" description="Your headline, bio, and links." />

      <Panel>
        <form action={action} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input name="name" defaultValue={row?.name} placeholder="Name" />
            </Field>
            <Field label="Headline">
              <Input name="headline" defaultValue={row?.headline} placeholder="Headline" />
            </Field>
          </div>
          <Field label="Bio">
            <Textarea name="bio" defaultValue={row?.bio} rows={4} placeholder="Bio" />
          </Field>
          <Field label="Summary" hint="Entity-first one-liner used for SEO/GEO.">
            <Textarea name="summary" defaultValue={row?.summary} rows={2} placeholder="Summary" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Resume URL">
              <Input name="resumeUrl" defaultValue={row?.resumeUrl ?? ""} placeholder="https://…" />
            </Field>
            <Field label="Avatar URL">
              <Input
                name="avatarUrl"
                defaultValue={row?.avatarUrl ?? ""}
                placeholder="/images/nikhil.png"
              />
            </Field>
          </div>
          <SubmitButton>Save changes</SubmitButton>
        </form>
      </Panel>
    </div>
  );
}
