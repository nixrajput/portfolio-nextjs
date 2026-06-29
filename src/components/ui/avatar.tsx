"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Native Avatar — no Radix dependency.
// API matches the shadcn/radix shape so existing callers compile unchanged.
// ---------------------------------------------------------------------------

export type AvatarProps = React.HTMLAttributes<HTMLSpanElement>;

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

// ---------------------------------------------------------------------------
// AvatarImage — renders an <img>; parent hides it via CSS when errored.
// ---------------------------------------------------------------------------

export type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
};

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onError, onLoad, onLoadingStatusChange, ...props }, ref) => {
    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      onLoadingStatusChange?.("loaded");
      onLoad?.(e);
    };
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      onLoadingStatusChange?.("error");
      onError?.(e);
    };
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        ref={ref}
        className={cn("aspect-square h-full w-full object-cover", className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

// ---------------------------------------------------------------------------
// AvatarFallback — shown when no image or image fails to load.
// ---------------------------------------------------------------------------

export type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Delay (ms) before showing the fallback; mirrors Radix delayMs prop. */
  delayMs?: number;
};

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, delayMs = 600, children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(delayMs === 0);

    React.useEffect(() => {
      if (delayMs === 0) return;
      const t = setTimeout(() => setVisible(true), delayMs);
      return () => clearTimeout(t);
    }, [delayMs]);

    if (!visible) return null;

    return (
      <span
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full text-sm font-semibold text-white select-none",
          "bg-(image:--gradient-brand)",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AvatarFallback.displayName = "AvatarFallback";

// ---------------------------------------------------------------------------
// initialsFromName — derive up to 2 uppercase initials from a display name.
// ---------------------------------------------------------------------------

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return (parts[0]![0] ?? "").toUpperCase();
  return (parts[0]![0] ?? "").toUpperCase() + (parts[1]![0] ?? "").toUpperCase();
}

// ---------------------------------------------------------------------------
// BrandInitialsAvatar — all-in-one helper used by the testimonials display.
// Shows the image when `src` is provided; falls back to gradient initials.
// ---------------------------------------------------------------------------

export function BrandInitialsAvatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string | null;
  className?: string;
}) {
  const [imgError, setImgError] = React.useState(false);
  const showImage = Boolean(src) && !imgError;

  return (
    <Avatar className={className}>
      {showImage && <AvatarImage src={src!} alt={name} onError={() => setImgError(true)} />}
      <AvatarFallback delayMs={showImage ? 200 : 0}>{initialsFromName(name)}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
