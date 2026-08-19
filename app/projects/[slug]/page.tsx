import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies, owner } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Architecture from "@/components/casestudy/Architecture";
import ArtifactFrame from "@/components/casestudy/ArtifactFrame";
import CodeCanvasStatic from "@/components/casestudy/CodeCanvasStatic";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return { title: "Not found" };
  return {
    title: cs.title,
    description: cs.problem,
    alternates: { canonical: `/projects/${cs.slug}` },
    openGraph: {
      title: `${cs.title} · ${owner.name}`,
      description: cs.problem,
      url: `/projects/${cs.slug}`,
    },
  };
}

// Static preview registry: which server component paints the JS-off fallback.
const statics: Record<string, React.ReactNode> = {
  CodeCanvasWidget: <CodeCanvasStatic />,
};

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-2xs uppercase tracking-widest text-text-faint">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-text-primary">{value}</dd>
    </div>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    description: cs.problem,
    author: { "@type": "Person", name: owner.name },
    ...(cs.liveUrl ? { url: cs.liveUrl } : {}),
    ...(cs.repoUrl ? { codeRepository: cs.repoUrl } : {}),
    keywords: cs.stack.join(", "),
  };

  return (
    <>
      <Navbar />
      <main id="main">
        <article className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-text-sub transition-colors duration-base hover:text-text-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xs uppercase tracking-widest text-text-faint">
                {cs.category}
              </span>
              {cs.status === "live" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/30 bg-positive/10 px-2.5 py-1 text-2xs font-medium text-positive">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                  Live
                </span>
              ) : (
                <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-2xs font-medium text-text-sub">
                  Archived
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary">
              {cs.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-text-sub">{cs.problem}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {cs.liveUrl ? (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity duration-base hover:opacity-90"
                >
                  Open live app
                </a>
              ) : null}
              {cs.repoUrl ? (
                <a
                  href={cs.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-text-primary transition-colors duration-base hover:border-accent-dim"
                >
                  View source
                </a>
              ) : null}
            </div>
          </header>

          {/* Meta grid */}
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
            <Meta label="Role" value={cs.role} />
            <Meta label="Timeframe" value={cs.timeframe} />
            {cs.metrics?.map((m) => (
              <Meta key={m.label} label={m.label} value={m.value} />
            ))}
          </dl>

          {/* Stack */}
          <section className="mt-10">
            <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
              Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cs.stack.map((t) => (
                <span
                  key={t}
                  className="rounded border border-border bg-surface px-2 py-1 font-mono text-2xs text-text-sub"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="mt-12">
            <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
              Architecture
            </h2>
            <div className="mt-4">
              <Architecture
                component={cs.architecture.component}
                caption={cs.architecture.caption}
              />
            </div>
          </section>

          {/* Decisions */}
          {cs.decisions.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
                Key decisions
              </h2>
              <div className="mt-4 space-y-4">
                {cs.decisions.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-6 shadow-card"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <span className="font-mono text-2xs uppercase tracking-widest text-positive">
                          Chose
                        </span>
                        <p className="mt-1.5 text-sm text-text-primary">
                          {d.chose}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-2xs uppercase tracking-widest text-text-faint">
                          Rejected
                        </span>
                        <p className="mt-1.5 text-sm text-text-sub">
                          {d.rejected}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-border pt-4">
                      <span className="font-mono text-2xs uppercase tracking-widest text-accent">
                        Why
                      </span>
                      <p className="mt-1.5 text-sm text-text-sub">{d.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Interactive artifact */}
          <section className="mt-12">
            <h2 className="font-mono text-2xs uppercase tracking-widest text-accent">
              Try it
            </h2>
            <div className="mt-4">
              {cs.artifact.kind === "facade" && cs.artifact.href ? (
                <a
                  href={cs.artifact.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-base hover:border-accent-dim"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cs.artifact.poster}
                    alt={`${cs.title} live app screenshot`}
                    loading="lazy"
                    className="aspect-video w-full border-b border-border bg-card object-cover object-top"
                  />
                  <div className="flex items-center justify-between gap-4 p-6">
                    <span className="text-sm text-text-sub">
                      Open the live deployment in a new tab.
                    </span>
                    <span className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">
                      Launch
                    </span>
                  </div>
                </a>
              ) : cs.artifact.kind === "recording" && cs.artifact.href ? (
                <figure className="overflow-hidden rounded-xl border border-border bg-surface">
                  <video
                    controls
                    preload="none"
                    poster={cs.artifact.poster}
                    className="aspect-video w-full bg-card"
                  >
                    <source src={cs.artifact.href} type="video/mp4" />
                  </video>
                  <figcaption className="border-t border-border px-4 py-2 text-2xs text-text-faint">
                    Screen recording of the live product. Loads only on play.
                  </figcaption>
                </figure>
              ) : (
                <ArtifactFrame component={cs.artifact.component}>
                  {statics[cs.artifact.component ?? ""] ?? (
                    <div className="grid h-48 place-items-center text-sm text-text-faint">
                      Preview coming soon.
                    </div>
                  )}
                </ArtifactFrame>
              )}
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
