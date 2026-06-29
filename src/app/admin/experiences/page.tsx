import { db } from "@/db/client";
import { experiences } from "@/db/schema";
import { createExperience, updateExperience, deleteExperience } from "../actions";
import { AdminCrudPage } from "@/components/admin/AdminCrudPage";
import { Badge } from "@/components/admin/ui";
import { type AdminField } from "@/components/admin/RecordFormDialog";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  {
    name: "role",
    label: "Role / Job title",
    type: "text",
    placeholder: "Software Engineer",
    required: true,
  },
  { name: "org", label: "Organisation", type: "text", placeholder: "Company", required: true },
  {
    name: "period",
    label: "Period",
    type: "text",
    placeholder: "Jan 2022 – Present",
    required: true,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Pune, India",
    hint: "Optional",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    rows: 4,
    hint: "One bullet per line.",
  },
  { name: "order", label: "Order", type: "number" },
  { name: "isCurrent", label: "Current role", type: "checkbox" },
];

function parse(formData: FormData) {
  return {
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
  };
}

export default async function ExperiencesEditor() {
  const rows = await db.select().from(experiences).orderBy(experiences.order);

  async function create(formData: FormData) {
    "use server";
    await createExperience(parse(formData));
  }
  async function update(formData: FormData) {
    "use server";
    await updateExperience(Number(formData.get("id")), parse(formData));
  }
  async function remove(formData: FormData) {
    "use server";
    await deleteExperience(Number(formData.get("id")));
  }

  return (
    <AdminCrudPage
      title="Experiences"
      description="Your work history timeline."
      createTitle="Add experience"
      editTitle="Edit experience"
      fields={fields}
      rows={rows}
      toRow={(e) => ({
        primary: `${e.role} @ ${e.org}`,
        meta: e.period,
        badges: e.isCurrent ? <Badge tone="success">Current</Badge> : null,
      })}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
      empty="No experiences yet."
    />
  );
}
