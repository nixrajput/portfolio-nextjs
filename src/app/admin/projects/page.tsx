import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { createProject, deleteProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function ProjectsEditor() {
  const rows = await db.select().from(projects).orderBy(projects.order);

  async function create(formData: FormData) {
    "use server";
    await createProject({
      repo: String(formData.get("repo")),
      title: String(formData.get("title")),
      customBlurb: (formData.get("customBlurb") as string) || null,
      tags: String(formData.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") || 0),
      hidden: formData.get("hidden") === "on",
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteProject(Number(formData.get("id")));
  }

  return (
    <div className="grid gap-8">
      <h2 className="text-xl font-semibold">Projects</h2>

      <form action={create} className="grid max-w-2xl gap-3 rounded-lg border p-4">
        <h3 className="font-medium">Add Project</h3>
        <input
          name="repo"
          placeholder="GitHub slug (e.g. siphon)"
          required
          className="rounded border p-2"
        />
        <input name="title" placeholder="Title" required className="rounded border p-2" />
        <textarea
          name="customBlurb"
          placeholder="Custom blurb (optional)"
          className="rounded border p-2"
        />
        <input name="tags" placeholder="tags, comma, separated" className="rounded border p-2" />
        <input name="order" type="number" defaultValue={0} className="rounded border p-2" />
        <label className="flex gap-2">
          <input name="featured" type="checkbox" /> Featured
        </label>
        <label className="flex gap-2">
          <input name="hidden" type="checkbox" /> Hidden
        </label>
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Add project
        </button>
      </form>

      <ul className="grid gap-2">
        {rows.map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded border p-3">
            <span>
              {p.title} <code className="text-muted-foreground text-xs">{p.repo}</code>
              {p.featured ? " ★" : ""}
              {p.hidden ? " (hidden)" : ""}
            </span>
            <form action={remove}>
              <input type="hidden" name="id" value={p.id} />
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
