import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { installMatchMedia } from "@/test/matchMedia";
import { Magnetic } from "./Magnetic";

beforeEach(() => installMatchMedia());
afterEach(cleanup);

describe("Magnetic", () => {
  it("renders its child unchanged", () => {
    render(
      <Magnetic>
        <button>View work</button>
      </Magnetic>,
    );
    expect(screen.getByRole("button", { name: "View work" })).toBeInTheDocument();
  });
});
