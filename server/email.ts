import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

const GMAIL_USER = "jonathansmart4@gmail.com";
const RECIPIENT = "jonathansmart4@gmail.com";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: ENV.gmailAppPassword,
    },
  });
}

export async function sendBookingNotification(inquiry: {
  name: string;
  email: string;
  phone: string;
  preferredDate: string | null;
  groupSize: number;
  charterType: string | null;
  message: string | null;
}) {
  if (!ENV.gmailAppPassword) {
    console.warn("[Email] GMAIL_APP_PASSWORD not set — skipping email notification");
    return false;
  }

  const dateStr = inquiry.preferredDate
    ? new Date(inquiry.preferredDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #0A1628; color: #C9A84C; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p { margin: 4px 0 0; color: #ffffff99; font-size: 14px; }
    .body { padding: 32px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 4px; }
    .value { font-size: 16px; color: #0A1628; font-weight: 600; }
    .message-box { background: #f9f9f9; border-left: 4px solid #C9A84C; padding: 12px 16px; border-radius: 4px; color: #333; font-size: 15px; line-height: 1.6; }
    .footer { background: #f4f4f4; padding: 16px 32px; font-size: 12px; color: #999; text-align: center; }
    .reply-btn { display: inline-block; margin-top: 24px; background: #C9A84C; color: #0A1628; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>&#x1F3A3; New Booking Inquiry</h1>
      <p>Reel Smart Charters &mdash; reelsmartcharters.com</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(inquiry.name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(inquiry.email)}" style="color:#C9A84C;">${escapeHtml(inquiry.email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone</div>
        <div class="value"><a href="tel:${escapeHtml(inquiry.phone)}" style="color:#C9A84C;">${escapeHtml(inquiry.phone) || "Not provided"}</a></div>
      </div>
      <div class="field">
        <div class="label">Preferred Date</div>
        <div class="value">${escapeHtml(dateStr)}</div>
      </div>
      <div class="field">
        <div class="label">Group Size</div>
        <div class="value">${inquiry.groupSize} ${inquiry.groupSize === 1 ? "person" : "people"}</div>
      </div>
      ${
        inquiry.charterType
          ? `<div class="field">
        <div class="label">Charter Type</div>
        <div class="value">${escapeHtml(inquiry.charterType)}</div>
      </div>`
          : ""
      }
      ${
        inquiry.message
          ? `<div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(inquiry.message)}</div>
      </div>`
          : ""
      }
      <a href="mailto:${escapeHtml(inquiry.email)}?subject=Re: Your Reel Smart Charters Booking Inquiry" class="reply-btn">
        Reply to ${escapeHtml(inquiry.name.split(" ")[0])}
      </a>
    </div>
    <div class="footer">
      This inquiry was submitted via reelsmartcharters.com
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Reel Smart Charters" <${GMAIL_USER}>`,
      to: RECIPIENT,
      replyTo: inquiry.email,
      subject: `New Charter Inquiry from ${inquiry.name} — ${dateStr}`,
      html,
    });
    console.log(`[Email] Booking notification sent to ${RECIPIENT}`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send booking notification:", err);
    return false;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
