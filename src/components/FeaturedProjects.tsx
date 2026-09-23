import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectImage from "./ProjectImage";
import Reveal from "./Reveal";

function TechRow({ items }: { items: string[] }) {
  if (!items.length)
    return <p className="font-mono text-[11px] tracking-wider text-dim">Tech stack — to be confirmed.</p>;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {items.map((t) => (
        <li
          key={t}
          className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-[11px] tracking-wider text-fog"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

type Filter = "All" | "Backend" | "AI" | "Web" | "Android";
const FILTERS: Filter[] = ["All", "Backend", "AI", "Web", "Android"];

// Map project slug to filter tags (supported by actual experience)
const projectTags: Record<string, Filter[]> = {
  wesal: ["Backend", "AI", "Web"],
  siteaware: ["AI", "Web"],
  ncrp: ["Backend", "Web"],
  backendinterviewpass: ["Backend", "Web"],
};

function GitHubLink({ href }: { href: string }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-5 py-3 font-mono text-[12px] tracking-[0.08em] text-fog uppercase transition-colors hover:border-accent hover:text-accent">
      GitHub ↗
    </a>
  );
}

/**
 * Editorial showcase — each project gets a different composition and weight.
 * Screenshots are primary visual content, never cropped thumbnails.
 * Includes lightweight text-based filters.
 */
export default function FeaturedProjects() {
  const [active, setActive] = useState<Filter>("All");
  const [wesal, siteaware, ncrp, bip] = projects;

  const visible = (slug: string) => active === "All" || projectTags[slug]?.includes(active);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="rule-label text-accent">02 — Featured work</p>
              <h2 id="projects-title" className="mt-4 font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem]">
                What I have actually built.
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-wider text-dim uppercase">
              Four systems · four domains · one discipline — backend
            </p>
          </div>
        </Reveal>

        {/* filters — elegant text controls */}
        <div className="mt-8 flex flex-wrap gap-2 border-y border-line py-3" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${active === f ? "border-accent bg-accent text-white" : "border-line text-fog hover:border-cream hover:text-cream"}`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto hidden font-mono text-[11px] tracking-wider text-dim md:inline">
            {active === "All" ? "Showing 4 projects" : active === "Android" ? "See Other projects below" : `Filtered — ${projects.filter((p) => projectTags[p.slug]?.includes(active)).length} project(s)`}
          </span>
        </div>

        {/* 01 WESAL — full-bleed editorial lead */}
        {visible("wesal") && (
          <Reveal className="mt-12">
            <article aria-labelledby="proj-wesal" className="group overflow-hidden rounded-2xl border border-line bg-coal transition-colors hover:border-cream/20">
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
                  <div>
                    <p className="font-mono text-[12px] tracking-[0.2em] text-dim uppercase">
                      <span className="text-accent">01</span> — {wesal.category}
                    </p>
                    <h3 id="proj-wesal" className="mt-3 font-display text-4xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent md:text-5xl">
                      {wesal.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-fog">{wesal.description}</p>
                    <div className="mt-5"><TechRow items={wesal.technologies} /></div>
                    <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed text-sand">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">My contribution — </span>
                      backend API, EF Core + PostgreSQL model, JWT roles, booking integrity and AI-assisted features.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/projects/${wesal.slug}`} className="group/btn rounded-md bg-cream px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-accent hover:text-white">
                      Case study <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                    <GitHubLink href={wesal.github} />
                  </div>
                </div>
                <div className="border-t border-line bg-[#0b0a09] p-4 md:border-t-0 md:border-l md:p-6">
                  <ProjectImage src={wesal.image} alt={wesal.coverAlt} urlLabel={`case / ${wesal.slug}`} eager caption="Wesal — discovery hero over live availability data" />
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {wesal.gallery.slice(1).map((g) => (
                      <img key={g.src} src={g.src} alt="" aria-hidden="true" loading="lazy" className="aspect-[4/3] w-full rounded-md border border-line object-cover" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* 02 SITEAWARE — inverted, distinct dark-blue treatment */}
        {visible("siteaware") && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Reveal>
              <article aria-labelledby="proj-siteaware" className="group flex h-full flex-col rounded-2xl border border-[#2b3a55] bg-[#0d1420] p-6 transition-colors hover:border-[#3a4f75] md:p-8">
                <p className="font-mono text-[12px] tracking-[0.2em] text-[#7ea2f8] uppercase">
                  <span>02</span> — {siteaware.category}
                </p>
                <h3 id="proj-siteaware" className="mt-3 font-display text-4xl font-medium tracking-tight text-white transition-colors group-hover:text-[#7ea2f8]">
                  {siteaware.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-[#b9c4d6]">{siteaware.description}</p>
                <div className="mt-5"><TechRow items={siteaware.technologies} /></div>
                <p className="mt-5 border-l-2 border-[#2f6fed] pl-4 text-sm leading-relaxed text-[#cdd7e8]">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-[#7ea2f8] uppercase">My contribution — </span>
                  FastAPI analysis service, DOM/ARIA contract, Gemini grounding and path-discovery endpoints.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 pt-1">
                  <Link to={`/projects/${siteaware.slug}`} className="group/btn rounded-md bg-[#2f6fed] px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#1f56c4]">
                    Case study <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                  {siteaware.github ? (
                    <a href={siteaware.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#2b3a55] px-5 py-3 font-mono text-[12px] tracking-[0.08em] text-[#b9c4d6] uppercase hover:border-[#2f6fed] hover:text-white">
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-[#2b3a55] bg-[#0d1420] p-4 md:p-5">
                <ProjectImage src={siteaware.image} alt={siteaware.coverAlt} urlLabel="agent / observation" caption="SiteAware — grounded answers from the live interface" />
                <div className="mt-4">
                  <ProjectImage src={siteaware.gallery[1].src} alt={siteaware.gallery[1].alt} urlLabel="agent / guidance" />
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* 03 NCRP — wide cinematic band */}
        {visible("ncrp") && (
          <Reveal className="mt-6">
            <article aria-labelledby="proj-ncrp" className="group overflow-hidden rounded-2xl border border-line bg-coal transition-colors hover:border-cream/20">
              <div className="flex flex-wrap items-baseline justify-between gap-3 p-6 pb-0 md:p-10 md:pb-0">
                <p className="font-mono text-[12px] tracking-[0.2em] text-dim uppercase">
                  <span className="text-accent">03</span> — {ncrp.category}
                </p>
                <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">AR-first · RTL · coordination ledger</p>
              </div>
              <h3 id="proj-ncrp" className="px-6 pt-3 font-display text-4xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent md:px-10 md:text-5xl">
                {ncrp.title}
              </h3>
              <p className="max-w-3xl px-6 pt-4 leading-relaxed text-fog md:px-10">{ncrp.description}</p>
              <div className="px-6 pt-5 md:px-10">
                <p className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-sand">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">My contribution — </span>
                  planning flows with duplicate detection, citizen registration, coupon ledger and coverage analytics.
                </p>
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-2 md:p-10">
                <ProjectImage src={ncrp.gallery[0].src} alt={ncrp.gallery[0].alt} urlLabel={`case / ${ncrp.slug}`} eager caption={ncrp.gallery[0].caption} />
                <ProjectImage src={ncrp.gallery[1].src} alt={ncrp.gallery[1].alt} urlLabel="ops / dashboard" caption={ncrp.gallery[1].caption} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-5 md:px-10">
                <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">+{ncrp.gallery.length - 2} more screens in the case study</p>
                <div className="flex gap-3">
                  <Link to={`/projects/${ncrp.slug}`} className="group/btn rounded-md bg-cream px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-accent hover:text-white">
                    Case study <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                  <GitHubLink href={ncrp.github} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* 04 BackendInterviewPass — compact horizontal */}
        {visible("backendinterviewpass") && (
          <Reveal className="mt-6">
            <article aria-labelledby="proj-bip" className="group grid overflow-hidden rounded-2xl border border-line bg-coal transition-colors hover:border-cream/20 md:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-line bg-[#0b0a09] p-4 md:border-r md:border-b-0 md:p-6">
                <ProjectImage src={bip.image} alt={bip.coverAlt} urlLabel={`case / ${bip.slug}`} caption="BackendInterviewPass — structured candidate profiles" />
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                <div>
                  <p className="font-mono text-[12px] tracking-[0.2em] text-dim uppercase">
                    <span className="text-accent">04</span> — {bip.category}
                  </p>
                  <h3 id="proj-bip" className="mt-3 font-display text-3xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent">
                    {bip.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-fog">{bip.description}</p>
                  <div className="mt-4"><TechRow items={bip.technologies} /></div>
                  <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-relaxed text-sand">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">My contribution — </span>
                    .NET 8 domain model, JWT roles, AutoMapper contracts and Swagger docs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/projects/${bip.slug}`} className="group/btn rounded-md border border-cream/40 px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent">
                    Case study <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                  <GitHubLink href={bip.github} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {active === "Android" && (
          <p className="mt-6 rounded-xl border border-dashed border-line bg-coal p-6 text-center font-mono text-sm text-fog">
            Android projects live in the “Also built” section below — Qibla, Sensor/GPS, Adhkar.
            <a href="#other" className="ml-2 text-accent hover:underline">Jump there →</a>
          </p>
        )}
      </div>
    </section>
  );
}
