"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarouselAutoPlay,
} from "@/components/ui/carousel";
import { BrandInitialsAvatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/motion/Reveal";

export type TestimonialCard = {
  id: string;
  name: string;
  relationship: string;
  content: string;
  imageUrl: string | null;
};

export function Testimonials({ items }: { items: TestimonialCard[] }) {
  const [api, setApi] = useState<CarouselApi>();

  useCarouselAutoPlay(api, 5000);

  return (
    <section id="testimonials" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-foreground/50 mb-2 font-mono text-sm tracking-widest uppercase">
            Testimonials
          </p>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">What people say</h2>
        </Reveal>

        {items.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-4 py-8">
              <p className="text-foreground/60 text-base">
                No testimonials yet. Be the first to leave one!
              </p>
              <Link
                href="/testimonials/new"
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Leave a testimonial
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.1}>
              <Carousel setApi={setApi} className="mb-8 w-full">
                <CarouselContent>
                  {items.map((t) => (
                    <CarouselItem key={t.id} className="md:basis-1/2">
                      <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-transparent bg-white/5 p-6 backdrop-blur-md [background:linear-gradient(var(--color-surface,oklch(0.18_0_0)),var(--color-surface,oklch(0.18_0_0)))_padding-box,var(--gradient-brand)_border-box]">
                        <p className="text-foreground/70 text-base leading-relaxed">
                          &ldquo;{t.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <BrandInitialsAvatar
                            name={t.name}
                            src={t.imageUrl}
                            className="h-10 w-10"
                          />
                          <span className="flex flex-col">
                            <span className="font-medium">{t.name}</span>
                            <span className="text-foreground/50 text-xs">{t.relationship}</span>
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/testimonials/new"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:border-white/30"
              >
                Leave a testimonial
              </Link>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
