"use client";

import { useState } from "react";
import { FaqJsonLd } from "@/lib/seo/jsonld";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/utils/cn";

export type FaqEntry = { question: string; answer: string };

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${question.toLowerCase().replace(/\W+/g, "-")}`;

  return (
    <div className="border-border border-b last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={id}
        className="text-foreground hover:text-foreground/80 flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-lg"
      >
        <span>{question}</span>
        <span
          aria-hidden
          className={cn(
            "text-muted shrink-0 transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-label={question}
        hidden={!open}
        className="text-muted pb-4 text-sm leading-relaxed sm:text-base"
      >
        {answer}
      </div>
    </div>
  );
}

export function Faq({ faqs }: { faqs: FaqEntry[] }) {
  if (faqs.length === 0) return null;
  return (
    <Section id="faq" className="scroll-mt-24">
      <FaqJsonLd faqs={faqs} />
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked" />
        <div className="border-border border-t">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Faq;
