import { cn } from "@/utils/cn";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  // Fluid, tactile motion: smooth eased transition, a subtle lift on hover and
  // a gentle press-in on click. Transform-based (GPU-cheap) and motion-safe.
  "transition-[transform,box-shadow,background-color,background-position,border-color,color,opacity] duration-300 ease-out " +
  "will-change-transform motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] " +
  "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  // Full-strength brand gradient (matches the approved hero preview): the
  // gradient is oversized and shifts position on hover, with a soft glow.
  primary:
    "bg-(image:--gradient-brand) bg-[size:160%_160%] bg-[position:0%_50%] text-white shadow-[0_10px_34px_-12px_rgb(var(--brand-deep-rgb)/0.55)] hover:bg-[position:90%_50%]",
  // Hairline outline pill on a translucent surface (Observatory language).
  secondary:
    "border border-border bg-surface text-foreground backdrop-blur-sm hover:border-foreground",
  ghost: "text-muted hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type AsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsAnchor = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = AsButton | AsAnchor;

// forwardRef + className merge so this composes with Radix `asChild`: Slot passes its own
// ref/className, which a plain function component drops, giving an invisible trigger.
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", leftIcon, children, className, ...rest },
    ref,
  ) {
    const classes = cn(base, variants[variant], sizes[size], className);
    // Wrap content in a positioned span so the label sits ABOVE the primary
    // variant's gradient ::before layer (raw text nodes can't take z-index).
    const content = (
      <span className="relative z-10 inline-flex items-center gap-2">
        {leftIcon}
        {children}
      </span>
    );

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as AsAnchor;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as AsButton)}>
        {content}
      </button>
    );
  },
);
