import * as db from "@/database/d1";
import * as r2 from "@/database/r2";
import { now } from "@/utils/helpers";
import { logInfo } from "@/utils/logger";
import { sendMessage } from "@/utils/telegram";

/**
 * Cloudflare Scheduled Function
 * Delete emails older than configured hours, with cascade cleanup of attachments
 */
export async function handleScheduled(
	_event: ScheduledEvent,
	env: CloudflareBindings,
	ctx: ExecutionContext,
) {
	const cutoffTimestamp = now() - env.HOURS_TO_DELETE_D1 * 60 * 60;

	// Step 1: Get old attachments (for R2 cleanup)
	const { results: oldAttachments, error: fetchError } = await db.getOldAttachments(env.D1, cutoffTimestamp);

	if (fetchError) {
		const errorMessage = `❌ Failed to fetch old attachments: ${fetchError.message}`;
		ctx.waitUntil(sendMessage(errorMessage, env));
		throw new Error(errorMessage);
	}

	// Step 2: Delete R2 objects for old attachments
	if (oldAttachments.length > 0) {
		const r2Keys = oldAttachments.map((a) => a.r2_key);
		const r2DeleteResults = await Promise.allSettled(
			r2Keys.map((key) => r2.deleteAttachment(env.R2, key)),
		);
		const r2Failures = r2DeleteResults.filter((r) => r.status === "rejected");
		if (r2Failures.length > 0) {
			console.error(`Failed to delete ${r2Failures.length} R2 objects`);
		}
		logInfo(`Deleted ${r2Keys.length - r2Failures.length}/${r2Keys.length} R2 attachment objects`);
	}

	// Step 3: Delete attachments from D1
	const { success: attSuccess, error: attError } = await db.deleteOldAttachments(env.D1, cutoffTimestamp);
	if (!attSuccess) {
		console.error(`Failed to delete old attachments from D1: ${attError}`);
	}

	// Step 4: Delete old emails from D1
	const { success, error } = await db.deleteOldEmails(env.D1, cutoffTimestamp);

	if (success) {
		const summary = oldAttachments.length > 0
			? `✅ Cleanup completed: emails deleted, ${oldAttachments.length} attachments removed from R2 & D1`
			: "✅ Email cleanup completed successfully";
		logInfo(summary);
		ctx.waitUntil(sendMessage(summary, env));
	} else {
		const errorMessage = `❌ Email cleanup failed: ${error?.message || "Unknown error"}`;
		ctx.waitUntil(sendMessage(errorMessage, env));
		throw new Error(errorMessage);
	}
}
