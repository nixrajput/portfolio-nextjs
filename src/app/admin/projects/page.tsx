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
  {
    name: "coverImage",
    label: "Cover image",
    type: "image",
    folder: "projects",
    hint: "Shown in the featured showcase and the quick view. Falls back to the brand gradient.",
  },
  {
    name: "screenshots",
    label: "Screenshots",
    type: "images",
    max: 6,
    hint: "Gallery in the quick view. Drag order is the display order.",
  },
  {
    name: "order",
    label: "Order",
    type: "number",
    hint: "Lower comes first. The leading featured rows get the large showcase.",
  },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "hidden", label: "Hidden", type: "checkbox" },
];

/** Parse the screenshots hidden input, which MultiImageUploadField submits as JSON. */
function parseScreenshots(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    // A malformed value must not wipe the rest of the record on save.
    return [];
  }
}

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
    coverImage: (formData.get("coverImage") as string) || null,
    screenshots: parseScreenshots(formData.get("screenshots")),
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
