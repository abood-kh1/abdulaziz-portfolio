import Reveal from "./Reveal";
import profile from "../assets/abdulaziz.jpg";

const principles = [
  { k: "API-first", v: "Contracts before screens. Versioned, documented, predictable." },
  { k: "Data-modelled", v: "Domains become tables with real invariants — availability, ledger states, roles." },
  { k: "Auth-aware", v: "JWT + RBAC from day one, not bolted on later." },
  { k: "AI-grounded", v: "Assistants that read live system data, never hallucinated paths." },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
        <div>
          <Reveal>
            <p className="rule-label text-accent">01 — About</p>
            <h2 id="about-title" className="mt-4 font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem] md:leading-[1.1]">
              Backend is invisible. <span className="text-fog">It still decides whether software works.</span>
            </h2>
          </Reveal>

          {/* editorial portrait — authentic photo, tasteful framing */}
          <Reveal delay={80}>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-coal">
              <div className="aspect-[4/5] overflow-hidden bg-[#0b0a09]">
                <img
                  src={profile}
                  alt="Abdulaziz Al-Khazendar — Backend Developer, portrait in formal attire outdoors"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  width={800}
                  height={1000}
                />
              </div>
              <figcaption className="flex items-center justify-between border-t border-line bg-ink px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
                <span>Abdulaziz Al-Khazendar · Backend Developer</span>
                <span className="hidden text-fog sm:inline">IT student · .NET focus</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 rounded-xl border border-line bg-coal p-5 font-mono text-[12.5px] leading-relaxed">
              <p className="text-dim"><span className="text-accent">$</span> whoami --backend</p>
              <p className="mt-2 text-cream">IT student & backend developer<span className="caret text-accent">▌</span></p>
              <p className="mt-1 text-fog">primary stack: C# · ASP.NET Core · EF Core</p>
              <p className="text-fog">databases: PostgreSQL · SQL Server · SQLite</p>
              <p className="mt-2 text-dim">mode: practical systems, shipped &gt; theorized</p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5 text-[1.02rem] leading-relaxed text-sand/90">
          <Reveal>
            <p>
              I&apos;m <strong className="font-semibold text-cream">Abdulaziz Al-Khazendar</strong>, an IT
              student focused on <strong className="font-semibold text-cream">backend development</strong>.
              I work mainly with <strong className="font-semibold text-cream">.NET and modern backend
              technologies</strong>, and I enjoy building practical systems — booking flows, recruitment
              pipelines, coordination dashboards, AI assistants — where correctness matters.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-fog">
              Recent work spans wedding-hall booking (Wesal), an AI application-intelligence layer (SiteAware),
              a needs-and-resource coordination platform (NCRP), and a recruitment & assessment API
              (BackendInterviewPass). Different domains, same discipline: model the data honestly, secure the
              endpoints, and make the system explain itself.
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
