import { db } from "@/db/client";
import { profile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateProfile } from "../actions";

export const dynamic = "force-dynamic";

export default async function ProfileEditor() {
  const [row] = await db.select().from(profile).where(eq(profile.id, 1));

  async function action(formData: FormData) {
    "use server";
    await updateProfile({
      name: String(formData.get("name")),
      headline: String(formData.get("headline")),
      bio: String(formData.get("bio")),
      summary: String(formData.get("summary")),
      stats: row?.stats ?? {},
      roles: row?.roles ?? [],
      availableForWork: row?.availableForWork ?? true,
      resumeUrl: (formData.get("resumeUrl") as string) || null,
      avatarUrl: (formData.get("avatarUrl") as string) || null,
    });
  }

  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      <form action={action} className="grid max-w-2xl gap-4">
        <input
          name="name"
          defaultValue={row?.name}
          placeholder="Name"
          className="rounded border p-2"
        />
        <input
          name="headline"
          defaultValue={row?.headline}
          placeholder="Headline"
          className="rounded border p-2"
        />
        <textarea
          name="bio"
          defaultValue={row?.bio}
          placeholder="Bio"
          rows={3}
          className="rounded border p-2"
        />
        <textarea
          name="summary"
          defaultValue={row?.summary}
          placeholder="Entity-first summary"
          rows={2}
          className="rounded border p-2"
        />
        <input
          name="resumeUrl"
          defaultValue={row?.resumeUrl ?? ""}
          placeholder="Resume URL"
          className="rounded border p-2"
        />
        <input
          name="avatarUrl"
          defaultValue={row?.avatarUrl ?? ""}
          placeholder="Avatar URL"
          className="rounded border p-2"
        />
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}
