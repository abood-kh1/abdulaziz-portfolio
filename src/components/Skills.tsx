import { SKILL_GROUPS } from "../data/content";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="rule-label text-accent">03 — Skills</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 id="skills-title" className="font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem]">
              A backend toolkit, grouped honestly.
            </h2>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-wider text-dim uppercase">
              No percentage bars — labels you can verify in the code
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={Math.min(i * 60, 300)} className="bg-coal p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-[13px] font-semibold tracking-[0.18em] text-cream uppercase">{g.title}</h3>
                <span className="font-mono text-[10px] tracking-wider text-accent">0{i + 1}</span>
              </div>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-dim">{g.note}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-line bg-ink px-3 py-1.5 text-[13px] font-medium text-sand transition-colors hover:border-accent hover:text-cream"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
