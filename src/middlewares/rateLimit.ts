import type { Context, MiddlewareHandler, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { RATE_LIMIT } from "@/config/constants";
import { ERR } from "@/utils/http";

type RateLimitContext = Context<{ Bindings: CloudflareBindings }>;

// Only data endpoints are protected; the web UI and its assets stay unrestricted.
const PROTECTED_PREFIXES = ["/emails", "/inbox", "/attachments", "/domains"];

function isProtectedPath(path: string): boolean {
	return PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function getClientIp(c: RateLimitContext): string {
	const cfIp = c.req.header("cf-connecting-ip");
	if (cfIp) return cfIp;
	const forwarded = c.req.header("x-forwarded-for")?.split(",")[0]?.trim();
	return forwarded || "unknown";
}

function extractEmailAddress(path: string): string | null {
	const match = path.match(/^\/emails\/(?:count\/)?([^/]+)/);
	if (!match) return null;
	try {
		return decodeURIComponent(match[1]).toLowerCase();
	} catch {
		return match[1].toLowerCase();
	}
}

function isWriteMethod(method: string): boolean {
	return !["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());
}

interface LimitCheck {
	key: string;
	limit: number;
}

function buildChecks(ip: string, write: boolean, address: string | null): LimitCheck[] {
	const checks: LimitCheck[] = [
		{
			key: write ? `ipw:${ip}` : `ip:${ip}`,
			limit: write ? RATE_LIMIT.PER_IP_WRITE : RATE_LIMIT.PER_IP,
		},
	];
	if (address && !write) {
		checks.push({ key: `addr:${address}`, limit: RATE_LIMIT.PER_ADDRESS });
	}
	return checks;
}

async function applyLimit(c: RateLimitContext, next: Next): Promise<Response | undefined> {
	const ip = getClientIp(c);
	const write = isWriteMethod(c.req.method);
	const address = extractEmailAddress(c.req.path);
	const namespace = c.env.RATE_LIMITER;
	const stub = namespace.get(namespace.idFromName("global"));
	const checks = buildChecks(ip, write, address);

	c.header("X-RateLimit-Limit", String(write ? RATE_LIMIT.PER_IP_WRITE : RATE_LIMIT.PER_IP));

	try {
		const decisions = await Promise.all(
			checks.map((check) => stub.check(check.key, check.limit, RATE_LIMIT.WINDOW_MS)),
		);
		const limited = decisions.find((decision) => !decision.allowed);

		if (limited) {
			c.header("Retry-After", String(limited.retryAfter));
			c.header("X-RateLimit-Remaining", "0");
			return c.json(
				ERR("Too many requests, please retry later", "RateLimitExceeded", {
					retry_after: limited.retryAfter,
				}),
				429,
			);
		}

		c.header("X-RateLimit-Remaining", String(decisions[0].remaining));
	} catch (error) {
		console.error("Rate limiter unavailable, allowing request", error);
	}

	await next();
}

/**
 * API rate limiter with three independent counters:
 *   - per IP, all requests
 *   - per IP, writes (stricter, because they consume D1 write quota)
 *   - per email address, reads (stops enumeration of a single inbox)
 *
 * Fails open if the Durable Object is unreachable, and the Cloudflare edge
 * should still have a WAF rate-limit rule as the outer layer.
 */
export function rateLimitMiddleware(): MiddlewareHandler<{ Bindings: CloudflareBindings }> {
	return createMiddleware<{ Bindings: CloudflareBindings }>(async (c, next) => {
		if (!RATE_LIMIT.ENABLED || !isProtectedPath(c.req.path)) {
			await next();
			return;
		}
		await applyLimit(c, next);
	});
}

export default rateLimitMiddleware;
