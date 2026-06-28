import { db } from "@/db/client";
import { socialLinks } from "@/db/schema";
import { createSocialLink, deleteSocialLink } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Panel, Field, Input, SubmitButton, RecordList } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function SocialLinksEditor() {
  const rows = await db.select().from(socialLinks).orderBy(socialLinks.order);

  async function create(formData: FormData) {
    "use server";
    await createSocialLink({
      platform: String(formData.get("platform")),
      url: String(formData.get("url")),
      username: (formData.get("username") as string) || null,
      order: Number(formData.get("order") || 0),
    });
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteSocialLink(Number(formData.get("id")));
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Social Links" description="Where people can find you." />

      <Panel title="Add social link">
        <form action={create} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Platform">
              <Input name="platform" placeholder="GitHub" required />
            </Field>
            <Field label="Username" hint="Optional">
              <Input name="username" placeholder="nixrajput" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="URL">
              <Input name="url" type="url" placeholder="https://github.com/nixrajput" required />
            </Field>
            <Field label="Order">
              <Input name="order" type="number" defaultValue={0} />
            </Field>
          </div>
          <SubmitButton>Add social link</SubmitButton>
        </form>
      </Panel>

      <RecordList
        rows={rows.map((l) => ({
          id: l.id,
          primary: l.platform,
          meta: l.username ? `@${l.username} · ${l.url}` : l.url,
        }))}
        deleteAction={remove}
        empty="No social links yet."
      />
    </div>
  );
}
