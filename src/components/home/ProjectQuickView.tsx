"use client";

import Image from "next/image";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import type { MergedProject } from "@/lib/projects";

/**
 * ProjectsBrowser renders ONE instance and points it at whichever card opened, rather than a
 * Dialog per card - 20 projects would otherwise mount 20 portals, focus traps and scroll locks.
 */
export function ProjectQuickView({
  project,
  onClose,
}: {
  project: MergedProject | null;
  onClose: () => void;
}) {
  const open = project !== null;
  if (!project) return null;

  const githubUrl = project.htmlUrl ?? `https://github.com/nixrajput/${project.repo}`;
  const blurb = project.description ?? "";
  // The excerpt only earns its space when it says something the blurb did not.
  const excerpt =
    project.readmeExcerpt && !blurb.startsWith(project.readmeExcerpt.slice(0, 40))
      ? project.readmeExcerpt
      : null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-2xl">
        {/* Cover: the uploaded image when there is one, otherwise the brand gradient so
            every project has a header rather than a gap. */}
        <div className="border-border relative h-40 shrink-0 overflow-hidden rounded-t-2xl border-b sm:h-48">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 42rem"
              className="object-cover"
            />
          ) : (
            <div className="size-full bg-(image:--gradient-brand) opacity-80" />
          )}
          {/* DialogContent's close button sits at top-4 right-4 with no backdrop of its own, so
              over an arbitrary cover photo it can vanish. This guarantees its contrast. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent"
          />
        </div>

        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <DialogTitle>{project.title}</DialogTitle>
            <div className="text-muted flex shrink-0 items-center gap-3 text-sm">
              <span className="flex items-center gap-1" aria-label={`${project.stars ?? 0} stars`}>
                <Star className="size-4" aria-hidden /> {project.stars ?? "—"}
              </span>
              <span className="flex items-center gap-1" aria-label={`${project.forks ?? 0} forks`}>
                <GitFork className="size-4" aria-hidden /> {project.forks ?? "—"}
              </span>
            </div>
          </div>
          {blurb && <DialogDescription>{blurb}</DialogDescription>}
        </DialogHeader>

        <DialogBody className="space-y-5">
          {excerpt && (
            <div>
              <h4 className="text-muted mb-1.5 text-xs font-semibold tracking-wider uppercase">
                From the README
              </h4>
              <p className="text-muted text-sm leading-relaxed text-pretty">{excerpt}</p>
            </div>
          )}

          {(project.language || project.tags.length > 0) && (
            <div className="flex flex-wrap gap-1.5">
              {project.language && (
                <span className="rounded-full border border-(--brand-deep)/40 bg-(--chip-surface) px-2 py-0.5 text-xs font-semibold text-(--accent-on-chip)">
                  {project.language}
                </span>
              )}
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="border-border text-muted rounded-full border bg-(--chip-surface) px-2 py-0.5 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {project.screenshots.length > 0 && (
            <div>
              <h4 className="text-muted mb-2 text-xs font-semibold tracking-wider uppercase">
                Screenshots
              </h4>
              {/* Horizontal strip rather than a lightbox: min-w-0 is required or the flex
                  items refuse to shrink below their intrinsic width and the row escapes
                  the modal instead of scrolling. */}
              <ul className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                {project.screenshots.map((src) => (
                  <li key={src} className="min-w-0 shrink-0">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot`}
                      width={240}
                      height={150}
                      className="border-border h-[150px] w-auto rounded-lg border object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button
            href={githubUrl}
            variant="secondary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<Github className="size-3.5" aria-hidden />}
          >
            View code
          </Button>
          {project.homepage && (
            <Button
              href={project.homepage}
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<ExternalLink className="size-3.5" aria-hidden />}
            >
              Live site
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
