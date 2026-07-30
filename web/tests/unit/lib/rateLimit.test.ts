import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { createRateLimiter } from "@/lib/rateLimit";

describe("createRateLimiter (T-9.3)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to `max` requests per key within the window, then blocks", () => {
    const limiter = createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });

    for (let i = 0; i < 5; i++) {
      expect(limiter.check("1.2.3.4").allowed).toBe(true);
    }
    expect(limiter.check("1.2.3.4").allowed).toBe(false);
  });

  it("tracks each key independently", () => {
    const limiter = createRateLimiter({ max: 1, windowMs: 10 * 60 * 1000 });

    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("b").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(false);
  });

  it("resets the count once the window has elapsed", () => {
    const limiter = createRateLimiter({ max: 1, windowMs: 1000 });

    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(false);

    vi.advanceTimersByTime(1001);

    expect(limiter.check("a").allowed).toBe(true);
  });
});
