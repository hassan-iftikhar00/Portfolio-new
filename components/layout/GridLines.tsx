// Server component, decorative. Two continuous vertical hairlines pinned to the
// content gutter, running the full viewport height behind everything. In a
// hairline ledger system the big vertical gaps between sections would otherwise
// read as unfinished void; these rules carry the column through the gaps so the
// emptiness reads as measured. Fixed (cheap, no reflow), pointer-events-none,
// aria-hidden, and sits below all content (z-0; content wrapper is z-10).
export default function GridLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {/* Lines sit OUTSIDE the content gutter (content pads to clamp(20px,5vw,72px);
          these sit ~10-28px further out) so text breathes off the rule instead of
          touching it. */}
      <div className="h-full px-[clamp(10px,3.4vw,44px)]">
        <div className="h-full w-full border-x border-line" />
      </div>
    </div>
  );
}
