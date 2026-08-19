import Link from "next/link";
import { owner } from "@/lib/data";

// Server component. Plain anchors, works with JS disabled.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-text-primary">
            {owner.name}
          </p>
          <p className="mt-1 text-sm text-text-sub">
            {owner.title} · {owner.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={`mailto:${owner.email}`}
            className="text-text-sub transition-colors duration-base hover:text-text-primary"
          >
            {owner.email}
          </a>
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-text-sub transition-colors duration-base hover:text-text-primary"
          >
            GitHub
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-text-sub transition-colors duration-base hover:text-text-primary"
          >
            LinkedIn
          </a>
          <a
            href={owner.resumeUrl}
            className="text-text-sub transition-colors duration-base hover:text-text-primary"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 lg:px-8">
        <p className="text-xs text-text-faint">
          © {year} {owner.name}. Built with Next.js and Tailwind.{" "}
          <Link href="/#work" className="hover:text-text-sub">
            See the work
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
