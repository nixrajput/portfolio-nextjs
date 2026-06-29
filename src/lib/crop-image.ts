import type { Area } from "react-easy-crop";

/**
 * Render the selected crop area of an image (data URL) to a square canvas and
 * return it as a JPEG File. The server re-optimizes to 256px WebP, so we cap
 * the crop output at 512px to keep the upload small while leaving headroom.
 */
export async function getCroppedImageFile(
  imageSrc: string,
  area: Area,
  fileName = "avatar.jpg",
): Promise<File> {
  const image = await loadImage(imageSrc);

  const OUTPUT = Math.min(512, Math.round(area.width));
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT;
  canvas.height = OUTPUT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, OUTPUT, OUTPUT);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9),
  );
  if (!blob) throw new Error("Could not create cropped image");

  return new File([blob], fileName, { type: "image/jpeg" });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () => reject(new Error("Failed to load image")));
    img.src = src;
  });
}
