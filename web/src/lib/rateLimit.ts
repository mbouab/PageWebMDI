type RateLimitResult = { allowed: boolean };

type RateLimiterOptions = {
  max: number;
  windowMs: number;
};

export type RateLimiter = {
  check(key: string): RateLimitResult;
};

export function createRateLimiter({
  max,
  windowMs,
}: RateLimiterOptions): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const entry = hits.get(key);

      if (!entry || now > entry.resetAt) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true };
      }

      if (entry.count >= max) {
        return { allowed: false };
      }

      entry.count += 1;
      return { allowed: true };
    },
  };
}

/** Shared limiter for the /api/contact route: 5 requests / 10 min per IP. */
export const contactRateLimiter = createRateLimiter({
  max: 5,
  windowMs: 10 * 60 * 1000,
});
