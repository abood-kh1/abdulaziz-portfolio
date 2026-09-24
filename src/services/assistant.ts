import { getSystemPrompt, localRetrieve } from "../data/knowledge";
import type { Lang } from "../i18n/translations";

const GEMINI_MODEL = "gemini-1.5-flash";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function askAssistant(
  question: string,
  lang: Lang,
  history: ChatMessage[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

  // Try Gemini if key exists
  if (apiKey) {
    try {
      const system = getSystemPrompt(lang);
      // If history empty, we already sent question in system block; otherwise append
      const payload = {
        contents: history.length === 0
          ? [{ role: "user", parts: [{ text: system + "\n\nAnswer in " + (lang === "ar" ? "Arabic" : "English") + ". User: " + question }] }]
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
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
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

  // Local fallback: retrieve + synthesize
  const retrieved = localRetrieve(question, lang);
  const intro = lang === "ar"
    ? "إليك إجابة بناءً على ملف عبد العزيز (وضع محلي — بدون مفتاح Gemini):\n\n"
    : "Here's an answer from Abdulaziz's knowledge base (local mode — no Gemini key):\n\n";
  // Try to synthesize a concise answer
  const qLower = question.toLowerCase();
  // If question is greetings
  if (/^(مرحبا|السلام|اهلا|hi|hello|hey)/i.test(qLower.trim())) {
    return lang === "ar"
      ? `أهلاً! أنا مساعد عبد العزيز عطيه الخزندار. أقدر أجاوبك عن مشاريعه (وصال، SiteAware، NCRP، BackendInterviewPass)، مهاراته في Backend و .NET و AI، خدماته وطرق التواصل. اسألني مثلاً: "ما هو مشروع وصال؟" أو "كيف أتواصل معك؟"`
      : `Hi! I'm Abdulaziz's assistant. I can answer about his projects (Wesal, SiteAware, NCRP, BackendInterviewPass), Backend/.NET/AI skills, services and contact. Try: "What is Wesal?" or "How can I contact you?"`;
  }
  return intro + retrieved;
}
