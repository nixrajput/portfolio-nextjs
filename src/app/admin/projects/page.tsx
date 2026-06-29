import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { createProject, updateProject, deleteProject } from "../actions";
import { AdminCrudPage } from "@/components/admin/AdminCrudPage";
import { Badge } from "@/components/admin/ui";
import { type AdminField } from "@/components/admin/RecordFormDialog";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { name: "repo", label: "GitHub slug", type: "text", placeholder: "e.g. siphon", required: true },
  { name: "title", label: "Title", type: "text", placeholder: "Project title", required: true },
  {
    name: "customBlurb",
    label: "Custom blurb",
    type: "textarea",
    rows: 2,
    hint: "Optional — overrides the GitHub description.",
  },
  {
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "Flutter, Dart",
    hint: "Comma-separated",
  },
  { name: "order", label: "Order", type: "number" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "hidden", label: "Hidden", type: "checkbox" },
];

function parse(formData: FormData) {
  return {
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
  };
}

export default async function ProjectsEditor() {
  const rows = await db.select().from(projects).orderBy(projects.order);

  async function create(formData: FormData) {
    "use server";
    await createProject(parse(formData));
  }
  async function update(formData: FormData) {
    "use server";
    await updateProject(Number(formData.get("id")), parse(formData));
  }
  async function remove(formData: FormData) {
    "use server";
    await deleteProject(Number(formData.get("id")));
  }

  return (
    <AdminCrudPage
      title="Projects"
      description="Curate which repos appear and how."
      createTitle="Add project"
      editTitle="Edit project"
      fields={fields}
      rows={rows}
      toRow={(p) => ({
        primary: p.title,
        meta: p.repo,
        badges: (
          <>
            {p.featured ? <Badge tone="brand">Featured</Badge> : null}
            {p.hidden ? <Badge tone="warning">Hidden</Badge> : null}
          </>
        ),
      })}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
      empty="No projects yet."
    />
  );
}
