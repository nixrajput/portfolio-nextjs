"use client";

import { Quote, Linkedin, Github, Twitter, Instagram, Globe } from "lucide-react";
import { BrandInitialsAvatar } from "@/components/ui/avatar";
import { cn } from "@/utils/cn";
import type { TestimonialCard } from "./Testimonials";

/** A single boxed testimonial card — clean bordered surface, no gradient fill. */
function MarqueeCard({ t }: { t: TestimonialCard }) {
  const socials = [
    { label: "LinkedIn", url: t.linkedinUrl, Icon: Linkedin },
    { label: "GitHub", url: t.githubUrl, Icon: Github },
    { label: "X / Twitter", url: t.xUrl, Icon: Twitter },
    { label: "Instagram", url: t.instagramUrl, Icon: Instagram },
    { label: "Website", url: t.websiteUrl, Icon: Globe },
  ].filter((s) => s.url);

  return (
    <figure className="border-border bg-surface hover:border-foreground/20 flex flex-col gap-4 rounded-2xl border p-5 transition-colors">
      <Quote className="size-5 shrink-0 text-(--color-brand-violet)" aria-hidden />
      <blockquote className="text-foreground/80 text-sm leading-relaxed">{t.content}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-1">
        <BrandInitialsAvatar name={t.name} src={t.imageUrl} className="size-9" />
        <div className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{t.name}</span>
          <span className="text-muted truncate text-xs">{t.relationship}</span>
        </div>
        {socials.length > 0 ? (
          <div className="ml-auto flex items-center gap-2">
            {socials.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted hover:text-foreground transition-colors"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** One auto-scrolling column. Items are rendered twice for a seamless loop. */
function MarqueeColumn({ items, duration }: { items: TestimonialCard[]; duration: number }) {
  return (
    <div className="marquee-group relative h-[34rem] overflow-hidden">
      <div
        className="marquee-track flex flex-col gap-5"
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((t) => (
          <MarqueeCard key={t.id} t={t} />
        ))}
        {/* Duplicate set for a seamless loop — hidden from a11y + test queries. */}
        {items.map((t) => (
          <div key={`dup-${t.id}`} aria-hidden="true">
            <MarqueeCard t={t} />
          </div>
        ))}
      </div>
      {/* Top/bottom fade masks */}
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b to-transparent" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent" />
    </div>
  );
}

/**
 * Testimonials as a marquee grid: items distributed round-robin across columns
 * that auto-scroll vertically at different speeds, pausing on hover. Under
 * reduced motion the tracks don't animate (CSS), so it reads as a static grid.
 * On small screens it collapses to a single column.
 */
export function TestimonialsMarquee({ items }: { items: TestimonialCard[] }) {
  // Distribute round-robin into up to 3 columns (fewer if few items).
  const columnCount = items.length >= 6 ? 3 : items.length >= 2 ? 2 : 1;
  const columns: TestimonialCard[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((t, i) => columns[i % columnCount].push(t));
  const durations = [38, 30, 46]; // staggered speeds per column

  return (
    <div
      className={cn(
        "grid gap-5",
        columnCount === 1
          ? "grid-cols-1"
          : columnCount === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {columns.map((col, i) => (
        <MarqueeColumn key={i} items={col} duration={durations[i % durations.length]} />
      ))}
    </div>
  );
}
