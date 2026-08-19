"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll-reveal driver. Watches every [data-reveal] element and adds `.is-in`
// when it scrolls into view, which the CSS animates (fade + rise). Works in
// every browser (IntersectionObserver is universal), unlike the CSS-only
// animation-timeline approach it replaces (Chrome/Edge only).
//
// JS-off safe: the hidden state lives under `html.js-reveal`, a class only this
// component adds, so with no JS every [data-reveal] stays fully visible.
// Reduced-motion safe: if the user asks for less motion we never add the class,
// so nothing hides and nothing moves.
//
// No above-fold flash: runs in useLayoutEffect (before the browser paints) and
// marks anything already on screen as `is-in` synchronously, so only genuinely
// below-fold elements start hidden.
export default function Reveal() {
  // Re-scan on every route change. This component lives in the root layout,
  // which does NOT remount on client-side navigation, so without the pathname
  // dep the observer would only ever watch the first page's elements — the new
  // page's [data-reveal] nodes would stay hidden (opacity:0 under .js-reveal)
  // until a full reload. Keying on pathname re-runs the scan per navigation.
  const pathname = usePathname();
  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // leave everything visible and static

    root.classList.add("js-reveal");
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const vh = window.innerHeight;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target); // reveal once, then stop watching
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );

    for (const el of els) {
      // Already on screen at load → show now (before paint), no flash.
      if (el.getBoundingClientRect().top < vh * 0.92) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
