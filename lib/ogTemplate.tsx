// Shared Open Graph card, brutalist mono look (matches the site: true-black
// ground, white ink, hairline frame, mono eyebrow). Rendered by next/og
// (satori) at build time — no binary asset committed. Uses satori's built-in
// default font (the local woff2 fonts can't be fed to satori, which needs
// TTF/OTF/woff), so the type is a heavy default sans, not Unbounded. Good
// enough for a 1200×630 card; the whole thing stays zero-asset.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgCard({
  eyebrow,
  title,
  tail,
}: {
  eyebrow: string;
  title: string;
  tail: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: 56,
        border: "2px solid #ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#8A8A8A",
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: -3,
          maxWidth: 1040,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 26,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", color: "#8A8A8A", maxWidth: 820 }}>
          {tail}
        </div>
        <div style={{ display: "flex", color: "#ffffff" }}>Hassan Iftikhar</div>
      </div>
    </div>
  );
}
