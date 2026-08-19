import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/data";
import Flag from "@/components/graphics/Flag";

// Server component, the core of the site. Not a card grid: full-bleed editorial
// rows separated by hairlines. Heights vary (the first row is the spotlight),
// the title side alternates left/right down the list, and each row inverts
// black<->white on hover (pure CSS) — the strongest move in a monochrome system.
// Titles are General Sans mixed-case (the second register) against the Unbounded
// caps of the section numeral, so the type is not one note.
export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(72px,11vw,180px)]"
    >
      {/* Header band — numeral left, meta hard-right so there is no dead region. */}
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div className="flex items-end gap-5">
          <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none text-faint">
            01
          </span>
          <h2 className="pb-1 font-mono text-2xs uppercase tracking-[0.2em] text-fg">
            Selected work
          </h2>
        </div>
        <p className="max-w-[34ch] pb-1 text-sm text-mut">
          Five builds, each with the problem, the architecture, and the
          tradeoffs laid out.
        </p>
      </div>

      <ul>
        {caseStudies.map((cs, i) => {
          const featured = i === 0;
          return (
            <li
              key={cs.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            >
              <Link
                href={`/projects/${cs.slug}`}
                data-cursor="hot"
                className={`group relative isolate grid grid-cols-1 items-center gap-6 overflow-hidden border-b border-line pr-1 transition-colors duration-base hover:text-bg md:grid-cols-12 md:gap-8 md:pr-[clamp(12px,2vw,28px)] ${
                  // Animated hover fill: a full-size white overlay whose clip-path
                  // circle grows from the row centre out to the corners, instead of
                  // a flat colour swap. inset-0 means it always covers the whole row
                  // (no width/aspect guessing inside the grid — the earlier scale
                  // disc mis-sized against a grid track). ease-out-expo is
                  // front-loaded so the disc reaches the corners well before the
                  // 200ms text flip, so text never lands dark-on-black. z-0 sits it
                  // above the row ground, below the z-10 content. Reduced-motion
                  // collapses the transition so it snaps straight to full white.
                  // NOTE: hover:before: (same-element `.a:hover::before`), NOT
                  // group-hover:before: — group-hover emits a *descendant*
                  // selector (`.group:hover .x::before`), but .group and this
                  // ::before live on the SAME <a>, so that rule never matches and
                  // the disc stayed at 0. The text children still use group-hover
                  // (they ARE descendants of the group), which is correct.
                  "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-fg before:[clip-path:circle(0px_at_50%_50%)] before:transition-[clip-path] before:duration-[650ms] before:ease-out-expo before:content-[''] hover:before:[clip-path:circle(150%_at_50%_50%)]"
                } ${
                  featured
                    ? "py-[clamp(36px,5vw,72px)]"
                    : "py-[clamp(28px,4vw,52px)]"
                }`}
              >
                {/* Title block — always the left column, every row (consistent
                    sequence; no alternation, so posters never drift or collide). */}
                <div className="relative z-10 md:col-span-5">
                  <div className="flex items-center gap-4 font-mono text-2xs uppercase tracking-widest">
                    <span className="text-mut transition-colors group-hover:text-bg/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-mut transition-colors group-hover:text-bg/70">
                      {cs.category}
                    </span>
                    {cs.status === "live" ? (
                      <span className="inline-flex items-center gap-1.5 text-fg transition-colors group-hover:text-bg">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-fg transition-colors motion-safe:animate-pulse group-hover:bg-bg"
                        />
                        Live
                      </span>
                    ) : (
                      <span className="border border-line2 px-1.5 py-0.5 text-mut transition-colors group-hover:border-bg/40 group-hover:text-bg/70">
                        {cs.status === "demo" ? "Demo build" : "Archived"}
                      </span>
                    )}
                    {cs.country ? (
                      <span className="inline-flex items-center gap-1.5 text-mut transition-colors group-hover:text-bg/70">
                        <Flag
                          code={cs.country.code}
                          name={cs.country.name}
                          className="h-3 w-[18px] shrink-0 border border-line transition-colors group-hover:border-bg/20"
                        />
                        {cs.country.name}
                      </span>
                    ) : null}
                  </div>
                  <h3
                    className={`mt-4 font-sans font-semibold tracking-tight ${
                      featured
                        ? "text-[clamp(2.4rem,5.6vw,5rem)]"
                        : "text-[clamp(2rem,4.2vw,3.6rem)]"
                    } leading-[0.98]`}
                  >
                    {cs.title}
                  </h3>
                </div>

                {/* Meta block — always the middle column. */}
                <div className="relative z-10 md:col-span-4">
                  <p className="max-w-[46ch] text-sm text-mut transition-colors group-hover:text-bg/80">
                    {cs.problem}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs text-mut transition-colors group-hover:text-bg/70">
                    {cs.stack.slice(0, 5).map((t, j) => (
                      <span key={t} className="flex items-center gap-3">
                        {j > 0 ? <span aria-hidden="true">·</span> : null}
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-fg transition-colors group-hover:text-bg">
                    Read case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-base group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                {/* Poster — always the far-right column, same position on every
                    row, so all four align. Real product screenshot, next/image
                    (lazy, dimensions reserved via aspect-ratio → no layout shift).
                    Grayscale at rest, colour + slight zoom on hover. */}
                <div className="relative z-10 md:col-span-3">
                  <div className="relative aspect-[16/10] overflow-hidden border border-line transition-colors duration-base group-hover:border-bg/25">
                    {cs.artifact.poster ? (
                      <Image
                        src={cs.artifact.poster}
                        alt={`${cs.title} interface preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-top grayscale contrast-110 transition-all duration-base group-hover:scale-[1.03] group-hover:grayscale-0"
                      />
                    ) : (
                      // No screenshot (diagram-only study): a monochrome node motif
                      // stands in, so the row keeps the same shape as its siblings.
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex flex-col justify-between bg-card p-3 transition-colors group-hover:bg-bg/5"
                      >
                        <div className="flex gap-1.5">
                          <span className="h-4 w-8 border border-line2" />
                          <span className="h-4 w-8 border border-line2" />
                          <span className="h-4 flex-1 border border-dashed border-line2" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-px flex-1 bg-line2" />
                          <span className="h-2 w-2 rounded-full bg-fg" />
                          <span className="h-px flex-1 bg-line2" />
                        </div>
                        <span className="font-mono text-2xs uppercase tracking-widest text-mut transition-colors group-hover:text-bg/70">
                          System diagram
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
