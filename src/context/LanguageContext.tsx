import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang } from "../i18n/translations";

type Translations = typeof translations.en;

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";

function getInitialLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved === "ar" || saved === "en") return saved;
  const browser = navigator.language.toLowerCase();
  if (browser.startsWith("ar")) return "ar";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return getInitialLang();
  });

  const t = translations[lang] as Translations;
  const isRTL = lang === "ar";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [lang, isRTL]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((p) => (p === "en" ? "ar" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useTranslation() {
  return useLanguage();
}
