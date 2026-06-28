import { getFaqs } from "@/lib/queries";
import { Faq } from "./Faq";

/** Server wrapper: fetches FAQs from the DB and renders the FAQ section. */
export async function FaqSection() {
  const faqs = await getFaqs();
  return <Faq faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />;
}
