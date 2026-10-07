import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePortfolioStore } from '../../data/usePortfolioStore';

interface ArtisticPoint {
  originX: number;
  originY: number;
  x: number;
  y: number;
  color: string;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
}

export const ParticlePortrait: React.FC = () => {
  const store = usePortfolioStore();
  const activePhoto = store.getActivePhoto();
  const imageSrc = activePhoto.startsWith('/') ? activePhoto : `/${activePhoto}`;

  // Mode: 'artistic' (default stylized reconstruction) or 'photo' (authentic photograph revealed on double-click)
  const [mode, setMode] = useState<'artistic' | 'photo'>('artistic');
  const [transitionProgress, setTransitionProgress] = useState(1); // 1 (artistic) to 0 (photo)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<ArtisticPoint[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const timeRef = useRef<number>(0);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize artistic stippling data from authentic photo
  const initStippling = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const container = containerRef.current;
      const displayWidth = container ? Math.min(container.clientWidth, 340) : 320;
      const displayHeight = Math.round(displayWidth * 1.28);

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      // Offscreen canvas for sampling tonal density
      const offscreen = document.createElement('canvas');
      const isMobile = window.innerWidth < 768;
      const sampleWidth = isMobile ? 85 : 115;
      const sampleHeight = Math.round(sampleWidth * 1.28);
      offscreen.width = sampleWidth;
      offscreen.height = sampleHeight;

      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

      const scaleX = displayWidth / sampleWidth;
      const scaleY = displayHeight / sampleHeight;
      const points: ArtisticPoint[] = [];

      // Warm editorial palette mappings
      const warmPalette = [
        { r: 42, g: 30, b: 24 },   // Deep espresso
        { r: 68, g: 48, b: 35 },   // Dark chocolate brown
        { r: 104, g: 74, b: 55 },  // Warm coffee roast
        { r: 146, g: 106, b: 78 }, // Caramel / warm tan
        { r: 184, g: 142, b: 108 },// Muted terracotta / beige
        { r: 218, g: 196, b: 168 },// Warm cream
        { r: 242, g: 234, b: 220 },// Soft linen highlight
      ];

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          if (a < 35) continue;

          // Perceived brightness (luminance)
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Adaptive sampling: capture finer details in midtones and face contours
          const densityThreshold = lum < 0.25 ? 0.95 : lum < 0.65 ? 0.85 : 0.7;
          if (Math.random() > densityThreshold) continue;

          // Map luminance to warm tone in palette
          const palIdx = Math.min(
            warmPalette.length - 1,
            Math.floor(lum * (warmPalette.length - 0.01))
          );
          const tone = warmPalette[palIdx];

          // Blend tonal color with actual pixel color for lifelike nuance
          const finalR = Math.round(tone.r * 0.7 + r * 0.3);
          const finalG = Math.round(tone.g * 0.7 + g * 0.3);
          const finalB = Math.round(tone.b * 0.7 + b * 0.3);

          const posX = x * scaleX;
          const posY = y * scaleY;

          points.push({
            originX: posX,
            originY: posY,
            x: posX,
            y: posY,
            color: `rgba(${finalR}, ${finalG}, ${finalB}, 0.92)`,
            size: isMobile ? (lum < 0.4 ? 1.6 : 1.2) : (lum < 0.4 ? 1.8 : 1.3),
            alpha: 0.88,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.6,
          });
        }
      }

      pointsRef.current = points;
    };
  }, [imageSrc]);

  useEffect(() => {
    initStippling();
    window.addEventListener('resize', initStippling);
    return () => window.removeEventListener('resize', initStippling);
  }, [initStippling]);

  // Animation Loop for Artistic Stippling Mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let active = true;

    const render = () => {
      if (!active) return;
      timeRef.current += 0.012;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Warm paper backdrop tint on canvas
      ctx.fillStyle = '#faf6ef';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 75;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Soft, organic breathing drift (never destroys the face or scatters away)
        const driftX = Math.sin(t * pt.speed + pt.phase) * 1.8;
        const driftY = Math.cos(t * pt.speed * 0.9 + pt.phase) * 1.8;

        let targetX = pt.originX + driftX;
        let targetY = pt.originY + driftY;

        // Gentle interactive warmth: cursor creates a very subtle gentle sway (max 3-4px), NOT a black hole!
        if (mouse.active) {
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const factor = (mouseRadius - dist) / mouseRadius;
            // Gentle gentle deflection without scattering
            targetX += (dx / dist) * factor * 3.5;
            targetY += (dy / dist) * factor * 3.5;
          }
        }

        pt.x += (targetX - pt.x) * 0.15;
        pt.y += (targetY - pt.y) * 0.15;

        // Draw stipple point
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Very subtle warm photographic grain overlay
      ctx.fillStyle = 'rgba(100, 75, 55, 0.025)';
      for (let g = 0; g < 40; g++) {
        const rx = (Math.sin(t * 10 + g * 37) * 0.5 + 0.5) * canvas.width;
        const ry = (Math.cos(t * 12 + g * 53) * 0.5 + 0.5) * canvas.height;
        ctx.fillRect(rx, ry, 1, 1);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    if (mode === 'artistic' || transitionProgress > 0) {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode, transitionProgress]);

  // Smooth Transition Coordinator
  const handleToggleMode = () => {
    if (isTransitioning) return;
    setHasInteracted(true);
    setIsTransitioning(true);

    const nextMode = mode === 'photo' ? 'artistic' : 'photo';

    if (prefersReducedMotion) {
      setMode(nextMode);
      setTransitionProgress(nextMode === 'artistic' ? 1 : 0);
      setIsTransitioning(false);
      return;
    }

    // 1.4s smooth ease-in-out interpolation
    const startTime = performance.now();
    const duration = 1400;
    const startVal = mode === 'photo' ? 0 : 1;
    const endVal = nextMode === 'artistic' ? 1 : 0;

    const animateTransition = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setTransitionProgress(startVal + (endVal - startVal) * ease);

      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        setMode(nextMode);
        setTransitionProgress(endVal);
        setIsTransitioning(false);
      }
    };

    requestAnimationFrame(animateTransition);
  };

  // Double-tap support for mobile devices
  const lastTapRef = useRef<number>(0);
  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 340) {
      handleToggleMode();
    }
    lastTapRef.current = now;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    setIsHovered(false);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center select-none font-sans">
      {/* Editorial Frame */}
      <div
        onDoubleClick={handleToggleMode}
        onTouchEnd={handleTouchEnd}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group p-3 sm:p-3.5 bg-cream-50 border border-beige-dark/70 rounded-2xl shadow-warm-md hover:shadow-warm-lg transition-all duration-500 cursor-pointer overflow-hidden"
        title="Double-click to transform portrait"
      >
        {/* Aspect Container */}
        <div className="relative aspect-[4/5] w-64 sm:w-72 md:w-80 rounded-xl overflow-hidden bg-cream-100 border border-coffee/15 shadow-inner">
          {/* Layer 1: Authentic Photograph (Default) */}
          <img
            src={imageSrc}
            alt="Divya Rao"
            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 pointer-events-none"
            style={{
              opacity: 1 - transitionProgress,
              filter: `contrast(${1 + transitionProgress * 0.1}) sepia(${transitionProgress * 0.25})`,
              transform: `scale(${1 + (1 - transitionProgress) * (isHovered ? 0.02 : 0)})`,
            }}
          />

          {/* Layer 2: Artistic Photographic Reconstruction Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500"
            style={{
              opacity: transitionProgress,
            }}
          />

          {/* Layer 3: Warm Photographic Vignette and Grain */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background:
                'radial-gradient(circle at center, transparent 65%, rgba(68, 48, 35, 0.12) 100%)',
              opacity: mode === 'artistic' ? 0.7 : 0.4,
            }}
          />

          {/* Minimal Editorial Archival Marker */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 bg-cream-50/90 backdrop-blur-md rounded-lg border border-beige-dark/40 text-[10px] font-mono text-coffee-espresso flex items-center justify-between pointer-events-none shadow-warm-xs">
            <span className="font-bold tracking-widest text-[9px] text-coffee">
              ARCHIVE // PORTRAIT
            </span>
            <span className="text-[9px] text-coffee-muted font-mono">
              CHANDIGARH, IN
            </span>
          </div>
        </div>
      </div>

      {/* Discovery Hint — Subtle editorial instruction */}
      <p className="mt-2.5 text-center text-[11px] font-mono text-coffee-muted/80 tracking-wide transition-opacity duration-300">
        {mode === 'artistic' ? 'Double-click image to reveal' : 'Double-click to return to reconstructed state'}
      </p>
    </div>
  );
};
