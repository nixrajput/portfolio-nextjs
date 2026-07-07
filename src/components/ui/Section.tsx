import { cn } from "@/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

type SectionProps = {
  id?: string;
  children?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "id" | "className">;

export function Section({ id, children, className, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)} {...rest}>
      <div className="site-container">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Menu index of the section (e.g. "02") - ties the header to the nav overlay numbering. */
  number?: string;
  /** Centered variant for centered sections (Contact, Support): no fill rule. */
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  number,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("mb-12", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-muted mb-4 flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase",
            centered && "justify-center",
          )}
        >
          <span>
            {number && <span className="gradient-text mr-3 font-semibold">{number}</span>}
            {eyebrow}
          </span>
          {!centered && <span aria-hidden className="bg-border h-px flex-1" />}
        </p>
      )}
      <h2 className="text-4xl font-extrabold tracking-tight text-balance md:text-5xl">{title}</h2>
    </div>
  );
}
