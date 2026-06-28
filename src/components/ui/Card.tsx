import { cn } from "@/utils/cn";
import { ElementType, HTMLAttributes, ReactNode } from "react";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

export function Card<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "border-border bg-surface hover:border-foreground/20 hover:bg-surface-2 rounded-2xl border p-6 transition",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
