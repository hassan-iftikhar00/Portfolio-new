"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating() {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Testimonial Card ────────────────────────────────────────────────────────

const cardColors = [
  "#C8CDD6",
  "#7A8194",
  "#E8EAEF",
  "#8B929E",
  "#A3AAB8",
  "#B4BAC6",
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const color = cardColors[index % cardColors.length];

  return (
    <div className="testimonial-card flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[460px]">
      <div className="relative flex flex-col gap-6 p-8 h-full rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
          }}
        />

        {/* Quote icon + stars */}
        <div className="flex items-center justify-between">
          <StarRating />
          <svg
            className="w-8 h-8 opacity-10"
            fill="currentColor"
            viewBox="0 0 32 32"
            style={{ color }}
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
          </svg>
        </div>

        {/* Quote text */}
        <blockquote className="text-text-sub text-sm leading-relaxed flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: `${color}20`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <div className="text-text-primary font-semibold text-sm">
              {testimonial.name}
            </div>
            <div className="text-text-sub text-xs font-mono">
              {testimonial.company} · {testimonial.country}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials Section ────────────────────────────────────────────────────

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Calculate how far we need to scroll horizontally
    const getScrollDistance = () => {
      return track.scrollWidth - track.clientWidth;
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden"
    >
      {/* Heading — pinned section starts here */}
      <div className="pt-24 md:pt-32 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-4 text-center">
          <SectionHeading
            eyebrow="Feedback"
            title="Client"
            titleHighlight="Reviews"
            subtitle="From Fiverr clients across multiple countries."
            align="center"
          />
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-6 lg:px-8 pb-24 md:pb-32"
        style={{ willChange: "transform" }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}

        {/* End spacer for clean scroll finish */}
        <div className="flex-shrink-0 w-8" />
      </div>
    </section>
  );
}
