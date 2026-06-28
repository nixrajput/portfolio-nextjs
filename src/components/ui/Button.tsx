import { cn } from "@/utils/cn";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const variants: Record<Variant, string> = {
  primary: "bg-[image:var(--gradient-brand)] text-white hover:opacity-90 shadow",
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

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {leftIcon}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as AsButton)}>
      {leftIcon}
      {children}
    </button>
  );
}
