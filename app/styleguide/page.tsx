import type { Metadata } from "next";

// Phase 5 deliverable: the honest design-system reference.
// Server-rendered, zero client JS. Review this before any real page is built.
// Not linked from the site, not indexed.

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const surfaces = [
  { name: "background", hex: "#0B0D10", use: "Page base" },
  { name: "surface", hex: "#13161B", use: "Raised sections" },
  { name: "card", hex: "#1B1F26", use: "Cards, inputs" },
  { name: "border", hex: "#282D37", use: "Hairlines, dividers" },
];

const accents = [
  { name: "accent", hex: "#5EEAD4", use: "Links, focus, highlights" },
  { name: "accent.ink", hex: "#04140F", use: "Text on accent fills" },
  { name: "accent.dim", hex: "#2A6F63", use: "Borders, hover washes" },
];

const texts = [
  { name: "text.primary", hex: "#EAECEF", ratio: "~16:1", use: "Headings, body" },
  { name: "text.sub", hex: "#AEB6C2", ratio: "~9:1", use: "Secondary copy" },
  { name: "text.faint", hex: "#858D9B", ratio: "~5.5:1", use: "Labels, captions" },
];

const status = [
  { name: "positive", hex: "#4ADE80", use: "Live badge" },
  { name: "warning", hex: "#FBBF24", use: "Caution state" },
  { name: "danger", hex: "#F87171", use: "Form errors" },
];

const typeScale = [
  { token: "text-5xl", px: "60", label: "Display" },
  { token: "text-4xl", px: "48", label: "Page title" },
  { token: "text-3xl", px: "36", label: "Section title" },
  { token: "text-2xl", px: "28", label: "Subsection" },
  { token: "text-xl", px: "22", label: "Lead" },
  { token: "text-lg", px: "18", label: "Large body" },
  { token: "text-base", px: "16", label: "Body" },
  { token: "text-sm", px: "14", label: "Small" },
  { token: "text-xs", px: "12", label: "Fine print" },
  { token: "text-2xs", px: "11", label: "Mono label" },
];

const spacing = [1, 2, 3, 4, 6, 8, 12, 16];
const radii = [
  { token: "rounded-sm", cls: "rounded-sm" },
  { token: "rounded", cls: "rounded" },
  { token: "rounded-lg", cls: "rounded-lg" },
  { token: "rounded-xl", cls: "rounded-xl" },
];

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-14">
      <div className="mb-8">
        <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
          {title}
        </h2>
        {note ? <p className="mt-2 text-sm text-text-sub">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Swatch({
  name,
  hex,
  use,
  ratio,
}: {
  name: string;
  hex: string;
  use: string;
  ratio?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div
        className="mb-3 h-16 w-full rounded border border-border"
        style={{ backgroundColor: hex }}
      />
      <div className="font-mono text-xs text-text-primary">{name}</div>
      <div className="font-mono text-2xs text-text-faint">{hex}</div>
      {ratio ? (
        <div className="mt-1 font-mono text-2xs text-accent">{ratio} on bg</div>
      ) : null}
      <div className="mt-1 text-2xs text-text-sub">{use}</div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <header className="pb-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-text-faint">
          Design system
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-text-primary">
          Style guide
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-sub">
          The single source of truth for color, type, spacing, and motion.
          Every real page is built from these tokens. Reviewed before the build,
          not after.
        </p>
      </header>

      <Section
        title="Color — surfaces"
        note="Darkest to lightest. Structure comes from these four, not from glow."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {surfaces.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
      </Section>

      <Section
        title="Color — accent"
        note="One accent, used deliberately. Not a rainbow of mislabeled greys."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {accents.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
      </Section>

      <Section
        title="Color — text"
        note="Each role verified for WCAG AA (>=4.5:1) on the page background."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {texts.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-border bg-surface p-6">
          <p className="text-base text-text-primary">
            Primary text. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="mt-2 text-base text-text-sub">
            Secondary text. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="mt-2 text-sm text-text-faint">
            Faint text for labels and captions. The quick brown fox.
          </p>
        </div>
      </Section>

      <Section title="Color — status" note="Used sparingly for state only.">
        <div className="grid grid-cols-3 gap-4">
          {status.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
      </Section>

      <Section
        title="Typography"
        note="Inter for prose, JetBrains Mono for labels and code. Scale ~1.25."
      >
        <div className="space-y-4">
          {typeScale.map((t) => (
            <div
              key={t.token}
              className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3"
            >
              <span className={t.token + " text-text-primary"}>
                {t.label}
              </span>
              <span className="shrink-0 font-mono text-2xs text-text-faint">
                {t.token} · {t.px}px
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-border bg-card p-5">
          <p className="font-mono text-sm text-text-sub">
            <span className="text-accent">const</span> mono ={" "}
            <span className="text-text-primary">
              &quot;JetBrains Mono for code and technical labels&quot;
            </span>
            ;
          </p>
        </div>
      </Section>

      <Section
        title="Spacing"
        note="4px base unit. Tailwind scale, no arbitrary values in components."
      >
        <div className="space-y-2">
          {spacing.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-16 shrink-0 font-mono text-2xs text-text-faint">
                {s} · {s * 4}px
              </span>
              <div
                className="h-4 rounded-sm bg-accent-dim"
                style={{ width: `${s * 4}px` }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r.token} className="text-center">
              <div
                className={`h-20 w-20 border border-border bg-card ${r.cls}`}
              />
              <div className="mt-2 font-mono text-2xs text-text-faint">
                {r.token}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Focus"
        note="Tab to each control. A 2px accent ring is the single focus token, applied via :focus-visible."
      >
        <div className="flex flex-wrap items-center gap-4">
          <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">
            Primary button
          </button>
          <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-text-primary transition-colors duration-base hover:border-accent-dim">
            Secondary button
          </button>
          <a
            href="#"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Text link
          </a>
          <input
            type="text"
            placeholder="Input field"
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-faint"
          />
        </div>
      </Section>

      <Section title="Primitives" note="Badges and chips reused across case studies.">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/30 bg-positive/10 px-2.5 py-1 text-2xs font-medium text-positive">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            Live
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-2xs font-medium text-text-sub">
            Archived
          </span>
          <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-2xs text-text-sub">
            Next.js
          </span>
          <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-2xs text-text-sub">
            TypeScript
          </span>
        </div>
        <div className="mt-6 max-w-md rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="text-xl font-semibold text-text-primary">Card</h3>
          <p className="mt-2 text-sm text-text-sub">
            One soft shadow plus a hairline top edge. Real elevation, no glow.
          </p>
        </div>
      </Section>

      <Section
        title="Motion"
        note="Durations fast/base/slow with out-expo easing. Every animation is gated behind prefers-reduced-motion."
      >
        <div className="animate-fade-up rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-text-sub">
            This block uses <span className="font-mono text-accent">animate-fade-up</span>.
            With reduced-motion enabled it appears instantly, no transform.
          </p>
        </div>
      </Section>
    </main>
  );
}
