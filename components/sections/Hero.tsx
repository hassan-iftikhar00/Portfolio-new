import Link from "next/link";
import { owner } from "@/lib/data";
import HeroTilt from "@/components/motion/HeroTilt";

// Server component. The H1 is the LCP element and paints immediately.
// Two display registers on purpose: Unbounded caps for the shout, General Sans
// mixed-case for the lead-in and tail, so the page is not one note held flat.
// The mask reveal is pure CSS (rmask), staggered via inline delay, and static
// under reduced-motion — no JS gates the LCP text.
export default function Hero() {
  return (
    <section className="px-[clamp(20px,5vw,72px)] pb-[clamp(48px,7vw,110px)] pt-[clamp(40px,6vw,84px)]">
      {owner.availableForWork ? (
        <span className="inline-flex items-center gap-2 bg-fg px-3 py-1.5 font-mono text-2xs uppercase tracking-widest text-bg">
          <span className="h-1.5 w-1.5 rounded-full bg-bg motion-safe:animate-pulse" />
          Available for work
        </span>
      ) : null}

      <h1 className="mt-8 font-display font-extrabold uppercase leading-[0.86] tracking-tightest">
        {/* Lead-in is small (never the LCP element), so it keeps the mask reveal
            for entrance motion without gating the largest paint. */}
        <span className="block font-sans text-[clamp(1.1rem,2.4vw,1.9rem)] font-medium normal-case tracking-normal text-mut">
          <span className="rmask">
            <span style={{ animationDelay: "20ms" }}>I build</span>
          </span>
        </span>
        {/* PRODUCTION is the LCP element: paints immediately at final position
            (no reveal gate, no hidden initial state) so LCP is bound only by
            first paint, not an animation. */}
        <span className="-ml-[0.03em] block text-[clamp(2.5rem,10.6vw,9rem)]">
          Production
        </span>
        {/* SOFTWARE is the scoped 3D moment: a CSS-extruded word (grey depth
            layers on the black ground) that tilts with scroll via HeroTilt.
            Paints immediately (no reveal gate) so it does not delay the LCP. */}
        <span className="-ml-[0.03em] block text-[clamp(2.5rem,10.6vw,9rem)]">
          <span className="hero-extrude" data-hero-extrude>
            Software
          </span>
        </span>
        {/* Tail is a smaller register (not the LCP element): mask reveal kept. */}
        <span className="mt-2 block font-sans text-[clamp(1.3rem,3.4vw,2.6rem)] font-medium normal-case tracking-tight text-fg">
          <span className="rmask">
            <span style={{ animationDelay: "160ms" }}>
              that ships and stays up.
            </span>
          </span>
        </span>
      </h1>
      <HeroTilt />

      <div className="mt-12 grid gap-8 border-t-2 border-fg pt-8 md:grid-cols-[1.4fr_0.9fr] md:items-start">
        <p className="max-w-[46ch] text-lg text-fg">{owner.pitch}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#work"
            className="bg-fg px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-bg transition-colors duration-base hover:bg-mut"
          >
            View the work
          </Link>
          <a
            href={owner.resumeUrl}
            className="border border-fg px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition-colors duration-base hover:bg-card"
          >
            Resume ↗
          </a>
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-fg px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition-colors duration-base hover:bg-card"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
