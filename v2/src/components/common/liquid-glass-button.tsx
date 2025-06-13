"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";

// Define liquid glass button variants with hover style overrides
const liquidGlassVariants = cva(
  "relative isolate overflow-hidden shadow-none transition-all duration-500",
  {
    variants: {
      variant: {
        default: "text-neutral-600 dark:text-neutral-300",
        primary: "text-primary-foreground dark:text-primary-foreground",
        secondary: "text-secondary-foreground dark:text-secondary-foreground",
      },
      size: {
        default: "h-9 rounded-lg px-4 py-2 has-[>svg]:px-3 min-w-40",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5 min-w-32",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4 min-w-48",
        icon: "size-9 min-w-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidGlassVariants> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const LiquidGlassButton = forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(({ children, className, variant, size, asChild = false, ...props }, ref) => {
  const { effectiveTheme } = useTheme();

  // Track mouse position for the liquid effect
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement for the liquid effect
  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPosition({ x, y });
  };

  // Generate the appropriate highlight gradient based on theme
  const getHighlightGradient = () => {
    if (!isHovering) return "";

    if (effectiveTheme === "light") {
      // Light theme highlight with primary color influence
      return `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(157, 23, 77, 0.3), transparent 80%)`;
    } else {
      // Dark theme highlight with subtle glow
      return `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(157, 23, 77, 0.3), transparent 80%)`;
    }
  };

  return (
    <Button
      ref={ref}
      className={cn(
        liquidGlassVariants({ variant, size }),
        "group bg-neutral-300/20 dark:bg-neutral-400/20 text-neutral-600 dark:text-neutral-300",
        "backdrop-blur-[1px] border border-neutral-400/20",
        // Force override all hover styles from the base Button component
        "hover:bg-neutral-300/30 dark:hover:bg-neutral-400/30 hover:shadow-none",
        className
      )}
      // Override the variant prop to prevent default hover styles
      variant={undefined}
      asChild={asChild}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <>
        {/* Liquid glass highlight effect - follows cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[inherit]"
          style={{
            background: getHighlightGradient(),
          }}
        />

        {/* Inner highlight ring - theme aware */}
        <div
          className={cn(
            "absolute inset-0 z-0 rounded-[inherit] opacity-0 scale-[0.8] transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-bl from-purple-500/30 via-violet-500/30 to-pink-500/30"
          )}
        />

        {/* Button content */}
        <span className="relative z-20 flex items-center justify-center gap-2 font-medium">
          {children}
        </span>
      </>
    </Button>
  );
});

LiquidGlassButton.displayName = "LiquidGlassButton";
