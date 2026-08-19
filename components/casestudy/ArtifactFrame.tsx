"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Facade. The static preview (children) is server-rendered and always present —
// it is the JS-off fallback. The heavy interactive widget is code-split and only
// downloaded when the visitor clicks "Run interactive demo", so it never touches
// LCP or the initial JS budget.

const widgets: Record<string, React.ComponentType> = {
  CodeCanvasWidget: dynamic(() => import("./CodeCanvasWidget"), {
    ssr: false,
    loading: () => (
      <div className="grid h-64 place-items-center text-sm text-text-faint">
        Loading demo…
      </div>
    ),
  }),
};

export default function ArtifactFrame({
  component,
  children,
}: {
  /** Key into the widgets registry. */
  component?: string;
  /** Server-rendered static preview shown until the demo loads. */
  children: React.ReactNode;
}) {
  const [live, setLive] = useState(false);
  const Widget = component ? widgets[component] : undefined;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-text-faint">
          {live ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-positive" />
              Interactive · runs in your browser
            </>
          ) : (
            "Interactive demo"
          )}
        </span>
        {Widget && !live ? (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-ink transition-opacity duration-base hover:opacity-90"
          >
            Run interactive demo
          </button>
        ) : null}
      </div>

      {live && Widget ? <Widget /> : children}

      {!Widget ? (
        <p className="mt-3 text-2xs text-text-faint">
          Static preview. The live build is linked above.
        </p>
      ) : null}
    </div>
  );
}
