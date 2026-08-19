import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1115",
        surface: "#171A21",
        card: "#1F232B",
        border: "#2A2F3A",
        accent: {
          cyan: "#C8CDD6",
          violet: "#7A8194",
          blue: "#E8EAEF",
        },
        text: {
          primary: "#E6E9EF",
          sub: "#8B929E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        "glow-cyan":
          "radial-gradient(ellipse at center, rgba(200,205,214,0.08) 0%, transparent 70%)",
        "glow-violet":
          "radial-gradient(ellipse at center, rgba(122,129,148,0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        "glow-cyan":
          "0 0 20px rgba(200,205,214,0.12), 0 0 60px rgba(200,205,214,0.04)",
        "glow-violet":
          "0 0 20px rgba(122,129,148,0.12), 0 0 60px rgba(122,129,148,0.04)",
        "glow-blue":
          "0 0 20px rgba(232,234,239,0.12), 0 0 60px rgba(232,234,239,0.04)",
        card: "0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        scan: "scan 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
