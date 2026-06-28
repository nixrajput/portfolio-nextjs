import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { submitTestimonialSchema } from "@/lib/validation/testimonial";
import { clientIpFromHeaders, testimonialRateLimit } from "@/lib/rate-limit";
import { optimizeAndUploadAvatar } from "./upload-image";
import { notifyNewTestimonial } from "./notify";

export type SubmitResult = { ok: true } | { ok: false; status: number; error: string };

export async function submitTestimonial(
  formData: FormData,
  headers: Headers,
): Promise<SubmitResult> {
  // Step 1: Rate limit by IP
  const ip = clientIpFromHeaders(headers);
  const rl = testimonialRateLimit(ip);
  if (!rl.success) {
    return {
      ok: false,
      status: 429,
      error: "Too many submissions. Try again later.",
    };
  }

  // Step 2: Validate + honeypot check
  const parsed = submitTestimonialSchema.safeParse({
    name: formData.get("name"),
    relationship: formData.get("relationship"),
    content: formData.get("content"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    // If the honeypot field failed, silently accept-and-drop (bots won't know)
    const honeypotHit = parsed.error.issues.some((i) => i.path[0] === "website");
    if (honeypotHit) return { ok: true };
    return { ok: false, status: 400, error: parsed.error.issues[0]!.message };
  }

  // Step 3: Optimize + upload image if provided
  let imageUrl: string | null = null;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    try {
      imageUrl = await optimizeAndUploadAvatar(image);
    } catch (e) {
      return { ok: false, status: 400, error: (e as Error).message };
    }
  }

  // Step 4: Insert pending row
  const [row] = await db
    .insert(testimonials)
    .values({
      name: parsed.data.name,
      relationship: parsed.data.relationship,
      content: parsed.data.content,
      imageUrl,
      status: "pending",
    })
    .returning({ id: testimonials.id });

  // Step 5: Fire moderation email — non-blocking, best-effort
  notifyNewTestimonial({
    id: row!.id,
    name: parsed.data.name,
    relationship: parsed.data.relationship,
    content: parsed.data.content,
    imageUrl,
  }).catch((err: unknown) => {
    console.error("Failed to send testimonial notification email:", err);
  });

  return { ok: true };
}
