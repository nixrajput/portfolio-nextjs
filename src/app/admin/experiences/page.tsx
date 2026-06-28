import { db } from "@/db/client";
import { experiences } from "@/db/schema";
import { createExperience, deleteExperience } from "../actions";

export const dynamic = "force-dynamic";

export default async function ExperiencesEditor() {
  const rows = await db.select().from(experiences).orderBy(experiences.order);

  async function create(formData: FormData) {
    "use server";
    await createExperience({
      role: String(formData.get("role")),
      org: String(formData.get("org")),
      period: String(formData.get("period")),
      location: (formData.get("location") as string) || null,
      isCurrent: formData.get("isCurrent") === "on",
      description: String(formData.get("description") || "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      order: Number(formData.get("order") || 0),
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteExperience(Number(formData.get("id")));
  }

  return (
    <div className="grid gap-8">
      <h2 className="text-xl font-semibold">Experiences</h2>

      <form action={create} className="grid max-w-2xl gap-3 rounded-lg border p-4">
        <h3 className="font-medium">Add Experience</h3>
        <input name="role" placeholder="Role / Job title" required className="rounded border p-2" />
        <input name="org" placeholder="Organisation" required className="rounded border p-2" />
        <input
          name="period"
          placeholder="Period (e.g. Jan 2022 – Present)"
          required
          className="rounded border p-2"
        />
        <input name="location" placeholder="Location (optional)" className="rounded border p-2" />
        <textarea
          name="description"
          placeholder="Description bullets (one per line)"
          rows={4}
          className="rounded border p-2"
        />
        <input name="order" type="number" defaultValue={0} className="rounded border p-2" />
        <label className="flex gap-2">
          <input name="isCurrent" type="checkbox" /> Current role
        </label>
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Add experience
        </button>
      </form>

      <ul className="grid gap-2">
        {rows.map((e) => (
          <li key={e.id} className="flex items-center justify-between rounded border p-3">
            <span>
              {e.role} @ {e.org} <span className="text-muted-foreground text-xs">{e.period}</span>
              {e.isCurrent ? " (current)" : ""}
            </span>
            <form action={remove}>
              <input type="hidden" name="id" value={e.id} />
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
