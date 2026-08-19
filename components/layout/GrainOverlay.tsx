// Server component, decorative. A fixed film-grain wash over the whole page:
// an inline SVG feTurbulence noise, very low opacity, blended so it only adds
// texture to the flat black ground without hazing text. Zero asset, zero JS,
// pointer-events:none so it never captures input, aria-hidden from the a11y
// tree. Static, so nothing to gate under reduced-motion.
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#n)"/>
    </svg>`
  );

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-soft-light"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "140px 140px" }}
    />
  );
}
