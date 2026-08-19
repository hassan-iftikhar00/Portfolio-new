import { testimonials } from "@/lib/data";

// Server component, zero JS. Hairline-ruled ledger rows (not cards — cards were
// the pattern removed from Work). Quote in the display face well above body size
// (this is a display moment); attribution in mono, small and muted but ≥4.5:1.
// No carousel/slider/autoplay. Prices and durations are deliberately never
// shown — on a portfolio those read as a rate card.
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(72px,11vw,180px)]"
    >
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div className="flex items-end gap-5">
          <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none text-faint">
            04
          </span>
          <h2 className="pb-1 font-mono text-2xs uppercase tracking-[0.2em] text-fg">
            Client words
          </h2>
        </div>
        <p className="max-w-[34ch] pb-1 text-sm text-mut">
          Selected from eight completed Fiverr engagements across six countries.
          Verbatim, unedited.
        </p>
      </div>

      <ol>
        {testimonials.map((t, i) => (
          <li
            key={t.username}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            className="grid grid-cols-1 items-start gap-x-8 gap-y-5 border-b border-line py-[clamp(36px,5vw,72px)] md:grid-cols-[auto_1fr]"
          >
            {/* Row numeral — large decorative, faint (clears the 3:1 large-text
                floor), the same index vocabulary as Work. */}
            <span
              aria-hidden="true"
              className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-extrabold leading-none text-faint md:pt-2"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <blockquote className="font-sans font-medium tracking-tight text-fg text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.12] text-balance">
                {t.quote}
              </blockquote>
              <p className="mt-6 font-mono text-2xs uppercase tracking-widest text-mut">
                {t.username}
                <span aria-hidden="true" className="px-2 text-line2">
                  ·
                </span>
                {t.country}
                <span aria-hidden="true" className="px-2 text-line2">
                  ·
                </span>
                {t.source}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
