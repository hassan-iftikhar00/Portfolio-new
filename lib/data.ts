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
  /** Optional company logo path (public/images/logos/*). Rendered grayscale.
   *  Leave undefined until a real logo file is supplied. */
  logo?: string;
};

/** Skills grouped by layer, each group tied to the case studies that prove it. */
export type SkillGroup = {
  label: string;
  skills: string[];
  /** slugs of caseStudies / companies that demonstrate this group. */
  provenBy: string[];
};

export type Testimonial = {
  /** Verbatim client review text. Reproduced exactly, including the client's
      own spelling/casing — never cleaned up. */
  quote: string;
  /** Fiverr username (public reviewer handle). No invented full names. */
  username: string;
  country: string;
  source: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  status: "live" | "archived" | "demo";
  /** The real problem, 1–2 sentences. No filler. */
  problem: string;
  role: string;
  timeframe: string;
  /** Client / origin country for the project (colored flag + label). */
  country?: { code: string; name: string };
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
    kind: "widget" | "embed" | "facade" | "recording" | "diagram";
    /** Screenshot fallback. Optional: diagram-only studies (no screenshots) omit it. */
    poster?: string;
    /** Lazy client island, when kind is widget/embed. */
    component?: string;
    /** Live deployment, for facade/embed. */
    href?: string;
  };
  /** Real numbers only. Omit the field entirely if unknown. */
  metrics?: { value: string; label: string }[];
  /** 2–3 real screenshots for the case-study gallery. Omitted for diagram-only
   *  studies (Ascend has no screenshots). */
  gallery?: string[];
};

/** Below-the-featured-set ledger. One line each: no thumbnails, diagrams, or
 *  decision blocks. For work that doesn't fit the case-study format (joined an
 *  existing product, or a smaller scoped engagement). */
export type ProjectIndexEntry = {
  name: string;
  /** One sentence, factual. */
  summary: string;
  stack: string[];
  year: string;
  role: string;
  /** Free label: "Live", "Delivered", etc. Not the live/archived/demo union. */
  status: string;
  country?: { code: string; name: string };
  link?: string;
};

/** A country reached through client work (for the static reach map + list).
 *  Honestly labelled: work delivered to, not offices or residence. */
export type ReachCountry = {
  code: string;
  name: string;
  /** What sourced it, shown as a small note. */
  note: string;
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
    logo: "/images/companyLogos/Ascend.png",
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
    logo: "/images/companyLogos/Global.jpeg",
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
    // Live final-year project, hosted at liveUrl (may later become a product).
    status: "live",
    problem:
      "Turning a hand-drawn UI wireframe into working front-end code is slow and manual. CodeCanvas converts a sketch into production-ready React + Tailwind through a detection-to-generation pipeline.",
    role: "Team Lead · Final Year Project",
    timeframe: "2026",
    country: { code: "pk", name: "Pakistan" },
    stack: [
      "Next.js 14",
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
    gallery: [
      "/images/projects/gallery/codecanvas-1.png",
      "/images/projects/gallery/codecanvas-2.png",
      "/images/projects/gallery/codecanvas-3.png",
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
    country: { code: "pk", name: "Pakistan" },
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
    gallery: [
      "/images/projects/gallery/feedsnap-1.png",
      "/images/projects/gallery/feedsnap-2.png",
      "/images/projects/gallery/feedsnap-3.png",
    ],
    artifact: {
      kind: "recording",
      poster: "/images/projects/feedsnap-poster.png",
      href: "/images/projects/feedsnap-walkthrough.mp4",
    },
  },
  {
    slug: "ascend-bpo-ivr",
    title: "IVR Flow Builder + Analytics",
    category: "Enterprise · Realtime Systems",
    status: "demo",
    problem:
      "Ascend BPO's call routing ran on a rigid legacy system. This project builds a drag-and-drop IVR flow builder and a real-time analytics portal to replace it: visual call-flow editing on a node canvas, plus live KPI monitoring pushed over SignalR.",
    role: "Team Lead · Full Stack (Intern)",
    timeframe: "2025 – 2026",
    country: { code: "pk", name: "Pakistan" },
    stack: [
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
    architecture: {
      component: "AscendArchitecture",
      caption:
        "ReactFlow node canvas → conditional routing engine → C# ASP.NET Core API on SQL Server, with a SignalR push stream driving a virtualized MUI DataGrid analytics portal.",
    },
    decisions: [
      {
        chose:
          "SignalR WebSocket push for the analytics portal, with the KPI grid virtualized (MUI DataGrid) to hold 100k rows inside the DOM budget.",
        rejected:
          "Interval polling for updates, and rendering the full result set into the DOM.",
        why: "Call-center KPIs change second to second, so polling either lags behind or hammers the server; a pushed stream keeps every open dashboard live off one connection. At 100k rows, mounting the whole grid would jank the main thread, so virtualization renders only the visible window. Offline resilience was layered on top so a dropped socket degrades to cached data instead of a blank board.",
      },
    ],
    gallery: [
      "/images/projects/gallery/ascend-1.png",
      "/images/projects/gallery/ascend-2.png",
      "/images/projects/gallery/ascend-3.png",
    ],
    artifact: {
      kind: "diagram",
      // Real screenshots of the demo build now on disk, so the Work row shows a
      // product tile instead of the "System diagram" fallback. Still kind:"diagram"
      // (not deployed): the architecture diagram stays the technical proof and the
      // case page skips the "Try it" section; screenshots are the gallery + poster.
      poster: "/images/projects/ascend-poster.png",
    },
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
    country: { code: "gh", name: "Ghana" },
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
    gallery: [
      "/images/projects/gallery/evoting-1.jpg",
      "/images/projects/gallery/evoting-2.jpg",
      "/images/projects/gallery/evoting-3.jpg",
    ],
    artifact: {
      kind: "facade",
      poster: "/images/projects/evoting-poster.jpg",
      href: "https://e-voting-pekiseniorhighschool.vercel.app/",
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
    country: { code: "gh", name: "Ghana" },
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
    gallery: [
      "/images/projects/gallery/peki-1.jpg",
      "/images/projects/gallery/peki-2.jpg",
      "/images/projects/gallery/peki-3.jpg",
    ],
    artifact: {
      kind: "facade",
      poster: "/images/projects/peki-poster.jpg",
      href: "https://x2j8-platform-temporary-peki-139392952244.vercel.app/",
    },
    metrics: [{ value: "13", label: "MongoDB models" }],
  },
];

// ─── Project index (below the featured five) ──────────────────────────────────
// Everything that isn't a full case study. LiveAutos first: joined an existing
// UK platform, so there is no architecture or founding decision of his to show —
// the case-study format doesn't fit, so it's stated precisely as a ledger line.

export const projectIndex: ProjectIndexEntry[] = [
  {
    name: "LiveAutos",
    summary:
      "Joined an existing UK car-listing platform to optimize search, build the multi-step listing flow, integrate UK vehicle-data APIs, and ship detail pages, advanced filtering, and legal pages.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    year: "2024",
    role: "Frontend + integrations (existing platform)",
    status: "Live",
    country: { code: "gb", name: "United Kingdom" },
  },
  {
    name: "Multilingual Bank Website",
    summary:
      "Integrated the backend and a secure admin panel for a banking site: authentication, blog management, Cloudinary image hosting, and language-specific content filtering across English and Turkish.",
    stack: ["Next.js", "Node.js", "MongoDB", "Cloudinary"],
    year: "2024",
    role: "Backend + admin panel",
    status: "Delivered",
    country: { code: "tr", name: "Turkey" },
  },
  {
    name: "Asian Scientific Traders",
    summary:
      "Built a solo full-stack catalog and inquiry site for a Lahore scientific-instrument trader: server-rendered product/category pages, a WhatsApp-driven inquiry flow, local-business SEO with JSON-LD, and a phone-friendly admin panel with custom JWT auth and a sharp/WebP image pipeline.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "Supabase Postgres", "Tailwind"],
    year: "2026",
    role: "Solo full-stack",
    status: "Live",
    country: { code: "pk", name: "Pakistan" },
    link: "https://asianscientifictraders.com",
  },
];

// ─── Reach (countries reached through client work) ────────────────────────────
// Static reach map + visible list. Honest label: work delivered to these
// countries, not offices or residence. Pakistan (home) is deliberately excluded.

export const reachCountries: ReachCountry[] = [
  { code: "gh", name: "Ghana", note: "Peki Portal + E-Voting Platform" },
  { code: "gb", name: "United Kingdom", note: "Global Expeditions + LiveAutos" },
  { code: "in", name: "India", note: "CRM label-filtering web app" },
  { code: "tr", name: "Turkey", note: "Multilingual bank website" },
  { code: "ca", name: "Canada", note: "Freelance web delivery" },
  { code: "us", name: "United States", note: "Freelance web delivery" },
];

// ─── Skills (evidence-based) ────────────────────────────────────────────────────
// Grouped and tied to the work that proves each group. No logo wall, no percentage bars.

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "TailwindCSS", "Konva.js", "MUI"],
    provenBy: ["codecanvas", "feedsnap", "peki-student-portal", "ascend-bpo-ivr"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "C# ASP.NET Core", "FastAPI", "REST APIs", "JWT", "WebSockets / SignalR"],
    provenBy: ["ascend-bpo-ivr", "e-voting-platform", "codecanvas"],
  },
  {
    label: "Data",
    skills: ["MongoDB", "SQL Server", "PostgreSQL / Supabase", "Postgres RLS", "Upstash Redis"],
    provenBy: ["peki-student-portal", "feedsnap", "ascend-bpo-ivr"],
  },
  {
    label: "Platform & Integrations",
    skills: ["Vercel", "Lemon Squeezy", "Hubtel", "Cloudinary", "Gemini 2.5 Pro", "YOLOv11"],
    provenBy: ["feedsnap", "peki-student-portal", "codecanvas"],
  },
];

// Three of eight Fiverr reviews, chosen for signal not volume: 01 names actual
// technical work, 02 ties to Ghana (where E-Voting and Peki shipped), 03 is
// specific about delivery. The other five are generic one-liners. Text is
// verbatim (lowercase "i", "mongoDb" preserved) — client writing is not edited.
// No price/duration (reads as a rate card), no quotes naming "Pasha" (would
// read as fabricated against the Hassan Iftikhar byline).
export const testimonials: Testimonial[] = [
  {
    quote:
      "He integrated backend with mongoDb and cloudinary along with admin panel in my nextjs web app. The delivery was high quality, and exactly how i described.",
    username: "productshine",
    country: "Turkey",
    source: "via Fiverr",
  },
  {
    quote: "Excellent communication skills. Very good at what he does.",
    username: "packetsoutllc",
    country: "Ghana",
    source: "via Fiverr",
  },
  {
    quote:
      "I loved his professionalism in understanding the requirements and delivering the order before time.",
    username: "atifqamar277",
    country: "Canada",
    source: "via Fiverr",
  },
];
