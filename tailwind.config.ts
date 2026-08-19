import type { Config } from "tailwindcss";

// Design tokens live here, not scattered in components.
// Direction C — Hard monochrome brutalism. True black ground, white ink,
// two grey steps, hairline rules. No accent hue: the black<->white row
// inversion carries all emphasis. Names describe what the color is.
// Contrast on #000: mut ~6.1:1 (AA text), faint ~3.9:1 (large decorative only).

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000000", // page ground
        fg: "#FFFFFF", // primary ink
        mut: "#8A8A8A", // secondary text, AA on black (~6.1:1)
        faint: "#6A6A6A", // large decorative numerals only (~3.9:1, clears 3:1 large-text floor)
        card: "#0A0A0A", // near-black hover/fill wash
        line: "rgba(255,255,255,0.16)", // hairline rules
        line2: "rgba(255,255,255,0.30)", // stronger divider / focus
      },
      fontFamily: {
        // Unbounded = brutalist display (caps moments). General Sans = text +
        // the mixed-case display register. JetBrains Mono = labels only.
        display: ["var(--font-unbounded)", "system-ui", "sans-serif"],
        sans: ["General Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.06em" }], // 11px mono labels
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.45rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.0625rem", { lineHeight: "1.6rem" }],
        xl: ["1.375rem", { lineHeight: "1.6rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "3xl": ["2.25rem", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "4xl": ["3rem", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "5xl": ["3.75rem", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        // Brutalist: corners stay sharp. Kept minimal for the rare pill.
        none: "0",
        DEFAULT: "0",
        full: "9999px",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.45, 0, 0.15, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "360ms",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "char-in": {
          from: { transform: "translateY(105%)" },
          to: { transform: "translateY(0)" },
        },
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        "reveal-up": "reveal-up 640ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
