"use client";

import { useEffect } from "react";

// Drives the scroll-linked tilt of the extruded hero word (.hero-extrude).
// As the page scrolls through the hero, it updates --hx / --hy (the rotateX /
// rotateY the CSS reads), so the depth responds to scroll position rather than
// looping on its own. A tiny rAF-throttled scroll listener — updating only two
// CSS custom properties that feed a composited transform, so per-frame cost is
// negligible. Uses a JS scroll listener rather than CSS animation-timeline:
// scroll() on purpose: that CSS feature is Chrome/Edge-only, so on Firefox and
// Safari the tilt would never move; this works everywhere.
//
// Reduced-motion: does nothing, leaving the CSS base tilt (static extrusion).
export default function HeroTilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.querySelector<HTMLElement>("[data-hero-extrude]");
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // Progress through the hero band (0 at top, 1 once ~80% scrolled past).
      const p = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.8), 0), 1);
      const hx = 9 - p * 20; // 9deg → -11deg
      const hy = -7 + p * 18; // -7deg → 11deg
      el.style.setProperty("--hx", `${hx.toFixed(2)}deg`);
      el.style.setProperty("--hy", `${hy.toFixed(2)}deg`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
