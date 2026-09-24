import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, lang, toggleLang } = useLanguage();

  const links = [
    { to: "/#services", label: t.nav.services },
    { to: "/#projects", label: t.nav.projects },
    { to: "/#about", label: t.nav.about },
    { to: "/#skills", label: t.nav.skills },
    { to: "/#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      window.location.href = `/${hash}`;
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-ink/90 backdrop-blur-md" : "border-transparent bg-ink/60 backdrop-blur-sm"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="Abdulaziz Al-Khazendar — home">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-line bg-coal font-mono text-sm font-semibold tracking-tight text-cream transition-colors group-hover:border-accent group-hover:text-accent">
            AK
          </span>
          <span className="hidden font-mono text-xs tracking-[0.18em] text-fog sm:block">ABDULAZIZ</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                onClick={go(l.to.slice(1))}
                className="u-sweep font-mono text-[12px] tracking-[0.16em] text-fog uppercase transition-colors hover:text-cream"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* availability - desktop only */}
          <div className="hidden items-center gap-2.5 md:flex" role="status" aria-label="Availability">
            <span className="status-dot h-2 w-2 rounded-full bg-[#7bc47f]" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-fog uppercase">
              {t.nav.available}
            </span>
          </div>

          {/* theme + lang toggles */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              className="grid h-9 w-9 place-items-center rounded-md border border-line bg-coal text-cream transition-colors hover:border-accent hover:text-accent"
            >
              <span aria-hidden="true" className="text-[15px] leading-none">
                {theme === "dark" ? "☀" : "☾"}
              </span>
            </button>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
              title={lang === "en" ? "العربية" : "English"}
              className="grid h-9 min-w-[2.25rem] place-items-center rounded-md border border-line bg-coal px-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-cream transition-colors hover:border-accent hover:text-accent"
            >
              {lang === "en" ? "AR" : "EN"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-cream md:hidden"
          >
            <span aria-hidden="true" className="font-mono text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-ink px-5 pt-2 pb-6 md:hidden">
          <ul className="divide-y divide-line">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  onClick={go(l.to.slice(1))}
                  className="block py-3.5 font-mono text-sm tracking-[0.16em] text-cream uppercase"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-fog uppercase">
            <span className="status-dot h-2 w-2 rounded-full bg-[#7bc47f]" aria-hidden="true" />
            {t.nav.available}
          </p>
        </div>
      )}
    </header>
  );
}
