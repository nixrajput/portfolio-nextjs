import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SubmitButton } from "../SubmitButton";

function Form({ initial = "" }: { initial?: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input name="title" defaultValue={initial} aria-label="title" />
      <input type="hidden" name="image" defaultValue="" data-testid="image" />
      <SubmitButton>Save changes</SubmitButton>
    </form>
  );
}

const button = () => screen.getByRole("button", { name: "Save changes" });

describe("SubmitButton", () => {
  it("starts disabled when nothing has changed", () => {
    render(<Form initial="Hello" />);
    expect(button()).toBeDisabled();
  });

  it("enables once a field differs from how it rendered", async () => {
    render(<Form initial="Hello" />);
    await userEvent.type(screen.getByLabelText("title"), "!");
    expect(button()).toBeEnabled();
  });

  it("disables again when the field is edited back to its original value", async () => {
    render(<Form initial="Hello" />);
    const field = screen.getByLabelText("title");
    await userEvent.type(field, "!");
    expect(button()).toBeEnabled();
    await userEvent.type(field, "{backspace}");
    expect(button()).toBeDisabled();
  });

  // The uploaders write a hidden input from React state and dispatch this event themselves;
  // without it an image-only edit left Save disabled.
  it("notices a hidden input that announces its own change", () => {
    render(<Form initial="Hello" />);
    const hidden = screen.getByTestId("image") as HTMLInputElement;
    hidden.value = "https://blob.test/a.webp";
    expect(button()).toBeDisabled();
    fireEvent(hidden, new Event("input", { bubbles: true }));
    expect(button()).toBeEnabled();
  });

  it("returns to disabled after the form is submitted", async () => {
    render(<Form initial="Hello" />);
    await userEvent.type(screen.getByLabelText("title"), "!");
    expect(button()).toBeEnabled();
    fireEvent.submit(button().closest("form")!);
    expect(button()).toBeDisabled();
  });
});
