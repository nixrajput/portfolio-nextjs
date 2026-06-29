// Server-only Blob utilities. NOT a "use server" actions module (it exports
// constants + types alongside the upload fn). It is reached only through
// server code (the testimonials API route), so it never reaches the client.
import { put } from "@vercel/blob";
import sharp from "sharp";

// Vercel Blob is a flat key/value store; a "folder" is just a key prefix
// containing "/". Define every folder once here so uploads stay organized as
// the site grows (testimonial avatars today; hero images and more later).
export const BLOB_FOLDERS = {
  testimonials: "testimonials",
  hero: "hero",
} as const;

export type BlobFolder = (typeof BLOB_FOLDERS)[keyof typeof BLOB_FOLDERS];

const MAX_BYTES = 5 * 1024 * 1024; // 5MB raw upload cap
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

type ResizeOptions = {
  width: number;
  height: number;
  /** "cover" center-crops to the box; "inside" preserves aspect within it. */
  fit?: "cover" | "inside";
};

/**
 * Optimize an uploaded image (resize + re-encode WebP) and store it in the
 * given Blob folder under a random key. Returns the public CDN URL. The folder
 * argument keeps each kind of upload in its own prefix (e.g. testimonials/,
 * hero/) so the Blob store stays organized and reusable across features.
 */
export async function optimizeAndUploadImage(
  file: File,
  folder: BlobFolder,
  resize: ResizeOptions,
): Promise<string> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image too large (max 5MB)");
  }

  const input = Buffer.from(await file.arrayBuffer());
  const optimized = await sharp(input)
    .resize(resize.width, resize.height, {
      fit: resize.fit ?? "cover",
      position: "center",
    })
    .webp({ quality: 80 })
    .toBuffer();

  const key = `${folder}/${crypto.randomUUID()}.webp`;
  const blob = await put(key, optimized, {
    access: "public",
    contentType: "image/webp",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}
