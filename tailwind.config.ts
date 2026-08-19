import type { Config } from "tailwindcss";

// Design tokens live here, not scattered in components.
// Palette is honest: names describe what the color is, values verified for
// WCAG AA (>=4.5:1) where the token carries text. See /styleguide for the reference.

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces, darkest to lightest.
        background: "#0B0D10",
        surface: "#13161B",
        card: "#1B1F26",
        border: "#282D37",
        // One real accent (teal). accent = highlights/links/focus;
        // ink = text placed on an accent fill; dim = borders/hover washes.
        accent: {
          DEFAULT: "#5EEAD4",
          ink: "#04140F",
          dim: "#2A6F63",
        },
        // Text roles. Contrast on `background`: primary ~16:1, sub ~9:1, faint ~5.5:1.
        text: {
          primary: "#EAECEF",
          sub: "#AEB6C2",
          faint: "#858D9B",
        },
        // Status. Used sparingly for live/archived badges, form states.
        positive: "#4ADE80",
        warning: "#FBBF24",
        danger: "#F87171",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Type scale, ~1.25 (major third). Line-heights tuned per step.
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.02em" }], // 11px, labels
        xs: ["0.75rem", { lineHeight: "1.1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.4rem" }], // 14px
        base: ["1rem", { lineHeight: "1.65rem" }], // 16px body
        lg: ["1.125rem", { lineHeight: "1.7rem" }], // 18px
        xl: ["1.375rem", { lineHeight: "1.8rem" }], // 22px
        "2xl": ["1.75rem", { lineHeight: "2.1rem", letterSpacing: "-0.01em" }], // 28px
        "3xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.015em" }], // 36px
        "4xl": ["3rem", { lineHeight: "3.1rem", letterSpacing: "-0.02em" }], // 48px
        "5xl": ["3.75rem", { lineHeight: "3.9rem", letterSpacing: "-0.025em" }], // 60px
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        // Real elevation, not glow. One soft shadow + a hairline top edge.
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 30px rgba(0,0,0,0.45)",
        lift: "0 12px 40px rgba(0,0,0,0.55)",
      },
      transitionTimingFunction: {
        // Motion tokens. Used by Phase 10 polish; every use is reduced-motion gated.
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.45, 0, 0.15, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "360ms",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 360ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
