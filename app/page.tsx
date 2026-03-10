import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

// ─── Skeleton fallback ────────────────────────────────────────────────────────
function SectionSkeleton() {
  return (
    <div className="w-full py-24 md:py-32 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan animate-spin" />
    </div>
  );
}

// ─── Below-the-fold sections — code-split and deferred ───────────────────────
// Keeps the initial JS payload to Hero + Navbar only.
// framer-motion + each section's state logic loads as separate chunks.

const Impact = dynamic(
  () => import("@/components/sections/Impact"),
  { loading: SectionSkeleton, ssr: false }
);

const EngineeringHighlights = dynamic(
  () => import("@/components/sections/EngineeringHighlights"),
  { loading: SectionSkeleton, ssr: false }
);

const Projects = dynamic(
  () => import("@/components/sections/Projects"),
  { loading: SectionSkeleton, ssr: false }
);

const Experience = dynamic(
  () => import("@/components/sections/Experience"),
  { loading: SectionSkeleton, ssr: false }
);

const Skills = dynamic(
  () => import("@/components/sections/Skills"),
  { loading: SectionSkeleton, ssr: false }
);

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  { loading: SectionSkeleton, ssr: false }
);

const Contact = dynamic(
  () => import("@/components/sections/Contact"),
  { loading: SectionSkeleton, ssr: false }
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Global grid background */}
      <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" aria-hidden="true" />

      {/* Ambient glow blobs — CSS-only, zero JS cost */}
      <div
        className="fixed top-[-20vh] left-[-10vw] w-[60vw] h-[60vh] blob-cyan pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[-20vh] right-[-10vw] w-[50vw] h-[50vh] blob-violet pointer-events-none"
        aria-hidden="true"
      />

      {/* Navbar always present — not lazy */}
      <Navbar />

      {/* Hero renders server-side for optimal LCP */}
      <Hero />

      {/* Impact metrics — immediately after hero to hook scanners */}
      <Impact />

      {/* All below-the-fold sections are deferred */}
      <EngineeringHighlights />
      <Projects />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />

      <Footer />
    </main>
  );
}
