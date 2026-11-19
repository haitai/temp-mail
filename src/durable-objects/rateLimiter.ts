import { DurableObject } from "cloudflare:workers";

/** Result returned to the Worker after one rate-limit check. */
export interface RateLimitDecision {
	allowed: boolean;
	remaining: number;
	retryAfter: number;
}

interface CounterBucket {
	count: number;
	resetAt: number;
}

// Cleanup is probabilistic so a busy limiter never scans all keys on every request.
const CLEANUP_PROBABILITY = 0.01;

/**
 * Strongly consistent fixed-window counter for the API rate limiter.
 *
 * A single instance (idFromName("global")) keeps all counters in one place, which
 * makes limits exact. This deliberately avoids Workers KV: its eventual consistency
 * allows concurrent requests to bypass a limit, and its daily write quota can be
 * exhausted by the very traffic we are trying to block.
 */
export class RateLimiter extends DurableObject {
	async check(key: string, limit: number, windowMs: number): Promise<RateLimitDecision> {
		const now = Date.now();
		const storageKey = `rl:${key}`;
		const current = await this.ctx.storage.get<CounterBucket>(storageKey);

		const bucket: CounterBucket =
			current && current.resetAt > now
				? { count: current.count + 1, resetAt: current.resetAt }
				: { count: 1, resetAt: now + windowMs };

		await this.ctx.storage.put(storageKey, bucket);

		if (Math.random() < CLEANUP_PROBABILITY) {
			await this.cleanupExpired(now);
		}

		const allowed = bucket.count <= limit;
		return {
			allowed,
			remaining: Math.max(0, limit - bucket.count),
			retryAfter: allowed ? 0 : Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
		};
	}

	private async cleanupExpired(now: number): Promise<void> {
		const buckets = await this.ctx.storage.list<CounterBucket>({ prefix: "rl:" });
		const expired: string[] = [];
		for (const [key, bucket] of buckets) {
			if (bucket.resetAt <= now) expired.push(key);
		}
		if (expired.length > 0) {
			await this.ctx.storage.delete(expired);
		}
	}
}
