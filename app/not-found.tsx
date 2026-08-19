import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div
        className="fixed inset-0 grid-bg pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative text-center flex flex-col items-center gap-6 px-6">
        <div className="font-mono text-accent-cyan text-sm uppercase tracking-widest opacity-60">
          404
        </div>
        <h1 className="text-5xl font-extrabold text-text-primary">
          Page Not Found
        </h1>
        <p className="text-text-sub text-lg max-w-sm">
          This route doesn't exist. Maybe you followed a broken link.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-background font-semibold text-sm hover:bg-accent-cyan/90 transition-colors duration-200"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </main>
  );
}
