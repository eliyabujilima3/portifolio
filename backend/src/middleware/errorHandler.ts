import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed.",
      details: err.errors.map((e) => ({ path: e.path.join("."), message: e.message })),
    });
  }

  console.error(err);
  const message =
    err instanceof Error && process.env.NODE_ENV !== "production"
      ? err.message
      : "Internal server error.";
  res.status(500).json({ error: message });
}
