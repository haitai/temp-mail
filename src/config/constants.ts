/**
 * Application constants
 */

// Attachment limits
export const ATTACHMENT_LIMITS = {
	MAX_SIZE: 50 * 1024 * 1024, // 50MB
	MAX_COUNT_PER_EMAIL: 10,
	ALLOWED_TYPES: [
		// Images
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/webp",
		"image/svg+xml",
		// Documents
		"application/pdf",
		"text/plain",
		"text/csv",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.ms-powerpoint",
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		// Archives
		"application/zip",
		"application/x-rar-compressed",
		"application/x-7z-compressed",
		// Database files
		"application/x-sqlite3",
		"application/vnd.sqlite3",
		// Other
		"application/json",
		"application/xml",
		"text/xml",
		"application/octet-stream", // Generic binary files
	],
} as const;

// HTML processing constants
export const HTML_PROCESSING = {
	WORDWRAP_LENGTH: 130,
	MAX_CONVERSION_SIZE: 900 * 1024, // 900KB limit for HTML to text conversion
} as const;

// Cache constants
export const CACHE = {
	DOMAINS_TTL: 3600, // 1 hour
} as const;

// API abuse protection. Thresholds are per minute.
// PER_IP is generous enough for the web client's 30s inbox polling.
export const RATE_LIMIT = {
	ENABLED: true,
	WINDOW_MS: 60_000,
	PER_IP: 180,
	PER_IP_WRITE: 30,
	PER_ADDRESS: 60,
} as const;

// Inbound email abuse protection
export const EMAIL_LIMITS = {
	MAX_RAW_SIZE: 25 * 1024 * 1024, // 25MB for the raw message
	MAX_PER_ADDRESS_PER_WINDOW: 30,
	WINDOW_SECONDS: 60,
} as const;
