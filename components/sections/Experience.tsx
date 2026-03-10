"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 w-[40vw] h-[50vh] bg-accent-cyan/[0.03] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <SectionHeading
            eyebrow="Timeline"
            title="Engineering"
            titleHighlight="History"
            subtitle="Leading engineering teams and shipping production SaaS platforms."
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[200px] lg:left-[240px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/30 via-accent-violet/20 to-transparent" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-10"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[-5px] md:left-[195px] lg:left-[235px] top-8 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: exp.color,
                    background: "#0F1115",
                    boxShadow: `0 0 8px ${exp.color}60`,
                  }}
                />

                {/* Date (left column) */}
                <div className="hidden md:flex flex-col items-end justify-start w-[180px] lg:w-[220px] flex-shrink-0 pt-7">
                  <span className="text-xs font-mono text-right text-text-sub">
                    {exp.period}
                  </span>
                </div>

                {/* Card (right column) */}
                <div className="flex-1 pl-6 md:pl-10">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] p-6 hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-60"
                      style={{
                        background: `linear-gradient(90deg, ${exp.color}60, transparent)`,
                      }}
                    />

                    {/* Background glow on hover */}
                    <div
                      className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2"
                      style={{ background: `${exp.color}15` }}
                    />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: exp.color,
                              boxShadow: `0 0 6px ${exp.color}`,
                            }}
                          />
                          <h3 className="text-text-primary font-bold text-lg">
                            {exp.company}
                          </h3>
                        </div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: exp.color }}
                        >
                          {exp.role}
                        </p>
                      </div>

                      {/* Mobile date */}
                      <span className="sm:hidden text-xs font-mono text-text-sub">
                        {exp.period}
                      </span>

                      {/* Desktop period badge */}
                      <span className="hidden sm:block text-xs font-mono text-text-sub bg-white/5 px-3 py-1.5 rounded-lg border border-white/[0.06] whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-text-sub text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-5">
                      <h4 className="text-text-primary text-xs font-mono font-semibold uppercase tracking-widest mb-3 opacity-60">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-2.5 text-text-sub text-sm"
                          >
                            <svg
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke={exp.color}
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-text-sub"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
