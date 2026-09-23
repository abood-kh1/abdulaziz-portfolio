import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "../data/projects";
import ProjectImage from "../components/ProjectImage";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — ${project.category} · Abdulaziz Al-Khazendar`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", project.description);
    }
  }, [project]);

  if (!project) return <NotFound />;

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const [hero, ...rest] = project.gallery;

  return (
    <main id="main" className="pt-16">
      {/* header */}
      <div className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-8 md:px-8 md:pt-16">
          <nav aria-label="Breadcrumb" className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
            <Link to="/" className="u-sweep hover:text-cream">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/#projects" className="u-sweep hover:text-cream">Projects</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-fog">{project.slug}</span>
          </nav>
          <p className="mt-6 font-mono text-[12px] tracking-[0.2em] uppercase" style={{ color: project.accent }}>
            {project.index} — {project.category}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] font-medium tracking-tight text-cream">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-sand">{project.longIntro}</p>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-coal p-5">
              <dt className="rule-label text-dim">My role</dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream">{project.role}</dd>
            </div>
            <div className="bg-coal p-5">
              <dt className="rule-label text-dim">Stack</dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream">
                {project.technologies.length ? project.technologies.join(" · ") : "Stack details — to be confirmed."}
              </dd>
            </div>
            <div className="bg-coal p-5">
              <dt className="rule-label text-dim">Links</dt>
              <dd className="mt-2 flex gap-4 text-sm">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="u-sweep text-cream">GitHub ↗</a>
                ) : (
                  <span className="font-mono text-[11px] tracking-wider text-dim">GitHub — private / on request</span>
                )}
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="u-sweep text-cream">Demo ↗</a>
                ) : (
                  <span className="font-mono text-[11px] tracking-wider text-dim">Demo — on request</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* hero shot */}
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal>
          <ProjectImage src={hero.src} alt={hero.alt} caption={hero.caption} urlLabel={`case / ${project.slug}`} eager fit="contain" />
        </Reveal>
      </div>

      {/* problem / solution */}
      <div className="border-y border-line bg-[#0c0b09]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2 md:px-8">
          <Reveal>
            <section aria-label="Problem">
              <p className="rule-label text-accent">Problem</p>
              <ul className="mt-4 space-y-4">
                {project.problem.map((p, i) => (
                  <li key={i} className="border-l border-line pl-4 leading-relaxed text-fog">{p}</li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section aria-label="Solution">
              <p className="rule-label text-accent">Solution</p>
              <ul className="mt-4 space-y-4">
                {project.solution.map((s, i) => (
                  <li key={i} className="border-l-2 border-accent pl-4 leading-relaxed text-sand">{s}</li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        {/* contribution */}
        <Reveal>
          <section aria-label="My contribution" className="rounded-2xl border border-accent/30 bg-coal p-6 md:p-10">
            <p className="rule-label text-accent">What I personally built</p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-cream md:text-3xl">
              My contribution — not just what the project is.
            </h2>
            <ul className="mt-6 space-y-3.5">
              {project.contributions.map((c, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-sand">
                  <span aria-hidden="true" className="mt-1 font-mono text-[12px] text-accent">0{i + 1}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* features + architecture */}
        <div className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <section aria-label="Key features">
              <p className="rule-label text-dim">Key features</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 py-3 text-[0.95rem] text-sand">
                    <span aria-hidden="true" className="text-accent">▸</span>{f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="rule-label text-dim">Technology stack</p>
                {project.technologies.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <li key={t} className="rounded-md border border-line bg-coal px-3 py-1.5 font-mono text-[12px] tracking-wider text-sand">{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-md border border-dashed border-line/70 p-4 font-mono text-[12px] text-dim">
                    Tech stack — to be confirmed.
                  </p>
                )}
              </div>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section aria-label="Architecture">
              <p className="rule-label text-dim">Architecture / technical overview</p>
              <div className="mt-4 space-y-px overflow-hidden rounded-xl border border-line bg-line">
                {project.architecture.map((a) => (
                  <div key={a.title} className="bg-coal p-5">
                    <p className="font-mono text-[12px] tracking-[0.18em] text-accent uppercase">{a.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-fog">{a.text}</p>
                  </div>
                ))}
              </div>
              <div aria-label="Request flow" className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-ink p-4 font-mono text-[11px] tracking-[0.16em] text-fog uppercase">
                {project.flow.map((f, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-accent">→</span>}
                    <span className={i === project.flow.length - 1 ? "text-cream" : ""}>{f}</span>
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        {/* gallery */}
        {rest.length > 0 && (
          <section aria-label="Additional screenshots" className="mt-14">
            <Reveal>
              <p className="rule-label text-dim">Gallery — {rest.length} more screen{rest.length > 1 ? "s" : ""}</p>
            </Reveal>
            <div className={`mt-6 grid gap-6 ${rest.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
              {rest.map((g, i) => (
                <Reveal key={g.src} delay={Math.min(i * 70, 210)}>
                  <ProjectImage src={g.src} alt={g.alt} caption={g.caption} urlLabel={`case / ${project.slug} — ${i + 2}`} fit="contain" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* prev / next */}
        <nav aria-label="More projects" className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          <Link to={`/projects/${prev.slug}`} className="group bg-coal p-6 transition-colors hover:bg-panel">
            <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">← Previous</p>
            <p className="mt-2 font-display text-xl text-cream group-hover:text-accent">{prev.title}</p>
            <p className="mt-1 text-sm text-dim">{prev.category}</p>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group bg-coal p-6 text-right transition-colors hover:bg-panel">
            <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">Next →</p>
            <p className="mt-2 font-display text-xl text-cream group-hover:text-accent">{next.title}</p>
            <p className="mt-1 text-sm text-dim">{next.category}</p>
          </Link>
        </nav>
      </div>
    </main>
  );
}
