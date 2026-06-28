"use client";

import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/utils/cn";

type State = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-violet)] transition";

export const TESTIMONIAL_FORM_ID = "submit-testimonial-form";

export function SubmitTestimonialForm({
  onSuccess,
  onStateChange,
}: {
  onSuccess?: () => void;
  onStateChange?: (state: State) => void;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateState(next: State) {
    setState(next);
    onStateChange?.(next);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateState("submitting");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/testimonials", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      updateState("success");
      onSuccess?.();
      return;
    }
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    setError(body.error ?? "Something went wrong. Please try again.");
    updateState("error");
  }

  // The success view is owned by the modal (a curated confirmation panel that
  // replaces the whole form + footer), so we render nothing here on success —
  // we only signal it upward via onSuccess/onStateChange.
  if (state === "success") return null;

  return (
    <form
      id={TESTIMONIAL_FORM_ID}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Name */}
      <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
        Your name
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </label>

      {/* Relationship */}
      <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
        How do you know me?
        <input
          name="relationship"
          required
          minLength={2}
          maxLength={120}
          placeholder="e.g. Former colleague at NixLab"
          className={inputClass}
        />
      </label>

      {/* Testimonial body */}
      <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
        Your testimonial
        <textarea
          name="content"
          required
          minLength={20}
          maxLength={1000}
          rows={5}
          placeholder="Share your experience working with Nikhil…"
          className={cn(inputClass, "resize-none")}
        />
      </label>

      {/* Social links — optional */}
      <fieldset className="border-border flex flex-col gap-3 rounded-lg border p-3">
        <legend className="text-muted px-1 text-xs font-semibold tracking-wide uppercase">
          Social links (optional)
        </legend>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          LinkedIn
          <input
            name="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            className={inputClass}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          GitHub
          <input
            name="githubUrl"
            type="url"
            placeholder="https://github.com/yourusername"
            className={inputClass}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          X / Twitter
          <input
            name="xUrl"
            type="url"
            placeholder="https://x.com/yourhandle"
            className={inputClass}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          Website
          <input
            name="websiteUrl"
            type="url"
            placeholder="https://yoursite.com"
            className={inputClass}
          />
        </label>
      </fieldset>

      {/* Custom file input */}
      <div className="text-foreground flex flex-col gap-1 text-sm font-medium">
        <span>Photo</span>
        <label
          className={cn(
            "border-border flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-5 text-center transition",
            "hover:border-[var(--color-brand-violet)] hover:bg-[color-mix(in_srgb,var(--color-brand-violet)_5%,transparent)]",
          )}
        >
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <UploadCloud className="text-muted h-6 w-6" aria-hidden />
          <span className="text-muted text-xs">
            {fileName ? (
              <span className="text-foreground font-medium">{fileName}</span>
            ) : (
              "Upload a photo (optional)"
            )}
          </span>
        </label>
      </div>

      {/* Honeypot: hidden from humans, tab-skipped, autocomplete off. Bots fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          Honeypot
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
