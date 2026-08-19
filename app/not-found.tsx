import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <span className="font-mono text-2xs uppercase tracking-widest text-mut">
          404
        </span>
        <h1 className="font-sans text-[clamp(2.4rem,8vw,4rem)] font-semibold tracking-tight text-fg">
          Page not found
        </h1>
        <p className="text-mut">
          That route does not exist. It may have moved or the link is broken.
        </p>
        <Link
          href="/"
          data-cursor="hot"
          className="bg-fg px-6 py-3 font-mono text-2xs font-semibold uppercase tracking-widest text-bg transition-colors duration-base hover:bg-mut"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
