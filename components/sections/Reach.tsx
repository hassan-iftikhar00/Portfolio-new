import { reachCountries } from "@/lib/data";
import { worldOutlinePath, highlightPaths } from "@/lib/worldMap";
import Flag from "@/components/graphics/Flag";

// Server component. Static reach map: a monochrome world outline with the six
// client countries filled white, paired with a readable labelled list so the
// information never depends on the decorative graphic. No map library, no JS —
// the paths are baked strings (see scripts/genWorldMap.mjs). Honest label: work
// delivered to these countries, not offices or residence.
//
// viewBox trims the empty polar band so the inhabited latitudes fill the frame.
const MAP_VIEWBOX = "0 50 1000 340";

export default function Reach() {
  return (
    <section
      id="reach"
      aria-labelledby="reach-h"
      className="scroll-mt-20 border-t border-line px-[clamp(20px,5vw,72px)] py-[clamp(72px,11vw,180px)]"
    >
      <div
        data-reveal
        className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6"
      >
        <h2
          id="reach-h"
          className="font-mono text-2xs uppercase tracking-[0.2em] text-fg"
        >
          Client reach
        </h2>
        <p className="max-w-[42ch] font-mono text-2xs text-mut">
          Countries client work has been delivered to.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Map */}
        <div data-reveal className="lg:col-span-7">
          <div className="reach-map border border-line bg-card p-4 sm:p-8">
            <svg
              viewBox={MAP_VIEWBOX}
              className="h-auto w-full"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Faint world outline (all countries, decimated). */}
              <path
                d={worldOutlinePath}
                fill="none"
                stroke="#333333"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              {/* The six client countries, filled. */}
              {reachCountries.map((c) =>
                highlightPaths[c.code] ? (
                  <path
                    key={c.code}
                    d={highlightPaths[c.code]}
                    data-c={c.code}
                    fill="#ffffff"
                    fillOpacity="0.9"
                  >
                    <title>{c.name}</title>
                  </path>
                ) : null
              )}
            </svg>
          </div>
        </div>

        {/* Readable list — the accessible source of truth. */}
        <div className="lg:col-span-5">
          <ol className="border-t border-line">
            {reachCountries.map((c, i) => (
              <li
                key={c.code}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
                className="flex items-center gap-4 border-b border-line py-4"
              >
                <Flag
                  code={c.code}
                  name={c.name}
                  className="h-4 w-6 shrink-0 border border-line"
                />
                <span className="min-w-0">
                  <span className="block font-sans text-base font-medium tracking-tight">
                    {c.name}
                  </span>
                  <span className="block font-mono text-2xs uppercase tracking-widest text-mut">
                    {c.note}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
