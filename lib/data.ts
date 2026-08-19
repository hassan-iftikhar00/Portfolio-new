// ─── Types ───────────────────────────────────────────────────────────────────
// Content is code. Everything the site shows lives here as typed data.
// Source of truth for all facts: resume.md. No invented metrics, dates, or claims.

export type Owner = {
  name: string;
  title: string;
  /** Plain-language pitch: what he builds + for whom. No "passionate/crafting". */
  pitch: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  availableForWork: boolean;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  /** 1–2 factual sentences, from resume.md only. */
  summary: string;
  achievements: string[];
  tech: string[];
};

/** Skills grouped by layer, each group tied to the case studies that prove it. */
export type SkillGroup = {
  label: string;
  skills: string[];
  /** slugs of caseStudies / companies that demonstrate this group. */
  provenBy: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  status: "live" | "archived";
  /** The real problem, 1–2 sentences. No filler. */
  problem: string;
  role: string;
  timeframe: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Real architecture diagram rendered as a React/SVG component (not bullets). */
  architecture: {
    /** Name of the diagram component to render for this study. */
    component: string;
    caption: string;
  };
  /** ≥1 technical decision with an explicit tradeoff. Facts only. */
  decisions: { chose: string; rejected: string; why: string }[];
  /** The interactive proof. Poster is the JS-off fallback + facade click-to-load image. */
  artifact: {
    kind: "widget" | "embed" | "facade" | "recording";
    poster: string;
    /** Lazy client island, when kind is widget/embed. */
    component?: string;
    /** Live deployment, for facade/embed. */
    href?: string;
  };
  /** Real numbers only. Omit the field entirely if unknown. */
  metrics?: { value: string; label: string }[];
};

// ─── Owner ───────────────────────────────────────────────────────────────────

export const owner: Owner = {
  name: "Hassan Iftikhar",
  title: "Full Stack Developer",
  pitch:
    "Full stack developer with 2+ years shipping production SaaS for international clients across travel, enterprise, and edtech. Builds React, Vue, and Next.js frontends on Node, Express, and C# backends.",
  location: "Lahore, Pakistan",
  // From resume.md. Contact inbox to confirm before wiring Resend (Phase 7).
  email: "hassaniftikhardev@gmail.com",
  github: "https://github.com/hassan-iftikhar00",
  linkedin: "https://www.linkedin.com/in/hassaniftikhar0/",
  resumeUrl: "/resume.pdf",
  availableForWork: true,
};

// ─── Experience ───────────────────────────────────────────────────────────────
// From resume.md only. No invented metrics.

export const experiences: Experience[] = [
  {
    company: "Ascend BPO Services, Inc.",
    role: "Team Lead & Full Stack Developer Intern",
    period: "Aug 2025 – Jan 2026",
    summary:
      "Led a 3-person team building a production IVR Flow Builder and real-time analytics portal that replaced the legacy call routing system.",
    achievements: [
      "Architected and built a production IVR Flow Builder: multi-node drag-and-drop canvas, real-time preview, and a conditional routing engine.",
      "Engineered a real-time IVR Analytics Portal tracking 20+ KPIs with SignalR WebSocket push, an MUI DataGrid virtualized to 100k rows, offline resilience, and CSV export.",
      "Built the full C# ASP.NET Core + SQL Server backend and led the team through sprint planning and code reviews, delivering on schedule.",
    ],
    tech: [
      "React 19",
      "Vite",
      "ReactFlow",
      "MUI",
      "Recharts",
      "Zustand",
      "TanStack Query",
      "SignalR",
      "C# ASP.NET Core",
      "SQL Server",
    ],
  },
  {
    company: "Global Expeditions SMC, London",
    role: "Team Lead & Full Stack Developer Intern",
    period: "Nov 2023 – Nov 2024",
    summary:
      "Led full-stack development of a B2B SaaS travel platform with four role-based panels, isolated access controls, and scalable REST APIs.",
    achievements: [
      "Architected four role-based panels (SuperAdmin to AgentPanel) with isolated access controls and scalable REST APIs.",
      "Coordinated cross-functional teams across the full lifecycle, delivering a production system on schedule.",
    ],
    tech: ["Vue.js", "Node.js", "Express.js", "MongoDB", "Vuex", "Ant Design", "SASS"],
  },
];

// ─── Case studies (the core) ───────────────────────────────────────────────────
// Deep fields (decisions, poster images, confirmed URLs) are filled per-project in
// the vertical slice (Phase 6, CodeCanvas) and Phase 7 from real material, with the
// user confirming facts before publish. Empty decisions[] = not yet gathered, never faked.

export const caseStudies: CaseStudy[] = [
  {
    slug: "codecanvas",
    title: "CodeCanvas",
    category: "AI · Sketch-to-Code",
    status: "archived",
    problem:
      "Turning a hand-drawn UI wireframe into working front-end code is slow and manual. CodeCanvas converts a sketch into production-ready React + Tailwind through a detection-to-generation pipeline.",
    role: "Team Lead · Final Year Project",
    timeframe: "FYP",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Konva.js",
      "FastAPI",
      "Python",
      "YOLOv11",
      "Gemini 2.5 Pro",
      "Supabase",
    ],
    liveUrl: "https://trycodecanvas.vercel.app/",
    repoUrl: "https://github.com/hassan-iftikhar00/CodeCanvas",
    architecture: {
      component: "CodeCanvasArchitecture",
      caption:
        "Konva canvas → YOLOv11 element detection → Gemini 2.5 Pro code synthesis → chat refinement loop.",
    },
    decisions: [
      {
        chose:
          "A two-stage pipeline: YOLOv11 detects and bounds UI elements first, then Gemini generates code from those structured detections.",
        rejected:
          "Feeding the raw sketch image straight into a vision LLM and asking it to output code in one shot.",
        why: "Detection produces deterministic element types and coordinates, so the model synthesizes from a structured layout instead of guessing pixels. The detector can be retrained independently of the generator, and a bad box is debuggable in a way a hallucinated layout is not.",
      },
    ],
    artifact: {
      kind: "widget",
      poster: "/images/projects/codecanvas-poster.png",
      component: "CodeCanvasWidget",
    },
  },
  {
    slug: "feedsnap",
    title: "FeedSnap",
    category: "SaaS · Visual Feedback",
    status: "live",
    problem:
      "Collecting pixel-accurate website feedback usually means messy screenshots and email threads. FeedSnap is a multi-tenant Marker.io competitor: an embed widget pins screenshot-annotated comments at exact coordinates for owners to triage in a dashboard.",
    role: "Solo Developer",
    timeframe: "2025",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Postgres RLS",
      "Upstash Redis",
      "Lemon Squeezy",
      "Vercel",
    ],
    // Live URL was https://feedsnap.deventory.site/ — domain expired, not renewed.
    // Leave liveUrl undefined until re-hosted; artifact stays as the embedded widget, not a facade to a dead domain.
    architecture: {
      component: "FeedSnapArchitecture",
      caption:
        "Embed widget → serverless Playwright+Chromium screenshot (SSRF-guarded) → Postgres RLS multi-tenant store → dashboard triage.",
    },
    decisions: [
      {
        chose:
          "A monolithic Next.js App Router app: dashboard, public widget API, and billing sync all in one codebase, deployed serverless on Vercel.",
        rejected:
          "Splitting into a separate API server and a standalone frontend SPA from the start.",
        why: "For a lean, mid-stage SaaS, one codebase kept routes, components, and Lemon Squeezy billing sync co-located and shipping fast on serverless. A distributed split would have added operational overhead before the core feedback-capture workflow was proven. The tradeoff is deferred boundaries: multi-tenant limits and cross-region scale will eventually force service seams, but that cost is paid later and deliberately, not up front.",
      },
      {
        chose:
          "Cross-instance rate limiting on Upstash Redis, with an in-memory Map fallback when Upstash credentials are absent.",
        rejected:
          "Relying only on per-instance in-memory counters.",
        why: "Serverless functions scale to many isolated instances, so a per-instance counter alone lets an abuser slip past limits by hitting different instances. Upstash gives one shared counter across every instance. The in-memory fallback keeps local dev and un-provisioned environments running instead of hard-failing when the dependency is missing.",
      },
    ],
    // Recorded walkthrough: live domain expired, so the proof is a screen
    // recording of the real widget, poster-gated so it never touches LCP.
    // Media asset (recording + poster) still to be supplied.
    artifact: {
      kind: "recording",
      poster: "/images/projects/feedsnap-poster.png",
      href: "/images/projects/feedsnap-walkthrough.mp4",
    },
  },
  {
    slug: "peki-student-portal",
    title: "Peki Senior High School Portal",
    category: "EdTech · Enrolment Platform",
    status: "live",
    problem:
      "A senior high school needed to run student enrolment, payments, and credential delivery online. The portal is a live full-stack platform with dual student and admin roles.",
    role: "Solo Developer",
    timeframe: "2025",
    stack: [
      "Next.js 15",
      "TypeScript",
      "MongoDB",
      "JWT",
      "Hubtel API",
      "SMS API",
      "Cloudinary",
      "pdf-lib",
      "TailwindCSS",
    ],
    liveUrl: "https://x2j8-platform-temporary-peki-139392952244.vercel.app/",
    architecture: {
      component: "PekiArchitecture",
      caption:
        "Dual student/admin portals over 13 MongoDB models, Hubtel payments, SMS credential delivery, Cloudinary storage, and pdf-lib form generation.",
    },
    decisions: [
      {
        chose:
          "A deliberately conventional Next.js 15 + MongoDB/Mongoose stack with a clean, beginner-friendly structure.",
        rejected:
          "Over-engineering it: complex frameworks, a heavy separate backend, or premature optimization.",
        why: "The portal is run by school staff and will be maintained by future contributors, not a standing engineering team. Keeping the structure approachable made the admission workflow faster to iterate and simpler to hand off. The tradeoff is that some advanced features were deferred, but for this audience maintainability mattered more than early feature breadth.",
      },
    ],
    artifact: {
      kind: "facade",
      poster: "/images/projects/peki-poster.jpg",
      href: "https://x2j8-platform-temporary-peki-139392952244.vercel.app/",
    },
    metrics: [{ value: "13", label: "MongoDB models" }],
  },
  {
    slug: "e-voting-platform",
    title: "E-Voting Platform",
    category: "SaaS · Elections",
    status: "live",
    problem:
      "Institutions running elections by hand face slow counts and disputed results. This white-label SaaS automates the full election lifecycle with cryptographic vote receipts and real-time dashboards.",
    role: "Solo Developer",
    timeframe: "2024",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Chart.js",
      "jsPDF",
    ],
    liveUrl: "https://e-voting-pekiseniorhighschool.vercel.app/",
    architecture: {
      component: "EVotingArchitecture",
      caption:
        "RBAC + multi-election data isolation → concurrent voting → cryptographic PDF receipts → real-time Chart.js results.",
    },
    decisions: [
      {
        chose:
          "A TypeScript-first architecture across the whole voting flow, with roughly 73% of the codebase typed.",
        rejected:
          "A faster-to-write JavaScript-only approach, and separately, extra tooling and framework layers.",
        why: "Vote integrity depends on validation, role checks, and result tallying being correct. Static types catch whole classes of silent runtime bug in exactly those paths before they ship. JS-only would have been quicker at first but raised long-term risk where correctness matters most. Extra framework layers were also rejected to keep the stack lean enough for school-level operations to maintain.",
      },
      {
        chose:
          "Per-election data isolation: each election owns its own separate set of voters, candidates, positions, and votes.",
        rejected:
          "One shared pool of records filtered by an election id at query time.",
        why: "Isolation means a change or bug in one election cannot bleed into another, and a mis-scoped query cannot silently count the wrong election's ballots. It also lets past elections be preserved intact for audit. The cost is more moving parts and deliberate migration when data must move between elections, which is the safer default for anything holding vote results.",
      },
    ],
    artifact: {
      kind: "facade",
      poster: "/images/projects/evoting-poster.jpg",
      href: "https://e-voting-pekiseniorhighschool.vercel.app/",
    },
  },
];

// ─── Skills (evidence-based) ────────────────────────────────────────────────────
// Grouped and tied to the work that proves each group. No logo wall, no percentage bars.

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "TailwindCSS", "Konva.js", "MUI"],
    provenBy: ["codecanvas", "feedsnap", "peki-student-portal", "ascend-bpo"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "C# ASP.NET Core", "FastAPI", "REST APIs", "JWT", "WebSockets / SignalR"],
    provenBy: ["ascend-bpo", "e-voting-platform", "codecanvas"],
  },
  {
    label: "Data",
    skills: ["MongoDB", "SQL Server", "PostgreSQL / Supabase", "Postgres RLS", "Upstash Redis"],
    provenBy: ["peki-student-portal", "feedsnap", "ascend-bpo"],
  },
  {
    label: "Platform & Integrations",
    skills: ["Vercel", "Lemon Squeezy", "Hubtel", "Cloudinary", "Gemini 2.5 Pro", "YOLOv11"],
    provenBy: ["feedsnap", "peki-student-portal", "codecanvas"],
  },
];
