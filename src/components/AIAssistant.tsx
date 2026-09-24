import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { askAssistant, type ChatMessage } from "../services/assistant";
import profileImg from "../assets/Abdulaziaz2.jpg";

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

const TEASERS_AR = [
  "أنا هنا لمساعدتك 🙌",
  "بدك تستفسر أكثر؟",
  "شو بتحب تعرف عن شغلي؟",
];

const TEASERS_EN = [
  "I'm here to help 🙌",
  "Want to ask something?",
  "Curious about my work?",
];

function renderMessage(text: string, onInternal: () => void) {
  // match: https://, http://, www., mailto:, /projects/, emails
  const regex = /(\bhttps?:\/\/[^\s]+|\bwww\.[^\s]+|mailto:[^\s]+|\/projects\/[^\s]+|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/gi;
  const parts = text.split(regex);
  return parts.map((part, idx) => {
    if (!part) return null;
    // internal project link
    if (part.startsWith("/projects/")) {
      // strip trailing punctuation
      const m = part.match(/^(\/projects\/[^\s,)\].]+)([.,)\]]*)$/);
      const href = m ? m[1] : part;
      const trail = m ? m[2] : "";
      return (
        <span key={idx}>
          <Link to={href} onClick={onInternal} className="font-mono text-[12px] text-accent underline decoration-accent/30 underline-offset-2 hover:text-accent-deep break-all">
            {href}
          </Link>
          {trail}
        </span>
      );
    }
    // external http(s) or www or mailto or email
    const isHttp = /^https?:\/\//i.test(part);
    const isWww = /^www\./i.test(part);
    const isMailto = /^mailto:/i.test(part);
    const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(part);
    if (isHttp || isWww || isMailto || isEmail) {
      // strip trailing punctuation like . , ) ]
      const m = part.match(/^(.+?)([.,)\]]+)$/);
      let href = part;
      let display = part;
      let trail = "";
      if (m && !part.includes("...")) {
        // avoid stripping if URL genuinely ends with punctuation inside
        const candidate = m[1];
        // only strip if candidate still looks like URL/email
        if (/^(https?:\/\/|www\.|mailto:)/i.test(candidate) || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(candidate)) {
          href = candidate;
          display = candidate;
          trail = m[2];
        }
      }
      if (isWww) href = "https://" + href;
      if (isEmail) href = "mailto:" + href;
      const isExternal = isHttp || isWww || isEmail || (isMailto && !href.startsWith("/projects"));
      return (
        <span key={idx}>
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="font-mono text-[12px] text-accent underline decoration-accent/30 underline-offset-2 hover:text-accent-deep break-all"
          >
            {display}
          </a>
          {trail}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

type Pos = { x: number; y: number } | null;

const STORAGE_POS = "assistant-pos";
const TYPING_SPEED = 22; // ms per char - calmer
const TYPING_INITIAL_DELAY = 500;

export default function AIAssistant() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const suggestions = isAr ? SUGGESTIONS_AR : SUGGESTIONS_EN;
  const teasers = isAr ? TEASERS_AR : TEASERS_EN;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaserIdx, setTeaserIdx] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pos, setPos] = useState<Pos>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_POS);
      if (raw) return JSON.parse(raw) as Pos;
    } catch {}
    return null;
  });
  const [dragging, setDragging] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dragOffset = useRef({ dx: 0, dy: 0 });
  const typingRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const initial: ChatMessage = {
      role: "assistant",
      content: isAr
        ? "مرحباً! أنا مساعد عبد العزيز عطيه الخزندار\nأنا هنا لمساعدتك — اسألني عن مشاريعه، مهاراته، خدماته أو طرق التواصل."
        : "Hi! I'm Abdulaziz's assistant\nI'm here to help — ask me about his projects, skills, services or contact.",
    };
    return [initial];
  });

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1) {
        return [{
          role: "assistant",
          content: isAr
            ? "مرحباً! أنا مساعد عبد العزيز عطيه الخزندار\nأنا هنا لمساعدتك — اسألني عن مشاريعه، مهاراته، خدماته أو طرق التواصل."
            : "Hi! I'm Abdulaziz's assistant\nI'm here to help — ask me about his projects, skills, services or contact.",
        }];
      }
      return prev;
    });
  }, [isAr]);

  // persist pos
  useEffect(() => {
    if (pos) localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
  }, [pos]);

  // external teaser bubble lifecycle
  useEffect(() => {
    if (open || dismissed) {
      setShowTeaser(false);
      return;
    }
    const t1 = window.setTimeout(() => setShowTeaser(true), 2500);
    const interval = window.setInterval(() => {
      setTeaserIdx(i => (i + 1) % teasers.length);
    }, 3800);
    const hide = window.setTimeout(() => setShowTeaser(false), 12000);
    const reshow = window.setTimeout(() => {
      if (!open && !dismissed) setShowTeaser(true);
    }, 16000);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
      clearTimeout(hide);
      clearTimeout(reshow);
    };
  }, [open, dismissed, teasers.length]);

  useEffect(() => {
    if (!showTeaser || open) return;
    const id = window.setInterval(() => setTeaserIdx(i => (i + 1) % teasers.length), 3000);
    return () => clearInterval(id);
  }, [showTeaser, open, teasers.length]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [open, messages, loading]);

  // cleanup typing on unmount
  useEffect(() => {
    return () => { if (typingRef.current) window.clearInterval(typingRef.current); };
  }, []);

  // draggable handlers
  const onPointerDown = (e: React.PointerEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    // initialize pos if null (convert fixed bottom/right to left/top)
    if (!pos) {
      setPos({ x: rect.left, y: rect.top });
      dragOffset.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    } else {
      dragOffset.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    }
    setDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const newX = e.clientX - dragOffset.current.dx;
    const newY = e.clientY - dragOffset.current.dy;
    const pad = 8;
    const maxX = window.innerWidth - 56 - pad;
    const maxY = window.innerHeight - 56 - pad;
    setPos({
      x: Math.max(pad, Math.min(newX, maxX)),
      y: Math.max(pad, Math.min(newY, maxY)),
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
  };

  const handleBtnClick = () => {
    // if dragged recently, don't toggle
    if (dragging) return;
    setOpen(v => !v);
    if (!open) setShowTeaser(false);
  };

  // typewriter effect - calmer, slower
  const typeAnswer = (full: string, baseHistory: ChatMessage[]) => {
    if (typingRef.current) window.clearInterval(typingRef.current);
    let idx = 0;
    // start with empty assistant bubble
    setMessages([...baseHistory, { role: "assistant", content: "" }]);
    setLoading(false);
    // small initial pause
    window.setTimeout(() => {
      typingRef.current = window.setInterval(() => {
        idx += 1;
        const slice = full.slice(0, idx);
        setMessages([...baseHistory, { role: "assistant", content: slice }]);
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
        if (idx >= full.length) {
          if (typingRef.current) window.clearInterval(typingRef.current);
          typingRef.current = null;
        }
      }, TYPING_SPEED);
    }, TYPING_INITIAL_DELAY);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    if (typingRef.current) { window.clearInterval(typingRef.current); typingRef.current = null; }
    const nextHistory: ChatMessage[] = [...messages, { role: "user", content: q } as ChatMessage];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);
    try {
      const answer = await askAssistant(q, lang, nextHistory as ChatMessage[]);
      typeAnswer(answer, nextHistory);
    } catch {
      setLoading(false);
      setMessages([...nextHistory, {
        role: "assistant",
        content: isAr ? "عذراً، حدث خطأ. جرّب مرة أخرى أو تواصل عبر aboodkh1313@gmail.com" : "Sorry, something went wrong. Try again or contact via aboodkh1313@gmail.com",
      }]);
    }
  };

  // position styles
  const btnStyle: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
    : { insetInlineEnd: "1.5rem", bottom: "1.5rem" } as React.CSSProperties;

  const panelStyle: React.CSSProperties = pos
    ? {
        left: Math.min(pos.x, window.innerWidth - 392),
        top: Math.min(pos.y - 420, window.innerHeight - 540) > 8 ? pos.y - 420 : pos.y + 70,
        right: "auto",
        bottom: "auto",
      }
    : { insetInlineEnd: "1.5rem", bottom: "6rem" } as React.CSSProperties;

  // adjust panel style for mobile when pos is near edge
  const teaserStyle: React.CSSProperties = pos
    ? {
        left: Math.max(12, Math.min(pos.x - 100, window.innerWidth - 272)),
        top: pos.y - 64,
        right: "auto",
        bottom: "auto",
      }
    : { insetInlineEnd: "1.5rem", bottom: "6rem" } as React.CSSProperties;

  return (
    <>
      {/* External attention bubble - outside chat */}
      {!open && showTeaser && (
        <div
          className="assistant-teaser fixed z-[60] flex max-w-[260px] items-center gap-2.5 rounded-xl border border-line bg-cream px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          style={teaserStyle}
        >
          <img src={profileImg} alt="" aria-hidden className="h-7 w-7 shrink-0 rounded-full border border-line object-cover" style={{ objectPosition: "50% 18%" }} />
          <p className="flex-1 text-[13px] font-medium leading-snug text-ink" style={{ fontFamily: isAr ? "var(--font-arabic)" : undefined }}>
            {teasers[teaserIdx]}
          </p>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-dim hover:bg-ink/10 hover:text-ink"
          >
            ✕
          </button>
          <span className="absolute -bottom-1 h-2.5 w-2.5 rotate-45 border-b border-e border-line bg-cream" style={{ insetInlineEnd: "1.6rem", left: pos ? "auto" : undefined } as React.CSSProperties} aria-hidden />
        </div>
      )}

      {/* Draggable floating button */}
      <button
        ref={btnRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={handleBtnClick}
        aria-label={open ? (isAr ? "إغلاق المساعد" : "Close assistant") : (isAr ? "فتح المساعد" : "Open assistant")}
        className={`assistant-btn fixed z-[60] grid h-14 w-14 place-items-center rounded-full border border-line bg-coal shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 overflow-hidden ${dragging ? "cursor-grabbing scale-[1.03]" : "cursor-grab"}`}
        style={btnStyle}
      >
        {open ? (
          <span className="grid h-full w-full place-items-center bg-ink text-lg text-cream">✕</span>
        ) : (
          <img src={profileImg} alt="Abdulaziz" className="h-full w-full object-cover" style={{ objectPosition: "50% 18%" }} draggable={false} />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={isAr ? "مساعد عبد العزيز" : "Abdulaziz assistant"}
          className="fixed z-[60] flex max-h-[min(68vh,500px)] w-[min(92vw,360px)] flex-col overflow-hidden rounded-xl border border-line bg-ink shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
          style={panelStyle}
        >
          {/* header - calmer, editorial */}
          <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3">
            <div className="flex items-center gap-2.5">
              <img src={profileImg} alt="Abdulaziz" className="h-8 w-8 rounded-full border border-line object-cover opacity-90" style={{ objectPosition: "50% 18%" }} />
              <div>
                <p className="text-[13px] font-medium leading-none tracking-tight text-cream" style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)" }}>{isAr ? "مساعد عبد العزيز" : "Abdulaziz Assistant"}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7bc47f] opacity-70" /> {isAr ? "أنا هنا لمساعدتك" : "here to help"}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-md text-dim hover:bg-panel hover:text-cream">✕</button>
          </div>

          {/* messages - calmer, editorial with clickable links */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-coal px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {m.role === "assistant" && (
                  <img src={profileImg} alt="" aria-hidden className="mt-1 h-6 w-6 shrink-0 rounded-full border border-line object-cover opacity-80 hidden sm:block" style={{ objectPosition: "50% 18%" }} />
                )}
                <div className={`max-w-[84%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-[13.5px] leading-[1.6] ${m.role === "user" ? "rounded-2xl rounded-br-md bg-cream text-ink" : "rounded-xl rounded-bl-md border border-line/70 bg-ink text-sand/90"}`} style={{ fontFamily: m.role === "assistant" && isAr ? "var(--font-arabic)" : undefined }}>
                  {renderMessage(m.content, () => setOpen(false))}
                  {m.role === "assistant" && typingRef.current !== null && i === messages.length - 1 && m.content.length > 0 && m.content.length < 800 && (
                    <span className="caret ms-0.5 inline-block h-3 w-[2px] bg-accent align-middle" aria-hidden />
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-2">
                <img src={profileImg} alt="" aria-hidden className="mt-1 h-6 w-6 shrink-0 rounded-full border border-line object-cover opacity-80 hidden sm:block" style={{ objectPosition: "50% 18%" }} />
                <div className="rounded-xl border border-line/60 bg-ink px-3.5 py-2.5 font-mono text-[11px] tracking-wide text-dim"> {isAr ? "يكتب بهدوء..." : "typing calmly..."} </div>
              </div>
            )}
          </div>

          {/* suggestions - calmer pills */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-line/60 bg-ink px-3 py-2.5">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full border border-line/70 bg-coal px-3 py-1.5 font-mono text-[11px] tracking-wide text-fog transition-colors hover:border-accent/40 hover:bg-panel hover:text-cream"
              >
                {s}
              </button>
            ))}
          </div>

          {/* input - calmer */}
          <form
            onSubmit={e => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-line bg-ink px-3 py-2.5"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isAr ? "اسأل بهدوء..." : "Ask calmly..."}
              className="flex-1 rounded-full border border-line/70 bg-coal px-4 py-2 text-[13px] text-cream placeholder:text-dim/70 focus:border-accent/40 focus:outline-none"
              style={{ fontFamily: isAr ? "var(--font-arabic)" : undefined }}
              dir={isAr ? "rtl" : "ltr"}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-8 w-8 place-items-center rounded-full bg-cream text-ink transition-colors hover:bg-accent hover:text-white disabled:opacity-30"
              aria-label="Send"
            >
              <span className="text-sm">{isAr ? "↑" : "→"}</span>
            </button>
          </form>

          <p className="border-t border-line/50 bg-coal px-3 py-2 text-center font-mono text-[10px] tracking-[0.14em] text-dim/80">
            {isAr ? "مُغذّى بملفك • إجابات هادئة ومؤصلة" : "grounded • calm & cited answers"}
            {" · "}
            <span className="text-dim">{import.meta.env.VITE_GEMINI_API_KEY ? (isAr ? "متصل" : "connected") : (isAr ? "محلي" : "local")}</span>
          </p>
        </div>
      )}

      <style>{`
        .assistant-btn { touch-action: none; user-select: none; }
      `}</style>
    </>
  );
}
