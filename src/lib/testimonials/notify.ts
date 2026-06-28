import { Resend } from "resend";

type NotifyInput = {
  id: string;
  name: string;
  relationship: string;
  content: string;
  imageUrl: string | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nixlab.co.in";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildTestimonialEmail(input: NotifyInput): {
  subject: string;
  html: string;
} {
  const approveUrl = `${SITE_URL}/admin?tab=testimonials&focus=${input.id}`;
  return {
    subject: `New testimonial from ${input.name} (pending)`,
    html: `
      <h2>New testimonial awaiting moderation</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>How they know me:</strong> ${escapeHtml(input.relationship)}</p>
      <blockquote style="border-left:3px solid #7c3aed;padding-left:12px;color:#444">
        ${escapeHtml(input.content)}
      </blockquote>
      ${input.imageUrl ? `<p><img src="${input.imageUrl}" alt="avatar" width="64" height="64" style="border-radius:50%"/></p>` : "<p><em>No image provided.</em></p>"}
      <p><a href="${approveUrl}" style="background:#7c3aed;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Review in admin</a></p>
    `,
  };
}

export async function notifyNewTestimonial(input: NotifyInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.warn("Resend not configured; skipping testimonial notification");
    return;
  }
  const resend = new Resend(apiKey);
  const { subject, html } = buildTestimonialEmail(input);
  await resend.emails.send({
    from: "Portfolio <noreply@nixlab.co.in>",
    to,
    subject,
    html,
  });
}
