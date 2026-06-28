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

  it("renders a custom file upload area with visible label", () => {
    render(<SubmitTestimonialForm />);
    // The file input should exist but be visually hidden (sr-only)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeTruthy();
    expect(fileInput.classList.contains("sr-only")).toBe(true);
    // A visible "Upload a photo" label should be present
    expect(screen.getByText(/upload a photo/i)).toBeInTheDocument();
  });

  it("submit button is rendered using the Button primitive (not a bare unstyled button)", () => {
    render(<SubmitTestimonialForm />);
    const btn = screen.getByRole("button", { name: /submit testimonial/i });
    expect(btn).toBeTruthy();
    expect(btn).not.toBeDisabled();
    // Button primitive adds rounded-full from its base class
    expect(btn.className).toMatch(/rounded/);
  });

  it("renders optional social link fields", () => {
    render(<SubmitTestimonialForm />);
    expect(screen.getByPlaceholderText(/linkedin\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/github\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/x\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/yoursite\.com/i)).toBeInTheDocument();
  });

  it("social link inputs have correct name attributes", () => {
    const { container } = render(<SubmitTestimonialForm />);
    expect(container.querySelector('input[name="linkedinUrl"]')).toBeTruthy();
    expect(container.querySelector('input[name="githubUrl"]')).toBeTruthy();
    expect(container.querySelector('input[name="xUrl"]')).toBeTruthy();
    expect(container.querySelector('input[name="websiteUrl"]')).toBeTruthy();
  });
});
