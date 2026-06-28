"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export function SubmitTestimonialForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/testimonials", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setState("success");
      onSuccess?.();
      return;
    }
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    setError(body.error ?? "Something went wrong. Please try again.");
    setState("error");
  }

  if (state === "success") {
    return (
      <p role="status" className="text-muted-foreground text-center text-sm">
        Thank you! Your testimonial is pending review.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <label className="flex flex-col gap-1 text-sm">
        Your name
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          className="rounded-md border bg-transparent px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        How do you know me?
        <input
          name="relationship"
          required
          minLength={2}
          maxLength={120}
          placeholder="e.g. Former colleague at NixLab"
          className="rounded-md border bg-transparent px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Your testimonial
        <textarea
          name="content"
          required
          minLength={20}
          maxLength={1000}
          rows={5}
          className="rounded-md border bg-transparent px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Photo (optional)
        <input name="image" type="file" accept="image/*" className="text-sm" />
      </label>

      {/* Honeypot: hidden from humans, tab-skipped, autocomplete off. Bots fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-md bg-[var(--color-brand-violet)] px-4 py-2 text-white disabled:opacity-50"
      >
        {state === "submitting" ? "Submitting…" : "Submit testimonial"}
      </button>
    </form>
  );
}
