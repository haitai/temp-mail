/**
 * Logger with debug mode support
 */

type LogLevel = "error" | "info" | "debug";

// Global debug mode state (can be set via environment)
let debugMode = false;
let logLevel: LogLevel = "info";

/**
 * Initialize logger with environment configuration
 */
export function initLogger(env?: { DEBUG_MODE?: boolean; LOG_LEVEL?: string }) {
	if (env?.DEBUG_MODE !== undefined) {
		debugMode = env.DEBUG_MODE;
	}
	if (env?.LOG_LEVEL) {
		const level = env.LOG_LEVEL.toLowerCase();
		if (level === "error" || level === "info" || level === "debug") {
			logLevel = level;
		}
	}
}

/**
 * Check if a log level should be output based on current configuration
 */
function shouldLog(level: LogLevel): boolean {
	const levels: Record<LogLevel, number> = {
		error: 0,
		info: 1,
		debug: 2,
	};
	return levels[level] <= levels[logLevel];
}

/**
 * Core logging function
 */
export function log(level: LogLevel, message: string, context?: Record<string, unknown>) {
	if (!shouldLog(level)) {
		return;
	}

	const logEntry = {
		timestamp: new Date().toISOString(),
		level: level.toUpperCase(),
		message,
		...context,
	};

	console.log(JSON.stringify(logEntry));
}

/**
 * Log info level messages
 */
export function logInfo(message: string, context?: Record<string, unknown>) {
	log("info", message, context);
}

/**
 * Log error level messages
 */
export function logError(message: string, error?: Error, context?: Record<string, unknown>) {
	log("error", message, {
		errorName: error?.name,
		errorMessage: error?.message,
		errorStack: error?.stack,
		...context,
	});
}

/**
 * Log debug level messages (only when debug mode is enabled)
 */
export function logDebug(message: string, context?: Record<string, unknown>) {
	if (debugMode || logLevel === "debug") {
		log("debug", message, context);
	}
}

/**
 * Check if debug mode is currently enabled
 */
export function isDebugMode(): boolean {
	return debugMode;
}
