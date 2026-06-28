import { db } from "@/db/client";
import { fundingLinks } from "@/db/schema";
import { createFundingLink, deleteFundingLink } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Panel,
  Field,
  Input,
  CheckboxField,
  SubmitButton,
  RecordList,
  Badge,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function FundingLinksEditor() {
  const rows = await db.select().from(fundingLinks).orderBy(fundingLinks.order);

  async function create(formData: FormData) {
    "use server";
    await createFundingLink({
      label: String(formData.get("label")),
      url: String(formData.get("url")),
      primary: formData.get("primary") === "on",
      order: Number(formData.get("order") || 0),
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteFundingLink(Number(formData.get("id")));
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Funding Links" description="Sponsorship and support links." />

      <Panel title="Add funding link">
        <form action={create} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Label">
              <Input name="label" placeholder="Buy me a coffee" required />
            </Field>
            <Field label="URL">
              <Input name="url" type="url" placeholder="https://buymeacoffee.com/…" required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Order">
              <Input name="order" type="number" defaultValue={0} />
            </Field>
            <div className="flex items-end">
              <CheckboxField name="primary" label="Primary" />
            </div>
          </div>
          <SubmitButton>Add funding link</SubmitButton>
        </form>
      </Panel>

      <RecordList
        rows={rows.map((l) => ({
          id: l.id,
          primary: l.label,
          meta: l.url,
          badges: l.primary ? <Badge tone="brand">Primary</Badge> : null,
        }))}
        deleteAction={remove}
        empty="No funding links yet."
      />
    </div>
  );
}
