"use client";

import { useEffect, useRef } from "react";

/**
 * Fields that drive a hidden input from React state change its DOM value without any native event,
 * so a form-level `input` listener never hears them - which left admin/SubmitButton's dirty check
 * blind to an image upload. Returns a ref to put on the hidden input; it re-announces on change.
 */
export function useAnnounceValue(value: string) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.dispatchEvent(new Event("input", { bubbles: true }));
  }, [value]);
  return ref;
}
