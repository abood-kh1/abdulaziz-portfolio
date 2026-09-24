import { LINKS } from "../data/content";
import Reveal from "./Reveal";
import { useTranslation } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="rule-label text-accent">{t.contact.label}</p>
          <h2 id="contact-title" className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-cream">
            {t.contact.title1}<br />{t.contact.title2}
          </h2>
          <p className="mt-6 max-w-xl border-s-2 border-accent ps-5 text-lg leading-relaxed text-sand">
            {t.contact.desc}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-cream px-7 py-4 font-mono text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-accent hover:text-white"
            >
              {t.contact.github}
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line px-7 py-4 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {t.contact.linkedin}
            </a>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-accent/10 px-7 py-4 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              {t.contact.whatsapp}
            </a>
            <a
              href={LINKS.email}
              className="rounded-md border border-line px-7 py-4 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {t.contact.email}
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
            {LINKS.emailLabel} · GitHub · LinkedIn · WhatsApp · {t.contact.replyNote}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" aria-label="Technical identity">
            {t.contact.cards.map((c) => {
              const href = c.k === "GET /repos" ? LINKS.github : c.k === "GET /profile" ? LINKS.linkedin : c.k === "POST /contact" ? LINKS.whatsapp : LINKS.email;
              return (
                <a key={c.k} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="group bg-coal p-6 transition-colors hover:bg-panel">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{c.k}</p>
                  <p className="mt-2 font-semibold text-cream">{c.label} ↗</p>
                  <p className="mt-1 break-all text-sm text-fog">{c.v}</p>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
