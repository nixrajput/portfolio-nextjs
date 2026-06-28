import { SubmitTestimonialForm } from "@/components/testimonials/SubmitTestimonialForm";

export const metadata = {
  title: "Leave a testimonial",
  robots: { index: false },
};

export default function NewTestimonialPage() {
  return (
    <section className="mx-auto max-w-lg px-4 py-24">
      <h1 className="mb-2 text-2xl font-semibold">Leave a testimonial</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Share how we worked together. Submissions are reviewed before they appear.
      </p>
      <SubmitTestimonialForm />
    </section>
  );
}
