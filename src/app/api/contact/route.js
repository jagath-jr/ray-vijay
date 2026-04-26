import nodemailer from "nodemailer";

const requiredFields = ["fullName", "email", "phone", "eventType"];

// Simple in-memory rate limiter (per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// Reusable transporter (lazy init)
let transporter;

// ----------- HELPERS -----------

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request payload.";
  }

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim().length === 0) {
      return `Missing required field: ${field}`;
    }
  }

  return null;
}

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function escapeHTML(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_LIMIT_WINDOW) {
    // reset window
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count += 1;
  }

  rateLimitMap.set(ip, entry);

  if (entry.count > MAX_REQUESTS) {
    return false;
  }

  return true;
}

function getTransporter(env) {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: Number(env.SMTP_PORT) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  return transporter;
}

// ----------- API HANDLER -----------

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting
    if (!rateLimit(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const payload = await request.json();
    const validationError = validatePayload(payload);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const {
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      guests,
      message,
    } = payload;

    // Email format validation
    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !CONTACT_TO_EMAIL
    ) {
      return Response.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const mailer = getTransporter(process.env);

    const safeMessage = escapeHTML(message || "No message provided.");

    await mailer.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `🎉 New enquiry from ${fullName}: ${eventType}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Event type: ${eventType}`,
        `Event date: ${eventDate || "Not provided"}`,
        `Guests: ${guests || "Not provided"}`,
        "",
        "Message:",
        message || "No message provided.",
      ].join("\n"),
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f5; padding: 20px; border-radius: 12px;">
          
          <div style="background-color: #6A2834; padding: 25px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">New Event Enquiry</h2>
            <p style="color: #e0a9b5; margin: 8px 0 0 0; font-size: 14px;">You have a new message from your website</p>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px; width: 120px;"><strong>Name</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #333333; font-size: 15px; font-weight: 500;">${escapeHTML(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px;"><strong>Email</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #333333; font-size: 15px;">
                  <a href="mailto:${escapeHTML(email)}" style="color: #6A2834; text-decoration: none;">${escapeHTML(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px;"><strong>Phone</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #333333; font-size: 15px;">${escapeHTML(phone)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px;"><strong>Event Type</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #333333; font-size: 15px;">
                  <span style="background-color: #fdf5e6; color: #c99f36; padding: 4px 10px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid #f5e4c3;">
                    ${escapeHTML(eventType)}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px;"><strong>Event Date</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #333333; font-size: 15px;">${escapeHTML(eventDate || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888888; font-size: 14px;"><strong>Guests</strong></td>
                <td style="padding: 12px 0; color: #333333; font-size: 15px;">${escapeHTML(guests || "Not provided")}</td>
              </tr>
            </table>

            <div style="margin-top: 10px;">
              <h3 style="color: #6A2834; font-size: 16px; margin-bottom: 12px; font-weight: 600;">Message / Details:</h3>
              <div style="background-color: #fafafa; border-left: 4px solid #c99f36; padding: 18px; border-radius: 0 6px 6px 0; color: #555555; font-size: 15px; line-height: 1.6; font-style: italic;">
                ${safeMessage.replace(/\n/g, "<br />")}
              </div>
            </div>

          </div>

          <div style="text-align: center; margin-top: 25px;">
            <p style="color: #a0a0a0; font-size: 12px; margin: 0;">This email was automatically generated from the Ray Vijay contact form.</p>
          </div>

        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);

    return Response.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}