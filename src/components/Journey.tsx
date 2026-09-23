import { JOURNEY } from "../data/content";
import Reveal from "./Reveal";

export default function Journey() {
  return (
    <section aria-labelledby="journey-title" className="border-b border-line bg-[#0c0b09]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="rule-label text-accent">04 — Journey</p>
          <h2 id="journey-title" className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem] md:leading-[1.1]">
            Education → projects → backend → AI systems.
          </h2>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-fog">
            A factual path — no invented job titles, no inflated roles. Each step is backed by work you can open above.
          </p>
        </Reveal>
        <ol className="relative mt-10 space-y-0 border-l border-line pl-0">
          {JOURNEY.map((j, i) => (
            <Reveal as="li" key={j.phase} delay={Math.min(i * 70, 280)} className="relative pl-8 pb-10 last:pb-0">
              <span aria-hidden="true" className={`absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full ${i === JOURNEY.length - 1 ? "bg-accent" : "border border-dim bg-ink"}`} />
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{j.phase}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-cream">{j.title}</h3>
              <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-fog">{j.text}</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${j.title} tags`}>
                {j.tags.map((t) => (
                  <li key={t} className="rounded border border-line px-2.5 py-1 font-mono text-[11px] tracking-wider text-dim">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
