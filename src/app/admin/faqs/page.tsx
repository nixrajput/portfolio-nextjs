import { db } from "@/db/client";
import { faqs } from "@/db/schema";
import { createFaq, updateFaq, deleteFaq } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RecordList } from "@/components/admin/ui";
import { RecordFormDialog, type AdminField } from "@/components/admin/RecordFormDialog";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  {
    name: "question",
    label: "Question",
    type: "text",
    placeholder: "Who is Nikhil Rajput?",
    required: true,
  },
  {
    name: "answer",
    label: "Answer",
    type: "textarea",
    rows: 4,
    placeholder: "A clear, concise answer.",
    required: true,
  },
  { name: "order", label: "Order", type: "number" },
];

function parse(formData: FormData) {
  return {
    question: String(formData.get("question")),
    answer: String(formData.get("answer")),
    order: Number(formData.get("order") || 0),
  };
}

export default async function FaqsEditor() {
  const rows = await db.select().from(faqs).orderBy(faqs.order);

  async function create(formData: FormData) {
    "use server";
    await createFaq(parse(formData));
  }
  async function update(formData: FormData) {
    "use server";
    await updateFaq(Number(formData.get("id")), parse(formData));
  }
  async function remove(formData: FormData) {
    "use server";
    await deleteFaq(Number(formData.get("id")));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <AdminPageHeader
          title="FAQs"
          description="Questions shown on the site and to AI crawlers."
        />
        <RecordFormDialog mode="create" title="Add FAQ" fields={fields} formAction={create} />
      </div>

      <RecordList
        rows={rows.map((f) => ({
          id: f.id,
          primary: f.question,
          meta: f.answer,
          actions: (
            <RecordFormDialog
              mode="edit"
              title="Edit FAQ"
              fields={fields}
              formAction={update}
              record={f}
            />
          ),
        }))}
        deleteAction={remove}
        empty="No FAQs yet."
      />
    </div>
  );
}
