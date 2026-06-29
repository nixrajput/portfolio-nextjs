import { db } from "@/db/client";
import { skills } from "@/db/schema";
import { createSkill, updateSkill, deleteSkill } from "../actions";
import { AdminCrudPage } from "@/components/admin/AdminCrudPage";
import { Badge } from "@/components/admin/ui";
import { type AdminField } from "@/components/admin/RecordFormDialog";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { name: "name", label: "Skill name", type: "text", placeholder: "React.js", required: true },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Frontend Development",
    required: true,
  },
  {
    name: "iconPath",
    label: "Icon path",
    type: "text",
    placeholder: "/skills/react.svg",
    hint: "e.g. /skills/react.svg",
    required: true,
  },
  {
    name: "level",
    label: "Level",
    type: "select",
    options: [
      { value: "", label: "No level" },
      { value: "Expert", label: "Expert" },
      { value: "Intermediate", label: "Intermediate" },
      { value: "Beginner", label: "Beginner" },
    ],
  },
  { name: "order", label: "Order", type: "number" },
];

function parse(formData: FormData) {
  const raw = formData.get("level") as string;
  const level: "Expert" | "Intermediate" | "Beginner" | null =
    raw === "Expert" || raw === "Intermediate" || raw === "Beginner" ? raw : null;
  return {
    name: String(formData.get("name")),
    iconPath: String(formData.get("iconPath")),
    category: String(formData.get("category")),
    level,
    order: Number(formData.get("order") || 0),
  };
}

export default async function SkillsEditor() {
  const rows = await db.select().from(skills).orderBy(skills.order);

  async function create(formData: FormData) {
    "use server";
    await createSkill(parse(formData));
  }
  async function update(formData: FormData) {
    "use server";
    await updateSkill(Number(formData.get("id")), parse(formData));
  }
  async function remove(formData: FormData) {
    "use server";
    await deleteSkill(Number(formData.get("id")));
  }

  return (
    <AdminCrudPage
      title="Skills"
      description="Tools and technologies, grouped by category."
      createTitle="Add skill"
      editTitle="Edit skill"
      fields={fields}
      rows={rows}
      toRow={(s) => ({
        primary: s.name,
        meta: s.category,
        badges: s.level ? <Badge>{s.level}</Badge> : null,
      })}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
      empty="No skills yet."
    />
  );
}
