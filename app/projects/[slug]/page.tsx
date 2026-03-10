import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} - Hassan Iftikhar`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Grid bg */}
      <div
        className="fixed inset-0 grid-bg opacity-100 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-text-sub text-sm font-mono hover:text-text-primary transition-colors duration-200 mb-8 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span
            className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-semibold border mb-4"
            style={{
              color: project.color,
              borderColor: `${project.color}40`,
              background: `${project.color}15`,
            }}
          >
            {project.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-text-sub leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-10"
          style={{
            background: `linear-gradient(90deg, ${project.color}50, transparent)`,
          }}
        />

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-text-primary font-bold text-lg mb-4">Overview</h2>
          <p className="text-text-sub leading-relaxed">{project.description}</p>
        </section>

        {/* Features */}
        <section className="mb-10">
          <h2 className="text-text-primary font-bold text-lg mb-4">
            Key Features
          </h2>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-text-sub">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke={project.color}
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech stack */}
        <section className="mb-10">
          <h2 className="text-text-primary font-bold text-lg mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg border text-sm font-mono"
                style={{
                  color: project.color,
                  borderColor: `${project.color}30`,
                  background: `${project.color}08`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Related projects */}
        {projects.filter((p) => p.id !== project.id).length > 0 && (
          <section>
            <h2 className="text-text-primary font-bold text-lg mb-4">
              Other Projects
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {projects
                .filter((p) => p.id !== project.id)
                .slice(0, 4)
                .map((related) => (
                  <Link
                    key={related.id}
                    href={`/projects/${related.slug}`}
                    className="p-4 rounded-xl bg-surface/60 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 group"
                  >
                    <div className="text-text-primary font-semibold text-sm mb-1 group-hover:text-accent-cyan transition-colors duration-200">
                      {related.title}
                    </div>
                    <div className="text-text-sub text-xs">
                      {related.tagline}
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
