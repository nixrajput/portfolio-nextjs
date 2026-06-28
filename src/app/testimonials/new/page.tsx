import { SubmitTestimonialForm } from "@/components/testimonials/SubmitTestimonialForm";

export const metadata = {
  title: "Share your experience",
  robots: { index: false },
};

export default function NewTestimonialPage() {
  return (
    <section className="mx-auto max-w-lg px-4 py-24">
      <h1 className="mb-2 text-2xl font-semibold">Share your experience</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Friends, classmates, teachers, and colleagues - share how you know me. Submissions are
        reviewed before they appear.
      </p>
      <SubmitTestimonialForm />
    </section>
  );
}
