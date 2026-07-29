import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="font-ui text-[0.7rem] uppercase tracking-[0.36em] text-gold/80">404</p>
        <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-text text-balance">
          The path is quiet.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-muted">
          This page does not exist, but the retreat still does.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center border border-white/12 bg-white/8 px-6 py-3 font-ui text-[0.7rem] uppercase tracking-[0.3em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/12"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
