import { getSystemPrompt, localRetrieve } from "../data/knowledge";
import type { Lang } from "../i18n/translations";

const GEMINI_MODEL = "gemini-3.1-flash-lite";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function detectLang(text: string, fallback: Lang): Lang {
  // if contains Arabic letters, prefer Arabic
  return /[\u0600-\u06FF]/.test(text) ? "ar" : fallback;
}

export async function askAssistant(
  question: string,
  lang: Lang,
  history: ChatMessage[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  const effectiveLang: Lang = detectLang(question, lang);
  const isArEffective = effectiveLang === "ar";

  // Try Gemini if key exists (AQ... also valid for some Google Cloud keys)
  const hasKey = !!apiKey && apiKey.length > 20;
  if (hasKey) {
    try {
      const system = getSystemPrompt(effectiveLang);
      // If history empty, we already sent question in system block; otherwise append
      const payload = {
        contents: history.length === 0
          ? [{ role: "user", parts: [{ text: system + "\n\nAnswer in " + (isArEffective ? "Arabic" : "English") + ". User: " + question }] }]
          : [
              { role: "user", parts: [{ text: system }] },
              ...history.slice(-6).map(m => ({
                role: m.role === "user" ? "user" : "model",
                parts: [{ text: m.content }],
              })),
              { role: "user", parts: [{ text: question }] },
            ],
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 700,
              topP: 0.9,
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ],
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.warn("Gemini error:", err);
        throw new Error(err);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text.trim();
      throw new Error("Empty Gemini response");
    } catch (e) {
      console.warn("Fallback to local due to Gemini failure:", e);
      // fall through to local
    }
  }

  // Local fallback: retrieve + synthesize (always works, no API needed)
  const retrieved = localRetrieve(question, effectiveLang);
  // Special handling for language switch request
  if (/اتكلم عربي|تكلم عربي|عربي/i.test(question)) {
    return "أكيد! سأتحدث معك بالعربية من الآن. أنا مساعد عبد العزيز عطيه الخزندار — اسألني عن وصال، SiteAware، NCRP، مهارات الـ Backend أو طرق التواصل. كيف أساعدك؟";
  }
  if (/speak english|talk english/i.test(question)) {
    return "Sure! I'll speak English from now. I'm Abdulaziz's assistant — ask me about Wesal, SiteAware, NCRP, backend skills or contact. How can I help?";
  }
  if (/^(مرحبا|السلام|اهلا|مرحبا|سلام|hi|hello|hey)/i.test(question.trim())) {
    return isArEffective
      ? `أهلاً! أنا مساعد عبد العزيز عطيه الخزندار. أقدر أجاوبك عن مشاريعه (وصال، SiteAware، NCRP، BackendInterviewPass)، مهاراته في Backend و .NET و AI، خدماته وطرق التواصل. اسألني مثلاً: "ما هو مشروع وصال؟" أو "كيف أتواصل معك؟"`
      : `Hi! I'm Abdulaziz's assistant. I can answer about his projects (Wesal, SiteAware, NCRP, BackendInterviewPass), Backend/.NET/AI skills, services and contact. Try: "What is Wesal?" or "How can I contact you?"`;
  }
  return retrieved;
}
