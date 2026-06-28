import { Heart, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export type FundingRow = {
  label: string;
  url: string;
  primary: boolean;
  order: number;
};

export function Support({ funding }: { funding: FundingRow[] }) {
  const sorted = [...funding].sort((a, b) => a.order - b.order);
  const primary = sorted.find((f) => f.primary) ?? sorted[0];
  const rest = sorted.filter((f) => f !== primary);

  if (!primary) return null;

  return (
    <section id="support" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28 text-center">
      <Reveal>
        <p className="text-foreground/50 mb-3 font-mono text-sm tracking-widest uppercase">
          Support
        </p>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Support my open-source work</h2>
        <p className="text-foreground/70 mx-auto mb-8 max-w-md leading-relaxed">
          Most of what I build is free and open source. If it helps you, you can support its
          continued development — every bit is genuinely appreciated.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={primary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            <Heart className="size-4" aria-hidden /> {primary.label}
          </a>
          {rest.map((f) => (
            <a
              key={f.label}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-foreground/20 hover:bg-foreground/5 flex items-center gap-1.5 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--brand-pink)]/50"
            >
              {f.label} <ArrowUpRight className="size-4" aria-hidden />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default Support;
