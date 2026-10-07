import React, { useEffect, useRef, useState } from 'react';

interface DustMote {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  phase: number;
}

type MotifType = 'book' | 'basketball' | 'sketch' | 'running' | 'film' | 'research';

export const LivingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const dustRef = useRef<DustMote[]>([]);
  const scrollOffsetRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  // Easter egg watermark motif state
  const [activeMotif, setActiveMotif] = useState<{
    type: MotifType;
    x: number;
    y: number;
    opacity: number;
  } | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track scroll velocity for gentle parallax reaction
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      scrollOffsetRef.current = delta * 0.15;
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // Floating Dust Motes Canvas
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Warm palette dust motes (cream, tan, light coffee)
    const dustColors = [
      'rgba(140, 100, 75,',  // Light coffee
      'rgba(180, 145, 115,', // Warm tan
      'rgba(215, 190, 160,', // Beige
      'rgba(120, 85, 60,',   // Muted brown
    ];

    const motesCount = window.innerWidth < 768 ? 12 : 24;
    const motes: DustMote[] = [];

    for (let i = 0; i < motesCount; i++) {
      motes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() < 0.8 ? 1.2 : 2.0,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.15 - Math.random() * 0.25,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
        alpha: 0.08 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      });
    }

    dustRef.current = motes;

    let active = true;
    let t = 0;

    const render = () => {
      if (!active) return;

      // Pause when document is hidden (switching tabs)
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollShift = scrollOffsetRef.current;
      scrollOffsetRef.current *= 0.92; // Decay scroll impulse

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];

        m.x += m.vx + Math.sin(t + m.phase) * 0.15;
        m.y += m.vy - scrollShift;

        // Wrap around viewport edges softly
        if (m.y < -10) m.y = canvas.height + 10;
        if (m.y > canvas.height + 10) m.y = -10;
        if (m.x < -10) m.x = canvas.width + 10;
        if (m.x > canvas.width + 10) m.x = -10;

        ctx.fillStyle = `${m.color} ${m.alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      active = false;
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [prefersReducedMotion]);

  // Occasional Notebook Easter Egg Motifs
  useEffect(() => {
    if (prefersReducedMotion) return;

    const motifsList: MotifType[] = ['book', 'basketball', 'sketch', 'running', 'film', 'research'];

    const triggerNextMotif = () => {
      // Pick random motif type
      const type = motifsList[Math.floor(Math.random() * motifsList.length)];
      // Position around comfortable margin boundaries (not right on top of primary reading column)
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? Math.random() * 15 + 3 : Math.random() * 15 + 82; // 3-18% or 82-97% vw
      const y = Math.random() * 70 + 15; // 15-85% vh

      setActiveMotif({ type, x, y, opacity: 0.16 });

      // Fade out after 6 seconds
      setTimeout(() => {
        setActiveMotif((prev) => (prev ? { ...prev, opacity: 0 } : null));
      }, 6000);
    };

    // Trigger every 16–22 seconds
    const interval = setInterval(triggerNextMotif, 18000);
    const initialTimer = setTimeout(triggerNextMotif, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* LAYER 1: Subtle Paper Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: `radial-gradient(rgba(45, 30, 20, 0.4) 1px, transparent 0)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* LAYER 2: Slow Warm Breathing Light (Warm cream, beige, faint light coffee) */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full filter blur-[100px] opacity-40 transition-transform duration-10000 ease-in-out"
        style={{
          background: 'radial-gradient(circle, rgba(238, 222, 198, 0.6) 0%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'ambientBreathe 28s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full filter blur-[110px] opacity-35 transition-transform duration-10000 ease-in-out"
        style={{
          background: 'radial-gradient(circle, rgba(228, 206, 180, 0.5) 0%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'ambientBreathe 32s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* LAYER 3: Dust Particles Canvas */}
      {!prefersReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      )}

      {/* LAYER 4: Faint Easter Egg Sketchbook Motifs */}
      {activeMotif && (
        <div
          className="absolute transition-opacity duration-1000 pointer-events-none text-coffee-espresso"
          style={{
            left: `${activeMotif.x}vw`,
            top: `${activeMotif.y}vh`,
            opacity: activeMotif.opacity,
            transform: 'scale(0.9)',
          }}
        >
          {activeMotif.type === 'book' && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h7" />
            </svg>
          )}

          {activeMotif.type === 'basketball' && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M4.93 4.93 19.07 19.07" />
              <path d="m4.93 19.07 14.14-14.14" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}

          {activeMotif.type === 'running' && (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="m6 16 3-3 2 1.5L14 11l3 3" />
              <path d="m9 20 2-4-2-3" />
              <path d="m14 11 2 4 4 1" />
            </svg>
          )}

          {activeMotif.type === 'sketch' && (
            <svg width="38" height="24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M 10 30 Q 35 10, 60 30 T 90 30" />
            </svg>
          )}

          {activeMotif.type === 'film' && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="2.18" />
              <path d="M7 2v20" />
              <path d="M17 2v20" />
              <path d="M2 12h20" />
              <path d="M2 7h5" />
              <path d="M2 17h5" />
              <path d="M17 17h5" />
              <path d="M17 7h5" />
            </svg>
          )}

          {activeMotif.type === 'research' && (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="12" cy="18" r="3" />
              <path d="m8.5 7.5 7 0" />
              <path d="m7.5 8.5 3 7" />
              <path d="m16.5 8.5-3 7" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
