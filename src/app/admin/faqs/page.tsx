import { db } from "@/db/client";
import { faqs } from "@/db/schema";
import { createFaq, updateFaq, deleteFaq } from "../actions";
import { AdminCrudPage } from "@/components/admin/AdminCrudPage";
import { type AdminField } from "@/components/admin/RecordFormDialog";

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
    <AdminCrudPage
      title="FAQs"
      description="Questions shown on the site and to AI crawlers."
      createTitle="Add FAQ"
      editTitle="Edit FAQ"
      fields={fields}
      rows={rows}
      toRow={(f) => ({
        primary: f.question,
        meta: f.answer,
      })}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
      empty="No FAQs yet."
    />
  );
}
