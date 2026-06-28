"use client";

import { createContext, useContext, useRef, useEffect, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Minimal Dialog built on the native <dialog> element.
// API mirrors the shadcn/radix shape so the modal wrapper compiles unchanged.
// ---------------------------------------------------------------------------

type DialogCtx = { open: boolean; onOpenChange: (open: boolean) => void };
const Ctx = createContext<DialogCtx>({ open: false, onOpenChange: () => {} });

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return <Ctx.Provider value={{ open, onOpenChange }}>{children}</Ctx.Provider>;
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const { onOpenChange } = useContext(Ctx);
  if (asChild && children && typeof children === "object" && "props" in children) {
    const child = children as React.ReactElement<{ onClick?: () => void }>;
    const originalOnClick = child.props.onClick;
    return {
      ...child,
      props: {
        ...child.props,
        onClick: () => {
          originalOnClick?.();
          onOpenChange(true);
        },
      },
    } as unknown as React.ReactElement;
  }
  return (
    <button type="button" onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
}

export function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open, onOpenChange } = useContext(Ctx);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleClose = () => onOpenChange(false);
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onOpenChange]);

  return (
    <dialog
      ref={ref}
      className={[
        "rounded-xl border border-white/10 bg-[var(--color-surface)] p-6 shadow-2xl backdrop:bg-black/60",
        className ?? "",
      ].join(" ")}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      {children}
    </dialog>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}
