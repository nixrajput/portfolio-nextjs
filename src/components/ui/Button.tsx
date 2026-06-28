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
  primary:
    "bg-[image:var(--gradient-brand)] text-white shadow-sm hover:opacity-90 transition-opacity saturate-[0.85] hover:saturate-100",
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

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as AsAnchor;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        >
          {leftIcon}
          {children}
        </a>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as AsButton)}>
        {leftIcon}
        {children}
      </button>
    );
  },
);
