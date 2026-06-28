import { z } from "zod";

export const TESTIMONIAL_STATUSES = ["pending", "approved", "rejected"] as const;
export type TestimonialStatus = (typeof TESTIMONIAL_STATUSES)[number];

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
});

export type SubmitTestimonialInput = z.infer<typeof submitTestimonialSchema>;

export const moderateTestimonialSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "delete", "feature", "unfeature"]),
});

export const reorderTestimonialsSchema = z.object({
  ids: z.array(z.string().uuid()).min(1),
});
