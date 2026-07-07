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
    // Roles feed the hero marquee. Accept comma- or newline-separated input,
    // trim, and drop blanks.
    const roles = String(formData.get("roles") ?? "")
      .split(/[\n,]/)
      .map((r) => r.trim())
      .filter(Boolean);
    await updateProfile({
      name: String(formData.get("name")),
      bio: String(formData.get("bio")),
      stats: row?.stats ?? {},
      roles,
      // Visibility is managed on the dashboard; preserve it unchanged on save.
      sectionVisibility: row?.sectionVisibility ?? {},
      resumeUrl: (formData.get("resumeUrl") as string) || null,
      avatarUrl: (formData.get("avatarUrl") as string) || null,
      heroTagline: (formData.get("heroTagline") as string) || null,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Profile" description="Your name, bio, roles, and links." />

      <Panel>
        <form action={action} className="flex flex-col gap-4">
          <Field label="Name">
            <Input name="name" defaultValue={row?.name} placeholder="Name" />
          </Field>
          <Field label="Bio">
            <Textarea name="bio" defaultValue={row?.bio} rows={4} placeholder="Bio" />
          </Field>
          <Field
            label="Roles"
            hint="Shown in the scrolling hero marquee. One per line, or comma-separated."
          >
            <Textarea
              name="roles"
              defaultValue={(row?.roles ?? []).join("\n")}
              rows={3}
              placeholder={
                "Software Development Engineer\nFull Stack Developer\nOpen Source Contributor"
              }
            />
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
