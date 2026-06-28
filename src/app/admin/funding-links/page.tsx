import { db } from "@/db/client";
import { fundingLinks } from "@/db/schema";
import { createFundingLink, updateFundingLink, deleteFundingLink } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RecordList, Badge } from "@/components/admin/ui";
import { RecordFormDialog, type AdminField } from "@/components/admin/RecordFormDialog";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { name: "label", label: "Label", type: "text", placeholder: "Buy me a coffee", required: true },
  {
    name: "url",
    label: "URL",
    type: "url",
    placeholder: "https://buymeacoffee.com/…",
    required: true,
  },
  { name: "order", label: "Order", type: "number" },
  { name: "primary", label: "Primary", type: "checkbox" },
];

function parse(formData: FormData) {
  return {
    label: String(formData.get("label")),
    url: String(formData.get("url")),
    primary: formData.get("primary") === "on",
    order: Number(formData.get("order") || 0),
  };
}

export default async function FundingLinksEditor() {
  const rows = await db.select().from(fundingLinks).orderBy(fundingLinks.order);

  async function create(formData: FormData) {
    "use server";
    await createFundingLink(parse(formData));
  }
  async function update(formData: FormData) {
    "use server";
    await updateFundingLink(Number(formData.get("id")), parse(formData));
  }
  async function remove(formData: FormData) {
    "use server";
    await deleteFundingLink(Number(formData.get("id")));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <AdminPageHeader title="Funding Links" description="Sponsorship and support links." />
        <RecordFormDialog
          mode="create"
          title="Add funding link"
          fields={fields}
          formAction={create}
        />
      </div>

      <RecordList
        rows={rows.map((l) => ({
          id: l.id,
          primary: l.label,
          meta: l.url,
          badges: l.primary ? <Badge tone="brand">Primary</Badge> : null,
          actions: (
            <RecordFormDialog
              mode="edit"
              title="Edit funding link"
              fields={fields}
              formAction={update}
              record={l}
            />
          ),
        }))}
        deleteAction={remove}
        empty="No funding links yet."
      />
    </div>
  );
}
