import { db } from "@/db/client";
import { socialLinks } from "@/db/schema";
import { createSocialLink, deleteSocialLink } from "../actions";

export const dynamic = "force-dynamic";

export default async function SocialLinksEditor() {
  const rows = await db.select().from(socialLinks).orderBy(socialLinks.order);

  async function create(formData: FormData) {
    "use server";
    await createSocialLink({
      platform: String(formData.get("platform")),
      url: String(formData.get("url")),
      username: (formData.get("username") as string) || null,
      icon: (formData.get("icon") as string) || null,
      order: Number(formData.get("order") || 0),
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteSocialLink(Number(formData.get("id")));
  }

  return (
    <div className="grid gap-8">
      <h2 className="text-xl font-semibold">Social Links</h2>

      <form action={create} className="grid max-w-2xl gap-3 rounded-lg border p-4">
        <h3 className="font-medium">Add Social Link</h3>
        <input
          name="platform"
          placeholder="Platform (e.g. GitHub)"
          required
          className="rounded border p-2"
        />
        <input name="url" placeholder="URL" type="url" required className="rounded border p-2" />
        <input name="username" placeholder="Username (optional)" className="rounded border p-2" />
        <input name="icon" placeholder="Icon path (optional)" className="rounded border p-2" />
        <input name="order" type="number" defaultValue={0} className="rounded border p-2" />
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Add social link
        </button>
      </form>

      <ul className="grid gap-2">
        {rows.map((l) => (
          <li key={l.id} className="flex items-center justify-between rounded border p-3">
            <span>
              {l.platform}
              {l.username ? ` · @${l.username}` : ""}{" "}
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-xs underline"
              >
                {l.url}
              </a>
            </span>
            <form action={remove}>
              <input type="hidden" name="id" value={l.id} />
              <button type="submit" className="text-sm text-red-600">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
