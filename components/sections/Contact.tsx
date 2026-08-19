"use client";

import { useState } from "react";
import { owner } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

// Client island: enhances a real form with fetch. The visible mailto link is the
// JS-off fallback and always works. Resend wiring lives in app/api/contact/route.ts.
// Monochrome brutalist styling: hairline-underlined fields, no rounded cards.
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

  // Bottom-rule fields (fit the hairline system better than boxed inputs on pure
  // black). Rest = 2px line2 underline (visible affordance); focus = full-white
  // underline, clearly distinct from rest. Placeholder rides mut so it clears AA.
  const field =
    "mt-2 w-full border-0 border-b-2 border-line2 bg-transparent px-0 py-2.5 text-base text-fg placeholder:text-mut transition-colors duration-base focus:border-fg focus:outline-none focus:ring-0";
  const labelText = "font-mono text-2xs uppercase tracking-widest text-mut";

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(72px,11vw,180px)]"
    >
      <div data-reveal className="flex items-end gap-5 border-b border-line pb-8">
        <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none text-faint">
          05
        </span>
        <h2 className="pb-1 font-mono text-2xs uppercase tracking-[0.2em] text-fg">
          Contact
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 pt-12 md:grid-cols-2">
        <div>
          <p className="font-sans text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-tight">
            Hiring, or want to talk through a build?
          </p>
          <p className="mt-6 max-w-[42ch] text-mut">
            Fastest way to reach me is email. The form lands in the same inbox.
          </p>
          <a
            href={`mailto:${owner.email}`}
            data-cursor="hot"
            className="mt-8 inline-block border-b border-fg pb-1 font-mono text-sm text-fg"
          >
            {owner.email}
          </a>
        </div>

        <form onSubmit={onSubmit} className="space-y-7" noValidate>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <label className="block">
              <span className={labelText}>Name</span>
              <input
                name="name"
                required
                autoComplete="name"
                className={field}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className={labelText}>Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="block">
            <span className={labelText}>Subject</span>
            <input
              name="subject"
              required
              className={field}
              placeholder="What's this about?"
            />
          </label>
          <label className="block">
            <span className={labelText}>Message</span>
            <textarea
              name="message"
              required
              rows={4}
              className={`${field} resize-y`}
              placeholder="A few lines about what you need."
            />
          </label>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor="hot"
              className="bg-fg px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-bg transition-colors duration-base hover:bg-mut disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" ? (
              <span
                className="font-mono text-2xs uppercase tracking-widest text-fg"
                role="status"
              >
                Sent. I&apos;ll get back to you.
              </span>
            ) : null}
            {status === "error" ? (
              <span
                className="max-w-[28ch] font-mono text-2xs uppercase tracking-widest text-fg underline decoration-line2 underline-offset-4"
                role="alert"
              >
                {error} Email me directly instead.
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
