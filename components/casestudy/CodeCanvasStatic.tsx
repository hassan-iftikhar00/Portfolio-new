// Server-rendered static preview of the CodeCanvas artifact.
// This is what shows before the interactive demo loads, and the full fallback
// when JavaScript is disabled. Same idea as the widget, painted as plain HTML.

const boxes = [
  { type: "heading", x: 6, y: 8, w: 60, h: 12, cls: "border-solid border-fg bg-fg/15 text-fg" },
  { type: "text", x: 6, y: 26, w: 78, h: 14, cls: "border-solid border-line2 bg-fg/[0.04] text-mut" },
  { type: "input", x: 6, y: 50, w: 55, h: 12, cls: "border-dashed border-fg/70 text-fg" },
  { type: "button", x: 65, y: 50, w: 24, h: 12, cls: "border-solid border-fg bg-fg/25 text-fg" },
  { type: "image", x: 6, y: 70, w: 40, h: 24, cls: "border-dashed border-line2 text-mut" },
];

const snippet = `export default function Generated() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-2xl font-semibold">Heading</h2>
      <p className="text-sm text-gray-500">Body copy goes here.</p>
      <input className="rounded-lg border px-3 py-2" />
      <button className="rounded-lg bg-black px-4 py-2 text-white">Action</button>
      <img className="rounded-lg" alt="" />
    </div>
  );
}`;

export default function CodeCanvasStatic() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <span className="mb-2 block font-mono text-2xs uppercase tracking-widest text-mut">
          Sketch
        </span>
        <div
          className="relative aspect-[4/3] w-full border border-line bg-bg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {boxes.map((b) => (
            <div
              key={b.type}
              className={`absolute border-2 ${b.cls}`}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.w}%`,
                height: `${b.h}%`,
              }}
            >
              <span className="absolute left-0.5 top-0.5 font-mono text-[9px] leading-none">
                {b.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="mb-2 block font-mono text-2xs uppercase tracking-widest text-mut">
          Generated React + Tailwind
        </span>
        <pre className="overflow-auto border border-line bg-bg p-4 font-mono text-2xs leading-relaxed text-mut">
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
}
