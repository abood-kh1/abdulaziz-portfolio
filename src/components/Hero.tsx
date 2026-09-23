import { useState } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../data/content";
import profile from "../assets/abdulaziz.jpg";

const layers = [
  { tag: "CLIENT", detail: "UI · what users see", tone: "text-fog", hint: "Interface — clicks, forms, lists" },
  { tag: "API", detail: "GET /v1/halls → 200", tone: "text-cream", hint: "Requests — validated, versioned, documented" },
  { tag: "SERVICES", detail: "booking · auth · AI", tone: "text-cream", hint: "Business Logic — booking, RBAC, AI grounding" },
  { tag: "DATABASE", detail: "QUERY · 12ms · ACID", tone: "text-fog", hint: "Data — PostgreSQL / EF Core, invariants kept" },
];

/** Layered systems composition — CLIENT → API → SERVICES → DATABASE with interactive focus. */
export default function Hero() {
  const [active, setActive] = useState<number | null>(1);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      {/* faint engineering grid, no glow/particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242,239,230,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,230,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pt-14 pb-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-8 md:pt-24 md:pb-24">
        <div>
          <div className="flex items-center gap-5">
            <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-2 border-cream/15 bg-coal shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] md:h-[112px] md:w-[112px] md:border-[3px]">
              <img
                src={profile}
                alt="Abdulaziz Al-Khazendar — Backend Developer"
                width={112}
                height={112}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 18%" }}
              />
            </div>
            <div>
              <p className="rule-label text-accent">Backend Developer — Portfolio /v1</p>
              <h1 id="hero-title" className="mt-3 font-display text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[1.02] font-medium tracking-tight text-cream">
                <span className="rise-line"><span>Abdulaziz</span></span>
                <span className="rise-line"><span>Al-Khazendar</span></span>
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-xl border-l-2 border-accent pl-5 text-[clamp(1.02rem,2vw,1.25rem)] leading-relaxed text-sand">
            I build reliable APIs, intelligent applications, and backend systems that turn ideas into working products.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/#projects"
              className="group rounded-md bg-cream px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-accent hover:text-white"
            >
              View Projects <span className="inline-block transition-transform group-hover:translate-x-1">↓</span>
            </Link>
            <a
              href="#contact"
              className="rounded-md border border-line px-6 py-3.5 font-mono text-[13px] tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Let&apos;s Connect
            </a>
          </div>
          {/* subtle social route — real contacts, no AI filler */}
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="u-sweep hover:text-cream">GitHub ↗</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="u-sweep hover:text-cream">LinkedIn ↗</a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="u-sweep hover:text-cream">WhatsApp ↗</a>
            <a href={LINKS.email} className="u-sweep hover:text-cream">aboodkh1313@gmail.com ↗</a>
          </div>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
            <div className="flex gap-2"><dt className="text-fog">Focus</dt><dd>ASP.NET Core · REST</dd></div>
            <div className="flex gap-2"><dt className="text-fog">Data</dt><dd>PostgreSQL · EF Core</dd></div>
            <div className="flex gap-2"><dt className="text-fog">Edge</dt><dd>AI integration</dd></div>
          </dl>
        </div>

        {/* systems diagram — interactive */}
        <div
          className="relative rounded-xl border border-line bg-coal/80 p-5 md:p-6"
          role="img"
          aria-label="Layered system diagram: client requests flow through API and services down to the database"
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
            <span>request lifecycle</span>
            <span className="flex items-center gap-1.5">
              <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-[#7bc47f]" aria-hidden="true" />
              live
            </span>
          </div>
          <div className="relative mt-4">
            {/* spine */}
            <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
            <div aria-hidden="true" className="packet-dot absolute left-[4.5px] h-[7px] w-[7px] rounded-full bg-accent" />
            <ol className="space-y-2.5" role="list">
              {layers.map((l, i) => {
                const isActive = active === i;
                return (
                  <li
                    key={l.tag}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onMouseLeave={() => setActive(1)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}
                    className={`relative ml-7 rounded-md border px-4 py-3 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "border-accent/60 bg-panel" : i === 1 || i === 2 ? "border-accent/30 bg-panel" : "border-line bg-ink"} ${isActive ? "scale-[1.01]" : ""}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={`font-mono text-sm font-semibold tracking-[0.2em] ${isActive ? "text-accent" : l.tone}`}>{l.tag}</span>
                      <span className="truncate font-mono text-[10.5px] tracking-wide text-dim">{l.detail}</span>
                    </div>
                    <span className={`mt-1.5 block font-mono text-[10.5px] ${isActive ? "text-cream" : i === 1 ? "text-accent" : "text-dim"}`}>
                      {isActive ? l.hint : i === 1 ? <><span className="caret">▌</span> auth · JWT verified · routing…</> : ""}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-4 border-t border-line pt-3 font-mono text-[10.5px] leading-relaxed tracking-wide text-dim">
            <span className="text-fog">Systems behind the interface</span> — the UI is the top layer. Everything
            below it is what I build. <span className="hidden md:inline">Hover or focus a layer.</span>
          </p>
        </div>
      </div>

      {/* interface → api → logic → data strip */}
      <div className="relative border-y border-line bg-[#0c0b09]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 overflow-x-auto px-5 py-3 font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-dim uppercase md:px-8">
          {["Interface", "→", "API", "→", "Logic", "→", "Data"].map((w, i) => (
            <span key={i} className={w === "→" ? "text-accent" : w === "Data" ? "text-cream" : ""}>
              {w}
            </span>
          ))}
          <span className="hidden text-dim/70 sm:inline">HTTP · JSON · AUTH · QUERY</span>
        </div>
      </div>
    </section>
  );
}
