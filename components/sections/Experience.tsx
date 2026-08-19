import { experiences } from "@/lib/data";

// Server component.
export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mb-10">
          <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
            Experience
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-semibold text-text-primary">
            Team lead on two production platforms.
          </p>
        </div>

        <ol className="space-y-5">
          {experiences.map((e) => (
            <li
              key={e.company}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  {e.role}
                </h3>
                <span className="font-mono text-2xs text-text-faint">
                  {e.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-accent">
                {e.company}
              </p>
              <p className="mt-3 text-sm text-text-sub">{e.summary}</p>

              <ul className="mt-4 space-y-2">
                {e.achievements.map((a, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-text-sub">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-dim"
                    />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-surface px-2 py-1 font-mono text-2xs text-text-sub"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
