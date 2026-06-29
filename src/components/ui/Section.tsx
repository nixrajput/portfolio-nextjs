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
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      {eyebrow && (
        <p className="text-muted mb-3 font-mono text-xs tracking-widest uppercase">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}
