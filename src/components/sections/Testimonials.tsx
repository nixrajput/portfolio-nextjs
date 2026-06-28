"use client";

import { useState } from "react";
import { MessageSquareQuote, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarouselAutoPlay,
} from "@/components/ui/carousel";
import { BrandInitialsAvatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitTestimonialModal } from "@/components/testimonials/SubmitTestimonialModal";

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
  const [api, setApi] = useState<CarouselApi>();

  useCarouselAutoPlay(api, 5000);

  return (
    <Section id="testimonials" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="Testimonials" title="What people say" />
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={0.1}>
          <Card className="flex flex-col items-center gap-5 py-14 text-center">
            <span className="inline-grid size-12 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white">
              <MessageSquareQuote className="size-6" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-medium">No testimonials yet.</p>
              <p className="text-muted text-sm">Be the first to leave one!</p>
            </div>
            <SubmitTestimonialModal>
              <Button variant="primary" size="md">
                Leave a testimonial
              </Button>
            </SubmitTestimonialModal>
          </Card>
        </Reveal>
      ) : (
        <>
          <Reveal delay={0.1}>
            <Carousel setApi={setApi} className="mb-8 w-full">
              <CarouselContent>
                {items.map((t) => (
                  <CarouselItem key={t.id} className="md:basis-1/2">
                    <Card className="flex h-full flex-col justify-between gap-6 [border-color:transparent] [background:linear-gradient(var(--color-surface,oklch(0.18_0_0)),var(--color-surface,oklch(0.18_0_0)))_padding-box,var(--gradient-brand)_border-box]">
                      <p className="text-foreground/70 text-base leading-relaxed">
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <BrandInitialsAvatar name={t.name} src={t.imageUrl} className="h-10 w-10" />
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="font-medium">{t.name}</span>
                          <span className="text-foreground/50 text-xs">{t.relationship}</span>
                          {(t.linkedinUrl ||
                            t.githubUrl ||
                            t.xUrl ||
                            t.instagramUrl ||
                            t.websiteUrl) && (
                            <div className="mt-1 flex items-center gap-2">
                              {t.linkedinUrl && (
                                <a
                                  href={t.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                                  className="text-muted hover:text-foreground transition"
                                >
                                  <Linkedin className="h-3.5 w-3.5" aria-hidden />
                                </a>
                              )}
                              {t.githubUrl && (
                                <a
                                  href={t.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="GitHub"
                                  className="text-muted hover:text-foreground transition"
                                >
                                  <Github className="h-3.5 w-3.5" aria-hidden />
                                </a>
                              )}
                              {t.xUrl && (
                                <a
                                  href={t.xUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="X / Twitter"
                                  className="text-muted hover:text-foreground transition"
                                >
                                  <Twitter className="h-3.5 w-3.5" aria-hidden />
                                </a>
                              )}
                              {t.instagramUrl && (
                                <a
                                  href={t.instagramUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Instagram"
                                  className="text-muted hover:text-foreground transition"
                                >
                                  <Instagram className="h-3.5 w-3.5" aria-hidden />
                                </a>
                              )}
                              {t.websiteUrl && (
                                <a
                                  href={t.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Website"
                                  className="text-muted hover:text-foreground text-xs underline underline-offset-2 transition"
                                >
                                  site
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </Reveal>

          <Reveal delay={0.2}>
            <SubmitTestimonialModal>
              <Button variant="primary" size="md">
                Leave a testimonial
              </Button>
            </SubmitTestimonialModal>
          </Reveal>
        </>
      )}
    </Section>
  );
}
