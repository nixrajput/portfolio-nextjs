"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Upload a file or paste a URL; either way the result lands in a hidden input named `name`, so
 * the enclosing form submits it like a plain text field and the server action needs no change.
 */
export function ImageUploadField({
  name,
  folder,
  defaultValue = "",
  placeholder = "https://… or upload",
  previewRounded = "rounded-lg",
}: {
  name: string;
  folder: "avatar" | "skills" | "projects";
  defaultValue?: string;
  placeholder?: string;
  previewRounded?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* The value the form actually submits. */}
      <input type="hidden" name={name} value={url} readOnly />

      <div className="flex items-center gap-3">
        {url ? (
          <span
            className={cn(
              "border-border bg-surface-2 relative size-12 shrink-0 overflow-hidden border",
              previewRounded,
            )}
          >
            {/* unoptimized: url may be an external CDN or raw SVG */}
            <Image src={url} alt="" fill sizes="48px" className="object-contain p-1" unoptimized />
          </span>
        ) : (
          <span
            className={cn(
              "border-border text-muted bg-surface-2 grid size-12 shrink-0 place-items-center border",
              previewRounded,
            )}
          >
            <UploadCloud className="size-5" aria-hidden />
          </span>
        )}

        <div className="flex flex-1 flex-col gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="border-border bg-background text-foreground placeholder:text-muted/70 focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm transition focus:border-transparent focus:ring-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="border-border text-foreground hover:bg-surface-2 inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
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
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
