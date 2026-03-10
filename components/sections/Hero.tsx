"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { owner } from "@/lib/data";
import Button from "@/components/ui/Button";

// ─── Boot sequence config ─────────────────────────────────────────────────────

const BOOT_LINES = [
  { text: "Initializing hassaniftikhar.dev...", type: "init", delay: 300 },
  {
    text: "✔ Loading Frontend Engine  ",
    suffix: "React · Next.js · TypeScript",
    type: "check",
    delay: 550,
  },
  {
    text: "✔ Loading Backend Services  ",
    suffix: "Node.js · Express.js",
    type: "check",
    delay: 850,
  },
  {
    text: "✔ Loading Rendering Engine  ",
    suffix: "Three.js · GSAP",
    type: "check",
    delay: 1150,
  },
  {
    text: "✔ Loading Production Systems  ",
    suffix: "SaaS · APIs · Analytics",
    type: "check",
    delay: 1450,
  },
  { text: "System Ready.", type: "ready", delay: 1850 },
] as const;

// How long to show "System Ready." before revealing the hero content (ms)
const HERO_REVEAL_DELAY = 1850 + 700;

// ─── Boot screen ─────────────────────────────────────────────────────────────

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });

    timers.push(setTimeout(onComplete, HERO_REVEAL_DELAY));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center min-h-screen w-full"
    >
      <div className="w-full max-w-xl px-6">
        {/* Terminal panel */}
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-text-sub text-xs font-mono ml-2 opacity-60">
              system - boot.sh
            </span>
          </div>

          {/* Log lines */}
          <div className="p-6 font-mono text-sm space-y-2 min-h-[180px]">
            {BOOT_LINES.map((line, i) => {
              if (i >= visibleLines) return null;
              const isReady = line.type === "ready";
              const isInit = line.type === "init";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-2"
                >
                  {isReady ? (
                    <span className="text-accent-cyan font-bold text-base">
                      {line.text}
                    </span>
                  ) : isInit ? (
                    <span className="text-text-sub">{line.text}</span>
                  ) : (
                    <>
                      <span className="text-emerald-400">{line.text}</span>
                      {"suffix" in line && (
                        <span className="text-text-sub opacity-60">
                          {line.suffix}
                        </span>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}

            {/* Blinking cursor while booting */}
            {visibleLines < BOOT_LINES.length && (
              <span className="text-accent-cyan cursor-blink">█</span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
            initial={{ width: "0%" }}
            animate={{ width: `${(visibleLines / BOOT_LINES.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Floating tech badge ──────────────────────────────────────────────────────

function FloatingBadge({ tech, delay }: { tech: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        animation: `float ${3 + (delay % 1) * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      className="px-3 py-1.5 rounded-xl bg-surface/80 backdrop-blur border border-white/[0.08] text-xs font-mono text-text-sub whitespace-nowrap"
    >
      {tech}
    </motion.div>
  );
}

// ─── Skills terminal (right panel) ───────────────────────────────────────────

function SkillsTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-text-sub text-xs font-mono ml-2">
          hassan@portfolio ~
        </span>
      </div>

      <div className="p-5 font-mono text-sm space-y-2">
        <div className="flex gap-2 text-text-sub">
          <span className="text-accent-cyan">❯</span>
          <span>whoami</span>
        </div>
        <div className="text-text-primary pl-4">
          Hassan Iftikhar - Full Stack Developer
        </div>

        <div className="flex gap-2 text-text-sub mt-1">
          <span className="text-accent-cyan">❯</span>
          <span>cat stack.json</span>
        </div>
        <div className="text-text-sub pl-4 space-y-0.5">
          <div>
            <span className="text-accent-violet">"frontend"</span>:{" "}
            <span className="text-emerald-400">"React · Next.js · Vue.js"</span>
            ,
          </div>
          <div>
            <span className="text-accent-violet">"backend"</span>:{" "}
            <span className="text-emerald-400">
              "Node.js · Express · TypeScript"
            </span>
            ,
          </div>
          <div>
            <span className="text-accent-violet">"database"</span>:{" "}
            <span className="text-emerald-400">"MongoDB · MySQL"</span>
          </div>
        </div>

        <div className="flex gap-2 text-text-sub mt-1">
          <span className="text-accent-cyan">❯</span>
          <span>status</span>
        </div>
        <div className="flex items-center gap-2 pl-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400">
            Available for new opportunities
          </span>
        </div>

        <div className="flex gap-2 text-text-sub mt-1">
          <span className="text-accent-cyan">❯</span>
          <span className="cursor-blink">█</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main hero content (revealed after boot) ─────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeroContent() {
  return (
    <motion.div
      key="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-accent-cyan/[0.04] blur-3xl" />
      </div>

      {/* Floating tech badges — removed from absolute overlay, now in grid columns */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              {/* Status pill */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to full-time & contract roles
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-2"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                  <span className="text-text-primary">{owner.name}</span>
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-gradient-cyan">{owner.title}</span>
                </h2>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-text-sub text-lg md:text-xl leading-relaxed max-w-xl"
              >
                Building{" "}
                <span className="text-text-primary font-medium">
                  multi-tenant SaaS platforms
                </span>
                ,{" "}
                <span className="text-text-primary font-medium">
                  admin panel architectures
                </span>
                , and{" "}
                <span className="text-text-primary font-medium">
                  performance-optimized web applications
                </span>{" "}
                with React, Next.js, and Node.js.
              </motion.p>

              {/* Location */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-text-sub text-sm font-mono"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {owner.location}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex items-center flex-wrap gap-3 pt-2"
              >
                <Button variant="primary" size="lg" href="#projects">
                  View Work
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m13.5 4.5 6 6m0 0-6 6m6-6H3"
                    />
                  </svg>
                </Button>
                <Button variant="secondary" size="lg" href="#contact">
                  Get In Touch
                </Button>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-8 pt-4 border-t border-white/[0.06]"
              >
                {[
                  { value: "3+", label: "Years Experience" },
                  { value: "10+", label: "Projects Shipped" },
                  { value: "5+", label: "SaaS Platforms" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="text-2xl font-bold text-gradient-cyan">
                      {stat.value}
                    </span>
                    <span className="text-text-sub text-xs font-mono">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Terminal */}
            <div className="flex items-center justify-center lg:justify-end">
              <SkillsTerminal />
            </div>
          </div>

          {/* Tech badge strip — visible at lg+ (laptop default), wraps gracefully */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-white/[0.04]"
          >
            {[
              { tech: "React 18", delay: 0.2 },
              { tech: "Next.js 14", delay: 0.4 },
              { tech: "TypeScript", delay: 0.6 },
              { tech: "Node.js", delay: 0.8 },
              { tech: "MongoDB", delay: 1.0 },
              { tech: "TailwindCSS", delay: 1.2 },
            ].map(({ tech, delay }) => (
              <FloatingBadge key={tech} tech={tech} delay={delay} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute  bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* <span className="text-text-sub text-xs font-mono">scroll down</span> */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 "
        >
          <div className="w-1 h-1.5 rounded-full bg-accent-cyan" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero orchestrator ────────────────────────────────────────────────────────

export default function Hero() {
  const [phase, setPhase] = useState<"boot" | "hero">(() => {
    // Skip boot animation on repeat visits within the same session
    if (typeof window !== "undefined" && sessionStorage.getItem("bootPlayed")) {
      return "hero";
    }
    return "boot";
  });

  const handleBootComplete = () => {
    sessionStorage.setItem("bootPlayed", "true");
    setPhase("hero");
  };

  return (
    <section id="hero" className="relative">
      <AnimatePresence mode="wait">
        {phase === "boot" ? (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        ) : (
          <HeroContent key="hero" />
        )}
      </AnimatePresence>
    </section>
  );
}
