import Link from "next/link";
import { owner } from "@/lib/data";

// Server component. The H1 is the LCP element and paints immediately —
// no client boot animation gating real content.
export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pt-28">
      {owner.availableForWork ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-positive/30 bg-positive/10 px-3 py-1 text-2xs font-medium text-positive">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" />
          Available for work
        </span>
      ) : null}

      <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-text-primary lg:text-5xl">
        I build production software that ships and stays up.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-text-sub">{owner.pitch}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/#work"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-opacity duration-base hover:opacity-90"
        >
          View the work
        </Link>
        <a
          href={owner.resumeUrl}
          className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-text-primary transition-colors duration-base hover:border-accent-dim"
        >
          Download resume
        </a>
        <a
          href={owner.github}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-text-sub transition-colors duration-base hover:text-text-primary"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
