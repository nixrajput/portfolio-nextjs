import { describe, expect, it } from "vitest";
import { clientIpFromHeaders, createRateLimiter } from "../rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit, then blocks", () => {
    const t = 0;
    const check = createRateLimiter({
      limit: 2,
      windowMs: 1000,
      now: () => t,
    });
    expect(check("ip").success).toBe(true);
    expect(check("ip").success).toBe(true);
    expect(check("ip").success).toBe(false);
  });

  it("resets after the window elapses", () => {
    let t = 0;
    const check = createRateLimiter({
      limit: 1,
      windowMs: 1000,
      now: () => t,
    });
    expect(check("ip").success).toBe(true);
    expect(check("ip").success).toBe(false);
    // Update t to advance time and reset the window
    t = 1000;
    expect(check("ip").success).toBe(true);
  });

  it("tracks keys independently", () => {
    const t = 0;
    const check = createRateLimiter({
      limit: 1,
      windowMs: 1000,
      now: () => t,
    });
    expect(check("a").success).toBe(true);
    expect(check("b").success).toBe(true);
    expect(check("a").success).toBe(false);
  });

  it("reports remaining correctly", () => {
    const t = 0;
    const check = createRateLimiter({
      limit: 3,
      windowMs: 1000,
      now: () => t,
    });
    expect(check("ip").remaining).toBe(2);
    expect(check("ip").remaining).toBe(1);
  });
});

describe("clientIpFromHeaders", () => {
  it("prefers the first x-forwarded-for entry", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(clientIpFromHeaders(h)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip then unknown", () => {
    expect(clientIpFromHeaders(new Headers({ "x-real-ip": "9.9.9.9" }))).toBe("9.9.9.9");
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });
});
