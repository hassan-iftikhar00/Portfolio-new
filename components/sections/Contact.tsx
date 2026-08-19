"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { owner } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const socialLinks = [
  {
    label: "GitHub",
    href: owner.github,
    description: "Source code",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "#E5E7EB",
  },
  {
    label: "LinkedIn",
    href: owner.linkedin,
    description: "Profile",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0A66C2",
  },
  {
    label: "Email",
    href: `mailto:${owner.email}`,
    description: owner.email,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
    color: "#C8CDD6",
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [emailCopied, setEmailCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(owner.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm placeholder:text-text-sub/50 focus:outline-none focus:border-accent-cyan/40 focus:bg-accent-cyan/[0.03] transition-all duration-200 font-mono";

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-accent-cyan/[0.04] blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="mb-16 text-center">
          <SectionHeading
            eyebrow="Contact"
            title="Get in"
            titleHighlight="Touch"
            subtitle="Available for full-time roles, contract work, and technical projects."
            align="center"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Status */}
            <div className="rounded-2xl bg-surface/60 border border-white/[0.06] p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold text-sm">
                  Available for Work
                </span>
              </div>
              <p className="text-text-sub text-sm leading-relaxed">
                Open to full-time roles, contract engagements, and technical
                collaboration.
              </p>
              <div className="pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-text-sub text-xs font-mono">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  {owner.location} · Remote-friendly
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, i) => {
                const isEmail = link.label === "Email";
                if (isEmail) {
                  return (
                    <motion.button
                      key={link.label}
                      onClick={copyEmail}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface/40 border border-white/[0.06] hover:border-white/[0.12] hover:bg-surface/80 transition-all duration-200 group text-left w-full"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${link.color}12`, color: link.color }}
                      >
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-text-primary font-semibold text-sm">
                          {link.label}
                        </div>
                        <div className="text-text-sub text-xs font-mono truncate max-w-[180px]">
                          {emailCopied ? "✓ Copied to clipboard!" : link.description}
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-text-sub ml-auto group-hover:text-text-primary transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                      </svg>
                    </motion.button>
                  );
                }
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface/40 border border-white/[0.06] hover:border-white/[0.12] hover:bg-surface/80 transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${link.color}12`, color: link.color }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <div className="text-text-primary font-semibold text-sm">
                        {link.label}
                      </div>
                      <div className="text-text-sub text-xs font-mono truncate max-w-[180px]">
                        {link.description}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-text-sub ml-auto group-hover:text-text-primary transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m13.5 4.5 6 6m0 0-6 6m6-6H3"
                      />
                    </svg>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] p-8 relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

              <h3 className="text-text-primary font-bold text-lg mb-6">
                Send a Message
              </h3>

              {status === "error" ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-red-400 font-semibold text-sm">
                    Something went wrong. Please try again or email directly.
                  </p>
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-primary font-semibold">
                      Message sent!
                    </p>
                    <p className="text-text-sub text-sm mt-1">
                      I'll get back to you as soon as possible.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-text-sub text-xs font-mono font-medium uppercase tracking-wide">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className={inputBase}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-text-sub text-xs font-mono font-medium uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-text-sub text-xs font-mono font-medium uppercase tracking-wide">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project inquiry / Job opportunity / Other"
                      className={inputBase}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-text-sub text-xs font-mono font-medium uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about the project, role, or what you'd like to discuss..."
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent-cyan text-background font-semibold text-sm hover:bg-accent-cyan/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-glow-cyan hover:shadow-glow-cyan mt-1"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m13.5 4.5 6 6m0 0-6 6m6-6H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
