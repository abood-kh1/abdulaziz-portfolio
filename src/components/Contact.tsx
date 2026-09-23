import { LINKS } from "../data/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="rule-label text-accent">05 — Contact</p>
          <h2 id="contact-title" className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-cream">
            Have a system<br />to build?
          </h2>
          <p className="mt-6 max-w-xl border-l-2 border-accent pl-5 text-lg leading-relaxed text-sand">
            I&apos;m interested in backend development, AI-powered applications, and building practical software systems.
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
              GitHub ↗
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line px-7 py-4 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-accent/10 px-7 py-4 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              Chat on WhatsApp ↗
            </a>
            <a
              href={LINKS.email}
              className="rounded-md border border-line px-7 py-4 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Email ↗
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
            {LINKS.emailLabel} · GitHub · LinkedIn · WhatsApp · replies within a day or two
          </p>
        </Reveal>

        {/* technical identity strip */}
        <Reveal delay={180}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" aria-label="Technical identity">
            {[
              { k: "GET /repos", v: "Explore the code behind every case study", a: LINKS.github, label: "GitHub" },
              { k: "GET /profile", v: "Background, education and project history", a: LINKS.linkedin, label: "LinkedIn" },
              { k: "POST /contact", v: "A short brief beats a long call — write first", a: LINKS.whatsapp, label: "WhatsApp" },
              { k: "MAIL /inbox", v: LINKS.emailLabel!, a: LINKS.email!, label: "Email" },
            ].map((c) => (
              <a key={c.k} href={c.a} target={c.a.startsWith("mailto:") ? undefined : "_blank"} rel={c.a.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="group bg-coal p-6 transition-colors hover:bg-panel">
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{c.k}</p>
                <p className="mt-2 font-semibold text-cream">{c.label} ↗</p>
                <p className="mt-1 break-all text-sm text-fog">{c.v}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
