import { caseStudies, reachCountries } from "@/lib/data";

// Server component. A thin figures band directly under the hero: quick,
// scannable proof before the work rows. Neutral wording on purpose — not every
// build is "production" (CodeCanvas is an FYP, Ascend is a demo), so the count
// is framed as case studies, not shipped systems. Counts derive from the data
// so they can never drift out of sync with what the site actually shows.
// Layout: stacked hairline rows on mobile, four across with vertical rules on
// desktop — consistent with the rest of the mono ledger system.
const stats: { value: string; label: string }[] = [
  { value: "2+", label: "Years shipping" },
  { value: String(caseStudies.length), label: "Case studies" },
  { value: String(reachCountries.length), label: "Countries reached" },
  { value: "Solo + Led", label: "Built solo & team-led" },
];

export default function Stats() {
  return (
    <section
      aria-label="At a glance"
      className="border-t border-line px-[clamp(20px,5vw,72px)]"
    >
      <dl className="grid grid-cols-1 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            className={`flex flex-col gap-2 py-[clamp(24px,3.5vw,44px)] md:pl-[clamp(16px,2vw,32px)] ${
              i > 0
                ? "border-t border-line md:border-t-0 md:border-l md:border-line"
                : ""
            }`}
          >
            <dt className="font-display text-[clamp(1.9rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
              {s.value}
            </dt>
            <dd className="font-mono text-2xs uppercase tracking-[0.2em] text-mut">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
