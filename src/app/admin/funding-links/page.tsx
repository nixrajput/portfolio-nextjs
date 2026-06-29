import { db } from "@/db/client";
import { fundingLinks } from "@/db/schema";
import { createFundingLink, updateFundingLink, deleteFundingLink } from "../actions";
import { AdminCrudPage } from "@/components/admin/AdminCrudPage";
import { Badge } from "@/components/admin/ui";
import { type AdminField } from "@/components/admin/RecordFormDialog";

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
    <AdminCrudPage
      title="Funding Links"
      description="Sponsorship and support links."
      createTitle="Add funding link"
      editTitle="Edit funding link"
      fields={fields}
      rows={rows}
      toRow={(l) => ({
        primary: l.label,
        meta: l.url,
        badges: l.primary ? <Badge tone="brand">Primary</Badge> : null,
      })}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
      empty="No funding links yet."
    />
  );
}
