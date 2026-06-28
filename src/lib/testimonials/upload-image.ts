"use server";

import { put } from "@vercel/blob";
import sharp from "sharp";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB raw upload cap
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function optimizeAndUploadAvatar(file: File): Promise<string> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image too large (max 5MB)");
  }

  const input = Buffer.from(await file.arrayBuffer());

  // 256px square, center-cropped, re-encoded WebP. Original is discarded.
  const optimized = await sharp(input)
    .resize(256, 256, { fit: "cover", position: "center" })
    .webp({ quality: 80 })
    .toBuffer();

  const key = `testimonials/${crypto.randomUUID()}.webp`;
  const blob = await put(key, optimized, {
    access: "public",
    contentType: "image/webp",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}
