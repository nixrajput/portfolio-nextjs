import { MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitTestimonialModal } from "@/components/testimonials/SubmitTestimonialModal";
import { TestimonialsMarquee } from "./TestimonialsMarquee";

export type TestimonialCard = {
  id: string;
  name: string;
  relationship: string;
  content: string;
  imageUrl: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  xUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
};

export function Testimonials({ items }: { items: TestimonialCard[] }) {
  return (
    <Section id="testimonials" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="Testimonials" title="What people say" />
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={0.1}>
          <Card className="flex flex-col items-center gap-5 py-14 text-center">
            <span className="inline-grid size-12 place-items-center rounded-2xl bg-(image:--gradient-brand) text-white">
              <MessageSquareQuote className="size-6" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-medium">No testimonials yet.</p>
              <p className="text-muted text-sm">
                Know me from school, work, or life? Be the first to share.
              </p>
            </div>
            <SubmitTestimonialModal>
              <Button variant="primary" size="md">
                Share your experience
              </Button>
            </SubmitTestimonialModal>
          </Card>
        </Reveal>
      ) : (
        <>
          <Reveal delay={0.1}>
            <TestimonialsMarquee items={items} />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <SubmitTestimonialModal>
                <Button variant="primary" size="md">
                  Share your experience
                </Button>
              </SubmitTestimonialModal>
            </div>
          </Reveal>
        </>
      )}
    </Section>
  );
}
