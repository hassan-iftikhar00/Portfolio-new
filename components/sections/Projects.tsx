"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";

// ─── Project Detail Modal ──────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-white/[0.08] shadow-[0_32px_100px_rgba(0,0,0,0.6)]"
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-sub hover:text-text-primary hover:bg-white/10 transition-all duration-200"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold border"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    background: `${project.color}15`,
                  }}
                >
                  {project.category}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
              <h3 className="text-2xl font-bold text-text-primary">
                {project.title}
              </h3>
              <p className="text-text-sub text-sm font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-text-sub text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-text-primary font-semibold text-sm mb-3 font-mono">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-text-sub text-sm"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke={project.color}
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h4 className="text-text-primary font-semibold text-sm mb-3 font-mono">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="default" size="md">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Featured Project Card (first project, larger) ──────────────────────────

function FeaturedProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="relative text-left w-full p-8 rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden group"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${project.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold border"
              style={{
                color: project.color,
                borderColor: `${project.color}40`,
                background: `${project.color}15`,
              }}
            >
              {project.category}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Visit Site
              </a>
            )}
          </div>

          <h3 className="text-2xl font-bold text-text-primary">
            {project.title}
          </h3>
          <p className="text-text-sub text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-text-sub text-[11px] font-mono bg-white/5 px-2.5 py-1 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-text-primary font-semibold text-xs font-mono uppercase tracking-wider">
            Features
          </h4>
          <ul className="space-y-2">
            {project.features.slice(0, 5).map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-text-sub text-sm"
              >
                <svg
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke={project.color}
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-8">
        <svg
          className="w-5 h-5 text-text-sub group-hover:text-text-primary group-hover:translate-x-1 transition-all duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m13.5 4.5 6 6m0 0-6 6m6-6H3"
          />
        </svg>
      </div>
    </motion.button>
  );
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="relative text-left flex flex-col gap-4 p-6 rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden group"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${project.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border"
              style={{
                color: project.color,
                borderColor: `${project.color}30`,
                background: `${project.color}10`,
              }}
            >
              {project.category}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Visit Site
              </a>
            )}
          </div>
          <svg
            className="w-4 h-4 text-text-sub group-hover:text-text-primary group-hover:translate-x-0.5 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m13.5 4.5 6 6m0 0-6 6m6-6H3"
            />
          </svg>
        </div>

        <div>
          <h3 className="text-text-primary font-semibold text-base mb-1">
            {project.title}
          </h3>
          <p className="text-text-sub text-sm leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-text-sub text-[11px] font-mono bg-white/5 px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-text-sub text-[11px] font-mono bg-white/5 px-2 py-0.5 rounded-md">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Case Studies"
            title="Technical"
            titleHighlight="Work"
            subtitle="Production systems shipped across SaaS, marketplaces, and engineering tools."
          />
        </div>

        {/* Featured project */}
        <FeaturedProjectCard
          project={featured}
          onClick={() => setSelectedProject(featured)}
        />

        {/* Grid of remaining projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
