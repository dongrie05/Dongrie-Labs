type RateLimitResult = {
  ok: boolean;
  retryAfterSeconds: number;
};

type Bucket = {
  timestamps: number[];
};

/**
 * Fixed-window counter kept in memory. On serverless hosts this only applies
 * to the current instance, which is enough to slow obvious bursts.
 */
export function createRateLimiter(options: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>();

  return function rateLimit(key: string, now = Date.now()): RateLimitResult {
    const existing = buckets.get(key);
    const timestamps = (existing?.timestamps ?? []).filter((ts) => now - ts < options.windowMs);

    if (timestamps.length >= options.limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((options.windowMs - (now - timestamps[0])) / 1000));
      buckets.set(key, { timestamps });
      return { ok: false, retryAfterSeconds };
    }

    timestamps.push(now);
    buckets.set(key, { timestamps });

    if (buckets.size > 5000) {
      const oldest = buckets.keys().next().value;
      if (oldest) buckets.delete(oldest);
    }

    return { ok: true, retryAfterSeconds: 0 };
  };
}

export const CONTACT_RATE_LIMIT = 5;
export const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;

export const limitContactAttempts = createRateLimiter({
  limit: CONTACT_RATE_LIMIT,
  windowMs: CONTACT_RATE_WINDOW_MS,
});
