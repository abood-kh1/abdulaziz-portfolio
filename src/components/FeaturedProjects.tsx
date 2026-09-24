import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectImage from "./ProjectImage";
import Reveal from "./Reveal";
import { useTranslation } from "../context/LanguageContext";

function TechRow({ items }: { items: string[] }) {
  const { t } = useTranslation();
  if (!items.length)
    return <p className="font-mono text-[11px] tracking-wider text-dim">{t.featured.techStackFallback}</p>;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-[11px] tracking-wider text-fog"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

type Filter = "All" | "Backend" | "AI" | "Web" | "Android";
const FILTER_KEYS: Filter[] = ["All", "Backend", "AI", "Web", "Android"];

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

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const [active, setActive] = useState<Filter>("All");
  const [wesal, siteaware, ncrp, bip] = projects;

  const visible = (slug: string) => active === "All" || projectTags[slug]?.includes(active);

  // translated project text helpers
  const tr = t.projects as Record<string, { title: string; category: string; description: string }>;
  const wesalTr = tr.wesal;
  const siteawareTr = tr.siteaware;
  const ncrpTr = tr.ncrp;
  const bipTr = tr.backendinterviewpass;

  const filterLabels = t.featured.filters as unknown as string[];

  const getStatusText = () => {
    if (active === "All") return t.featured.showingAll;
    if (active === "Android") return t.featured.showingAndroid;
    const n = projects.filter((p) => projectTags[p.slug]?.includes(active)).length;
    return t.featured.filtered(n);
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="rule-label text-accent">{t.featured.label}</p>
              <h2 id="projects-title" className="mt-4 font-display text-3xl font-medium tracking-tight text-cream md:text-[2.6rem]">
                {t.featured.title}
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-wider text-dim uppercase">
              {t.featured.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2 border-y border-line py-3" role="tablist" aria-label="Filter projects">
          {FILTER_KEYS.map((key, idx) => (
            <button
              key={key}
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${active === key ? "border-accent bg-accent text-white" : "border-line text-fog hover:border-cream hover:text-cream"}`}
            >
              {filterLabels[idx]}
            </button>
          ))}
          <span className="ms-auto hidden font-mono text-[11px] tracking-wider text-dim md:inline">
            {getStatusText()}
          </span>
        </div>

        {visible("wesal") && (
          <Reveal className="mt-12">
            <article aria-labelledby="proj-wesal" className="group overflow-hidden rounded-2xl border border-line bg-coal transition-colors hover:border-cream/20">
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
                  <div>
                    <p className="font-mono text-[12px] tracking-[0.2em] text-dim uppercase">
                      <span className="text-accent">01</span> — {wesalTr.category}
                    </p>
                    <h3 id="proj-wesal" className="mt-3 font-display text-4xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent md:text-5xl">
                      {wesalTr.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-fog">{wesalTr.description}</p>
                    <div className="mt-5"><TechRow items={wesal.technologies} /></div>
                    <p className="mt-5 border-s-2 border-accent ps-4 text-sm leading-relaxed text-sand">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{t.featured.myContribution}</span>
                      {t.featured.contributions.wesal}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/projects/${wesal.slug}`} className="group/btn rounded-md bg-cream px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-accent hover:text-white">
                      {t.featured.caseStudy} <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                    <GitHubLink href={wesal.github} />
                  </div>
                </div>
                <div className="border-t border-line bg-[#0b0a09] p-4 md:border-t-0 md:border-s md:p-6">
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

        {visible("siteaware") && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Reveal>
              <article aria-labelledby="proj-siteaware" className="group flex h-full flex-col rounded-2xl border border-[#2b3a55] bg-[#0d1420] p-6 transition-colors hover:border-[#3a4f75] md:p-8">
                <p className="font-mono text-[12px] tracking-[0.2em] text-[#7ea2f8] uppercase">
                  <span>02</span> — {siteawareTr.category}
                </p>
                <h3 id="proj-siteaware" className="mt-3 font-display text-4xl font-medium tracking-tight text-white transition-colors group-hover:text-[#7ea2f8]">
                  {siteawareTr.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-[#b9c4d6]">{siteawareTr.description}</p>
                <div className="mt-5"><TechRow items={siteaware.technologies} /></div>
                <p className="mt-5 border-s-2 border-[#2f6fed] ps-4 text-sm leading-relaxed text-[#cdd7e8]">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-[#7ea2f8] uppercase">{t.featured.myContribution}</span>
                  {t.featured.contributions.siteaware}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 pt-1">
                  <Link to={`/projects/${siteaware.slug}`} className="group/btn rounded-md bg-[#2f6fed] px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#1f56c4]">
                    {t.featured.caseStudy} <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
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

        {visible("ncrp") && (
          <Reveal className="mt-6">
            <article aria-labelledby="proj-ncrp" className="group overflow-hidden rounded-2xl border border-line bg-coal transition-colors hover:border-cream/20">
              <div className="flex flex-wrap items-baseline justify-between gap-3 p-6 pb-0 md:p-10 md:pb-0">
                <p className="font-mono text-[12px] tracking-[0.2em] text-dim uppercase">
                  <span className="text-accent">03</span> — {ncrpTr.category}
                </p>
                <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">AR-first · RTL · coordination ledger</p>
              </div>
              <h3 id="proj-ncrp" className="px-6 pt-3 font-display text-4xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent md:px-10 md:text-5xl">
                {ncrpTr.title}
              </h3>
              <p className="max-w-3xl px-6 pt-4 leading-relaxed text-fog md:px-10">{ncrpTr.description}</p>
              <div className="px-6 pt-5 md:px-10">
                <p className="border-s-2 border-accent ps-4 text-sm leading-relaxed text-sand">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{t.featured.myContribution}</span>
                  {t.featured.contributions.ncrp}
                </p>
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-2 md:p-10">
                <ProjectImage src={ncrp.gallery[0].src} alt={ncrp.gallery[0].alt} urlLabel={`case / ${ncrp.slug}`} eager caption={ncrp.gallery[0].caption} />
                <ProjectImage src={ncrp.gallery[1].src} alt={ncrp.gallery[1].alt} urlLabel="ops / dashboard" caption={ncrp.gallery[1].caption} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-5 md:px-10">
                <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">{t.featured.andMoreScreens(ncrp.gallery.length - 2)}</p>
                <div className="flex gap-3">
                  <Link to={`/projects/${ncrp.slug}`} className="group/btn rounded-md bg-cream px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-accent hover:text-white">
                    {t.featured.caseStudy} <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                  <GitHubLink href={ncrp.github} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {visible("backendinterviewpass") && (
          <Reveal className="mt-6">
            <article aria-labelledby="proj-bip" className="group grid overflow-hidden rounded-2xl border border-line bg-coal transition-colors hover:border-cream/20 md:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-line bg-[#0b0a09] p-4 md:border-e md:border-b-0 md:p-6">
                <ProjectImage src={bip.image} alt={bip.coverAlt} urlLabel={`case / ${bip.slug}`} caption="BackendInterviewPass — structured candidate profiles" />
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                <div>
                  <p className="font-mono text-[12px] tracking-[0.2em] text-dim uppercase">
                    <span className="text-accent">04</span> — {bipTr.category}
                  </p>
                  <h3 id="proj-bip" className="mt-3 font-display text-3xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent">
                    {bipTr.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-fog">{bipTr.description}</p>
                  <div className="mt-4"><TechRow items={bip.technologies} /></div>
                  <p className="mt-4 border-s-2 border-accent ps-4 text-sm leading-relaxed text-sand">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{t.featured.myContribution}</span>
                    {t.featured.contributions.bip}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/projects/${bip.slug}`} className="group/btn rounded-md border border-cream/40 px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-cream uppercase transition-colors hover:border-accent hover:text-accent">
                    {t.featured.caseStudy} <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                  <GitHubLink href={bip.github} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {active === "Android" && (
          <p className="mt-6 rounded-xl border border-dashed border-line bg-coal p-6 text-center font-mono text-sm text-fog">
            {t.featured.androidHint}
            <a href="#other" className="ms-2 text-accent hover:underline">{t.featured.jumpThere}</a>
          </p>
        )}
      </div>
    </section>
  );
}
