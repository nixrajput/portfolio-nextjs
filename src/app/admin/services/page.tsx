import { db } from "@/db/client";
import { services } from "@/db/schema";
import { createService, deleteService } from "../actions";

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
    <div className="grid gap-8">
      <h2 className="text-xl font-semibold">Services</h2>

      <form action={create} className="grid max-w-2xl gap-3 rounded-lg border p-4">
        <h3 className="font-medium">Add Service</h3>
        <input name="title" placeholder="Service title" required className="rounded border p-2" />
        <textarea
          name="description"
          placeholder="Full description"
          rows={3}
          required
          className="rounded border p-2"
        />
        <input
          name="shortDescription"
          placeholder="Short description (optional)"
          className="rounded border p-2"
        />
        <input
          name="icon"
          placeholder="Primary icon path (optional)"
          className="rounded border p-2"
        />
        <input name="order" type="number" defaultValue={0} className="rounded border p-2" />
        <button type="submit" className="bg-foreground text-background rounded px-4 py-2">
          Add service
        </button>
      </form>

      <ul className="grid gap-2">
        {rows.map((s) => (
          <li key={s.id} className="flex items-center justify-between rounded border p-3">
            <span>{s.title}</span>
            <form action={remove}>
              <input type="hidden" name="id" value={s.id} />
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
