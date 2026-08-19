import Link from "next/link";
import { owner } from "@/lib/data";

// Server component. Plain anchors, works with JS disabled.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-[clamp(20px,5vw,72px)]">
      <div className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-extrabold uppercase tracking-tight text-fg">
            {owner.name}
          </p>
          <p className="mt-1.5 font-mono text-2xs uppercase tracking-widest text-mut">
            {owner.title} · {owner.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-2xs uppercase tracking-widest">
          <a
            href={`mailto:${owner.email}`}
            className="text-mut transition-colors duration-base hover:text-fg"
          >
            Email
          </a>
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-mut transition-colors duration-base hover:text-fg"
          >
            GitHub ↗
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-mut transition-colors duration-base hover:text-fg"
          >
            LinkedIn ↗
          </a>
          <a
            href={owner.resumeUrl}
            className="text-mut transition-colors duration-base hover:text-fg"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="pb-8">
        <p className="font-mono text-2xs uppercase tracking-widest text-mut">
          © {year} {owner.name}. Built with Next.js and Tailwind.{" "}
          <Link href="/#work" className="hover:text-mut">
            See the work
          </Link>
        </p>
      </div>
    </footer>
  );
}
