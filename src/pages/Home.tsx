import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import FeaturedProjects from "../components/FeaturedProjects";
import OtherProjects from "../components/OtherProjects";
import Skills from "../components/Skills";
import Journey from "../components/Journey";
import Contact from "../components/Contact";
import { useTranslation } from "../context/LanguageContext";

export default function Home() {
  const { lang } = useTranslation();
  useEffect(() => {
    if (lang === "ar") {
      document.title = "عبد العزيز عطيه الخزندار — مطور Backend";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", "عبد العزيز عطيه الخزندار مطور Backend يبني واجهات برمجية موثوقة وتطبيقات ذكية وأنظمة مدفوعة بقواعد البيانات باستخدام ASP.NET Core و .NET وتكامل الذكاء الاصطناعي.");
    } else {
      document.title = "Abdulaziz Al-Khazendar — Backend Developer";
      const meta = document.querySelector('meta[name="description"]');
      if (meta)
        meta.setAttribute(
          "content",
          "Abdulaziz Al-Khazendar is a backend developer building reliable APIs, intelligent applications, and database-driven systems with ASP.NET Core, .NET, and AI integration."
        );
    }
  }, [lang]);

  return (
    <main id="main">
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <OtherProjects />
      <Skills />
      <Journey />
      <Contact />
    </main>
  );
}
