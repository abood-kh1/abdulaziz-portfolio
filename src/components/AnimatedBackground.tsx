import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    let w = 0, h = 0, dpr = 1;

    const isLight = () => document.documentElement.dataset.theme === "light";

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 28 : w < 1280 ? 48 : 68;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.3,
      }));
    };

    const onResize = () => init();
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    init();

    let time = 0;
    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, w, h);

      const light = isLight();

      // subtle aurora orbs - very calm, editorial
      const orbs = [
        { x: w * 0.18 + Math.sin(time * 0.7) * 40, y: h * 0.22 + Math.cos(time * 0.5) * 30, r: w * 0.28, c: light ? "rgba(228,87,46,0.06)" : "rgba(228,87,46,0.07)" },
        { x: w * 0.82 + Math.cos(time * 0.6) * 50, y: h * 0.68 + Math.sin(time * 0.8) * 40, r: w * 0.32, c: light ? "rgba(201,162,39,0.05)" : "rgba(125,138,95,0.06)" },
        { x: w * 0.5 + Math.sin(time * 0.4) * 60, y: h * 0.92 + Math.cos(time * 0.9) * 20, r: w * 0.4, c: light ? "rgba(100,116,139,0.04)" : "rgba(43,40,34,0.5)" },
      ];
      orbs.forEach(o => {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // update + draw particles
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // mouse interaction - gentle repulsion + attraction
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distM = Math.hypot(dxm, dym);
        if (distM < 160) {
          const force = (160 - distM) / 160;
          p.vx += (dxm / distM) * force * 0.018;
          p.vy += (dym / distM) * force * 0.018;
          // subtle glow near cursor
          if (distM < 90) p.alpha = Math.min(1, p.alpha + 0.015);
        }

        // velocity damping
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.vx = Math.max(-0.8, Math.min(0.8, p.vx));
        p.vy = Math.max(-0.8, Math.min(0.8, p.vy));

        p.x += p.vx;
        p.y += p.vy;

        // wrap softly
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // fade alpha back
        p.alpha += (0.45 - p.alpha) * 0.01;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = light
          ? `rgba(26,24,22,${p.alpha * 0.22})`
          : `rgba(242,239,230,${p.alpha * 0.38})`;
        ctx.fill();

        // tiny accent dot every 7th
        if (i % 7 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = light ? "rgba(228,87,46,0.55)" : "rgba(228,87,46,0.65)";
          ctx.fill();
        }
      }

      // connecting lines - editorial, very subtle
      const maxDist = w < 768 ? 110 : 135;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const opacity = (1 - d / maxDist) * 0.18;
            // boost near mouse
            const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
            const dm = Math.hypot(midX - mx, midY - my);
            const boost = dm < 140 ? (140 - dm) / 140 * 0.12 : 0;
            ctx.strokeStyle = light
              ? `rgba(26,24,22,${opacity + boost})`
              : `rgba(242,239,230,${opacity * 0.7 + boost})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // mouse halo
      if (mx > 0 && my > 0 && mx < w && my < h) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        g.addColorStop(0, light ? "rgba(228,87,46,0.08)" : "rgba(228,87,46,0.09)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [theme]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ background: "var(--color-ink)" }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 85% 70% at 50% 30%, transparent 45%, var(--color-ink) 88%)`, opacity: 0.22 }} />
    </div>
  );
}
