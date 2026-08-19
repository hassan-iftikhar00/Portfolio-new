"use client";

import { useState } from "react";
import { owner } from "@/lib/data";
import Image from "next/image";

const socialLinks = [
  {
    label: "GitHub",
    href: owner.github,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: owner.linkedin,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${owner.email}`,
    icon: (
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
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(owner.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }
  return (
    <footer className="relative border-t border-white/[0.06] bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/Copilot_20260310_201847.png"
                  alt="Hassan Iftikhar logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-text-primary text-sm">
                Hassan Iftikhar
              </span>
            </div>
            <p className="text-text-sub text-xs font-mono">
              Full Stack Developer · {owner.location}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              if (link.label === "Email") {
                return (
                  <button
                    key={link.label}
                    onClick={copyEmail}
                    aria-label={
                      emailCopied ? "Email copied!" : "Copy email address"
                    }
                    className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] text-text-sub hover:text-text-primary hover:border-accent-cyan/30 hover:bg-accent-cyan/5 transition-all duration-200"
                  >
                    {link.icon}
                    {emailCopied && (
                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">
                        ✓ Copied!
                      </span>
                    )}
                  </button>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] text-text-sub hover:text-text-primary hover:border-accent-cyan/30 hover:bg-accent-cyan/5 transition-all duration-200"
                >
                  {link.icon}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-text-sub text-xs font-mono text-center md:text-right">
            © {new Date().getFullYear()} Hassan Iftikhar
            <br />
            <span className="opacity-50">Built with Next.js & TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
