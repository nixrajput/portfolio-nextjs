"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Check, Expand, ImageOff, Link2, Loader2, UploadCloud, UserRound } from "lucide-react";
import { setProfileAvatar } from "@/app/admin/actions";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

// The About section's leaf silhouette at a third of the scale, since this preview is w-32 against
// its w-96. Keep the ratio between the two if either changes - see home/AvatarPortrait.
const SHAPE = "rounded-[2rem_0.6rem_2rem_0.6rem]";

type Status = { kind: "idle" | "saved" | "error"; message?: string };

/**
 * Commits through setProfileAvatar on upload rather than waiting for the form's Save, so it does
 * not announce itself to admin/SubmitButton - already saved is not dirty. Still submits a hidden
 * input, or a later Save would blank the avatar it never knew about.
 */
export function AvatarField({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [draftUrl, setDraftUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [viewing, setViewing] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  function commit(next: string | null) {
    startTransition(async () => {
      try {
        await setProfileAvatar(next);
        setUrl(next ?? "");
        setStatus({ kind: "saved" });
        setOpen(false);
        setDraftUrl("");
      } catch (e) {
        setStatus({ kind: "error", message: e instanceof Error ? e.message : "Could not save" });
      }
    });
  }

  async function onFile(file: File) {
    setStatus({ kind: "idle" });
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "avatar");
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      commit(data.url);
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "Upload failed" });
    } finally {
      setUploading(false);
    }
  }

  const busy = uploading || pending;

  return (
    // Column with items-center, not a row: a flex row stretches its children, which overrode the
    // preview's aspect ratio and made it grow taller every time the panel opened.
    <div className="border-border bg-surface-2/40 flex flex-col items-center gap-4 rounded-xl border p-5">
      <input type="hidden" name={name} value={url} readOnly />

      {/* Shape, ratio and object-cover all match About, so this is the crop that ships.
          type="button" matters: it sits inside the profile form. */}
      <button
        type="button"
        onClick={() => url && setViewing(true)}
        disabled={!url}
        aria-label="View avatar full size"
        className={`border-border bg-surface-2 focus-visible:ring-ring group relative block aspect-square w-32 overflow-hidden border focus-visible:ring-2 focus-visible:outline-none enabled:cursor-zoom-in ${SHAPE}`}
      >
        {url ? (
          <Image
            src={url}
            alt="Current avatar"
            fill
            sizes="128px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="text-muted grid size-full place-items-center">
            <UserRound className="size-8" aria-hidden />
          </span>
        )}
        {url && !busy && (
          <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/55 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="size-3.5" aria-hidden /> View
          </span>
        )}
        {busy && (
          <span className="absolute inset-0 grid place-items-center bg-black/50">
            <Loader2 className="size-6 animate-spin text-white" aria-hidden />
          </span>
        )}
      </button>

      <div className="text-center">
        <p className="text-foreground text-sm font-medium">Avatar</p>
        <p className="text-muted mx-auto mt-0.5 max-w-xs text-xs">
          Shown in the About section. Saved as soon as you upload, no need to press Save changes.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setStatus({ kind: "idle" });
          }}
          disabled={busy}
          className="border-border text-foreground hover:bg-surface-2 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
        >
          <UploadCloud className="size-3.5" aria-hidden /> Change
        </button>
        {url && (
          <button
            type="button"
            onClick={() => commit(null)}
            disabled={busy}
            className="text-muted hover:text-foreground inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition disabled:opacity-60"
          >
            <ImageOff className="size-3.5" aria-hidden /> Remove
          </button>
        )}
        {status.kind === "saved" && !busy && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500">
            <Check className="size-3.5" aria-hidden /> Saved
          </span>
        )}
        {status.kind === "error" && <span className="text-xs text-red-400">{status.message}</span>}
      </div>

      {open && (
        <div className="border-border flex w-full max-w-sm flex-col gap-3 rounded-lg border border-dashed p-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="border-border text-foreground hover:bg-surface-2 inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" aria-hidden /> Uploading…
              </>
            ) : (
              <>
                <UploadCloud className="size-3.5" aria-hidden /> Upload image
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <Link2 className="text-muted size-3.5 shrink-0" aria-hidden />
            <input
              type="url"
              value={draftUrl}
              onChange={(e) => setDraftUrl(e.target.value)}
              placeholder="https://… image URL"
              className="border-border bg-background text-foreground placeholder:text-muted/70 focus:ring-ring min-w-0 flex-1 rounded-lg border px-3 py-1.5 text-xs transition focus:border-transparent focus:ring-2 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => commit(draftUrl.trim())}
              disabled={busy || draftUrl.trim() === ""}
              className="border-border text-foreground hover:bg-surface-2 shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-40"
            >
              Use
            </button>
          </div>
        </div>
      )}

      {url && (
        <ImageLightbox
          src={url}
          alt="Current avatar"
          open={viewing}
          onClose={() => setViewing(false)}
          unoptimized
        />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
