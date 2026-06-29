import { BLOB_FOLDERS, optimizeAndUploadImage } from "@/lib/blob";

/**
 * Optimize a testimonial avatar (256px square, center-cropped WebP) and store
 * it in the Blob `testimonials/` folder. Thin wrapper over the shared blob
 * helper so testimonial uploads keep their own folder and sizing.
 */
export async function optimizeAndUploadAvatar(file: File): Promise<string> {
  return optimizeAndUploadImage(file, BLOB_FOLDERS.testimonials, {
    width: 256,
    height: 256,
    fit: "cover",
  });
}
