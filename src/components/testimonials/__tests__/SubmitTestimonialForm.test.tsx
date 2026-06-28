import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SubmitTestimonialForm } from "../SubmitTestimonialForm";

describe("SubmitTestimonialForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("renders an off-screen honeypot field named website", () => {
    const { container } = render(<SubmitTestimonialForm />);
    const honeypot = container.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeypot).toBeTruthy();
    expect(honeypot.tabIndex).toBe(-1);
    expect(honeypot.closest('[aria-hidden="true"]')).toBeTruthy();
  });

  it("shows a success message after a successful submit", async () => {
    render(<SubmitTestimonialForm />);
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/how do you know me/i), {
      target: { value: "Colleague" },
    });
    fireEvent.change(screen.getByLabelText(/your testimonial/i), {
      target: { value: "A".repeat(25) },
    });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);
    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
  });

  it("shows the server error message on failure", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Too many submissions." }),
    });
    render(<SubmitTestimonialForm />);
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }).closest("form")!);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(/too many/i));
  });
});
