import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-5 pt-32 pb-24 md:px-8">
      <p className="rule-label text-accent">404 — route not found</p>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-cream">This endpoint doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md leading-relaxed text-fog">
        The page you requested returned <span className="font-mono text-cream">404</span>. Head back to the
        overview and pick a real route.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="rounded-md bg-cream px-6 py-3.5 font-mono text-[12px] font-semibold tracking-[0.08em] text-ink uppercase hover:bg-accent hover:text-white">
          Home →
        </Link>
        <Link to="/#projects" className="rounded-md border border-line px-6 py-3.5 font-mono text-[12px] tracking-[0.08em] text-cream uppercase hover:border-accent hover:text-accent">
          Projects
        </Link>
      </div>
    </main>
  );
}
