// Small colored SVG flags. Deliberately the one place colour is allowed back in
// (the rest of the site is locked monochrome) — used to mark each project's
// client country. Inline SVG, not emoji: Windows has no flag emoji glyphs (it
// renders the ISO letters instead), so emoji would be unreliable. Registry keyed
// by lowercase ISO-3166 alpha-2.

// Five-point star polygon points, centred (cx,cy), outer radius r.
function star(cx: number, cy: number, r: number): string {
  const inner = r * 0.382;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : inner;
    pts.push(`${(cx + rr * Math.cos(rad)).toFixed(2)},${(cy + rr * Math.sin(rad)).toFixed(2)}`);
  }
  return pts.join(" ");
}

type FlagProps = { code: string; name: string; className?: string };

// Each flag is drawn in a 30×20 viewBox (3:2).
const flags: Record<string, (name: string) => React.ReactNode> = {
  pk: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="20" fill="#01411C" />
      <rect width="7.5" height="20" fill="#fff" />
      <circle cx="18.5" cy="10" r="5" fill="#fff" />
      <circle cx="20.3" cy="8.7" r="4.2" fill="#01411C" />
      <polygon points={star(22.2, 8.2, 2.1)} fill="#fff" />
    </>
  ),
  gh: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="6.667" fill="#CE1126" />
      <rect y="6.667" width="30" height="6.667" fill="#FCD116" />
      <rect y="13.333" width="30" height="6.667" fill="#006B3F" />
      <polygon points={star(15, 10, 3.1)} fill="#000" />
    </>
  ),
  // Union Jack, simplified: diagonals + upright cross, white then red.
  gb: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2" />
      <rect x="12" width="6" height="20" fill="#fff" />
      <rect y="7" width="30" height="6" fill="#fff" />
      <rect x="13.5" width="3" height="20" fill="#C8102E" />
      <rect y="8.5" width="30" height="3" fill="#C8102E" />
    </>
  ),
  tr: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="12" cy="10" r="5" fill="#fff" />
      <circle cx="13.6" cy="10" r="4" fill="#E30A17" />
      <polygon points={star(17.6, 10, 2.2)} fill="#fff" />
    </>
  ),
  in: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="6.667" fill="#FF9933" />
      <rect y="6.667" width="30" height="6.667" fill="#fff" />
      <rect y="13.333" width="30" height="6.667" fill="#138808" />
      <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth="0.5" />
      <circle cx="15" cy="10" r="0.5" fill="#000080" />
    </>
  ),
  ca: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="20" fill="#fff" />
      <rect width="7.5" height="20" fill="#D80621" />
      <rect x="22.5" width="7.5" height="20" fill="#D80621" />
      <polygon
        points="15,4 16,8 19.5,7 17.5,10 21,11 17,12 17.5,16 15,13.5 12.5,16 13,12 9,11 12.5,10 10.5,7 14,8"
        fill="#D80621"
      />
    </>
  ),
  us: (name) => (
    <>
      <title>{name} flag</title>
      <rect width="30" height="20" fill="#fff" />
      <rect y="0" width="30" height="1.54" fill="#B22234" />
      <rect y="3.08" width="30" height="1.54" fill="#B22234" />
      <rect y="6.16" width="30" height="1.54" fill="#B22234" />
      <rect y="9.24" width="30" height="1.54" fill="#B22234" />
      <rect y="12.32" width="30" height="1.54" fill="#B22234" />
      <rect y="15.4" width="30" height="1.54" fill="#B22234" />
      <rect y="18.48" width="30" height="1.52" fill="#B22234" />
      <rect width="12" height="10.78" fill="#3C3B6E" />
    </>
  ),
};

export default function Flag({ code, name, className }: FlagProps) {
  const draw = flags[code.toLowerCase()];
  if (!draw) return null;
  return (
    <svg
      viewBox="0 0 30 20"
      role="img"
      aria-label={`${name} flag`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {draw(name)}
    </svg>
  );
}
