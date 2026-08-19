# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

_Last updated: 2026-08-17 (Phase 8 landed: measured perf/a11y pass, all hard constraints met)._

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build (also runs generateStaticParams for project pages)
npm run start    # serve production build
npm run lint     # next lint (eslint-config-next)
npm run analyze  # ANALYZE=true next build — opens bundle treemaps (client + server)
```

No test runner is configured. There is no test suite.

## Architecture

Personal portfolio, live-demo led on an editorial static shell. Next.js 14.2 App Router, TypeScript, Tailwind 3.4, React 18. Dark-mode only (`<html className="dark ...">`).

**Content is code, and it is the only source of truth.** All displayed content (owner, case studies, experience, skills) lives in `lib/data.ts` as typed exports — no CMS, database, or fetch. Every content shape (`CaseStudy`, `Experience`, `SkillGroup`, etc.) is typed at the top of that file. Facts come from the user's resume only; no invented projects, metrics, or dates. `decisions: []` means "not yet gathered," never faked.

**Server-first.** Everything renders as React Server Components by default, so all content is in the server HTML (readable JS-off, crawlable). There is no `ssr: false` on content and no boot animation in front of the LCP element.

**Page composition.** `app/page.tsx` is a server component that imports each section directly (no `next/dynamic`): `Navbar`, then `<main>` with `Hero` (LCP-safe H1) → `Work` → `Experience` → `Skills` → `Contact`, then `Footer`. Sections live in `components/sections/*.tsx` and are server components except where a client island is required.

**Client islands (only these).** `Navbar` (mobile menu toggle) and `Contact` (form posting to `/api/contact`, with a visible `mailto:` fallback that works JS-off). Case-study interactive artifacts are lazy, facade-gated client islands (see below).

**Case-study pages.** `app/projects/[slug]/page.tsx` is statically generated from the `caseStudies` array in `lib/data.ts` (`generateStaticParams` + `generateMetadata` both read it). Each page renders: header (category/status/problem/live+repo links), meta grid, stack chips, an architecture diagram, `chose/rejected/why` decision cards (rendered only if `decisions.length > 0`), and the interactive artifact. Adding a case study to the array creates its page automatically.

**Case-study artifact system** (`components/casestudy/`). The interactive proof degrades to static with JS off:
- `Architecture.tsx` — registry mapping a `architecture.component` string to a diagram; falls back to the caption in a dashed box.
- `PipelineDiagram.tsx` — server-rendered labeled-stage flow (down-arrows on mobile, right-arrows at `lg`), optional feedback-loop caption.
- `ArtifactFrame.tsx` — the facade. Renders the static fallback (its children) until "Run interactive demo" is clicked, then lazy-loads the live widget via `next/dynamic({ ssr: false })`. Keeps the widget out of first-load JS.
- `CodeCanvasWidget.tsx` — the live, dependency-free interactive island (draw boxes → generate React + Tailwind).
- `CodeCanvasStatic.tsx` — the server-rendered static preview used as the JS-off fallback (no poster PNG needed).

**Contact form.** `app/api/contact/route.ts` validates fields, then sends via Resend (`RESEND_API_KEY`). With no key set it logs the submission and returns success (the visible `mailto:` link is the user fallback, so nothing is lost). `CONTACT_FROM` overrides the sender; defaults to Resend's shared onboarding sender until a domain is verified. Delivers to `owner.email`.

**SEO / metadata.** `app/layout.tsx` sets `metadataBase`, title template, OG/Twitter, and injects `Person` JSON-LD; case-study pages inject `CreativeWork` JSON-LD. `app/sitemap.ts` and `app/robots.ts` are generated (robots disallows `/styleguide`). Favicon is `app/icon.svg` (monogram, no binary).

## Styling

Design tokens live in `tailwind.config.ts`, not scattered in components — see that file's header comment and the `/styleguide` route for the reference. The palette is honest (names describe the color): surfaces `background`/`surface`/`card`/`border`, one real `accent` (teal `#5EEAD4`, with `accent.ink`/`accent.dim`), text roles `text.primary`/`sub`/`faint`, and status `positive`/`warning`/`danger`. Also defined there: type scale, radii, two real elevation shadows (`card`/`lift`), and motion tokens (timing/duration + `fade-up`) reserved for Phase 10, every use reduced-motion gated. Contrast is verified ≥4.5:1 where a token carries text.

Fonts are self-hosted via `next/font/google` (Inter → `--font-inter`, JetBrains Mono → `--font-jetbrains`), wired in `app/layout.tsx` with `display: "swap"`. There is no render-blocking `<link>` or CSS `@import`. Global CSS (`:focus-visible` ring, reduced-motion guard, selection, scrollbar) is in `app/globals.css`.

## Status

- **Phase 6 done**: server shell (Hero/Work/Experience/Skills/Contact + Navbar/Footer), next/font, SEO base (metadata/JSON-LD/sitemap/robots/favicon), Resend contact route, and the full **CodeCanvas** case study (interactive widget + static fallback + pipeline diagram + one confirmed decision). Measured: first-load JS ~98 KB, LCP ~2.0s (Slow 4G + 4× CPU), CLS 0.00, Lighthouse a11y/best-practices/SEO all 100.
- **Phase 7 done**: FeedSnap, Peki, E-Voting case studies filled from real material (user-confirmed). Decisions now populated for all four studies (CodeCanvas 1, FeedSnap 2, Peki 1, E-Voting 2); `decisions[]` no longer empty anywhere. All four architecture diagrams registered in `components/casestudy/Architecture.tsx` (were caption-only fallbacks). Posters picked from `public/perProjectAssets/*` and copied to `public/images/projects/` (codecanvas/feedsnap `.png`, peki/evoting `.jpg`); facade cards (Peki, E-Voting) now render a live screenshot above Launch. FeedSnap artifact switched from dead `embed` to `kind: "recording"` (domain expired): native `<video preload="none" poster>` in the case-study page, asset at `public/images/projects/feedsnap-walkthrough.mp4`. Build clean, first-load JS still ~99 KB.
- **Phase 8 done**: measured perf/a11y pass on the production build (`next start`, chrome-devtools MCP). Lighthouse mobile on home + all four project pages: accessibility 100 / best-practices 100 / SEO 100 (agentic-browsing 100 except CodeCanvas 93, not a target). Perf (Slow 4G + 4× CPU): LCP home 2.34s, FeedSnap 1.82–2.56s across runs (text-LCP, render-delay bound; median under 2.5s), CLS 0.00 everywhere, first-load JS 98.8 KB home / 99 KB project. Visual breakpoints 320/1440/2560 on home + a case-study page: no overflow or break. JS-off verified from raw server HTML (H1, nav, resume link, mailto, case links, JSON-LD, video+mp4+poster, decision copy all present). Keyboard: skip-link focuses first with a visible teal `:focus-visible` ring; semantic landmarks + h1→h3 hierarchy clean. npm advisories cut 11→5 via non-breaking `npm audit fix`; the remaining 5 are Next 14.2.35's bundled postcss (build-time only, not shipped to the browser), fixable only by the breaking `next@16` upgrade — deliberately deferred to keep the pinned stack.
- **Phase 9 (next)**: deploy — ship to production, replace old site. Blocked on user-supplied assets below (`resume.pdf`, `og.png`) and `RESEND_API_KEY`.
- Later phase: motion polish (10).

## Not yet present / needs the user

- **Local `.env` is set** with `RESEND_API_KEY` + `NEXT_PUBLIC_SITE_URL` (both gitignored). For production these must be re-added in the Vercel project's Environment Variables; `.env` is not deployed. `CONTACT_FROM` is optional (defaults to Resend's shared `onboarding@resend.dev` sender until a custom domain is verified in Resend).
- `/public/resume.pdf` present. `/public/og.png` (1200×630) generated from real owner name + hero tagline in brand tokens.
- Deploy target: GitHub remote `hassan-iftikhar00/Portfolio-new` (branch `main`) → Vercel. Repo not locally Vercel-CLI-linked.
