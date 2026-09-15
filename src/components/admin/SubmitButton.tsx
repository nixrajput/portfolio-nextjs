"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { gradientButtonBase } from "@/components/admin/styles";

function serialize(form: HTMLFormElement): string {
  const parts: string[] = [];
  for (const [key, value] of new FormData(form)) {
    parts.push(`${key}=${typeof value === "string" ? value : `${value.name}:${value.size}`}`);
  }
  return parts.join("&");
}

/**
 * Disabled until the form differs from how it rendered. Reaches the form through the button's own
 * `form` property rather than a provider, so any admin form gets this by swapping the button.
 * Fields writing a hidden input from JS must dispatch a bubbling `input` - see useAnnounceValue.
 */
export function SubmitButton({ children }: { children: ReactNode }) {
  const [dirty, setDirty] = useState(false);
  const clean = useRef("");

  const attach = useCallback((button: HTMLButtonElement | null) => {
    const form = button?.form;
    if (!form) return;
    clean.current = serialize(form);
    const check = () => setDirty(serialize(form) !== clean.current);
    // Submitting makes the current values the new baseline, so the button settles back to disabled.
    const rebase = () => {
      clean.current = serialize(form);
      setDirty(false);
    };
    form.addEventListener("input", check);
    form.addEventListener("change", check);
    form.addEventListener("submit", rebase);
    return () => {
      form.removeEventListener("input", check);
      form.removeEventListener("change", check);
      form.removeEventListener("submit", rebase);
    };
  }, []);

  return (
    <button
      ref={attach}
      type="submit"
      disabled={!dirty}
      className={cn(
        gradientButtonBase,
        "w-full px-4 py-2.5",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:before:opacity-60",
      )}
    >
      {children}
    </button>
  );
}
