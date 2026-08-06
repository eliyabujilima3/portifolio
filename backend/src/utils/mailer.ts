import nodemailer from "nodemailer";
import { env, isEmailConfigured } from "../config/env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!isEmailConfigured()) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.port === 465,
      auth: { user: env.email.user, pass: env.email.password },
    });
  }
  return transporter;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  const t = getTransporter();
  if (!t) {
    console.warn(
      "[mailer] EMAIL_* environment variables not fully configured — skipping email notification. " +
        "The message was still saved to the database."
    );
    return;
  }

  await t.sendMail({
    from: env.email.from,
    to: env.email.to,
    replyTo: data.email,
    subject: `New portfolio contact: ${data.subject}`,
    text:
      `New message from your portfolio contact form\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || "—"}\n` +
      `Subject: ${data.subject}\n\n` +
      `${data.message}`,
    html: `
      <h2>New portfolio contact message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "—"}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
