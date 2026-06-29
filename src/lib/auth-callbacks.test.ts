import { describe, expect, it } from "vitest";
import { isAllowedLogin } from "./auth-callbacks";

describe("isAllowedLogin", () => {
  it("allows the configured admin login (case-insensitive)", () => {
    expect(isAllowedLogin("nixrajput", "nixrajput")).toBe(true);
    expect(isAllowedLogin("NixRajput", "nixrajput")).toBe(true);
  });
  it("rejects any other login", () => {
    expect(isAllowedLogin("someone-else", "nixrajput")).toBe(false);
  });
  it("rejects null/undefined login", () => {
    expect(isAllowedLogin(null, "nixrajput")).toBe(false);
    expect(isAllowedLogin(undefined, "nixrajput")).toBe(false);
  });
  it("rejects everyone when admin login is unset", () => {
    expect(isAllowedLogin("nixrajput", undefined)).toBe(false);
  });
});
