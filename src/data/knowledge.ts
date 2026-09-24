// Knowledge base for AI Assistant - fed with all portfolio data
// Used for RAG-style grounding and fallback local answers

import { translations, type Lang } from "../i18n/translations";
import { LINKS } from "./content";

export function getSystemPrompt(lang: Lang): string {
  const isAr = lang === "ar";
  const t = translations[lang];

  const projectsList = Object.entries(t.projects as unknown as Record<string, { title: string; category: string; description: string; longIntro: string; role: string; technologies?: string[]; features: string[]; contributions: string[] }> )
    .map(([slug, p]) => {
      return `### ${p.title} (${slug}) — ${p.category}
Description: ${p.description}
Intro: ${p.longIntro}
Role: ${p.role}
Technologies: ${((p.technologies as string[] | undefined)?.join(", ") || "—")}
Features: ${p.features.join(" | ")}
Contributions: ${p.contributions.join(" | ")}`;
    })
    .join("\n\n");

  const services = t.services.items.map(s => `- ${s.title}: ${s.detail} | Tech: ${s.tech.join(", ")} | Deliver: ${s.deliver.join(", ")}`).join("\n");
  const skills = t.skills.groups.map(g => `${g.title} (${g.note}): ${g.items.join(", ")}`).join(" | ");
  const journey = t.journey.items.map(j => `${j.phase} — ${j.title}: ${j.text} [${j.tags.join(", ")}]`).join("\n");
  const other = t.otherProjects.items.map(o => `${o.title} (${o.kind}): ${o.description} [${o.stack.join(", ")}]`).join("\n");

  if (isAr) {
    return `أنت مساعد ذكي لموقع عبد العزيز عطيه الخزندار — مطور Backend.

# هويتك
- اسمك: مساعد عبد العزيز
- تتحدث بالعربية بشكل افتراضي (إذا سأل المستخدم بالإنجليزية أجب بالإنجليزية)
- أسلوبك: ودود، محترف، موجز، دقيق. لا تخترع معلومات غير موجودة.

# معلومات عن عبد العزيز
- الاسم الكامل: عبد العزيز عطيه الخزندار — Backend Developer
- طالب IT، متخصص .NET (C#, ASP.NET Core, EF Core)
- قواعد بيانات: PostgreSQL, SQL Server, SQLite
- مصادقة: JWT + RBAC
- ذكاء اصطناعي: Gemini, AI Agents, MCP, RAG, NLP
- جوال: Android (Java, Kotlin, Sensors, GPS)
- أدوات: Git, GitHub, Swagger, Docker
- نبذة: ${t.about.p2}
- المبادئ: ${t.about.principles.map(p=>`${p.k}: ${p.v}`).join(" | ")}

# الخدمات
${services}

# المشاريع المميزة (4)
${projectsList}

# مشاريع أخرى
${other}

# المهارات
${skills}

# الرحلة
${journey}

# التواصل
- GitHub: ${LINKS.github}
- LinkedIn: ${LINKS.linkedin}
- WhatsApp: ${LINKS.whatsapp}
- Email: ${LINKS.emailLabel}

# تعليمات الإجابة
1. أجب فقط من المعلومات أعلاه. إذا سُئلت عن شيء غير مذكور قل: "هذه المعلومة غير متوفرة في ملفي، لكن يمكنك التواصل مباشرة عبر ${LINKS.emailLabel} أو واتساب."
2. إذا سأل عن مشروع محدد، اذكر دوره وتقنياته وميزاته.
3. إذا سأل "كيف أتواصل" أعط الروابط كاملة.
4. إذا سأل عن المهارات أو الخدمات، اذكرها بشكل منظم.
5. لا تذكر أنك نموذج ذكاء اصطناعي خارجي، أنت جزء من هذا الموقع.
6. أجب باللغة التي سأل بها المستخدم (عربي/إنجليزي).
7. كن موجزا (3-5 أسطر) إلا إذا طلب تفصيلا.
8. اقترح في نهاية الإجابة رابط دراسة الحالة: /projects/{slug} إن كان ذا صلة.`;
  }

  return `You are the AI assistant for Abdulaziz Al-Khazendar's portfolio — Backend Developer.

# Identity
- Name: Abdulaziz's Assistant
- Default language: English (if user asks in Arabic, answer in Arabic)
- Tone: friendly, professional, concise, accurate. Do not hallucinate.

# About Abdulaziz
- Full name: Abdulaziz Al-Khazendar — Backend Developer
- IT student, .NET specialist (C#, ASP.NET Core, EF Core)
- Databases: PostgreSQL, SQL Server, SQLite
- Auth: JWT + RBAC
- AI: Gemini, AI Agents, MCP, RAG, NLP
- Mobile: Android (Java, Kotlin, Sensors, GPS)
- Tools: Git, GitHub, Swagger, Docker
- Bio: ${t.about.p2}
- Principles: ${t.about.principles.map(p=>`${p.k}: ${p.v}`).join(" | ")}

# Services
${services}

# Featured Projects (4)
${projectsList}

# Other Projects
${other}

# Skills
${skills}

# Journey
${journey}

# Contact
- GitHub: ${LINKS.github}
- LinkedIn: ${LINKS.linkedin}
- WhatsApp: ${LINKS.whatsapp}
- Email: ${LINKS.emailLabel}

# Answer Instructions
1. Answer ONLY from info above. If info not available say: "That detail isn't in my knowledge base, but you can contact directly via ${LINKS.emailLabel} or WhatsApp."
2. If asked about a specific project, mention role, stack, features.
3. If asked how to contact, give full links.
4. If asked about skills/services, list them structured.
5. Don't reveal you're external AI, you're part of this site.
6. Answer in user's language (ar/en).
7. Keep concise (3-5 lines) unless detail requested.
8. At end suggest case study link: /projects/{slug} if relevant.`;
}

export interface KnowledgeChunk {
  id: string;
  text: string;
  keywords: string[];
}

export function getKnowledgeChunks(lang: Lang): KnowledgeChunk[] {
  const t = translations[lang];
  const chunks: KnowledgeChunk[] = [];

  // about
  chunks.push({
    id: "about",
    text: `${t.about.title1} ${t.about.title2} ${t.about.p2} ${t.about.principles.map(p=>`${p.k}: ${p.v}`).join(" ")}`,
    keywords: ["about", "نبذة", "من", "who", "backend"],
  });

  // services
  t.services.items.forEach(s => {
    chunks.push({
      id: `service-${s.id}`,
      text: `${s.title} — ${s.short}: ${s.detail} Technologies: ${s.tech.join(", ")} Deliver: ${s.deliver.join(", ")} Projects: ${s.projects.map(p=>p.name).join(", ")}`,
      keywords: [s.title.toLowerCase(), s.id, ...s.tech.map(x=>x.toLowerCase())],
    });
  });

  // projects
  Object.entries(t.projects as unknown as Record<string, { title: string; category: string; description: string; longIntro: string; role: string; contributions: string[]; features: string[]; technologies?: string[] }>).forEach(([slug, p]) => {
    const tech = (p.technologies as string[] | undefined) ?? [];
    chunks.push({
      id: `project-${slug}`,
      text: `${p.title} (${slug}) — ${p.category}: ${p.description} ${p.longIntro} Role: ${p.role} Stack: ${tech.join(", ")} Features: ${p.features.join(", ")} Contributions: ${p.contributions.join(" ")}`,
      keywords: [slug, p.title.toLowerCase(), p.category.toLowerCase(), ...tech.map(x=>x.toLowerCase())],
    });
  });

  // other projects
  t.otherProjects.items.forEach((o, i) => {
    chunks.push({
      id: `other-${i}`,
      text: `${o.title} (${o.kind}): ${o.description} Stack: ${o.stack.join(", ")}`,
      keywords: [o.title.toLowerCase(), ...o.stack.map(x=>x.toLowerCase())],
    });
  });

  // skills
  t.skills.groups.forEach(g => {
    chunks.push({
      id: `skill-${g.title}`,
      text: `${g.title} (${g.note}): ${g.items.join(", ")}`,
      keywords: [g.title.toLowerCase(), ...g.items.map(x=>x.toLowerCase())],
    });
  });

  // journey
  t.journey.items.forEach(j => {
    chunks.push({
      id: `journey-${j.phase}`,
      text: `${j.phase} ${j.title}: ${j.text} Tags: ${j.tags.join(", ")}`,
      keywords: [j.title.toLowerCase(), ...j.tags.map(x=>x.toLowerCase())],
    });
  });

  // contact
  chunks.push({
    id: "contact",
    text: `Contact Abdulaziz via GitHub ${LINKS.github} LinkedIn ${LINKS.linkedin} WhatsApp ${LINKS.whatsapp} Email ${LINKS.emailLabel}`,
    keywords: ["contact", "تواصل", "github", "linkedin", "whatsapp", "email", "ايميل"],
  });

  return chunks;
}

// Simple local fallback retrieval (keyword overlap)
export function localRetrieve(question: string, lang: Lang, topK = 3): string {
  const chunks = getKnowledgeChunks(lang);
  const q = question.toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = chunks.map(c => {
    const text = (c.text + " " + c.keywords.join(" ")).toLowerCase();
    let score = 0;
    tokens.forEach(tok => {
      if (text.includes(tok)) score += 2;
      c.keywords.forEach(kw => { if (kw.includes(tok) || tok.includes(kw)) score += 1; });
    });
    // boost exact project names
    if (q.includes("wesal") || q.includes("وصال")) score += c.id.includes("wesal") ? 10 : 0;
    if (q.includes("siteaware")) score += c.id.includes("siteaware") ? 10 : 0;
    if (q.includes("ncrp") || q.includes("نقطة")) score += c.id.includes("ncrp") ? 10 : 0;
    if (q.includes("backendinterview")) score += c.id.includes("backendinterview") ? 10 : 0;
    return { c, score };
  }).sort((a,b)=>b.score-a.score);

  const best = scored.filter(s=>s.score>0).slice(0, topK);
  if (best.length===0) {
    return lang==="ar"
      ? `عذراً، لم أجد إجابة مباشرة لسؤالك. أنا مُغذّى بمعلومات عن عبد العزيز، مهاراته (Backend, .NET, PostgreSQL, JWT, Gemini...), مشاريعه الأربعة (وصال، SiteAware، NCRP، BackendInterviewPass) وخدماته وطرق التواصل. جرّب سؤالاً مثل: "ما هو مشروع وصال؟" أو "ما مهاراتك في الـ Backend؟" أو تواصل مباشرة عبر ${LINKS.emailLabel}.`
      : `I couldn't find a direct answer. I'm trained on Abdulaziz's profile: Backend (.NET, PostgreSQL, JWT, Gemini), 4 featured projects (Wesal, SiteAware, NCRP, BackendInterviewPass), services, skills and contact. Try: "What is Wesal?" or "What are your backend skills?" or contact via ${LINKS.emailLabel}.`;
  }
  return best.map(b=>b.c.text).join("\n\n---\n\n");
}
