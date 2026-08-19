import { caseStudies, skillGroups } from "@/lib/data";

// Server component. Skills grouped, each tied to the work that proves it.
// No logo wall, no bars. Rendered as a hairline ledger (label | skills | proof)
// — a third distinct structure so the page never repeats a layout.

const companyLabels: Record<string, string> = {
  "ascend-bpo": "Ascend BPO (IVR)",
};

function labelFor(slug: string): string {
  const cs = caseStudies.find((c) => c.slug === slug);
  return cs?.title ?? companyLabels[slug] ?? slug;
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(72px,11vw,180px)]"
    >
      <div data-reveal className="flex items-end gap-5 border-b border-line pb-8">
        <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none text-faint">
          03
        </span>
        <h2 className="pb-1 font-mono text-2xs uppercase tracking-[0.2em] text-fg">
          Skills
        </h2>
      </div>

      <dl>
        {skillGroups.map((g) => (
          <div
            key={g.label}
            data-reveal
            className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-line py-[clamp(24px,3.4vw,44px)] md:grid-cols-[240px_1fr]"
          >
            <dt className="font-sans text-[clamp(1.2rem,2vw,1.6rem)] font-semibold tracking-tight">
              {g.label}
            </dt>
            <dd>
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-fg">
                {g.skills.map((s, i) => (
                  <span key={s} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span className="text-faint" aria-hidden="true">
                        ·
                      </span>
                    ) : null}
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-mono text-2xs uppercase tracking-widest text-mut">
                Proven by{" "}
                <span className="text-mut">
                  {g.provenBy.map(labelFor).join(" · ")}
                </span>
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
