"use client";

import { useState, useRef, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { UploadCloud, X, ZoomIn } from "lucide-react";
import { cn } from "@/utils/cn";
import { getCroppedImageFile } from "@/lib/crop-image";

type State = "idle" | "submitting" | "success" | "error";

// The fields that must pass before the form can submit.
type FieldName = "name" | "email" | "relationship" | "content";
type FieldErrors = Partial<Record<FieldName, string>>;

const inputBase =
  "w-full rounded-lg border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition";

/** Border + focus ring turn red when a field has an error. */
function fieldClass(hasError: boolean) {
  return cn(
    inputBase,
    hasError
      ? "border-red-500/70 focus:ring-red-500/60"
      : "border-border focus:ring-(--color-brand-deep)",
  );
}

export const TESTIMONIAL_FORM_ID = "submit-testimonial-form";

/** Same rules the server enforces, mirrored client-side for inline feedback. */
function validate(fd: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const relationship = String(fd.get("relationship") ?? "").trim();
  const content = String(fd.get("content") ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (relationship.length < 2) errors.relationship = "Tell me how you know me.";
  if (content.length < 20) errors.content = "Your testimonial should be at least 20 characters.";
  return errors;
}

/** Inline error line shown directly under the field it belongs to. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="text-xs font-normal text-red-500">
      {message}
    </span>
  );
}

export function SubmitTestimonialForm({
  onSuccess,
  onStateChange,
}: {
  onSuccess?: () => void;
  onStateChange?: (state: State) => void;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Set a submission error, switch to the error state, and scroll the top
  // banner into view so it is seen even if the modal body was scrolled down.
  function fail(message: string) {
    setError(message);
    updateState("error");
    requestAnimationFrame(() => {
      const el = errorRef.current;
      if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
    });
  }

  // Crop state: the selected image as a data URL, zoom/position, and the
  // pixel area to crop. The cropped file is generated on submit.
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const croppedAreaRef = useRef<Area | null>(null);

  function updateState(next: State) {
    setState(next);
    onStateChange?.(next);
  }

  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    });
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImageSrc(null);
    croppedAreaRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    croppedAreaRef.current = areaPixels;
  }, []);

  // Re-validate a single field as the user fixes it, so its error clears live.
  function clearFieldError(field: FieldName) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Block submission on invalid input; show inline errors and focus the
    // first offending field (matches native behavior, but styled).
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError(null);
      const first = Object.keys(errors)[0] as FieldName;
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setFieldErrors({});
    updateState("submitting");
    setError(null);

    // Replace the raw file input with the cropped square the user framed.
    formData.delete("image");
    if (imageSrc && croppedAreaRef.current) {
      try {
        const cropped = await getCroppedImageFile(imageSrc, croppedAreaRef.current);
        formData.set("image", cropped);
      } catch {
        fail("Could not process the image. Try a different one.");
        return;
      }
    }

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
    fail(body.error ?? "Something went wrong. Please try again.");
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
      {/* Submission / server error (network, rate limit, image or upstream
          failure) shown at the TOP so it is the first thing seen on a failed
          submit - per-field validation stays inline under each field below. */}
      {error && (
        <p
          ref={errorRef}
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-500"
        >
          {error}
        </p>
      )}

      {/* Name */}
      <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
        Your name
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          placeholder="Jane Smith"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "err-name" : undefined}
          onChange={() => clearFieldError("name")}
          className={fieldClass(Boolean(fieldErrors.name))}
        />
        <FieldError id="err-name" message={fieldErrors.name} />
      </label>

      {/* Email — kept private, used only to identify the submitter */}
      <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
        Your email
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder="jane@example.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "err-email" : undefined}
          onChange={() => clearFieldError("email")}
          className={fieldClass(Boolean(fieldErrors.email))}
        />
        <FieldError id="err-email" message={fieldErrors.email} />
        <span className="text-muted text-xs font-normal">
          Kept private — never shown on the site.
        </span>
      </label>

      {/* Relationship */}
      <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
        How do you know me?
        <input
          name="relationship"
          required
          minLength={2}
          maxLength={120}
          placeholder="e.g. College friend, professor, or colleague"
          aria-invalid={Boolean(fieldErrors.relationship)}
          aria-describedby={fieldErrors.relationship ? "err-relationship" : undefined}
          onChange={() => clearFieldError("relationship")}
          className={fieldClass(Boolean(fieldErrors.relationship))}
        />
        <FieldError id="err-relationship" message={fieldErrors.relationship} />
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
          placeholder="Share what it's like to know or work with Nikhil…"
          aria-invalid={Boolean(fieldErrors.content)}
          aria-describedby={fieldErrors.content ? "err-content" : undefined}
          onChange={() => clearFieldError("content")}
          className={cn(
            fieldClass(Boolean(fieldErrors.content)),
            "max-h-60 resize-y overflow-y-auto",
          )}
        />
        <FieldError id="err-content" message={fieldErrors.content} />
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
            type="text"
            placeholder="yourprofile or https://linkedin.com/in/yourprofile"
            className={fieldClass(false)}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          GitHub
          <input
            name="githubUrl"
            type="text"
            placeholder="yourusername or https://github.com/yourusername"
            className={fieldClass(false)}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          X / Twitter
          <input
            name="xUrl"
            type="text"
            placeholder="@yourhandle or https://x.com/yourhandle"
            className={fieldClass(false)}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          Instagram
          <input
            name="instagramUrl"
            type="text"
            placeholder="@yourhandle or https://instagram.com/yourhandle"
            className={fieldClass(false)}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          Website
          <input
            name="websiteUrl"
            type="url"
            placeholder="https://yoursite.com"
            className={fieldClass(false)}
          />
        </label>
      </fieldset>

      {/* Photo: pick → crop inline. The hidden input is the picker; once an
          image is chosen we show a square cropper the user can drag and zoom. */}
      <div className="text-foreground flex flex-col gap-1 text-sm font-medium">
        <span>Photo</span>
        <input
          ref={fileInputRef}
          name="image"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onFileSelected}
        />

        {imageSrc ? (
          <div className="flex flex-col gap-3">
            {/* Square crop frame */}
            <div className="border-border bg-surface relative h-56 w-full overflow-hidden rounded-lg border">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom + remove controls */}
            <div className="flex items-center gap-3">
              <ZoomIn className="text-muted h-4 w-4 shrink-0" aria-hidden />
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-(--color-brand-deep)"
              />
              <button
                type="button"
                onClick={clearImage}
                className="text-muted hover:text-foreground inline-flex items-center gap-1 text-xs transition"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Remove
              </button>
            </div>
            <p className="text-muted text-xs">Drag to reposition, slide to zoom.</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-border flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-5 text-center transition",
              "hover:border-(--color-brand-deep) hover:bg-[color-mix(in_srgb,var(--color-brand-deep)_5%,transparent)]",
            )}
          >
            <UploadCloud className="text-muted h-6 w-6" aria-hidden />
            <span className="text-muted text-xs">Upload a photo (optional)</span>
          </button>
        )}
      </div>

      {/* Honeypot: hidden from humans, tab-skipped, autocomplete off. Bots fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          Honeypot
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </form>
  );
}
