"use client";

import { useState } from "react";
import Link from "next/link";
import { owner } from "@/lib/data";

// Small client island: only the mobile menu toggle needs JS.
// All links are real anchors, so navigation works with JS disabled.

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-text-primary"
        >
          hassan<span className="text-accent">.dev</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-text-sub transition-colors duration-base hover:text-text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Recruiter fast-paths: resume + GitHub always one click from the header */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-text-sub transition-colors duration-base hover:text-text-primary"
          >
            GitHub
          </a>
          <a
            href={owner.resumeUrl}
            className="rounded-lg bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-ink transition-opacity duration-base hover:opacity-90"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-primary md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet */}
      {open ? (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-text-sub hover:bg-card hover:text-text-primary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3">
              <a
                href={owner.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm text-text-primary"
              >
                GitHub
              </a>
              <a
                href={owner.resumeUrl}
                className="flex-1 rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-ink"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
