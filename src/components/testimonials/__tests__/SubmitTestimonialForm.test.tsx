import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SubmitTestimonialForm, TESTIMONIAL_FORM_ID } from "../SubmitTestimonialForm";

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

  it("has the correct form id for external submit button", () => {
    const { container } = render(<SubmitTestimonialForm />);
    const form = container.querySelector("form");
    expect(form).toBeTruthy();
    expect(form!.id).toBe(TESTIMONIAL_FORM_ID);
  });

  it("signals success and unmounts the form on a successful submit", async () => {
    // On success the form renders nothing — the modal owns the curated
    // confirmation panel. The form's only job is to call onSuccess.
    const onSuccess = vi.fn();
    const { container } = render(<SubmitTestimonialForm onSuccess={onSuccess} />);
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/how do you know me/i), {
      target: { value: "Colleague" },
    });
    fireEvent.change(screen.getByLabelText(/your testimonial/i), {
      target: { value: "A".repeat(25) },
    });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect(container.querySelector("form")).toBeNull();
  });

  it("shows the server error message on failure", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Too many submissions." }),
    });
    const { container } = render(<SubmitTestimonialForm />);
    fireEvent.submit(container.querySelector("form")!);
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
    expect(container.querySelector('input[name="instagramUrl"]')).toBeTruthy();
    expect(container.querySelector('input[name="websiteUrl"]')).toBeTruthy();
  });

  it("calls onStateChange with submitting then success on successful submit", async () => {
    const onStateChange = vi.fn();
    const { container } = render(<SubmitTestimonialForm onStateChange={onStateChange} />);
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => expect(onStateChange).toHaveBeenCalledWith("success"));
    expect(onStateChange).toHaveBeenCalledWith("submitting");
  });
});
