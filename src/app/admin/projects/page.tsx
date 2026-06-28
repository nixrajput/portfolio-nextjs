import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { createProject, deleteProject } from "../actions";
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
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Projects" description="Curate which repos appear and how." />

      <Panel title="Add project">
        <form action={create} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="GitHub slug">
              <Input name="repo" placeholder="e.g. siphon" required />
            </Field>
            <Field label="Title">
              <Input name="title" placeholder="Project title" required />
            </Field>
          </div>
          <Field label="Custom blurb" hint="Optional — overrides the GitHub description.">
            <Textarea name="customBlurb" rows={2} placeholder="A short custom description" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tags" hint="Comma-separated">
              <Input name="tags" placeholder="Flutter, Dart, GetX" />
            </Field>
            <Field label="Order">
              <Input name="order" type="number" defaultValue={0} />
            </Field>
          </div>
          <div className="flex gap-6">
            <CheckboxField name="featured" label="Featured" />
            <CheckboxField name="hidden" label="Hidden" />
          </div>
          <SubmitButton>Add project</SubmitButton>
        </form>
      </Panel>

      <RecordList
        rows={rows.map((p) => ({
          id: p.id,
          primary: p.title,
          meta: p.repo,
          badges: (
            <>
              {p.featured ? <Badge tone="brand">Featured</Badge> : null}
              {p.hidden ? <Badge tone="warning">Hidden</Badge> : null}
            </>
          ),
        }))}
        deleteAction={remove}
        empty="No projects yet."
      />
    </div>
  );
}
