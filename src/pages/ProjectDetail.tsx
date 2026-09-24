import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "../data/projects";
import ProjectImage from "../components/ProjectImage";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import { useTranslation } from "../context/LanguageContext";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const { t, lang } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  // merged translated project data
  const trProject = slug ? (t.projects as Record<string, unknown>)[slug] as {
    title: string; category: string; description: string; longIntro: string;
    problem: string[]; solution: string[]; role: string; contributions: string[];
    features: string[]; architecture: { title: string; text: string }[]; flow: string[];
  } | undefined : undefined;

  useEffect(() => {
    if (project && trProject) {
      document.title = `${trProject.title} — ${trProject.category} · Abdulaziz Al-Khazendar`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", trProject.description);
    }
  }, [project, trProject, lang]);

  if (!project || !trProject) return <NotFound />;

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const [hero, ...rest] = project.gallery;
  const prevTr = (t.projects as Record<string, { title: string; category: string }>)[prev.slug];
  const nextTr = (t.projects as Record<string, { title: string; category: string }>)[next.slug];
  const d = t.projectDetail;

  return (
    <main id="main" className="pt-16">
      <div className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-8 md:px-8 md:pt-16">
          <nav aria-label="Breadcrumb" className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
            <Link to="/" className="u-sweep hover:text-cream">{d.breadcrumbHome}</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/#projects" className="u-sweep hover:text-cream">{d.breadcrumbProjects}</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-fog">{project.slug}</span>
          </nav>
          <p className="mt-6 font-mono text-[12px] tracking-[0.2em] uppercase" style={{ color: project.accent }}>
            {project.index} — {trProject.category}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] font-medium tracking-tight text-cream">
            {trProject.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-sand">{trProject.longIntro}</p>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-coal p-5">
              <dt className="rule-label text-dim">{d.myRole}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream">{trProject.role}</dd>
            </div>
            <div className="bg-coal p-5">
              <dt className="rule-label text-dim">{d.stack}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream">
                {project.technologies.length ? project.technologies.join(" · ") : d.techStackFallback}
              </dd>
            </div>
            <div className="bg-coal p-5">
              <dt className="rule-label text-dim">{d.links}</dt>
              <dd className="mt-2 flex gap-4 text-sm">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="u-sweep text-cream">GitHub ↗</a>
                ) : (
                  <span className="font-mono text-[11px] tracking-wider text-dim">{d.githubPrivate}</span>
                )}
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="u-sweep text-cream">Demo ↗</a>
                ) : (
                  <span className="font-mono text-[11px] tracking-wider text-dim">{d.demoOnRequest}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal>
          <ProjectImage src={hero.src} alt={hero.alt} caption={hero.caption} urlLabel={`case / ${project.slug}`} eager fit="contain" />
        </Reveal>
      </div>

      <div className="border-y border-line bg-[#0c0b09]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2 md:px-8">
          <Reveal>
            <section aria-label="Problem">
              <p className="rule-label text-accent">{d.problem}</p>
              <ul className="mt-4 space-y-4">
                {trProject.problem.map((p, i) => (
                  <li key={i} className="border-s border-line ps-4 leading-relaxed text-fog">{p}</li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section aria-label="Solution">
              <p className="rule-label text-accent">{d.solution}</p>
              <ul className="mt-4 space-y-4">
                {trProject.solution.map((s, i) => (
                  <li key={i} className="border-s-2 border-accent ps-4 leading-relaxed text-sand">{s}</li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Reveal>
          <section aria-label="My contribution" className="rounded-2xl border border-accent/30 bg-coal p-6 md:p-10">
            <p className="rule-label text-accent">{d.whatIBuilt}</p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-cream md:text-3xl">
              {d.whatIBuiltTitle}
            </h2>
            <ul className="mt-6 space-y-3.5">
              {trProject.contributions.map((c, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-sand">
                  <span aria-hidden="true" className="mt-1 font-mono text-[12px] text-accent">0{i + 1}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <section aria-label="Key features">
              <p className="rule-label text-dim">{d.keyFeatures}</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {trProject.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 py-3 text-[0.95rem] text-sand">
                    <span aria-hidden="true" className="text-accent">▸</span>{f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="rule-label text-dim">{d.techStack}</p>
                {project.technologies.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="rounded-md border border-line bg-coal px-3 py-1.5 font-mono text-[12px] tracking-wider text-sand">{tech}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-md border border-dashed border-line/70 p-4 font-mono text-[12px] text-dim">
                    {d.techStackFallback}
                  </p>
                )}
              </div>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section aria-label="Architecture">
              <p className="rule-label text-dim">{d.architecture}</p>
              <div className="mt-4 space-y-px overflow-hidden rounded-xl border border-line bg-line">
                {trProject.architecture.map((a) => (
                  <div key={a.title} className="bg-coal p-5">
                    <p className="font-mono text-[12px] tracking-[0.18em] text-accent uppercase">{a.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-fog">{a.text}</p>
                  </div>
                ))}
              </div>
              <div aria-label="Request flow" className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-ink p-4 font-mono text-[11px] tracking-[0.16em] text-fog uppercase">
                {trProject.flow.map((f, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-accent">→</span>}
                    <span className={i === trProject.flow.length - 1 ? "text-cream" : ""}>{f}</span>
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        {rest.length > 0 && (
          <section aria-label="Additional screenshots" className="mt-14">
            <Reveal>
              <p className="rule-label text-dim">{d.gallery} — {d.moreScreens(rest.length)}</p>
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

        <nav aria-label="More projects" className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          <Link to={`/projects/${prev.slug}`} className="group bg-coal p-6 transition-colors hover:bg-panel">
            <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{d.previous}</p>
            <p className="mt-2 font-display text-xl text-cream group-hover:text-accent">{prevTr.title}</p>
            <p className="mt-1 text-sm text-dim">{prevTr.category}</p>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group bg-coal p-6 text-right transition-colors hover:bg-panel">
            <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{d.next}</p>
            <p className="mt-2 font-display text-xl text-cream group-hover:text-accent">{nextTr.title}</p>
            <p className="mt-1 text-sm text-dim">{nextTr.category}</p>
          </Link>
        </nav>
      </div>
    </main>
  );
}
