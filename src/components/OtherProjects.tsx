import { OTHER_PROJECTS } from "../data/content";
import Reveal from "./Reveal";

export default function OtherProjects() {
  return (
    <section id="other" aria-labelledby="other-title" className="scroll-mt-20 border-b border-line bg-[#0c0b09]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="rule-label text-accent">Also built</p>
              <h2 id="other-title" className="mt-3 font-display text-2xl font-medium tracking-tight text-cream md:text-3xl">
                Smaller projects, same care.
              </h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">Compact index — less emphasis, full honesty</p>
          </div>
        </Reveal>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {OTHER_PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={Math.min(i * 60, 240)} className="bg-coal p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{p.kind}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-cream">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{p.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${p.title} stack`}>
                {p.stack.map((s) => (
                  <li key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[10.5px] tracking-wider text-dim">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
