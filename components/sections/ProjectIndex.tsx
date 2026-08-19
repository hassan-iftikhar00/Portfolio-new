import { projectIndex } from "@/lib/data";
import Flag from "@/components/graphics/Flag";

// Server component. The ledger below the featured five: everything that doesn't
// warrant a full case study (joined an existing product, or a smaller scoped
// engagement). One line each — name, one sentence, stack, year, role, status,
// and a link where one exists. No thumbnails, diagrams, or decision blocks, so
// it reads as an addendum to Selected work, not a second gallery.
export default function ProjectIndex() {
  return (
    <section
      id="more"
      aria-label="Project index"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,120px)]"
    >
      <div
        data-reveal
        className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6"
      >
        <h2 className="font-mono text-2xs uppercase tracking-[0.2em] text-fg">
          Project index
        </h2>
        <p className="max-w-[42ch] font-mono text-2xs text-mut">
          Smaller engagements and platforms joined rather than architected.
        </p>
      </div>

      <ul>
        {projectIndex.map((p, i) => (
          <li
            key={p.name}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-[clamp(24px,3vw,40px)] md:grid-cols-12"
          >
            {/* Name + year + country */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-3">
                <h3 className="font-sans text-xl font-semibold tracking-tight">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hot"
                      className="underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                {p.country ? (
                  <Flag
                    code={p.country.code}
                    name={p.country.name}
                    className="h-3 w-[18px] shrink-0 border border-line"
                  />
                ) : null}
              </div>
              <p className="mt-1.5 font-mono text-2xs uppercase tracking-widest text-mut">
                {p.year} · {p.status}
              </p>
            </div>

            {/* One-sentence summary + role */}
            <div className="md:col-span-6">
              <p className="max-w-[62ch] text-sm text-mut">{p.summary}</p>
              <p className="mt-2 font-mono text-2xs uppercase tracking-widest text-mut">
                {p.role}
              </p>
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-2xs text-mut md:col-span-3 md:justify-end md:text-right">
              {p.stack.map((t, j) => (
                <span key={t} className="flex items-center gap-3">
                  {j > 0 ? <span aria-hidden="true">·</span> : null}
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
