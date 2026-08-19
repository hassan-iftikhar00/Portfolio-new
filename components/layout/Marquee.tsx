// Server component. One CSS-only texture strip. The track is duplicated so the
// -50% translate loops seamlessly; animation is reduced-motion gated globally.
// Terms are set as texture (mono, faint), aria-hidden — decorative, not content.

const TERMS = [
  "Full Stack Developer",
  "React",
  "Next.js",
  "Vue",
  "Node",
  "C# ASP.NET Core",
  "TypeScript",
  "Available for work",
  "Lahore, Pakistan",
];

export default function Marquee() {
  const track = [...TERMS, ...TERMS];
  return (
    <div
      className="overflow-hidden border-y border-line py-3"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {track.map((t, i) => (
          <span
            key={i}
            className="mx-0 flex items-center font-mono text-2xs uppercase tracking-[0.14em] text-mut"
          >
            {t}
            <span className="mx-7 text-faint">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
