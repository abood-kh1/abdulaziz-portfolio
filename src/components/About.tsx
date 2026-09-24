import Reveal from "./Reveal";
import { useTranslation } from "../context/LanguageContext";
import profile from "../assets/abdulaziz.jpg";

export default function About() {
  const { t } = useTranslation();
  const principles = t.about.principles;

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
        <div>
          <Reveal>
            <p className="rule-label text-accent">{t.about.label}</p>
            <h2 id="about-title" className="mt-4 font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem] md:leading-[1.1]">
              {t.about.title1} <span className="text-fog">{t.about.title2}</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-coal">
              <div className="aspect-[4/5] overflow-hidden bg-[#0b0a09]">
                <img
                  src={profile}
                  alt={t.about.imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  width={800}
                  height={1000}
                />
              </div>
              <figcaption className="flex items-center justify-between border-t border-line bg-ink px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
                <span>{t.about.captionName}</span>
                <span className="hidden text-fog sm:inline">{t.about.captionRole}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 rounded-xl border border-line bg-coal p-5 font-mono text-[12.5px] leading-relaxed">
              <p className="text-dim"><span className="text-accent">$</span> {t.about.terminalWhoami}</p>
              <p className="mt-2 text-cream">{t.about.terminalRole}<span className="caret text-accent">▌</span></p>
              <p className="mt-1 text-fog">{t.about.terminalStack}</p>
              <p className="text-fog">{t.about.terminalDb}</p>
              <p className="mt-2 text-dim">{t.about.terminalMode}</p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5 text-[1.02rem] leading-relaxed text-sand/90">
          <Reveal>
            <p>
              {t.about.p1a}<strong className="font-semibold text-cream">{t.about.name}</strong>{t.about.p1b}<strong className="font-semibold text-cream">{t.about.backendDev}</strong>{t.about.p1c}<strong className="font-semibold text-cream">{t.about.dotnet}</strong>{t.about.p1d}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-fog">
              {t.about.p2}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {principles.map((p) => (
                <li key={p.k} className="bg-coal p-5 transition-colors hover:bg-panel">
                  <p className="font-mono text-[12px] tracking-[0.16em] text-accent uppercase">{p.k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{p.v}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
