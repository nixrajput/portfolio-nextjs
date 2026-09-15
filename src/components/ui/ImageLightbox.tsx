"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/**
 * Full-size view of one image, stripped of DialogContent's card chrome. Shared by the public
 * AvatarPortrait and the admin AvatarField so the two cannot drift.
 */
export function ImageLightbox({
  src,
  alt,
  open,
  onClose,
  unoptimized = false,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
  /** Admin previews accept an arbitrary pasted URL, which the optimizer would reject. */
  unoptimized?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="w-auto max-w-3xl border-0 bg-transparent p-0 shadow-none backdrop-blur-none">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        {/* w-fit so the frame hugs the photo: the image sizes itself, the wrapper follows. The
            1024 square is only a placeholder ratio - `aspect-ratio: auto <ratio>` defers to the
            real one once loaded, so any uploaded aspect renders true rather than sat in empty bars. */}
        <div className="relative w-fit">
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={1024}
            quality={90}
            sizes="(max-width: 768px) 92vw, 48rem"
            className="h-auto max-h-[85vh] w-auto max-w-[92vw] rounded-2xl object-contain"
            unoptimized={unoptimized}
          />
          {/* The shared close button has no backdrop of its own, so over a photo it can vanish. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-2xl bg-gradient-to-b from-black/50 to-transparent"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
