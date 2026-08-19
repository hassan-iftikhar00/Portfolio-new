import PipelineDiagram, { type Stage } from "./PipelineDiagram";

// Maps a case study's architecture.component string to a real diagram.
// Slice ships CodeCanvas; the others fall back to a caption until Phase 7.

const codeCanvasStages: Stage[] = [
  { label: "Konva canvas", sub: "hand-drawn sketch" },
  { label: "FastAPI /predict", sub: "YOLOv11 detection", emphasis: true },
  { label: "Gemini 2.5 Pro", sub: "code synthesis", emphasis: true },
  { label: "React + Tailwind", sub: "generated UI" },
];

const feedSnapStages: Stage[] = [
  { label: "Embed widget", sub: "on the client site" },
  { label: "Screenshot service", sub: "Playwright + Chromium, SSRF-guarded", emphasis: true },
  { label: "Postgres RLS", sub: "multi-tenant store", emphasis: true },
  { label: "Dashboard", sub: "owner triage" },
];

const pekiStages: Stage[] = [
  { label: "Dual portals", sub: "student + admin" },
  { label: "13 MongoDB models", sub: "enrolment core", emphasis: true },
  { label: "Hubtel + SMS", sub: "payments + delivery", emphasis: true },
  { label: "pdf-lib + Cloudinary", sub: "credentials + storage" },
];

const eVotingStages: Stage[] = [
  { label: "RBAC + isolation", sub: "per-election data", emphasis: true },
  { label: "Concurrent voting", sub: "live ballot intake" },
  { label: "Cryptographic receipts", sub: "jsPDF proof", emphasis: true },
  { label: "Chart.js results", sub: "real-time dashboard" },
];

const ascendStages: Stage[] = [
  { label: "ReactFlow canvas", sub: "drag-and-drop IVR flows" },
  { label: "Routing engine", sub: "conditional / DTMF", emphasis: true },
  { label: "ASP.NET Core API", sub: "C# on SQL Server", emphasis: true },
  { label: "Analytics portal", sub: "virtualized 100k-row grid" },
];

const diagrams: Record<string, { stages: Stage[]; loop?: string } | undefined> = {
  AscendArchitecture: {
    stages: ascendStages,
    loop: "SignalR pushes live KPIs from the API to every open dashboard over one connection.",
  },
  CodeCanvasArchitecture: {
    stages: codeCanvasStages,
    loop: "Chat refinement feeds back into synthesis without re-running detection.",
  },
  FeedSnapArchitecture: { stages: feedSnapStages },
  PekiArchitecture: { stages: pekiStages },
  EVotingArchitecture: { stages: eVotingStages },
};

export default function Architecture({
  component,
  caption,
}: {
  component: string;
  caption: string;
}) {
  const diagram = diagrams[component];
  return (
    <figure>
      {diagram ? (
        <PipelineDiagram stages={diagram.stages} loop={diagram.loop} />
      ) : (
        // Fallback until this study's diagram is built.
        <div className="border border-dashed border-line2 bg-card p-6 text-sm text-mut">
          {caption}
        </div>
      )}
      <figcaption className="mt-3 font-mono text-2xs uppercase tracking-widest text-mut">{caption}</figcaption>
    </figure>
  );
}
