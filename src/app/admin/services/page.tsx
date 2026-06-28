import { db } from "@/db/client";
import { services } from "@/db/schema";
import { createService, deleteService } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Panel, Field, Input, Textarea, SubmitButton, RecordList } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function ServicesEditor() {
  const rows = await db.select().from(services).orderBy(services.order);

  async function create(formData: FormData) {
    "use server";
    await createService({
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      shortDescription: (formData.get("shortDescription") as string) || null,
      icon: (formData.get("icon") as string) || null,
      order: Number(formData.get("order") || 0),
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteService(Number(formData.get("id")));
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Services" description="What you offer." />

      <Panel title="Add service">
        <form action={create} className="flex flex-col gap-4">
          <Field label="Title">
            <Input name="title" placeholder="Web Development" required />
          </Field>
          <Field label="Full description">
            <Textarea name="description" rows={3} placeholder="Detailed description" required />
          </Field>
          <Field label="Short description" hint="Optional — shown on the card.">
            <Input name="shortDescription" placeholder="One-line summary" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Icon path" hint="Optional">
              <Input name="icon" placeholder="/icons/web.svg" />
            </Field>
            <Field label="Order">
              <Input name="order" type="number" defaultValue={0} />
            </Field>
          </div>
          <SubmitButton>Add service</SubmitButton>
        </form>
      </Panel>

      <RecordList
        rows={rows.map((s) => ({
          id: s.id,
          primary: s.title,
          meta: s.shortDescription ?? undefined,
        }))}
        deleteAction={remove}
        empty="No services yet."
      />
    </div>
  );
}
