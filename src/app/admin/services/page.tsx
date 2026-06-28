import { db } from "@/db/client";
import { services } from "@/db/schema";
import { createService, updateService, deleteService } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RecordList } from "@/components/admin/ui";
import { RecordFormDialog, type AdminField } from "@/components/admin/RecordFormDialog";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Web Development", required: true },
  {
    name: "description",
    label: "Full description",
    type: "textarea",
    rows: 3,
    placeholder: "Detailed description",
    required: true,
  },
  {
    name: "shortDescription",
    label: "Short description",
    type: "text",
    placeholder: "One-line summary",
    hint: "Optional — shown on the card.",
  },
  {
    name: "icon",
    label: "Icon path",
    type: "text",
    placeholder: "/icons/web.svg",
    hint: "Optional",
  },
  { name: "order", label: "Order", type: "number" },
];

function parse(formData: FormData) {
  return {
    title: String(formData.get("title")),
    description: String(formData.get("description")),
    shortDescription: (formData.get("shortDescription") as string) || null,
    icon: (formData.get("icon") as string) || null,
    order: Number(formData.get("order") || 0),
  };
}

export default async function ServicesEditor() {
  const rows = await db.select().from(services).orderBy(services.order);

  async function create(formData: FormData) {
    "use server";
    await createService(parse(formData));
  }
  async function update(formData: FormData) {
    "use server";
    await updateService(Number(formData.get("id")), parse(formData));
  }
  async function remove(formData: FormData) {
    "use server";
    await deleteService(Number(formData.get("id")));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <AdminPageHeader title="Services" description="What you offer." />
        <RecordFormDialog mode="create" title="Add service" fields={fields} formAction={create} />
      </div>

      <RecordList
        rows={rows.map((s) => ({
          id: s.id,
          primary: s.title,
          meta: s.shortDescription ?? undefined,
          actions: (
            <RecordFormDialog
              mode="edit"
              title="Edit service"
              fields={fields}
              formAction={update}
              record={s}
            />
          ),
        }))}
        deleteAction={remove}
        empty="No services yet."
      />
    </div>
  );
}
