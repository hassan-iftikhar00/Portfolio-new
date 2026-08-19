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
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="flex h-16 items-center justify-between px-[clamp(20px,5vw,72px)]"
      >
        <Link
          href="/"
          className="font-display text-sm font-extrabold uppercase tracking-tight text-fg"
        >
          Hassan Iftikhar
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-2xs uppercase tracking-widest text-mut transition-colors duration-base hover:text-fg"
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
            className="font-mono text-2xs uppercase tracking-widest text-mut transition-colors duration-base hover:text-fg"
          >
            GitHub ↗
          </a>
          <a
            href={owner.resumeUrl}
            className="bg-fg px-4 py-2 font-mono text-2xs font-semibold uppercase tracking-widest text-bg transition-colors duration-base hover:bg-mut"
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
          className="inline-flex h-9 w-9 items-center justify-center border border-line text-fg md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet */}
      {open ? (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="flex flex-col gap-1 px-[clamp(20px,5vw,72px)] py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-1 py-2.5 font-mono text-xs uppercase tracking-widest text-mut hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3">
              <a
                href={owner.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 border border-line px-3 py-2.5 text-center font-mono text-2xs uppercase tracking-widest text-fg"
              >
                GitHub ↗
              </a>
              <a
                href={owner.resumeUrl}
                className="flex-1 bg-fg px-3 py-2.5 text-center font-mono text-2xs font-semibold uppercase tracking-widest text-bg"
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
