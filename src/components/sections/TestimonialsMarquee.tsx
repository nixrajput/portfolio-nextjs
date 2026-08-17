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
    <figure className="group border-border bg-surface flex flex-col gap-4 rounded-2xl border p-5 backdrop-blur-sm transition-colors hover:border-(--brand-deep)/40">
      <Quote
        className="size-5 shrink-0 text-(--color-brand-deep) transition-colors group-hover:text-(--color-brand-bright)"
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
 * Seamless for ANY item count, including one. The box height comes from one in-flow set; the
 * duplicate is `absolute top-full` so it does not grow the box, and the track animates by
 * -100% of that same height, landing the duplicate exactly where the original began.
 */
function MarqueeColumn({ items, duration }: { items: TestimonialCard[]; duration: number }) {
  const set = (dup: boolean) => (
    <div className="flex flex-col gap-5 pb-5" aria-hidden={dup || undefined}>
      {items.map((t) => (
        <MarqueeCard key={dup ? `dup-${t.id}` : t.id} t={t} />
      ))}
    </div>
  );

  return (
    // mask-image fades the CONTENT at the edges instead of painting a
    // background-colored overlay on top (which read as solid blocks over the
    // ambient gradient).
    <div className="marquee-group relative max-h-[34rem] overflow-hidden mask-[linear-gradient(180deg,transparent,#000_9%,#000_91%,transparent)]">
      <div className="marquee-track relative" style={{ animationDuration: `${duration}s` }}>
        {set(false)}
        {/* Duplicate set, out of flow so it doesn't grow the box; seamless loop. */}
        <div className="absolute inset-x-0 top-full">{set(true)}</div>
      </div>
    </div>
  );
}

/**
 * Round-robin across columns that auto-scroll at different speeds, pausing on hover. Under
 * reduced motion the CSS tracks do not animate, so it reads as a static grid.
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
