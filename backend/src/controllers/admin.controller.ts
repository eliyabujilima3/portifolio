import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { adminLoginSchema, markReadSchema } from "../utils/validators";
import { signAdminToken } from "../utils/jwt";
import { AuthedRequest } from "../middleware/auth";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = adminLoginSchema.parse(req.body);

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ error: "Invalid email or password." });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid email or password." });

    const token = signAdminToken({ sub: admin.id, email: admin.email });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

export async function listMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const search = (req.query.search as string) || "";
    const page = Math.max(parseInt((req.query.page as string) || "1", 10), 1);
    const pageSize = 20;

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { subject: { contains: search } },
            { message: { contains: search } },
          ],
        }
      : {};

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    res.json({ messages, total });
  } catch (err) {
    next(err);
  }
}

export async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [total, unread, today] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfDay } } }),
    ]);

    res.json({ total, unread, read: total - unread, today });
  } catch (err) {
    next(err);
  }
}

export async function updateMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const { read } = markReadSchema.parse(req.body);

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function removeMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

function toCsvValue(value: string) {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function exportCsv(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

    const header = ["id", "name", "email", "phone", "subject", "message", "read", "created_at"];
    const rows = messages.map((m) =>
      [
        m.id.toString(),
        m.name,
        m.email,
        m.phone || "",
        m.subject,
        m.message.replace(/\r?\n/g, " "),
        m.read ? "yes" : "no",
        m.createdAt.toISOString(),
      ]
        .map(toCsvValue)
        .join(",")
    );

    const csv = [header.map(toCsvValue).join(","), ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="contact_messages.csv"');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}
