import nodemailer from "nodemailer";

const requiredFields = ["fullName", "email", "phone", "eventType"];

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

export async function POST(request) {
  try {
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

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      return Response.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form enquiry: ${eventType}`,
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
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event type:</strong> ${eventType}</p>
        <p><strong>Event date:</strong> ${eventDate || "Not provided"}</p>
        <p><strong>Guests:</strong> ${guests || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "No message provided.").replace(/\n/g, "<br />")}</p>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
