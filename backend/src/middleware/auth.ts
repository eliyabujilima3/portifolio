import { Request, Response, NextFunction } from "express";
import { verifyAdminToken } from "../utils/jwt";

export interface AuthedRequest extends Request {
  admin?: { id: number; email: string };
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header." });
  }

  const token = header.slice("Bearer ".length);
  try {
    const payload = verifyAdminToken(token);
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
