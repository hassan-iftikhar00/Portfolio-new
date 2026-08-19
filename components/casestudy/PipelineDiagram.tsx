// Server component. A real architecture diagram built from layout primitives:
// labeled stages connected by arrows, stacking vertically on mobile and flowing
// horizontally on desktop. Not a bullet list. No client JS.

export type Stage = {
  label: string;
  sub?: string;
  /** Optional accent for the stage that carries the core idea. */
  emphasis?: boolean;
};

export default function PipelineDiagram({
  stages,
  loop,
}: {
  stages: Stage[];
  /** Optional feedback-loop caption drawn under the flow. */
  loop?: string;
}) {
  return (
    <div className="border border-line bg-card p-5 sm:p-6">
      <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch">
        {stages.map((s, i) => (
          <div key={s.label} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
            <div
              className={`flex flex-1 flex-col justify-center border p-4 text-center ${
                s.emphasis
                  ? "border-fg bg-fg text-bg"
                  : "border-line2 bg-bg"
              }`}
            >
              <span
                className={`font-mono text-2xs ${
                  s.emphasis ? "text-bg" : "text-fg"
                }`}
              >
                {s.label}
              </span>
              {s.sub ? (
                <span className={`mt-1 text-2xs ${s.emphasis ? "text-bg/70" : "text-mut"}`}>{s.sub}</span>
              ) : null}
            </div>
            {i < stages.length - 1 ? (
              <div
                aria-hidden="true"
                className="flex items-center justify-center py-1 text-mut lg:px-1 lg:py-0"
              >
                {/* Down arrow on mobile, right arrow on desktop */}
                <svg
                  className="lg:hidden"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg
                  className="hidden lg:block"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {loop ? (
        <div className="mt-3 flex items-center gap-2 border border-dashed border-line2 px-3 py-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-fg">
            <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xs text-mut">{loop}</span>
        </div>
      ) : null}
    </div>
  );
}
