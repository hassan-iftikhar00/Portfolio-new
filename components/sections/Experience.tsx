import Image from "next/image";
import { experiences } from "@/lib/data";

// Server component. Big ledger rows, hairline-separated — deliberately a
// different structure from Work's spotlight rows so three sections do not read
// as the same template. Date / role+summary / stack across the row.
export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(72px,11vw,180px)]"
    >
      <div data-reveal className="flex items-end gap-5 border-b border-line pb-8">
        <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none text-faint">
          02
        </span>
        <h2 className="pb-1 font-mono text-2xs uppercase tracking-[0.2em] text-fg">
          Experience
        </h2>
      </div>

      <ol>
        {experiences.map((e) => (
          <li
            key={e.company}
            data-reveal
            className="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-line py-[clamp(28px,4vw,52px)] md:grid-cols-[210px_1fr_auto]"
          >
            <div>
              {e.logo ? (
                // White chip so both a transparent PNG and a white-background JPEG
                // read uniformly on the black ground; grayscale folds brand colour
                // into the mono system while the mark stays legible.
                <span className="mb-4 inline-flex bg-white px-3 py-2">
                  <span className="relative block h-7 w-24">
                    <Image
                      src={e.logo}
                      alt={`${e.company} logo`}
                      fill
                      sizes="96px"
                      className="object-contain object-center grayscale contrast-125"
                    />
                  </span>
                </span>
              ) : null}
              <span className="block font-mono text-xs uppercase tracking-widest text-mut">
                {e.period}
              </span>
            </div>

            <div>
              <h3 className="font-sans text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight">
                {e.role}
              </h3>
              <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-mut">
                {e.company}
              </p>
              <p className="mt-4 max-w-[62ch] text-sm text-mut">{e.summary}</p>
              <ul className="mt-4 space-y-2">
                {e.achievements.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm text-mut">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 shrink-0 bg-line2"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-2xs text-mut md:max-w-[160px] md:justify-end md:text-right">
              {e.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
