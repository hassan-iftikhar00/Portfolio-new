"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { impactStats } from "@/lib/data";

// ─── Animated counter ─────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1200, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return count;
}

// Extract number and suffix: "20+" → { num: 20, suffix: "+" }
// "60fps" → { num: 60, suffix: "fps" } — "2+" → { num: 2, suffix: "+" }
function parseStatValue(value: string): {
  num: number;
  suffix: string;
  prefix: string;
} {
  const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (!match) return { num: 0, suffix: value, prefix: "" };
  return { num: parseInt(match[2], 10), suffix: match[3], prefix: match[1] };
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof impactStats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { num, suffix, prefix } = parseStatValue(stat.value);
  const count = useCountUp(num, 1000 + index * 100, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative group flex flex-col gap-3 p-6 rounded-2xl bg-surface/60 border border-white/[0.06] overflow-hidden cursor-default transition-all duration-300"
      style={{
        borderColor: inView ? `${stat.color}18` : undefined,
      }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${stat.color}10, transparent 60%)`,
        }}
      />

      {/* Top accent edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 opacity-50 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${stat.color}60, transparent)`,
        }}
      />

      {/* Value */}
      <div
        className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none tabular-nums"
        style={{ color: stat.color }}
      >
        {prefix}
        {count}
        {suffix}
      </div>

      {/* Label */}
      <div className="text-text-primary font-semibold text-sm leading-snug">
        {stat.label}
      </div>

      {/* Description */}
      <p className="text-text-sub text-xs leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Impact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section id="impact" className="relative py-20 md:py-28 overflow-hidden">
      {/* Horizontal scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-mono font-medium tracking-widest uppercase text-accent-cyan/80"
          >
            <span className="w-6 h-px bg-accent-cyan opacity-60" />
            Output
            <span className="w-6 h-px bg-accent-cyan opacity-60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary"
          >
            Production output across{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-violet">
              3+ years.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-sub text-base max-w-xl mx-auto"
          >
            Metrics from shipping production systems, SaaS products,
            and engineering tools.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
