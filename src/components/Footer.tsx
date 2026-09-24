import { Link } from "react-router-dom";
import { LINKS } from "../data/content";
import { useTranslation } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line bg-[#0c0b09]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-fog uppercase">{t.footer.brand}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
            {t.footer.desc}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="rule-label text-dim">{t.footer.index}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="/#services" className="u-sweep text-fog hover:text-cream">{t.footer.services}</a></li>
            <li><a href="/#projects" className="u-sweep text-fog hover:text-cream">{t.footer.projects}</a></li>
            <li><a href="/#about" className="u-sweep text-fog hover:text-cream">{t.footer.about}</a></li>
            <li><a href="/#skills" className="u-sweep text-fog hover:text-cream">{t.footer.skills}</a></li>
            <li><a href="/#contact" className="u-sweep text-fog hover:text-cream">{t.footer.contact}</a></li>
            <li><Link to="/projects/wesal" className="u-sweep text-fog hover:text-cream">{t.footer.caseStudies}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="rule-label text-dim">{t.footer.elsewhere}</p>
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
          <span>{t.footer.copyright} {new Date().getFullYear()} Abdulaziz Al-Khazendar</span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
