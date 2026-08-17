"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X, ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Submits a JSON array in one hidden input, so the enclosing form and the server action need
 * no special handling. Order is the gallery order, hence the reorder controls.
 */
export function MultiImageUploadField({
  name,
  defaultValue = [],
  max = 6,
}: {
  name: string;
  defaultValue?: string[];
  max?: number;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const atLimit = urls.length >= max;

  async function onFiles(files: File[]) {
    setError(null);
    setUploading(true);
    try {
      // Sequential, so a burst of large images cannot push the sharp route over its memory
      // cap, and committed one at a time so a failure on file 3 keeps 1 and 2 - they are
      // already stored in Blob and would otherwise be orphaned there.
      for (const file of files.slice(0, max - urls.length)) {
        const body = new FormData();
        body.append("file", file);
        body.append("folder", "projects");
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        setUrls((prev) => [...prev, data.url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= urls.length) return;
    setUrls((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={JSON.stringify(urls)} readOnly />

      {urls.length > 0 && (
        <ul className="flex flex-col gap-2">
          {urls.map((url, i) => (
            <li key={i} className="border-border flex items-center gap-2 rounded-lg border p-2">
              <span className="border-border bg-surface-2 relative size-12 shrink-0 overflow-hidden rounded border">
                {/* unoptimized: the URL is an external CDN. */}
                <Image src={url} alt="" fill sizes="48px" className="object-cover" unoptimized />
              </span>
              {/* min-w-0 + truncate so a long CDN URL cannot stretch the row. */}
              <span className="text-muted min-w-0 flex-1 truncate text-xs">{url}</span>
              <button
                type="button"
                aria-label={`Move screenshot ${i + 1} earlier`}
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
                className="text-muted hover:text-foreground p-1 disabled:opacity-30"
              >
                <ArrowLeft className="size-3.5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label={`Move screenshot ${i + 1} later`}
                disabled={i === urls.length - 1}
                onClick={() => move(i, i + 1)}
                className="text-muted hover:text-foreground p-1 disabled:opacity-30"
              >
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label={`Remove screenshot ${i + 1}`}
                // By index, not value: the same URL can legitimately appear twice, and
                // filtering by value removed every copy.
                onClick={() => setUrls((prev) => prev.filter((_, j) => j !== i))}
                className="text-muted p-1 hover:text-red-400"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading || atLimit}
          className="border-border text-foreground hover:bg-surface-2 inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="size-3.5 animate-spin" aria-hidden /> Uploading…
            </>
          ) : (
            <>
              <UploadCloud className="size-3.5" aria-hidden /> Upload screenshots
            </>
          )}
        </button>

        <input
          type="url"
          value={pending}
          onChange={(e) => setPending(e.target.value)}
          placeholder="…or paste a URL"
          className="border-border bg-background text-foreground placeholder:text-muted/70 focus:ring-ring min-w-0 flex-1 rounded-lg border px-3 py-1.5 text-xs transition focus:border-transparent focus:ring-2 focus:outline-none"
        />
        <button
          type="button"
          disabled={!pending.trim() || atLimit}
          onClick={() => {
            setUrls((prev) => [...prev, pending.trim()]);
            setPending("");
          }}
          className="border-border text-foreground hover:bg-surface-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
        >
          Add
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length > 0) onFiles(files);
          e.target.value = "";
        }}
      />

      <span className="text-muted text-xs">
        {urls.length} of {max}
        {atLimit && " (limit reached)"}
      </span>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
