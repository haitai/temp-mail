import type { Attachment, AttachmentSummary } from "@/schemas/attachments";
import type { Email, EmailSummary } from "@/schemas/emails";

/**
 * Insert an email into the database
 */
export async function insertEmail(db: D1Database, emailData: Email) {
	try {
		const { success, error, meta } = await db
			.prepare(
				`INSERT INTO emails (id, from_address, to_address, subject, received_at, html_content, text_content, has_attachments, attachment_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			)
			.bind(
				emailData.id,
				emailData.from_address,
				emailData.to_address,
				emailData.subject,
				emailData.received_at,
				emailData.html_content,
				emailData.text_content,
				emailData.has_attachments,
				emailData.attachment_count,
			)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Get emails by recipient email address
 */
export async function getEmailsByRecipient(
	db: D1Database,
	emailAddress: string,
	limit: number,
	offset: number,
) {
	try {
		const { results } = await db
			.prepare(
				`SELECT id, from_address, to_address, subject, received_at, has_attachments, attachment_count, text_content, html_content
         FROM emails
         WHERE to_address = ?
         ORDER BY received_at DESC
         LIMIT ? OFFSET ?`,
			)
			.bind(emailAddress, limit, offset)
			.all();

		// Convert SQLite boolean integers to proper booleans
		const convertedResults = results.map((row: any) => ({
			...row,
			has_attachments: Boolean(row.has_attachments),
		}));

		return { results: convertedResults as EmailSummary[], error: undefined };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { results: [], error: error };
	}
}

/**
 * Get an email by ID
 */
export async function getEmailById(db: D1Database, emailId: string) {
	try {
		const emailResult = await db.prepare("SELECT * FROM emails WHERE id = ?").bind(emailId).first();

		if (emailResult) {
			// Convert SQLite boolean integers to proper booleans
			const convertedResult = {
				...emailResult,
				has_attachments: Boolean(emailResult.has_attachments),
			};
			return { result: convertedResult as Email, error: undefined };
		}

		return { result: null, error: undefined };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { result: null, error: error };
	}
}

/**
 * Delete emails older than a specific timestamp
 */
export async function deleteOldEmails(db: D1Database, timestamp: number) {
	try {
		const { success, error, meta } = await db
			.prepare("DELETE FROM emails WHERE received_at < ?")
			.bind(timestamp)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Delete emails by recipient email address
 */
export async function deleteEmailsByRecipient(db: D1Database, emailAddress: string) {
	try {
		const { success, error, meta } = await db
			.prepare("DELETE FROM emails WHERE to_address = ?")
			.bind(emailAddress)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Delete an email by ID
 */
export async function deleteEmailById(db: D1Database, emailId: string) {
	try {
		const { success, error, meta } = await db
			.prepare("DELETE FROM emails WHERE id = ?")
			.bind(emailId)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Count emails by recipient email address
 */
export async function countEmailsByRecipient(db: D1Database, emailAddress: string) {
	try {
		const result = await db
			.prepare("SELECT count(*) as count FROM emails WHERE to_address = ?")
			.bind(emailAddress)
			.first<{ count: number }>();
		return { count: result?.count || 0, error: undefined };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { count: 0, error: error };
	}
}

/**
 * Insert an attachment into the database
 */
export async function insertAttachment(db: D1Database, attachmentData: Attachment) {
	try {
		const { success, error, meta } = await db
			.prepare(
				`INSERT INTO attachments (id, email_id, filename, content_type, size, r2_key, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
			)
			.bind(
				attachmentData.id,
				attachmentData.email_id,
				attachmentData.filename,
				attachmentData.content_type,
				attachmentData.size,
				attachmentData.r2_key,
				attachmentData.created_at,
			)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Get attachments by email ID
 */
export async function getAttachmentsByEmailId(db: D1Database, emailId: string) {
	try {
		const { results } = await db
			.prepare(
				`SELECT id, filename, content_type, size, created_at
         FROM attachments
         WHERE email_id = ?
         ORDER BY created_at ASC`,
			)
			.bind(emailId)
			.all();
		return { results: results as AttachmentSummary[], error: undefined };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { results: [], error: error };
	}
}

/**
 * Get attachment by ID (with R2 key for download)
 */
export async function getAttachmentById(db: D1Database, attachmentId: string) {
	try {
		const result = await db
			.prepare("SELECT * FROM attachments WHERE id = ?")
			.bind(attachmentId)
			.first();
		return { result: result as Attachment | null, error: undefined };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { result: null, error: error };
	}
}

/**
 * Delete attachment by ID
 */
export async function deleteAttachmentById(db: D1Database, attachmentId: string) {
	try {
		const { success, error, meta } = await db
			.prepare("DELETE FROM attachments WHERE id = ?")
			.bind(attachmentId)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Delete all attachments for an email
 */
export async function deleteAttachmentsByEmailId(db: D1Database, emailId: string) {
	try {
		const { success, error, meta } = await db
			.prepare("DELETE FROM attachments WHERE email_id = ?")
			.bind(emailId)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Update email attachment info
 */
export async function updateEmailAttachmentInfo(
	db: D1Database,
	emailId: string,
	hasAttachments: boolean,
	attachmentCount: number,
) {
	try {
		const { success, error, meta } = await db
			.prepare("UPDATE emails SET has_attachments = ?, attachment_count = ? WHERE id = ?")
			.bind(hasAttachments, attachmentCount, emailId)
			.run();
		return { success, error, meta };
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { success: false, error: error, meta: undefined };
	}
}

/**
 * Get emails with attachments in a single query
 */
export async function getEmailsWithAttachments(
	db: D1Database,
	emailAddress: string,
	limit: number,
	offset: number,
) {
	try {
		const { results } = await db
			.prepare(
				`SELECT
					e.id, e.from_address, e.to_address, e.subject, e.received_at,
					e.has_attachments, e.attachment_count,
					a.id as att_id, a.filename, a.content_type, a.size, a.created_at as att_created_at
				FROM emails e
				LEFT JOIN attachments a ON e.id = a.email_id
				WHERE e.to_address = ?
				ORDER BY e.received_at DESC, a.created_at ASC
				LIMIT ? OFFSET ?`,
			)
			.bind(emailAddress, limit, offset)
			.all();

		// Group results by email and combine attachments
		const emailMap = new Map<string, any>();

		for (const row of results as any[]) {
			const emailId = row.id;

			if (!emailMap.has(emailId)) {
				emailMap.set(emailId, {
					id: emailId,
					from_address: row.from_address,
					to_address: row.to_address,
					subject: row.subject,
					received_at: row.received_at,
					has_attachments: Boolean(row.has_attachments),
					attachment_count: row.attachment_count,
					attachments: [],
				});
			}

			const email = emailMap.get(emailId);

			// Add attachment if it exists
			if (row.att_id) {
				email.attachments.push({
					id: row.att_id,
					filename: row.filename,
					content_type: row.content_type,
					size: row.size,
					created_at: row.att_created_at,
				});
			}
		}

		// Convert back to array and flatten attachments
		const emailsWithAttachments = Array.from(emailMap.values());
		const allAttachments = emailsWithAttachments.flatMap((email) =>
			email.attachments.map((att: any) => ({
				...att,
				email_id: email.id,
				email_subject: email.subject,
				email_received_at: email.received_at,
			})),
		);

		return {
			results: allAttachments as AttachmentSummary[],
			emails: emailsWithAttachments,
			error: undefined,
		};
	} catch (e: unknown) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { results: [], emails: [], error: error };
	}
}
