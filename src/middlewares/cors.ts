import { cors } from "hono/cors";

// Browser clients we know about. Server-side clients (curl, the Rust/Go/Python
// libraries, CLI tools) send no Origin header and are never affected by CORS.
const DEFAULT_ALLOWED_ORIGINS = [
	"https://driftz.net",
	"https://api.driftz.net",
	"https://web.barid.site",
	"https://api.barid.site",
];

const corsMiddleware = cors({
	origin: (origin, c) => {
		if (!origin) return undefined;
		const env = c.env as CloudflareBindings & { ALLOWED_ORIGINS?: string };
		const extra = (env.ALLOWED_ORIGINS || "")
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);
		const allowed = new Set([...DEFAULT_ALLOWED_ORIGINS, ...extra]);
		return allowed.has(origin) ? origin : undefined;
	},
	allowMethods: ["GET", "HEAD", "DELETE", "OPTIONS"],
	allowHeaders: ["Content-Type"],
	maxAge: 86400,
});

export default corsMiddleware;
