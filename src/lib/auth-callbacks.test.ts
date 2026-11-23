import { describe, expect, it } from "vitest";
import { isAdminProfile } from "./auth-callbacks";

const ADMIN_ID = "10887215";

describe("isAdminProfile", () => {
  it("allows the configured GitHub user id", () => {
    expect(isAdminProfile({ login: "nixrajput", id: 10887215 }, ADMIN_ID)).toBe(true);
  });
  it("rejects a renamed account that reuses the admin login with a different id", () => {
    expect(isAdminProfile({ login: "nixrajput", id: 99999999 }, ADMIN_ID)).toBe(false);
  });
  it("rejects a profile without an id", () => {
    expect(isAdminProfile({ login: "nixrajput" }, ADMIN_ID)).toBe(false);
    expect(isAdminProfile(undefined, ADMIN_ID)).toBe(false);
  });
  it("rejects everyone when the admin id is unset", () => {
    expect(isAdminProfile({ login: "nixrajput", id: 10887215 }, undefined)).toBe(false);
    expect(isAdminProfile({ login: "nixrajput", id: 10887215 }, "")).toBe(false);
  });
});
