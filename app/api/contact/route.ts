import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { owner } from "@/lib/data";

// Basic email shape check. Not a validator, just a sanity gate.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    // FROM must be a domain verified in Resend. Falls back to Resend's shared
    // onboarding sender until a custom domain is verified.
    const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

    if (!apiKey) {
      // No key yet: log instead of dropping. The visible mailto link is the
      // user-facing fallback, so nothing is lost during setup.
      console.log("[contact] no RESEND_API_KEY, submission logged:", {
        name,
        email,
        subject,
      });
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: owner.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] route error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
