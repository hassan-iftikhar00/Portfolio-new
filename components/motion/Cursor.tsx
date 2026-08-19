"use client";

import { useEffect, useRef } from "react";

// Custom cursor using mix-blend-mode: difference — free, and it only reads in a
// monochrome system, so it is specific to Direction C. Decorative: the native
// cursor stays visible, this never captures input. Pointer-fine + no
// reduced-motion only (both gated in CSS via display:none; the effect also
// early-returns here so no listeners attach on touch / reduced-motion).
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const hot = !!t.closest("a, button, [data-cursor='hot']");
      el.classList.toggle("is-hot", hot);
    };

    const tick = () => {
      // Light lerp so it trails the pointer instead of snapping.
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx - 11}px, ${cy - 11}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
