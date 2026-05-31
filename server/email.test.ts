import { describe, it, expect } from "vitest";
import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

describe("Gmail SMTP email configuration", () => {
  it("GMAIL_APP_PASSWORD is set in environment", () => {
    expect(ENV.gmailAppPassword).toBeTruthy();
    expect(ENV.gmailAppPassword.length).toBeGreaterThan(0);
  });

  it("Gmail SMTP transporter can be created and verified", async () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jonathansmart4@gmail.com",
        pass: ENV.gmailAppPassword,
      },
    });
    // verify() checks SMTP connection and authentication
    await expect(transporter.verify()).resolves.toBe(true);
  }, 15000);
});
