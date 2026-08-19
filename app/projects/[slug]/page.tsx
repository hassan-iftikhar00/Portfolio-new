import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies, owner } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Architecture from "@/components/casestudy/Architecture";
import ArtifactFrame from "@/components/casestudy/ArtifactFrame";
import CodeCanvasStatic from "@/components/casestudy/CodeCanvasStatic";
import Flag from "@/components/graphics/Flag";

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
      <dt className="font-mono text-2xs uppercase tracking-widest text-mut">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-fg">{value}</dd>
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
        <article className="mx-auto max-w-4xl px-[clamp(20px,5vw,72px)] py-14">
          <Link
            href="/#work"
            data-cursor="hot"
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest text-mut transition-colors duration-base hover:text-fg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest">
              <span className="text-mut">{cs.category}</span>
              {cs.status === "live" ? (
                <span className="inline-flex items-center gap-1.5 text-fg">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-fg motion-safe:animate-pulse"
                  />
                  Live
                </span>
              ) : (
                <span className="border border-line2 px-1.5 py-0.5 text-mut">
                  {cs.status === "demo" ? "Demo build" : "Archived"}
                </span>
              )}
              {cs.country ? (
                <span className="inline-flex items-center gap-1.5 text-mut">
                  <Flag
                    code={cs.country.code}
                    name={cs.country.name}
                    className="h-3.5 w-[21px] shrink-0 border border-line"
                  />
                  {cs.country.name}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 font-sans text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-tight text-fg">
              {cs.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-mut">{cs.problem}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {cs.liveUrl ? (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="hot"
                  className="bg-fg px-6 py-3 font-mono text-2xs font-semibold uppercase tracking-widest text-bg transition-colors duration-base hover:bg-mut"
                >
                  Open live app ↗
                </a>
              ) : null}
              {cs.repoUrl ? (
                <a
                  href={cs.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="hot"
                  className="border border-line2 px-6 py-3 font-mono text-2xs font-semibold uppercase tracking-widest text-fg transition-colors duration-base hover:border-fg"
                >
                  View source ↗
                </a>
              ) : null}
            </div>
          </header>

          {/* Meta grid */}
          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-3">
            <Meta label="Role" value={cs.role} />
            <Meta label="Timeframe" value={cs.timeframe} />
            {cs.metrics?.map((m) => (
              <Meta key={m.label} label={m.label} value={m.value} />
            ))}
          </dl>

          {/* Stack */}
          <section data-reveal className="mt-12">
            <h2 className="font-mono text-2xs uppercase tracking-[0.2em] text-mut">
              Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cs.stack.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2 py-1 font-mono text-2xs text-mut"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section data-reveal className="mt-14">
            <h2 className="font-mono text-2xs uppercase tracking-[0.2em] text-mut">
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
            <section data-reveal className="mt-14">
              <h2 className="font-mono text-2xs uppercase tracking-[0.2em] text-mut">
                Key decisions
              </h2>
              <div className="mt-4 space-y-px border border-line bg-line">
                {cs.decisions.map((d, i) => (
                  <div key={i} className="bg-bg p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest text-fg">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-fg"
                          />
                          Chose
                        </span>
                        <p className="mt-1.5 text-sm text-fg">{d.chose}</p>
                      </div>
                      <div>
                        <span className="font-mono text-2xs uppercase tracking-widest text-mut">
                          Rejected
                        </span>
                        <p className="mt-1.5 text-sm text-mut">{d.rejected}</p>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-line pt-4">
                      <span className="font-mono text-2xs uppercase tracking-widest text-mut">
                        Why
                      </span>
                      <p className="mt-1.5 text-sm text-mut">{d.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Interactive artifact — omitted for diagram-only studies, whose
              proof is the Architecture section above. */}
          {cs.artifact.kind !== "diagram" ? (
          <section data-reveal className="mt-14">
            <h2 className="font-mono text-2xs uppercase tracking-[0.2em] text-mut">
              Try it
            </h2>
            <div className="mt-4">
              {cs.artifact.kind === "facade" && cs.artifact.href ? (
                <a
                  href={cs.artifact.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="hot"
                  className="group block overflow-hidden border border-line transition-colors duration-base hover:border-fg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cs.artifact.poster}
                    alt={`${cs.title} live app screenshot`}
                    loading="lazy"
                    className="aspect-video w-full border-b border-line bg-card object-cover object-top grayscale transition-all duration-slow group-hover:grayscale-0"
                  />
                  <div className="flex items-center justify-between gap-4 p-6">
                    <span className="text-sm text-mut">
                      Open the live deployment in a new tab.
                    </span>
                    <span className="shrink-0 bg-fg px-5 py-2.5 font-mono text-2xs font-semibold uppercase tracking-widest text-bg transition-colors group-hover:bg-mut">
                      Launch ↗
                    </span>
                  </div>
                </a>
              ) : cs.artifact.kind === "recording" && cs.artifact.href ? (
                <figure className="overflow-hidden border border-line">
                  <video
                    controls
                    preload="none"
                    poster={cs.artifact.poster}
                    className="aspect-video w-full bg-card"
                  >
                    <source src={cs.artifact.href} type="video/mp4" />
                  </video>
                  <figcaption className="border-t border-line px-4 py-2 font-mono text-2xs uppercase tracking-widest text-mut">
                    Screen recording of the live product. Loads only on play.
                  </figcaption>
                </figure>
              ) : (
                <ArtifactFrame component={cs.artifact.component}>
                  {statics[cs.artifact.component ?? ""] ?? (
                    <div className="grid h-48 place-items-center border border-line text-sm text-mut">
                      Preview coming soon.
                    </div>
                  )}
                </ArtifactFrame>
              )}
            </div>
          </section>
          ) : null}

          {/* Screens — 2–3 real screenshots. Grayscale at rest, colour on hover,
              all lazy (below the fold). Omitted for diagram-only studies. */}
          {cs.gallery && cs.gallery.length > 0 ? (
            <section data-reveal className="mt-14">
              <h2 className="font-mono text-2xs uppercase tracking-[0.2em] text-mut">
                Screens
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cs.gallery.map((src, i) => (
                  <div
                    key={src}
                    className="group relative aspect-[16/10] overflow-hidden border border-line bg-card"
                  >
                    <Image
                      src={src}
                      alt={`${cs.title} screenshot ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top grayscale contrast-110 transition-all duration-slow group-hover:scale-[1.02] group-hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
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
