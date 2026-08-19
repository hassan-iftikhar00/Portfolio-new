import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="flex max-w-sm flex-col items-center gap-5 text-center">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent">
          404
        </span>
        <h1 className="text-4xl font-semibold text-text-primary">
          Page not found
        </h1>
        <p className="text-text-sub">
          That route does not exist. It may have moved or the link is broken.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-opacity duration-base hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
