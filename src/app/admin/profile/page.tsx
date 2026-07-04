import { db } from "@/db/client";
import { profile } from "@/db/schema";
import { updateProfile } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Panel, Field, Input, Textarea, SubmitButton } from "@/components/admin/ui";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

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
      heroTagline: (formData.get("heroTagline") as string) || null,
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
          <Field label="Resume URL" hint="Full https URL to your resume/CV.">
            <Input name="resumeUrl" defaultValue={row?.resumeUrl ?? ""} placeholder="https://…" />
          </Field>
          <Field
            label="Avatar"
            hint="Upload a portrait or paste an image URL. Shown in the About section."
          >
            <ImageUploadField
              name="avatarUrl"
              folder="avatar"
              defaultValue={row?.avatarUrl ?? ""}
              placeholder="https://… or upload a portrait"
              previewRounded="rounded-full"
            />
          </Field>
          <Field
            label="Hero tagline"
            hint="Short phrase shown beside the glowing dot above your name. Leave empty to hide."
          >
            <Input
              name="heroTagline"
              defaultValue={row?.heroTagline ?? ""}
              placeholder="AI-native engineering"
            />
          </Field>
          <SubmitButton>Save changes</SubmitButton>
        </form>
      </Panel>
    </div>
  );
}
