import { KV_LIMITS } from "@/config/constants";
import { getDomain } from "@/utils/mail";

/**
 * Update sender statistics
 */
export async function updateSenderStats(kv: KVNamespace, senderAddress: string) {
	const senderKey = `sender_count:${getDomain(senderAddress)}`;

	try {
		const currentCountStr = await kv.get(senderKey);
		const newCount = (currentCountStr ? parseInt(currentCountStr, 10) : 0) + 1;

		await kv.put(senderKey, newCount.toString());

		return { success: true, count: newCount, error: undefined };
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return {
			success: false,
			count: 0,
			error: new Error(`Failed to update KV for ${senderKey}: ${errorMessage}`),
		};
	}
}

/**
 * Get top senders from KV
 */
export async function getTopSenders(kv: KVNamespace, limit = 10) {
	try {
		const cacheKey = "top_senders_cache";
		const cachedData = (await kv.get(cacheKey, "json")) as {
			timestamp: number;
			data: any[];
		} | null;

		// Return cached data if available and fresh
		if (cachedData && cachedData.timestamp > Date.now() - KV_LIMITS.CACHE_TTL) {
			return cachedData.data.slice(0, limit);
		}

		const allKeys = [];
		let cursor: string | undefined;
		const maxKeys = KV_LIMITS.MAX_SENDER_KEYS; // Prevent excessive memory usage

		// Collect all sender keys with pagination
		while (allKeys.length < maxKeys) {
			const page: KVNamespaceListResult<unknown, string> = await kv.list({
				prefix: "sender_count:",
				cursor,
				limit: Math.min(KV_LIMITS.LIST_BATCH_SIZE, maxKeys - allKeys.length), // Batch size optimization
			});

			allKeys.push(...page.keys);

			if (page.list_complete) {
				break;
			}

			cursor = page.cursor;
		}

		// Use single batch for better performance with limited data
		const batchSize = Math.min(KV_LIMITS.BATCH_SIZE, allKeys.length);
		const allSenders = [];

		for (let i = 0; i < allKeys.length; i += batchSize) {
			const batch = allKeys.slice(i, i + batchSize);
			const batchResults = await Promise.all(
				batch.map(async ({ name }) => {
					try {
						const count = await kv.get(name, { cacheTtl: 60 }); // Add 60s cache to individual gets
						return {
							name: name.replace("sender_count:", ""),
							count: parseInt(count || "0", 10),
						};
					} catch (_error) {
						return null;
					}
				}),
			);

			// Filter out failed entries
			allSenders.push(...batchResults.filter((sender) => sender !== null));
		}

		// Sort and limit results
		const result = allSenders.sort((a, b) => b.count - a.count).slice(0, limit);

		// Cache the result
		await kv.put(
			cacheKey,
			JSON.stringify({
				timestamp: Date.now(),
				data: result,
			}),
		);

		return result;
	} catch (error) {
		console.error("Failed to get top senders:", error);
		return [];
	}
}
