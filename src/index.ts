import app from "@/app";

import { handleEmail } from "@/handlers/emailHandler";
import { handleScheduled } from "@/handlers/scheduledHandler";

// Durable Object class must be exported from the Worker entry point.
export { RateLimiter } from "@/durable-objects/rateLimiter";

export default {
	// Hono ( Cloudflare Worker )
	fetch: app.fetch,

	// Cloudflare email router
	email: handleEmail,

	// Cloudflare Scheduled Functions
	scheduled: (event: ScheduledEvent, env: CloudflareBindings, ctx: ExecutionContext) => {
		switch (event.cron) {
			case "0 */2 * * *":
				return handleScheduled(event, env, ctx);
		}
	},
};
