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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const variants: Record<Variant, string> = {
  // Glassy primary: the gradient lives on a ::before layer at reduced opacity
  // (soft, not a harsh slab) with a subtle border + blur. `isolate` + the
  // content being lifted via `[&>*]:relative [&>*]:z-10` keeps the white label
  // ABOVE the gradient layer so it stays readable in both themes.
  primary:
    "relative isolate overflow-hidden border border-white/15 text-white shadow-sm backdrop-blur-sm [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:-z-0 before:bg-[image:var(--gradient-brand)] before:opacity-80 before:transition-opacity hover:before:opacity-95",
  secondary: "border border-border bg-surface text-foreground hover:bg-surface-2",
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

// forwardRef + className merge so the Button composes with Radix `asChild`
// (Slot) triggers — Slot clones the child and passes its own ref/className,
// which a plain function component would drop (causing an unstyled/invisible
// trigger button).
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
