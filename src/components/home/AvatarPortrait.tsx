"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

// Leaf silhouette: two large corners opposite two small ones. The halo sits 1rem outside the ring,
// so it carries its own larger radii or its blur clips square against the frame. Scaled-down twins
// of these radii live in admin/AvatarField, whose preview is a third of this width.
const SHAPE = "rounded-[6rem_1.75rem_6rem_1.75rem]";
const HALO = "rounded-[7rem_2.5rem_7rem_2.5rem]";

/**
 * Square, so the frame's height falls out of its width and both columns start at the same y.
 * Carries no Parallax for that reason - its scroll transform is exactly what pulled the frame out
 * of alignment with the text beside it.
 */
export function AvatarPortrait({ src, name }: { src: string; name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group relative flex w-72 sm:w-80 lg:w-96">
        <div
          aria-hidden
          className={`absolute -inset-4 bg-(image:--gradient-brand) opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-55 ${HALO}`}
        />
        {/* p-0.5 over the gradient paints a 2px ring no border-color token can produce. */}
        <div
          className={`relative flex aspect-square flex-1 bg-(image:--gradient-brand) p-0.5 shadow-xl ${SHAPE}`}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`View portrait of ${name} full size`}
            className={`focus-visible:ring-ring relative flex-1 cursor-zoom-in overflow-hidden focus-visible:ring-2 focus-visible:outline-none ${SHAPE}`}
          >
            <Image
              src={src}
              alt={`Portrait of ${name}`}
              fill
              quality={90}
              sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span
              aria-hidden
              className={`absolute inset-0 ring-1 ring-white/20 ring-inset ${SHAPE}`}
            />
            <span className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <Expand className="size-3.5" aria-hidden /> View
            </span>
          </button>
        </div>
      </div>

      <ImageLightbox
        src={src}
        alt={`Portrait of ${name}`}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
