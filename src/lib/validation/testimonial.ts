import { z } from "zod";

export const TESTIMONIAL_STATUSES = ["pending", "approved", "rejected"] as const;
export type TestimonialStatus = (typeof TESTIMONIAL_STATUSES)[number];

// Only http(s) URLs are safe to store and later render as an href — reject
// other schemes (javascript:, data:, etc.) to avoid a stored-XSS vector.
function isSafeHttpUrl(v: string): boolean {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// A plain optional URL (e.g. personal website): empty -> undefined, otherwise
// must be a safe http(s) URL.
const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === "" || v === undefined ? undefined : v))
  .superRefine((v, ctx) => {
    if (v !== undefined && !isSafeHttpUrl(v)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Must be a valid URL" });
    }
  });

// A social field that accepts EITHER a full profile URL OR a bare handle
// (with or without a leading "@"). A handle is normalized to the platform's
// canonical profile URL; a provided URL is kept only if it is a safe http(s)
// URL. The stored value is therefore always a clean, render-safe link.
function socialHandle(baseUrl: string, handlePattern: RegExp, label: string) {
  return z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v))
    .superRefine((v, ctx) => {
      if (v === undefined) return;
      if (/^https?:\/\//i.test(v)) {
        if (!isSafeHttpUrl(v)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Must be a valid URL" });
        }
        return;
      }
      if (!handlePattern.test(v.replace(/^@/, ""))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Enter a valid ${label} username or URL`,
        });
      }
    })
    .transform((v) => {
      if (v === undefined) return undefined;
      if (/^https?:\/\//i.test(v)) return v;
      return `${baseUrl}${v.replace(/^@/, "")}`;
    });
}

// Per-platform handle rules (kept permissive; the goal is normalization, not
// strict platform validation).
const linkedinHandle = socialHandle(
  "https://www.linkedin.com/in/",
  /^[A-Za-z0-9-]{2,100}$/,
  "LinkedIn",
);
const githubHandle = socialHandle("https://github.com/", /^[A-Za-z0-9-]{1,39}$/, "GitHub");
const xHandle = socialHandle("https://x.com/", /^[A-Za-z0-9_]{1,15}$/, "X");
const instagramHandle = socialHandle(
  "https://instagram.com/",
  /^[A-Za-z0-9._]{1,30}$/,
  "Instagram",
);

export const submitTestimonialSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  relationship: z.string().trim().min(2, "Tell me how you know me").max(120),
  content: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters")
    .max(1000, "Keep it under 1000 characters"),
  // Honeypot: must be empty. Bots fill it; humans never see it.
  website: z.string().max(0, "Spam detected").optional().default(""),
  // Social links — all optional; accept a username or a full URL.
  linkedinUrl: linkedinHandle,
  githubUrl: githubHandle,
  xUrl: xHandle,
  instagramUrl: instagramHandle,
  websiteUrl: optionalUrl,
});

export type SubmitTestimonialInput = z.infer<typeof submitTestimonialSchema>;

export const moderateTestimonialSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "delete", "feature", "unfeature"]),
});

export const reorderTestimonialsSchema = z.object({
  ids: z.array(z.string().uuid()).min(1),
});
