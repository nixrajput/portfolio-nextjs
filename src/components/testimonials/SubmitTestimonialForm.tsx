"use client";

import { useState, useRef, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { UploadCloud, X, ZoomIn } from "lucide-react";
import { cn } from "@/utils/cn";
import { getCroppedImageFile } from "@/lib/crop-image";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateState("submitting");
    setError(null);
    const formData = new FormData(e.currentTarget);

    // Replace the raw file input with the cropped square the user framed.
    formData.delete("image");
    if (imageSrc && croppedAreaRef.current) {
      try {
        const cropped = await getCroppedImageFile(imageSrc, croppedAreaRef.current);
        formData.set("image", cropped);
      } catch {
        setError("Could not process the image. Try a different one.");
        updateState("error");
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
          placeholder="e.g. College friend, professor, or colleague"
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
          placeholder="Share what it's like to know or work with Nikhil…"
          className={cn(inputClass, "max-h-60 resize-y overflow-y-auto")}
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
            type="text"
            placeholder="yourprofile or https://linkedin.com/in/yourprofile"
            className={inputClass}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          GitHub
          <input
            name="githubUrl"
            type="text"
            placeholder="yourusername or https://github.com/yourusername"
            className={inputClass}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          X / Twitter
          <input
            name="xUrl"
            type="text"
            placeholder="@yourhandle or https://x.com/yourhandle"
            className={inputClass}
          />
        </label>
        <label className="text-foreground flex flex-col gap-1 text-sm font-medium">
          Instagram
          <input
            name="instagramUrl"
            type="text"
            placeholder="@yourhandle or https://instagram.com/yourhandle"
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
                className="flex-1 accent-[var(--color-brand-violet)]"
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
              "hover:border-[var(--color-brand-violet)] hover:bg-[color-mix(in_srgb,var(--color-brand-violet)_5%,transparent)]",
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

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
