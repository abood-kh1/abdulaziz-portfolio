import { Link } from "react-router-dom";
import { LINKS } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#0c0b09]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-fog uppercase">AK — Systems behind the interface</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
            Abdulaziz Al-Khazendar — Backend Developer building reliable APIs, intelligent applications and database-driven systems with
            ASP.NET Core, .NET and modern AI integration.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="rule-label text-dim">Index</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="/#services" className="u-sweep text-fog hover:text-cream">Services</a></li>
            <li><a href="/#projects" className="u-sweep text-fog hover:text-cream">Projects</a></li>
            <li><a href="/#about" className="u-sweep text-fog hover:text-cream">About</a></li>
            <li><a href="/#skills" className="u-sweep text-fog hover:text-cream">Skills</a></li>
            <li><a href="/#contact" className="u-sweep text-fog hover:text-cream">Contact</a></li>
            <li><Link to="/projects/wesal" className="u-sweep text-fog hover:text-cream">Case studies →</Link></li>
          </ul>
        </nav>
        <div>
          <p className="rule-label text-dim">Elsewhere</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="u-sweep text-fog hover:text-cream">GitHub ↗</a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="u-sweep text-fog hover:text-cream">LinkedIn ↗</a></li>
            <li><a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="u-sweep text-fog hover:text-cream">WhatsApp ↗</a></li>
            <li><a href={LINKS.email} className="u-sweep text-fog hover:text-cream">aboodkh1313@gmail.com ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 font-mono text-[11px] tracking-[0.14em] text-dim uppercase sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>© {new Date().getFullYear()} Abdulaziz Al-Khazendar</span>
          <span>Designed & built as a personal engineering brand — no templates</span>
        </div>
      </div>
    </footer>
  );
}
