import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { contactSchema } from "../utils/validators";
import { sendContactNotification } from "../utils/mailer";

export async function submitContact(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSchema.parse(req.body);

    const saved = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });

    // Don't let a slow/misconfigured SMTP server fail the request —
    // the message is already safely stored in the database.
    sendContactNotification(data).catch((err) =>
      console.error("[mailer] Failed to send contact notification email:", err.message)
    );

    res.status(201).json({
      message: "Message received — thank you for reaching out.",
      id: saved.id,
    });
  } catch (err) {
    next(err);
  }
}
