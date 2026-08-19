import Link from "next/link";
import { caseStudies } from "@/lib/data";

// Server component. The case-study list is the core of the site.
export default function Work() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mb-10">
          <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
            Selected work
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-semibold text-text-primary">
            Four production systems. Each one shipped, with the problem, the
            architecture, and the tradeoffs laid out.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/projects/${cs.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-colors duration-base hover:border-accent-dim"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-2xs uppercase tracking-widest text-text-faint">
                    {cs.category}
                  </span>
                  {cs.status === "live" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/30 bg-positive/10 px-2.5 py-1 text-2xs font-medium text-positive">
                      <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-2xs font-medium text-text-sub">
                      Archived
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-text-primary">
                  {cs.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-text-sub">{cs.problem}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cs.stack.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border bg-surface px-2 py-1 font-mono text-2xs text-text-sub"
                    >
                      {t}
                    </span>
                  ))}
                  {cs.stack.length > 5 ? (
                    <span className="px-1 py-1 font-mono text-2xs text-text-faint">
                      +{cs.stack.length - 5}
                    </span>
                  ) : null}
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read the case study
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-base group-hover:translate-x-0.5"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
