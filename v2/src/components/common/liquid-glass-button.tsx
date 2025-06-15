"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useState } from "react";

// Define liquid glass button variants with hover style overrides
const liquidGlassVariants = cva(
  "relative isolate overflow-hidden shadow-none transition-all duration-500",
  {
    variants: {
      size: {
        default: "h-9 rounded-lg px-4 py-2 has-[>svg]:px-3 min-w-40",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5 min-w-32",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4 min-w-48",
        icon: "size-9 min-w-0",
      },
    },
    defaultVariants: {
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
>(({ children, className, size, asChild = false, ...props }, ref) => {
  // Track mouse position for the liquid effect
  const [isHovering, setIsHovering] = useState(false);

  // Create the button content with animations
  const ButtonContent = () => (
    <>
      {/* Liquid glass highlight effect - follows cursor with framer motion */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Inner highlight ring - theme aware with framer motion */}
      <motion.div
        className={cn(
          "absolute inset-0 z-0 rounded-[inherit] bg-gradient-to-bl from-purple-500/30 via-violet-500/30 to-pink-500/30"
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Button content */}
      <span className="relative z-20 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  // Handle asChild prop correctly
  if (asChild) {
    return (
      <Slot
        ref={ref}
        className={cn(
          "relative isolate overflow-hidden text-primary dark:text-primary font-medium",
          "group bg-neutral-300/20 dark:bg-neutral-400/20",
          "backdrop-blur-[1px] border border-neutral-400/20",
          "hover:bg-neutral-300/20 dark:hover:bg-neutral-400/20 hover:shadow-none",
          liquidGlassVariants({ size }),
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Button
      ref={ref}
      className={cn(
        "relative text-primary dark:text-primary font-medium",
        "group bg-neutral-300/20 dark:bg-neutral-400/20",
        "backdrop-blur-[1px] border border-neutral-400/20",
        "hover:bg-neutral-300/20 dark:hover:bg-neutral-400/20 hover:shadow-none",
        liquidGlassVariants({ size }),
        className
      )}
      variant={undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <ButtonContent />
    </Button>
  );
});

LiquidGlassButton.displayName = "LiquidGlassButton";
