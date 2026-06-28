import { db } from "@/db/client";
import { skills } from "@/db/schema";
import { createSkill, deleteSkill } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Panel,
  Field,
  Input,
  Select,
  SubmitButton,
  RecordList,
  Badge,
} from "@/components/admin/ui";

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
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Skills" description="Tools and technologies, grouped by category." />

      <Panel title="Add skill">
        <form action={create} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Skill name">
              <Input name="name" placeholder="React.js" required />
            </Field>
            <Field label="Category">
              <Input name="category" placeholder="Frontend Development" required />
            </Field>
          </div>
          <Field label="Icon path" hint="e.g. /skills/react.svg">
            <Input name="iconPath" placeholder="/skills/react.svg" required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Level">
              <Select name="level" defaultValue="">
                <option value="">No level</option>
                <option value="Expert">Expert</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginner">Beginner</option>
              </Select>
            </Field>
            <Field label="Order">
              <Input name="order" type="number" defaultValue={0} />
            </Field>
          </div>
          <SubmitButton>Add skill</SubmitButton>
        </form>
      </Panel>

      <RecordList
        rows={rows.map((s) => ({
          id: s.id,
          primary: s.name,
          meta: s.category,
          badges: s.level ? <Badge>{s.level}</Badge> : null,
        }))}
        deleteAction={remove}
        empty="No skills yet."
      />
    </div>
  );
}
