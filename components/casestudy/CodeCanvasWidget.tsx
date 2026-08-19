"use client";

import { useMemo, useRef, useState } from "react";

// Interactive artifact for the CodeCanvas case study.
// Draw boxes, tag each as a UI element, and it generates a React + Tailwind
// skeleton from their layout. This runs fully in the browser with zero backend.
// The live app replaces this hand-tagging with YOLOv11 detection and swaps the
// template emitter for Gemini synthesis — the loop is the same, the intelligence
// is heavier. Framing kept honest on purpose.

type ElType = "heading" | "text" | "button" | "input" | "image" | "card";

type El = {
  id: number;
  type: ElType;
  x: number;
  y: number;
  w: number;
  h: number;
};

const TYPES: ElType[] = ["heading", "text", "button", "input", "image", "card"];

const EXAMPLE: El[] = [
  { id: 1, type: "heading", x: 6, y: 6, w: 60, h: 12 },
  { id: 2, type: "text", x: 6, y: 22, w: 78, h: 16 },
  { id: 3, type: "input", x: 6, y: 44, w: 55, h: 12 },
  { id: 4, type: "button", x: 65, y: 44, w: 24, h: 12 },
  { id: 5, type: "image", x: 6, y: 62, w: 40, h: 30 },
];

function emit(el: El): string {
  switch (el.type) {
    case "heading":
      return `<h2 className="text-2xl font-semibold">Heading</h2>`;
    case "text":
      return `<p className="text-sm text-gray-500">Body copy goes here.</p>`;
    case "button":
      return `<button className="rounded-lg bg-black px-4 py-2 text-white">Action</button>`;
    case "input":
      return `<input className="rounded-lg border px-3 py-2" placeholder="Type…" />`;
    case "image":
      return `<img className="rounded-lg" src="/placeholder.png" alt="" />`;
    case "card":
      return `<div className="rounded-xl border p-4 shadow">Card</div>`;
  }
}

function generate(els: El[]): string {
  if (els.length === 0) return "// Draw a box on the canvas to begin.";
  const sorted = [...els].sort((a, b) => a.y - b.y || a.x - b.x);
  const body = sorted.map((e) => "      " + emit(e)).join("\n");
  return `export default function Generated() {\n  return (\n    <div className="flex flex-col gap-4 p-6">\n${body}\n    </div>\n  );\n}`;
}

export default function CodeCanvasWidget() {
  const [els, setEls] = useState<El[]>(EXAMPLE);
  const [draft, setDraft] = useState<El | null>(null);
  const nextId = useRef(6);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const code = useMemo(() => generate(els), [els]);

  function toPct(clientX: number, clientY: number) {
    const rect = areaRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const p = toPct(e.clientX, e.clientY);
    startRef.current = p;
    setDraft({ id: -1, type: "card", x: p.x, y: p.y, w: 0, h: 0 });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!startRef.current) return;
    const p = toPct(e.clientX, e.clientY);
    const s = startRef.current;
    setDraft({
      id: -1,
      type: "card",
      x: Math.min(s.x, p.x),
      y: Math.min(s.y, p.y),
      w: Math.abs(p.x - s.x),
      h: Math.abs(p.y - s.y),
    });
  }

  function onPointerUp() {
    if (draft && draft.w > 3 && draft.h > 2) {
      const id = nextId.current++;
      // New boxes cycle through element types so tagging is one click away.
      const type = TYPES[(els.length + 1) % TYPES.length];
      setEls((prev) => [...prev, { ...draft, id, type }]);
    }
    startRef.current = null;
    setDraft(null);
  }

  function cycleType(id: number) {
    setEls((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, type: TYPES[(TYPES.indexOf(e.type) + 1) % TYPES.length] }
          : e,
      ),
    );
  }

  function remove(id: number) {
    setEls((prev) => prev.filter((e) => e.id !== id));
  }

  const boxStyle = (t: ElType) =>
    ({
      heading: "border-accent bg-accent/5 text-accent",
      text: "border-text-sub bg-text-sub/5 text-text-sub",
      button: "border-positive bg-positive/5 text-positive",
      input: "border-warning bg-warning/5 text-warning",
      image: "border-accent-dim bg-accent-dim/10 text-accent",
      card: "border-text-faint bg-card text-text-faint",
    })[t];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Canvas */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-2xs uppercase tracking-widest text-text-faint">
            Sketch — drag to draw, click a box to re-tag
          </span>
        </div>
        <div
          ref={areaRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative aspect-[4/3] w-full touch-none select-none rounded-lg border border-border bg-background"
          style={{
            backgroundImage:
              "linear-gradient(#282D37 1px, transparent 1px), linear-gradient(90deg, #282D37 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {els.map((e) => (
            <button
              key={e.id}
              type="button"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => cycleType(e.id)}
              onDoubleClick={() => remove(e.id)}
              title="Click to re-tag, double-click to delete"
              className={`absolute rounded border-2 text-left ${boxStyle(e.type)}`}
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
                width: `${e.w}%`,
                height: `${e.h}%`,
              }}
            >
              <span className="absolute left-0.5 top-0.5 font-mono text-[9px] leading-none">
                {e.type}
              </span>
            </button>
          ))}
          {draft ? (
            <div
              className="absolute rounded border-2 border-dashed border-accent/60"
              style={{
                left: `${draft.x}%`,
                top: `${draft.y}%`,
                width: `${draft.w}%`,
                height: `${draft.h}%`,
              }}
            />
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEls(EXAMPLE)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-text-primary hover:border-accent-dim"
          >
            Reset example
          </button>
          <button
            type="button"
            onClick={() => setEls([])}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-text-primary hover:border-accent-dim"
          >
            Clear
          </button>
          <span className="ml-auto self-center font-mono text-2xs text-text-faint">
            {els.length} element{els.length === 1 ? "" : "s"} detected
          </span>
        </div>
      </div>

      {/* Generated code */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-2xs uppercase tracking-widest text-text-faint">
            Generated React + Tailwind
          </span>
        </div>
        <pre className="h-[calc(100%-1.75rem)] overflow-auto rounded-lg border border-border bg-background p-4 font-mono text-2xs leading-relaxed text-text-sub">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
