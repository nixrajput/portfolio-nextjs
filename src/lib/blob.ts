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
  avatar: "avatar",
  skills: "skills",
  projects: "projects",
} as const;

export type BlobFolder = (typeof BLOB_FOLDERS)[keyof typeof BLOB_FOLDERS];

const MAX_BYTES = 5 * 1024 * 1024; // 5MB raw upload cap
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
// SVG is allowed for icon-style uploads but stored raw (vectors don't go
// through the sharp raster pipeline). Kept separate so the resize helper
// above stays raster-only.
const SVG_TYPE = "image/svg+xml";

type ResizeOptions = {
  width: number;
  height: number;
  /** "cover" center-crops to the box; "inside" preserves aspect within it. */
  fit?: "cover" | "inside";
};

/**
 * Resize, re-encode to WebP, store under a random key in `folder`, return the CDN URL. Blob is
 * flat, so the folder is only a key prefix that keeps each kind of upload separable.
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

/**
 * Upload an icon-style image (skill icons, etc.). SVGs are stored raw so they
 * stay crisp at any size; raster formats are resized + re-encoded to WebP via
 * optimizeAndUploadImage. Returns the public CDN URL.
 */
export async function uploadIcon(file: File, folder: BlobFolder): Promise<string> {
  if (file.size > MAX_BYTES) {
    throw new Error("Image too large (max 5MB)");
  }
  if (file.type === SVG_TYPE) {
    const key = `${folder}/${crypto.randomUUID()}.svg`;
    const blob = await put(key, Buffer.from(await file.arrayBuffer()), {
      access: "public",
      contentType: SVG_TYPE,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }
  // Raster icons: fit inside a 128px box (preserve aspect), WebP.
  return optimizeAndUploadImage(file, folder, { width: 128, height: 128, fit: "inside" });
}

/**
 * Project cover images and quick-view screenshots. Deliberately NOT uploadIcon: that fits
 * inside a 128px box, which is right for a skill icon and destroys a screenshot. `inside`
 * rather than `cover` so a tall mobile screenshot is not centre-cropped into nonsense.
 */
export async function uploadProjectMedia(file: File): Promise<string> {
  return optimizeAndUploadImage(file, BLOB_FOLDERS.projects, {
    width: 1600,
    height: 1000,
    fit: "inside",
  });
}
