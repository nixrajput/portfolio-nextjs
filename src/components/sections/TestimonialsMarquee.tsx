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
    <figure className="group border-border bg-surface flex flex-col gap-4 rounded-2xl border p-5 backdrop-blur-sm transition-colors hover:border-(--brand-violet)/40">
      <Quote
        className="size-5 shrink-0 text-(--color-brand-violet) transition-colors group-hover:text-(--color-brand-pink)"
        aria-hidden
      />
      <blockquote className="text-foreground/85 text-sm leading-relaxed">{t.content}</blockquote>
      <figcaption className="border-border mt-auto flex items-center gap-3 border-t pt-4">
        <BrandInitialsAvatar name={t.name} src={t.imageUrl} className="size-9" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-foreground truncate text-sm font-semibold tracking-tight">
            {t.name}
          </span>
          <span className="text-muted truncate font-mono text-[11px] tracking-[0.06em] uppercase">
            {t.relationship}
          </span>
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

/**
 * One column. With 2+ cards it auto-scrolls, rendering items twice for a
 * seamless loop (the CSS keyframe translates by -50%, i.e. one full set). With
 * a single card there is nothing to scroll, so it renders once as a static
 * card - no duplicate, no fixed height, no edge-fade mask.
 */
function MarqueeColumn({ items, duration }: { items: TestimonialCard[]; duration: number }) {
  const shouldScroll = items.length >= 2;

  if (!shouldScroll) {
    return (
      <div className="flex flex-col gap-5">
        {items.map((t) => (
          <MarqueeCard key={t.id} t={t} />
        ))}
      </div>
    );
  }

  return (
    // mask-image fades the CONTENT at the edges instead of painting a
    // background-colored overlay on top (which read as solid blocks over the
    // ambient gradient).
    <div className="marquee-group relative h-[34rem] overflow-hidden mask-[linear-gradient(180deg,transparent,#000_9%,#000_91%,transparent)]">
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
        // Columns are a fixed positional partition; the index IS the stable identity.
        <MarqueeColumn key={`col-${i}`} items={col} duration={durations[i % durations.length]} />
      ))}
    </div>
  );
}
