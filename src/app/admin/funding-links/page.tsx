import { db } from "@/db/client";
import { fundingLinks } from "@/db/schema";
import { createFundingLink, deleteFundingLink } from "../actions";

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
    <div className="grid gap-8">
      <h2 className="text-xl font-semibold">Funding Links</h2>

      <form action={create} className="grid max-w-2xl gap-3 rounded-lg border p-4">
        <h3 className="font-medium">Add Funding Link</h3>
        <input
          name="label"
          placeholder="Label (e.g. Buy me a coffee)"
          required
          className="rounded border p-2"
        />
        <input name="url" placeholder="URL" type="url" required className="rounded border p-2" />
        <input name="order" type="number" defaultValue={0} className="rounded border p-2" />
        <label className="flex gap-2">
          <input name="primary" type="checkbox" /> Primary
        </label>
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Add funding link
        </button>
      </form>

      <ul className="grid gap-2">
        {rows.map((l) => (
          <li key={l.id} className="flex items-center justify-between rounded border p-3">
            <span>
              {l.label}
              {l.primary ? " (primary)" : ""}{" "}
              <a href={l.url} className="text-muted-foreground text-xs underline">
                {l.url}
              </a>
            </span>
            <form action={remove}>
              <input type="hidden" name="id" value={l.id} />
              <button type="submit" className="text-sm text-red-600">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
