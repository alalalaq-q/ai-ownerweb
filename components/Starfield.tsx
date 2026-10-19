"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  amp: number;
  speed: number;
  phase: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  len: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const mounted = canvasRef.current;
    if (!mounted) return;

    const canvas: HTMLCanvasElement = mounted;
    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx: CanvasRenderingContext2D = context;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = motionQuery.matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let prev = 0;
    let lastMeteor = 0;
    let nextGap = 9000;

    const isMobile = () => window.innerWidth < 768;

    function buildStars() {
      const area = width * height;
      const count = Math.round(area / (isMobile() ? 5200 : 2600));
      const total = Math.max(80, Math.min(isMobile() ? 240 : 620, count));
      stars = Array.from({ length: total }, () => {
        const near = Math.random() > 0.86;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: near ? 0.9 + Math.random() * 1.1 : 0.35 + Math.random() * 0.7,
          base: 0.14 + Math.random() * 0.4,
          amp: near ? 0.18 + Math.random() * 0.2 : Math.random() * 0.18,
          speed: 0.0004 + Math.random() * 0.0011,
          phase: Math.random() * Math.PI * 2,
        };
      });
    }

    function paintStatic() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#dfe7ff";
      for (const star of stars) {
        ctx.globalAlpha = star.base;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function spawnMeteor() {
      const fromLeft = Math.random() > 0.5;
      meteors.push({
        x: fromLeft ? width * (0.05 + Math.random() * 0.5) : width * (0.45 + Math.random() * 0.5),
        y: height * (0.02 + Math.random() * 0.3),
        vx: fromLeft ? 5.5 + Math.random() * 2 : -(5.5 + Math.random() * 2),
        vy: 2.4 + Math.random() * 1.4,
        life: 1,
        len: 10 + Math.random() * 8,
      });
    }

    function loop(now: number) {
      const dt = Math.min(now - prev, 48);
      prev = now;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#dfe7ff";

      for (const star of stars) {
        const alpha = Math.max(0.04, star.base + Math.sin(now * star.speed + star.phase) * star.amp);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!isMobile() && now - lastMeteor > nextGap) {
        spawnMeteor();
        lastMeteor = now;
        nextGap = 7000 + Math.random() * 9000;
      }

      meteors = meteors.filter((m) => m.life > 0 && m.x > -80 && m.x < width + 80 && m.y < height + 40);
      for (const m of meteors) {
        m.x += (m.vx * dt) / 16;
        m.y += (m.vy * dt) / 16;
        m.life -= dt / 900;

        const tailX = m.x - m.vx * m.len;
        const tailY = m.y - m.vy * m.len;
        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(214, 228, 255, ${Math.max(0, m.life) * 0.85})`);
        gradient.addColorStop(1, "rgba(214, 228, 255, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (reduce) {
        cancelAnimationFrame(raf);
        paintStatic();
        return;
      }
      cancelAnimationFrame(raf);
      prev = performance.now();
      lastMeteor = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
      if (reduce) {
        paintStatic();
      }
    }

    function onMotionChange() {
      reduce = motionQuery.matches;
      start();
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        start();
      }
    }

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
