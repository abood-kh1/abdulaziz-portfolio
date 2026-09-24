import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { askAssistant, type ChatMessage } from "../services/assistant";

const SUGGESTIONS_AR = [
  "ما هو مشروع وصال؟",
  "ما مهاراتك في الـ Backend؟",
  "كيف أتواصل معك؟",
  "حدثني عن SiteAware",
];

const SUGGESTIONS_EN = [
  "What is Wesal?",
  "What are your backend skills?",
  "How can I contact you?",
  "Tell me about SiteAware",
];

export default function AIAssistant() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const suggestions = isAr ? SUGGESTIONS_AR : SUGGESTIONS_EN;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const initial: ChatMessage = {
      role: "assistant",
      content: isAr
        ? "مرحباً! أنا مساعد عبد العزيز عطيه الخزندار 🤖\nأسألني عن مشاريعه، مهاراته، خدماته أو طرق التواصل — أجيب فوراً من ملفه."
        : "Hi! I'm Abdulaziz's assistant 🤖\nAsk me about his projects, skills, services or contact — I answer instantly from his profile.",
    };
    return [initial];
  });

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // update welcome when lang changes (only if empty)
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1) {
        return [{
          role: "assistant",
          content: isAr
            ? "مرحباً! أنا مساعد عبد العزيز عطيه الخزندار 🤖\nأسألني عن مشاريعه، مهاراته، خدماته أو طرق التواصل — أجيب فوراً من ملفه."
            : "Hi! I'm Abdulaziz's assistant 🤖\nAsk me about his projects, skills, services or contact — I answer instantly from his profile.",
        }];
      }
      return prev;
    });
  }, [isAr]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [open, messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const nextHistory: ChatMessage[] = [...messages, { role: "user", content: q } as ChatMessage];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);
    try {
      const answer = await askAssistant(q, lang, nextHistory as ChatMessage[]);
      setMessages([...nextHistory, { role: "assistant", content: answer }]);
    } catch {
      setMessages([...nextHistory, {
        role: "assistant",
        content: isAr ? "عذراً، حدث خطأ. جرّب مرة أخرى أو تواصل عبر aboodkh1313@gmail.com" : "Sorry, something went wrong. Try again or contact via aboodkh1313@gmail.com",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? (isAr ? "إغلاق المساعد" : "Close assistant") : (isAr ? "فتح المساعد" : "Open assistant")}
        className="assistant-btn fixed bottom-6 end-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.05] hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        style={{ insetInlineEnd: "1.5rem" } as React.CSSProperties}
      >
        <span className="text-xl" aria-hidden>{open ? "✕" : "✦"}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={isAr ? "مساعد عبد العزيز" : "Abdulaziz assistant"}
          className="fixed bottom-24 end-6 z-[60] flex max-h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-line bg-coal shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
          style={{ insetInlineEnd: "1.5rem" } as React.CSSProperties}
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-xs font-bold text-white">AI</span>
              <div>
                <p className="text-sm font-semibold leading-none text-cream">{isAr ? "مساعد عبد العزيز" : "Abdulaziz Assistant"}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-dim uppercase">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-[#7bc47f]" /> {isAr ? "مُغذّى بملفي الكامل" : "Trained on my profile"}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-md text-fog hover:bg-panel hover:text-cream">✕</button>
          </div>

          {/* messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-coal p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-accent text-white rounded-br-sm" : "border border-line bg-panel text-sand rounded-bl-sm"}`}>
                  {/* auto-link case study slugs */}
                  {m.content.split(/(\/projects\/\w+)/g).map((part, idx) =>
                    part.startsWith("/projects/") ? (
                      <Link key={idx} to={part} onClick={() => setOpen(false)} className="font-mono text-accent underline hover:text-accent-deep">{part}</Link>
                    ) : (
                      <span key={idx}>{part}</span>
                    )
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-line bg-panel px-3.5 py-2.5 font-mono text-xs text-fog">▌ {isAr ? "يكتب..." : "typing..."}</div>
              </div>
            )}
          </div>

          {/* suggestions */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-line bg-coal px-3 py-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full border border-line bg-ink px-3 py-1.5 font-mono text-[11px] tracking-wide text-fog hover:border-accent hover:text-cream"
              >
                {s}
              </button>
            ))}
          </div>

          {/* input */}
          <form
            onSubmit={e => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-line bg-ink p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isAr ? "اسأل عن وصال، مهاراتي، خدماتي..." : "Ask about Wesal, my skills, services..."}
              className="flex-1 rounded-full border border-line bg-coal px-4 py-2.5 text-sm text-cream placeholder:text-dim focus:border-accent focus:outline-none"
              dir={isAr ? "rtl" : "ltr"}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white transition-colors hover:bg-accent-deep disabled:opacity-40"
              aria-label="Send"
            >
              {isAr ? "↑" : "→"}
            </button>
          </form>

          <p className="border-t border-line bg-coal px-3 py-2 text-center font-mono text-[10px] tracking-wider text-dim">
            {isAr ? "مُغذّى بملف عبد العزيز • يجيب فقط من معرفتي" : "Grounded on Abdulaziz's profile • answers only from my knowledge"}
            {" · "}
            <span className="text-fog">{import.meta.env.VITE_GEMINI_API_KEY && (import.meta.env.VITE_GEMINI_API_KEY as string).startsWith("AIza") ? (isAr ? "Gemini متصل" : "Gemini connected") : (isAr ? "وضع محلي" : "local mode")}</span>
          </p>
        </div>
      )}

      <style>{`
        .assistant-btn { inset-inline-end: 1.5rem; inset-inline-start: auto; }
        html[dir="rtl"] .assistant-btn { inset-inline-start: 1.5rem; inset-inline-end: auto; }
      `}</style>
    </>
  );
}
