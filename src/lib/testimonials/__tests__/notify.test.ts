import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { buildTestimonialEmail, notifyNewTestimonial } from "../notify";

const input = {
  id: "abc-123",
  name: "Jane <b>Doe</b>",
  relationship: "Colleague",
  content: "Great work & dedication.",
  imageUrl: null,
};

describe("buildTestimonialEmail", () => {
  it("escapes html and embeds an approve link with the id", () => {
    const { subject, html } = buildTestimonialEmail(input, "https://nixrajput.com");
    expect(subject).toContain("Jane");
    expect(html).toContain("Jane &lt;b&gt;Doe&lt;/b&gt;");
    expect(html).toContain("dedication");
    expect(html).toContain("https://nixrajput.com/admin");
    expect(html).toContain("focus=abc-123");
    expect(html).toContain("No image provided");
  });
});

describe("notifyNewTestimonial", () => {
  beforeEach(() => {
    sendMock.mockReset().mockResolvedValue({ id: "email-1" });
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_EMAIL = "me@example.com";
    process.env.RESEND_FROM_EMAIL = "Portfolio <noreply@nixrajput.com>";
    process.env.NEXT_PUBLIC_SITE_URL = "https://nixrajput.com";
  });
  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_EMAIL;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("sends when configured, using the env from-address", async () => {
    await notifyNewTestimonial(input);
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock.mock.calls[0]![0]).toMatchObject({
      from: "Portfolio <noreply@nixrajput.com>",
      to: "me@example.com",
    });
  });

  it("no-ops when not configured", async () => {
    delete process.env.RESEND_API_KEY;
    await notifyNewTestimonial(input);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
