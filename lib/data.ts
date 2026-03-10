// ─── Types ───────────────────────────────────────────────────────────────────

export type SkillCategory = {
  label: string;
  layer: "frontend" | "backend" | "database" | "tools";
  color: string;
  glowColor: string;
  skills: string[];
  icon: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
  color: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  category: string;
  color: string;
  glowColor: string;
  liveUrl?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  country: string;
  quote: string;
  avatar: string;
};

export type HighlightItem = {
  title: string;
  description: string;
  icon: string;
  tech: string[];
};

export type ImpactStat = {
  value: string;
  label: string;
  description: string;
  color: string;
};

// ─── Owner ───────────────────────────────────────────────────────────────────

export const owner = {
  name: "Hassan Iftikhar",
  title: "Full Stack Developer",
  location: "Lahore, Pakistan",
  email: "hassaniftikhardev@gmail.com",
  summary:
    "Full stack developer focused on multi-tenant SaaS platforms, admin panel architectures, and performance-optimized web applications. Core stack: React, Next.js, Node.js, MongoDB.",
  github: "https://github.com/hassan-iftikhar00",
  linkedin: "https://www.linkedin.com/in/hassaniftikhar0/",
  availableForWork: true,
};

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    layer: "frontend",
    color: "#C8CDD6",
    glowColor: "rgba(200,205,214,0.2)",
    icon: "⬡",
    skills: [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "SASS",
      "GSAP",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "Headless UI",
      "Ant Design",
      "Vuex",
      "Redux",
      "Swiper.js",
    ],
  },
  {
    label: "Backend",
    layer: "backend",
    color: "#8B929E",
    glowColor: "rgba(139,146,158,0.2)",
    icon: "⬡",
    skills: [
      "Node.js",
      "Express.js",
      "C#",
      ".NET",
      "REST APIs",
      "JWT",
      "OAuth",
      "WebSockets",
      "Resend",
    ],
  },
  {
    label: "Database",
    layer: "database",
    color: "#A3AAB8",
    glowColor: "rgba(163,170,184,0.2)",
    icon: "⬡",
    skills: [
      "MongoDB",
      "MySQL",
      "Supabase",
      "PostgreSQL",
      "Mongoose",
      "Firebase",
    ],
  },
  {
    label: "Tools & DevOps",
    layer: "tools",
    color: "#7A8194",
    glowColor: "rgba(122,129,148,0.2)",
    icon: "⬡",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Docker",
      "NPM",
      "Yarn",
      "Postman",
      "VS Code",
      "Figma",
      "Linux",
      "Cloudinary",
      "Stripe",
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    company: "Ascend BPO Services, Inc.",
    role: "Team Lead & Full Stack Developer",
    period: "Aug 2025 – Jan 2026",
    description:
      "Led development of a node-based IVR Flow Builder that replaced a legacy call routing system. Drag-and-drop canvas with real-time preview and conditional routing engine.",
    achievements: [
      "Built drag-and-drop node graph interface for IVR flows",
      "Implemented real-time flow preview with live state management",
      "Engineered advanced conditional routing logic engine",
      "Delivered IVR call analytics dashboard with real-time metrics",
      "Mentored interns and led bi-weekly development sprints",
    ],
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    color: "#C8CDD6",
  },
  {
    company: "Global Expeditions SMC",
    role: "Team Lead & Full Stack Developer",
    period: "Nov 2023 – Nov 2024",
    description:
      "Built and led development of a B2B SaaS platform for travel agencies. 4-tier admin architecture (SuperAdmin, Company, Agency, Agent) handling hundreds of concurrent users.",
    achievements: [
      "Architected multi-panel system: SuperAdmin, Company Admin, Agency Admin, Agent Dashboard",
      "Designed scalable MongoDB schema with complex relational data",
      "Implemented RBAC (Role-Based Access Control) across all panels",
      "Integrated third-party booking APIs and payment gateways",
      "Reduced page load time by 40% through code splitting and caching",
    ],
    tech: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Vuex",
      "Ant Design",
      "SASS",
    ],
    color: "#8B929E",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── Hero project — always list first ──────────────────────────────────────
  {
    id: "ivr",
    slug: "ivr-flow-builder",
    title: "IVR Flow Builder",
    tagline: "Drag-and-drop node editor replacing a legacy call routing system",
    description:
      "Production-grade IVR (Interactive Voice Response) flow builder that replaced a legacy system at Ascend BPO. Operators visually design call-routing trees on a drag-and-drop canvas with real-time preview and a conditional logic engine.",
    features: [
      "Drag-and-drop node graph editor for IVR call flows",
      "Real-time flow preview without save-and-refresh",
      "Conditional routing engine (time-based, DTMF, NLP triggers)",
      "IVR call analytics dashboard with live metrics and drop-off rates",
      "Flow versioning and rollback for production-safe deployments",
    ],
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    category: "Engineering Tool",
    color: "#C8CDD6",
    glowColor: "rgba(200,205,214,0.15)",
  },
  {
    id: "3decommerce",
    slug: "3d-scroll-ecommerce",
    title: "3D Scroll Ecommerce",
    tagline: "Scroll-driven 3D product showcase with GSAP and Three.js",
    description:
      "Scroll-driven 3D product showcase site. GSAP ScrollTrigger timelines, rotating product models via React Three Fiber, and parallax section transitions. Optimized for 60fps scroll performance.",
    features: [
      "GSAP ScrollTrigger-powered animation timelines",
      "Rotating 3D product models with React Three Fiber",
      "Parallax section transitions with depth layers",
      "Interactive product hotspots",
      "Optimized 60fps scroll performance",
    ],
    tech: [
      "Next.js 14",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "TailwindCSS",
    ],
    category: "Creative / 3D",
    color: "#C8CDD6",
    glowColor: "rgba(200,205,214,0.15)",
    liveUrl: "https://www.roujinc.com/",
  },
  {
    id: "deventory",
    slug: "deventory",
    title: "Deventory",
    tagline: "Production landing site for a dev inventory management tool",
    description:
      "Multi-page marketing and product site for Deventory, built with Next.js 15 and React 19. GSAP-animated hero, Swiper.js testimonials carousel, Headless UI FAQ accordion, Resend-powered contact form, and full SEO with sitemap generation.",
    features: [
      "GSAP-animated hero with scroll-driven transitions",
      "Multi-page routing with shared layout",
      "Contact form via Resend API with server-side validation",
      "Swiper.js testimonials carousel",
      "Headless UI FAQ accordion",
      "Auto-generated sitemap and SEO meta tags",
      "Vercel Analytics integration",
    ],
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "TailwindCSS",
      "GSAP",
      "Resend",
      "Vercel",
    ],
    category: "Production Landing Site",
    color: "#A3AAB8",
    glowColor: "rgba(163,170,184,0.15)",
    liveUrl: "https://deventory.site",
  },
  {
    id: "evoting",
    slug: "e-voting-platform",
    title: "E-Voting Platform SaaS",
    tagline: "Multi-tenant voting system with JWT-secured verification",
    description:
      "Multi-tenant digital voting system for educational institutions. Tamper-resistant architecture with JWT-secured voter verification, real-time result streaming, and admin analytics.",
    features: [
      "Multi-election architecture with isolated tenant data",
      "Role-based access control (Admin, Voter, Observer)",
      "Real-time vote counting & result visualization",
      "Voter identity verification via JWT + OTP",
      "Analytics dashboards with historical comparisons",
    ],
    tech: ["MERN", "TypeScript", "JWT", "TailwindCSS"],
    category: "SaaS Platform",
    color: "#8B929E",
    glowColor: "rgba(139,146,158,0.15)",
    liveUrl: "https://e-voting-pekiseniorhighschool.vercel.app/",
  },
  {
    id: "schoolmgmt",
    slug: "school-management",
    title: "School Management System",
    tagline: "End-to-end school operations platform",
    description:
      "School registration and management platform covering student enrollment, fee payments, and SMS notifications. Integrated with Hubtel API for automated communication.",
    features: [
      "Student portal with academic record management",
      "Admin panel with bulk enrollment tools",
      "Integrated payment gateway for fee collection",
      "Automated SMS notifications via Hubtel API",
      "Attendance & grade tracking modules",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "JWT", "TailwindCSS", "Hubtel API"],
    category: "EdTech",
    color: "#B4BAC6",
    glowColor: "rgba(180,186,198,0.15)",
    liveUrl: "https://x2j8-platform-temporary-peki-139392952244.vercel.app/",
  },
  {
    id: "liveautos",
    slug: "liveautos",
    title: "LiveAutos",
    tagline: "UK car marketplace platform",
    description:
      "UK car marketplace with multi-filter search, multi-step listing flow, and vehicle data API integration. Separate seller and buyer portals with Cloudinary image pipeline.",
    features: [
      "Multi-filter search with instant results",
      "Multi-step car listing wizard with image uploads",
      "Vehicle data API integration for auto-populating specs",
      "Buyer & seller dashboards",
      "Responsive, mobile-first design",
    ],
    tech: ["MERN", "REST APIs", "Cloudinary"],
    category: "Marketplace",
    color: "#9BA3B2",
    glowColor: "rgba(155,163,178,0.15)",
    liveUrl: "https://liveautos.co.uk/",
  },
  {
    id: "loyalty",
    slug: "b2b-loyalty-platform",
    title: "B2B Loyalty Platform",
    tagline: "SaaS rewards engine for businesses",
    description:
      "White-label B2B loyalty SaaS platform for custom points programs. Multi-role admin panels, redemption workflows, and loyalty analytics with reporting.",
    features: [
      "Configurable points earning & redemption engine",
      "Multi-role admin panels (SuperAdmin, Business, User)",
      "Real-time loyalty analytics and reporting",
      "Reward catalog with expiry management",
      "REST API for third-party integrations",
    ],
    tech: ["Vue.js", "Node.js", "Express", "MongoDB", "Vuex"],
    category: "SaaS Platform",
    color: "#7A8194",
    glowColor: "rgba(122,129,148,0.15)",
  },
];

// ─── Engineering Highlights ───────────────────────────────────────────────────

export const engineeringHighlights: HighlightItem[] = [
  {
    title: "Multi-panel B2B SaaS Platform",
    description:
      "4-tier role architecture with SuperAdmin, Company, Agency, and Agent dashboards serving live travel businesses.",
    icon: "◈",
    tech: ["Vue.js", "Node.js", "MongoDB"],
  },
  {
    title: "Drag-and-Drop IVR Flow Builder",
    description:
      "Node-graph editor replacing a legacy IVR system - built with real-time preview & conditional routing logic.",
    icon: "◈",
    tech: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Secure Digital Voting Platform",
    description:
      "Multi-tenant e-voting SaaS with tamper-resistant auth, real-time results, and isolated election data.",
    icon: "◈",
    tech: ["MERN", "JWT", "TypeScript"],
  },
  {
    title: "Scroll-Driven 3D Product Showcase",
    description:
      "GSAP ScrollTrigger timelines with React Three Fiber 3D models, running at 60fps scroll performance.",
    icon: "◈",
    tech: ["Three.js", "GSAP", "Next.js"],
  },
  {
    title: "Real-Time Analytics Dashboards",
    description:
      "Live data visualization systems across multiple SaaS products - IVR analytics, voting results, loyalty metrics.",
    icon: "◈",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "B2B Loyalty SaaS Rewards Engine",
    description:
      "Configurable white-label loyalty platform with points engine, redemption workflows, and business analytics.",
    icon: "◈",
    tech: ["Vue.js", "Express", "MongoDB"],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    name: "Aydin",
    role: "Client",
    company: "Fiverr",
    country: "Turkey",
    quote:
      "Hassan did everything I asked - backend, MongoDB, Cloudinary, admin panel integration. Communication was clear and he delivered on time.",
    avatar: "AY",
  },
  {
    name: "Haiderjee",
    role: "Client",
    company: "Fiverr",
    country: "United States",
    quote:
      "Quick understanding and delivery. He got the requirements fast and turned it around without unnecessary back and forth.",
    avatar: "HJ",
  },
  {
    name: "Atif",
    role: "Client",
    company: "Fiverr",
    country: "Canada",
    quote:
      "Professional and on time. Delivered the project exactly as discussed with no delays.",
    avatar: "AT",
  },
  {
    name: "Augustus",
    role: "Client",
    company: "Fiverr",
    country: "Ghana",
    quote:
      "Great communication skills. Was always responsive and kept me updated throughout the project.",
    avatar: "AU",
  },
  {
    name: "Viren",
    role: "Client",
    company: "Fiverr",
    country: "United Kingdom",
    quote:
      "Great working together. Understood the scope quickly and delivered clean, working code.",
    avatar: "VR",
  },
  {
    name: "Shehzad",
    role: "Client",
    company: "Fiverr",
    country: "United Kingdom",
    quote:
      "Good value for money. Got solid work done within budget and without cutting corners.",
    avatar: "SH",
  },
];

// ─── Impact Stats ──────────────────────────────────────────────────────────────

export const impactStats: ImpactStat[] = [
  {
    value: "20+",
    label: "Production Features",
    description:
      "Shipped across SaaS platforms, marketplaces, and engineering tools",
    color: "#C8CDD6",
  },
  {
    value: "5+",
    label: "Large-Scale Systems",
    description:
      "End-to-end architecture, from schema design to production deployment",
    color: "#A3AAB8",
  },
  {
    value: "4",
    label: "Admin Panel Architectures",
    description: "SuperAdmin, Company, Agency, and Agent-level RBAC systems",
    color: "#8B929E",
  },
  {
    value: "3",
    label: "SaaS Platforms",
    description:
      "Multi-tenant platforms with subscription logic, auth, and analytics",
    color: "#B4BAC6",
  },
  {
    value: "60fps",
    label: "WebGL Experiences",
    description:
      "Scroll-driven 3D product sites built with React Three Fiber and GSAP",
    color: "#9BA3B2",
  },
  {
    value: "3+",
    label: "Years Shipping",
    description:
      "Production-quality code shipped in fast-moving team environments",
    color: "#7A8194",
  },
];
