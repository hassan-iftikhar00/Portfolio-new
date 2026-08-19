import { caseStudies, skillGroups } from "@/lib/data";

// Server component. Skills are grouped and each group names the work that proves it.
// No logo wall, no percentage bars.

// Resolve provenBy slugs to readable labels. Case-study slugs map to titles;
// company slugs map here.
const companyLabels: Record<string, string> = {
  "ascend-bpo": "Ascend BPO (IVR)",
};

function labelFor(slug: string): string {
  const cs = caseStudies.find((c) => c.slug === slug);
  return cs?.title ?? companyLabels[slug] ?? slug;
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mb-10">
          <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
            Skills
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-semibold text-text-primary">
            Grouped by layer, each tied to what shipped with it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {g.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-border bg-surface px-2 py-1 font-mono text-2xs text-text-sub"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-text-faint">
                Proven by{" "}
                <span className="text-text-sub">
                  {g.provenBy.map(labelFor).join(", ")}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
