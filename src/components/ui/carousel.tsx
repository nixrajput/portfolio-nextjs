"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  orientation: "horizontal" | "vertical";
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used inside <Carousel>");
  return ctx;
}

// ---------------------------------------------------------------------------
// Carousel root
// ---------------------------------------------------------------------------

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    React.useEffect(() => {
      if (!api) return;
      setApi?.(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      // Sync initial state via the event system to avoid setState in effect body.
      api.emit("select");
      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onSelect, setApi]);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          orientation,
          canScrollPrev,
          canScrollNext,
          scrollPrev,
          scrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

// ---------------------------------------------------------------------------
// CarouselContent
// ---------------------------------------------------------------------------

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

// ---------------------------------------------------------------------------
// CarouselItem
// ---------------------------------------------------------------------------

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

// ---------------------------------------------------------------------------
// CarouselPrevious / CarouselNext
// ---------------------------------------------------------------------------

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute flex h-8 w-8 items-center justify-center rounded-full",
        "border border-white/10 bg-[var(--color-surface)] text-white/80",
        "transition-opacity hover:opacity-100 disabled:pointer-events-none disabled:opacity-30",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Go to previous slide"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute flex h-8 w-8 items-center justify-center rounded-full",
        "border border-white/10 bg-[var(--color-surface)] text-white/80",
        "transition-opacity hover:opacity-100 disabled:pointer-events-none disabled:opacity-30",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Go to next slide"
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

// ---------------------------------------------------------------------------
// Auto-advance hook (respects prefers-reduced-motion)
// ---------------------------------------------------------------------------

/**
 * Attaches auto-advance behaviour to a carousel API.
 * Pauses when the user prefers reduced motion or when `paused` is true.
 *
 * @example
 * const [api, setApi] = React.useState<CarouselApi>();
 * useCarouselAutoPlay(api, 4000);
 */
export function useCarouselAutoPlay(
  api: CarouselApi | undefined,
  intervalMs = 4000,
  paused = false,
): void {
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  React.useEffect(() => {
    if (!api || paused || prefersReduced) return;

    const tick = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, intervalMs);

    return () => clearInterval(tick);
  }, [api, intervalMs, paused, prefersReduced]);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
