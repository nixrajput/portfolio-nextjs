type Bucket = { count: number; resetAt: number };

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export type RateLimiterOptions = {
  /** Max requests allowed within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Injectable clock for testing. */
  now?: () => number;
};

/**
 * Fixed-window, in-memory rate limiter. State lives in module memory,
 * which is per-serverless-instance — acceptable for a low-traffic portfolio
 * spam guard. Returns a `check(key)` function keyed by client IP.
 */
export function createRateLimiter(opts: RateLimiterOptions) {
  const { limit, windowMs } = opts;
  const now = opts.now ?? Date.now;
  const buckets = new Map<string, Bucket>();

  return function check(key: string): RateLimitResult {
    const ts = now();
    const existing = buckets.get(key);

    if (!existing || ts >= existing.resetAt) {
      const resetAt = ts + windowMs;
      buckets.set(key, { count: 1, resetAt });
      return { success: true, remaining: limit - 1, resetAt };
    }

    if (existing.count >= limit) {
      return { success: false, remaining: 0, resetAt: existing.resetAt };
    }

    existing.count += 1;
    return {
      success: true,
      remaining: limit - existing.count,
      resetAt: existing.resetAt,
    };
  };
}

/** Shared limiter for testimonial submissions: 3 per IP per hour. */
export const testimonialRateLimit = createRateLimiter({
  limit: 3,
  windowMs: 60 * 60 * 1000,
});

/** Extracts the client IP from request headers (Vercel/standard proxies). */
export function clientIpFromHeaders(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
