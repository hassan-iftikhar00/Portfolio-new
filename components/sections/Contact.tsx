"use client";

import { useState } from "react";
import { owner } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

// Client island: enhances a real form with fetch. The visible mailto link is the
// JS-off fallback and always works. Resend wiring lives in app/api/contact/route.ts.
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
              Contact
            </h2>
            <p className="mt-3 text-2xl font-semibold text-text-primary">
              Hiring, or want to talk through a build?
            </p>
            <p className="mt-4 text-sm text-text-sub">
              Fastest way to reach me is email. The form below lands in the same
              inbox.
            </p>
            <a
              href={`mailto:${owner.email}`}
              className="mt-6 inline-block font-mono text-sm text-accent underline-offset-4 hover:underline"
            >
              {owner.email}
            </a>
          </div>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs text-text-faint">Name</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-faint"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs text-text-faint">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-faint"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs text-text-faint">Subject</span>
              <input
                name="subject"
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-faint"
                placeholder="What's this about?"
              />
            </label>
            <label className="block">
              <span className="text-xs text-text-faint">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1.5 w-full resize-y rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-faint"
                placeholder="A few lines about what you need."
              />
            </label>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-opacity duration-base hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "sent" ? (
                <span className="text-sm text-positive" role="status">
                  Sent. I&apos;ll get back to you.
                </span>
              ) : null}
              {status === "error" ? (
                <span className="text-sm text-danger" role="alert">
                  {error} Email me directly instead.
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
