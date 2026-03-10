"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { engineeringHighlights } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";

const accentColors = [
  {
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    border: "border-accent-cyan/20",
    glow: "shadow-[0_0_20px_rgba(200,205,214,0.12)]",
  },
  {
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/20",
    glow: "shadow-[0_0_20px_rgba(122,129,148,0.12)]",
  },
  {
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/20",
    glow: "shadow-[0_0_20px_rgba(232,234,239,0.12)]",
  },
  {
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/[0.07]",
    border: "border-accent-cyan/[0.15]",
    glow: "shadow-[0_0_20px_rgba(200,205,214,0.08)]",
  },
  {
    color: "text-accent-violet",
    bg: "bg-accent-violet/[0.07]",
    border: "border-accent-violet/[0.15]",
    glow: "shadow-[0_0_20px_rgba(122,129,148,0.08)]",
  },
  {
    color: "text-accent-blue",
    bg: "bg-accent-blue/[0.07]",
    border: "border-accent-blue/[0.15]",
    glow: "shadow-[0_0_20px_rgba(232,234,239,0.08)]",
  },
];

const badgeVariants: Record<
  string,
  "cyan" | "violet" | "blue" | "default"
> = {
  React: "cyan",
  "Next.js": "cyan",
  TypeScript: "blue",
  "Node.js": "violet",
  MongoDB: "violet",
  "Vue.js": "violet",
  MERN: "cyan",
  JWT: "blue",
  "Three.js": "blue",
  GSAP: "violet",
  Express: "violet",
};

function HighlightCard({
  item,
  index,
}: {
  item: (typeof engineeringHighlights)[0];
  index: number;
}) {
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24, y: 16 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] p-6 overflow-hidden transition-all duration-300 hover:${accent.border} hover:${accent.glow}`}
    >
      {/* Background accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${accent.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}
      />

      {/* Check icon */}
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center mt-0.5`}
        >
          <svg
            className={`w-4 h-4 ${accent.color}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <h3 className="text-text-primary font-semibold text-base leading-snug">
            {item.title}
          </h3>
          <p className="text-text-sub text-sm leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tech.map((t) => (
              <Badge key={t} variant={badgeVariants[t] ?? "default"} size="sm">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EngineeringHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-accent-violet/[0.05] blur-3xl rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="Systems"
            title="Production"
            titleHighlight="Systems"
            subtitle="Platforms and products shipped end-to-end, from architecture to deployment."
          />

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 grid grid-cols-2 gap-3 lg:gap-4"
          >
            {[
              { value: "10+", label: "Projects" },
              { value: "3+", label: "Years" },
              { value: "5+", label: "SaaS Platforms" },
              { value: "3D", label: "Web Experiences" },
            ].map((s) => (
              <div
                key={s.label}
                className="px-5 py-3 rounded-xl bg-surface/60 border border-white/[0.06] text-center"
              >
                <div className="text-xl font-bold text-gradient-cyan">
                  {s.value}
                </div>
                <div className="text-text-sub text-xs font-mono">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid of highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {engineeringHighlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent-cyan/40" />
            <p className="text-text-sub text-sm font-mono">
              and more shipping every sprint
            </p>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent-cyan/40" />
          </div>
          <a
            href="#projects"
            className="text-accent-cyan text-sm font-medium hover:text-accent-blue transition-colors duration-200 underline underline-offset-4 decoration-accent-cyan/30"
          >
            See detailed case studies below
          </a>
        </motion.div>
      </div>
    </section>
  );
}
