import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // ─── Option 1: Resend ────────────────────────────────────────────────────
    // Install: npm install resend
    // Uncomment and configure:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Portfolio Contact <noreply@yourdomain.com>",
    //   to: "hassaniftikhardev@gmail.com",
    //   subject: `[Portfolio] ${subject}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    // });

    // ─── Option 2: Nodemailer ────────────────────────────────────────────────
    // Replace with your SMTP config

    // ─── Placeholder (remove in production) ─────────────────────────────────
    console.log("Contact form submission:", { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
