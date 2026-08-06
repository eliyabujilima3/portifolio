import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { apiLimiter } from "./middleware/rateLimiter";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import contactRoutes from "./routes/contact.routes";
import adminRoutes from "./routes/admin.routes";

export function createApp() {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS — restrict to the configured frontend origin
  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true,
    })
  );

  app.use(express.json({ limit: "100kb" })); // body size cap mitigates payload-flood abuse
  app.use(cookieParser());
  app.use(apiLimiter);

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.use("/api/contact", contactRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
