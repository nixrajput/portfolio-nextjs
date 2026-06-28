import { db } from "@/db/client";
import { experiences } from "@/db/schema";
import { createExperience, deleteExperience } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Panel,
  Field,
  Input,
  Textarea,
  CheckboxField,
  SubmitButton,
  RecordList,
  Badge,
} from "@/components/admin/ui";

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
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Experiences" description="Your work history timeline." />

      <Panel title="Add experience">
        <form action={create} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Role / Job title">
              <Input name="role" placeholder="Software Engineer" required />
            </Field>
            <Field label="Organisation">
              <Input name="org" placeholder="Company" required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Period">
              <Input name="period" placeholder="Jan 2022 – Present" required />
            </Field>
            <Field label="Location" hint="Optional">
              <Input name="location" placeholder="Pune, India" />
            </Field>
          </div>
          <Field label="Description" hint="One bullet per line.">
            <Textarea name="description" rows={4} placeholder="Led the API rewrite…" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Order">
              <Input name="order" type="number" defaultValue={0} />
            </Field>
            <div className="flex items-end">
              <CheckboxField name="isCurrent" label="Current role" />
            </div>
          </div>
          <SubmitButton>Add experience</SubmitButton>
        </form>
      </Panel>

      <RecordList
        rows={rows.map((e) => ({
          id: e.id,
          primary: `${e.role} @ ${e.org}`,
          meta: e.period,
          badges: e.isCurrent ? <Badge tone="success">Current</Badge> : null,
        }))}
        deleteAction={remove}
        empty="No experiences yet."
      />
    </div>
  );
}
