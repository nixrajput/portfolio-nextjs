import { db } from "@/db/client";
import { skills } from "@/db/schema";
import { createSkill, deleteSkill } from "../actions";

export const dynamic = "force-dynamic";

export default async function SkillsEditor() {
  const rows = await db.select().from(skills).orderBy(skills.order);

  async function create(formData: FormData) {
    "use server";
    const level = formData.get("level") as string;
    await createSkill({
      name: String(formData.get("name")),
      iconPath: String(formData.get("iconPath")),
      category: String(formData.get("category")),
      level: level === "Expert" || level === "Intermediate" || level === "Beginner" ? level : null,
      order: Number(formData.get("order") || 0),
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteSkill(Number(formData.get("id")));
  }

  return (
    <div className="grid gap-8">
      <h2 className="text-xl font-semibold">Skills</h2>

      <form action={create} className="grid max-w-2xl gap-3 rounded-lg border p-4">
        <h3 className="font-medium">Add Skill</h3>
        <input name="name" placeholder="Skill name" required className="rounded border p-2" />
        <input
          name="iconPath"
          placeholder="Icon path (e.g. /icons/react.svg)"
          required
          className="rounded border p-2"
        />
        <input
          name="category"
          placeholder="Category (e.g. Frontend)"
          required
          className="rounded border p-2"
        />
        <select name="level" className="rounded border p-2">
          <option value="">No level</option>
          <option value="Expert">Expert</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Beginner">Beginner</option>
        </select>
        <input name="order" type="number" defaultValue={0} className="rounded border p-2" />
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Add skill
        </button>
      </form>

      <ul className="grid gap-2">
        {rows.map((s) => (
          <li key={s.id} className="flex items-center justify-between rounded border p-3">
            <span>
              {s.name}{" "}
              <span className="text-muted-foreground text-xs">
                {s.category}
                {s.level ? ` · ${s.level}` : ""}
              </span>
            </span>
            <form action={remove}>
              <input type="hidden" name="id" value={s.id} />
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
