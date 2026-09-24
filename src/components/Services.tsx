import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useTranslation } from "../context/LanguageContext";

export default function Services() {
  const { t } = useTranslation();
  const SERVICES = t.services.items;
  const [active, setActive] = useState<string>(SERVICES[0].id);
  const current = SERVICES.find((s) => s.id === active) ?? SERVICES[0];

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 border-b border-line bg-[#0c0b09]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="rule-label text-accent">{t.services.label}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 id="services-title" className="font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem]">
              {t.services.title}
            </h2>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-wider text-dim uppercase">
              {t.services.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line" role="tablist" aria-label="Services">
            {SERVICES.map((s) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      const idx = SERVICES.findIndex((x) => x.id === active);
                      const next = e.key === "ArrowDown" ? (idx + 1) % SERVICES.length : (idx - 1 + SERVICES.length) % SERVICES.length;
                      setActive(SERVICES[next].id);
                    }
                  }}
                  className={`flex w-full items-center justify-between gap-4 p-5 text-left transition-colors ${isActive ? "bg-cream text-ink" : "bg-coal text-cream hover:bg-panel"}`}
                >
                  <span>
                    <span className="block font-mono text-[13px] font-semibold tracking-[0.16em] uppercase">{s.title}</span>
                    <span className={`mt-1 block text-sm ${isActive ? "text-ink/70" : "text-fog"}`}>{s.short}</span>
                  </span>
                  <span aria-hidden="true" className={`hidden font-mono text-lg sm:block ${isActive ? "text-ink" : "text-accent"} ${isActive ? "translate-x-1" : ""} transition-transform`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <Reveal key={current.id} className="rounded-2xl border border-line bg-coal p-6 md:p-8">
            <p className="rule-label text-accent">{current.title}</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-cream md:text-3xl">{current.title}</h3>
            <p className="mt-3 max-w-prose leading-relaxed text-fog">{current.detail}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{t.services.technologies}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {current.tech.map((tech) => (
                    <li key={tech} className="rounded-md border border-line bg-ink px-3 py-1.5 font-mono text-[11px] tracking-wider text-sand">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{t.services.whatIDeliver}</p>
                <ul className="mt-3 space-y-2">
                  {current.deliver.map((d) => (
                    <li key={d} className="flex gap-2 text-sm leading-relaxed text-sand">
                      <span aria-hidden="true" className="text-accent">▸</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{t.services.relatedProjects}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.projects.map((p) =>
                  p.slug ? (
                    <Link key={p.name} to={`/projects/${p.slug}`} className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[12px] tracking-wider text-cream hover:bg-accent hover:text-white">
                      {p.name} →
                    </Link>
                  ) : (
                    <span key={p.name} className="rounded-full border border-line bg-ink px-4 py-2 font-mono text-[12px] tracking-wider text-fog">
                      {p.name}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-md bg-accent px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-white uppercase hover:bg-accent-deep">
                {t.services.letsTalk}
              </a>
              <a href="#projects" className="rounded-md border border-line px-5 py-3 font-mono text-[12px] tracking-[0.08em] text-cream uppercase hover:border-accent hover:text-accent">
                {t.services.viewProjects}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-8 rounded-xl border border-accent/20 bg-ink p-6 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="font-display text-xl font-medium tracking-tight text-cream">{t.services.ctaTitle}</p>
            <p className="mt-2 font-mono text-sm text-fog">{t.services.ctaDesc}</p>
          </div>
          <a href="#contact" className="mt-4 inline-flex rounded-md bg-cream px-6 py-3 font-mono text-[13px] font-semibold tracking-[0.08em] text-ink uppercase hover:bg-accent hover:text-white md:mt-0">
            {t.services.ctaBtn}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
