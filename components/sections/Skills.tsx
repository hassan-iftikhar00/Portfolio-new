"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories, type SkillCategory } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const layerOrder = ["frontend", "backend", "database", "tools"] as const;

const layerDescriptions: Record<string, string> = {
  frontend: "Interface layer - what users see and interact with",
  backend: "Logic layer - APIs, business rules, and data processing",
  database: "Persistence layer - storage, querying, and data modeling",
  tools: "DX layer - version control, packages, and workflow tools",
};

const layerIndex: Record<string, number> = {
  frontend: 0,
  backend: 1,
  database: 2,
  tools: 3,
};

function SkillPill({
  skill,
  color,
  delay,
}: {
  skill: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="px-4 py-2 rounded-xl border bg-surface/80 text-sm font-medium font-mono transition-all duration-200"
      style={{
        borderColor: `${color}25`,
        color: color,
        background: `${color}08`,
      }}
    >
      {skill}
    </motion.div>
  );
}

function LayerCard({
  category,
  isActive,
  onClick,
  delay,
}: {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  delay: number;
}) {
  const index = layerIndex[category.layer];

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ zIndex: 10 - index }}
    >
      {/* Connection line between layers */}
      {index < layerOrder.length - 1 && (
        <div
          className="absolute left-6 -bottom-4 w-px h-4 opacity-30"
          style={{
            background: `linear-gradient(to bottom, ${category.color}, transparent)`,
          }}
        />
      )}

      <motion.button
        onClick={onClick}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.15 }}
        className="w-full text-left"
      >
        <div
          className="rounded-2xl border p-5 transition-all duration-300 overflow-hidden"
          style={{
            borderColor: isActive
              ? `${category.color}40`
              : "rgba(255,255,255,0.06)",
            background: isActive ? `${category.color}08` : "rgba(17,24,39,0.6)",
            boxShadow: isActive ? `0 0 24px ${category.color}20` : "none",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Layer number */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold border flex-shrink-0"
                style={{
                  borderColor: `${category.color}30`,
                  color: category.color,
                  background: `${category.color}10`,
                }}
              >
                L{index + 1}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-text-primary font-semibold text-sm">
                    {category.label}
                  </span>
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded border opacity-70"
                    style={{
                      color: category.color,
                      borderColor: `${category.color}30`,
                    }}
                  >
                    {category.layer}
                  </span>
                </div>
                <p className="text-text-sub text-xs">
                  {layerDescriptions[category.layer]}
                </p>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-4 h-4 text-text-sub"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </motion.div>
          </div>

          {/* Skills pills (expanded) */}
          <motion.div
            initial={false}
            animate={{
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="flex flex-wrap gap-2 pt-4 mt-4 border-t"
              style={{ borderColor: `${category.color}15` }}
            >
              {category.skills.map((skill, si) => (
                <SkillPill
                  key={skill}
                  skill={skill}
                  color={category.color}
                  delay={si * 0.04}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}

// Computed once at module level — skillCategories and layerIndex are static constants.
const orderedCategories = [...skillCategories].sort(
  (a, b) => layerIndex[a.layer] - layerIndex[b.layer],
);

export default function Skills() {
  const [activeLayer, setActiveLayer] = useState<string | null>("frontend");

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-0 top-1/4 w-[40vw] h-[50vh] bg-accent-violet/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Intro */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="Tech Stack"
              title="Architecture"
              titleHighlight="Layers"
              subtitle="My technology stack organized as a system architecture - from user interface to data persistence."
            />

            {/* Stack diagram visual */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-2xl bg-surface/60 border border-white/[0.06] p-6 overflow-hidden"
            >
              {/* Angled lines decoration */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-px bg-accent-cyan"
                    style={{
                      top: `${20 + i * 18}%`,
                      transform: `rotate(-3deg) scaleX(0.8)`,
                    }}
                  />
                ))}
              </div>

              <div className="relative flex flex-col gap-2.5">
                {orderedCategories.map((cat, i) => (
                  <motion.div
                    key={cat.layer}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                    style={{
                      background:
                        activeLayer === cat.layer
                          ? `${cat.color}12`
                          : "rgba(255,255,255,0.02)",
                      border: `1px solid ${activeLayer === cat.layer ? `${cat.color}25` : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-6 rounded-full"
                        style={{ background: cat.color }}
                      />
                      <span className="text-text-primary text-sm font-medium">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {cat.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono text-text-sub"
                        >
                          {s.split(".")[0]}
                        </span>
                      ))}
                      {cat.skills.length > 3 && (
                        <span className="text-[10px] font-mono text-text-sub ml-1">
                          +{cat.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-text-sub text-xs font-mono">
                  Total skills
                </span>
                <span className="text-accent-cyan font-mono font-bold text-sm">
                  {skillCategories.reduce((acc, c) => acc + c.skills.length, 0)}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Layer cards */}
          <div className="flex flex-col gap-3">
            {orderedCategories.map((category, i) => (
              <LayerCard
                key={category.layer}
                category={category}
                isActive={activeLayer === category.layer}
                onClick={() =>
                  setActiveLayer(
                    activeLayer === category.layer ? null : category.layer,
                  )
                }
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
