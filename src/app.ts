import { OpenAPIHono } from "@hono/zod-openapi";
import attachmentRoutes from "@/routes/attachmentRoutes";
import emailRoutes from "@/routes/emailRoutes";
import staticRoutes from "@/routes/staticRoutes";
import { setupDocumentation } from "@/utils/docs";
import { logError } from "@/utils/logger";
import corsMiddleware from "./middlewares/cors";
import healthRoutes from "./routes/healthRoutes";
import { ERR } from "./utils/http";

const app = new OpenAPIHono<{ Bindings: CloudflareBindings }>();

// --- Middlewares ---
app.use(corsMiddleware);

// --- Error handling ---
app.onError((err, c) => {
	logError(`Unhandled error: ${err.message}`, err);
	return c.json(ERR(err.name, err.message), 500);
});

// --- Routes ---
// API Routes (must be first to avoid conflicts with static routes)
app.route("/", emailRoutes);
app.route("/", attachmentRoutes);
app.route("/", healthRoutes);
// Static Routes (must be last to handle root path and catch-all)
app.route("/", staticRoutes);

// --- OpenAPI Documentation ---
setupDocumentation(app);

export default app;
