import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  ArrowUpRight,
  MapPin,
  Laptop,
  Telescope,
  BookOpen,
  Footprints,
  Dribbble,
  Palette,
  Music,
  PenTool,
  User,
  Heart,
  X,
} from 'lucide-react';

interface Landmark {
  id: string;
  title: string;
  tag: string;
  category: string;
  path: string;
  xPercent: number; // percentage from left (0 - 100)
  yPercent: number; // percentage from top (0 - 100)
  icon: React.ReactNode;
  description: string;
  highlightColor: string;
}

const LANDMARKS: Landmark[] = [
  {
    id: 'projects',
    title: 'Workstation Villa',
    tag: 'Projects 2024–Now',
    category: 'Engineering',
    path: '/projects',
    xPercent: 62,
    yPercent: 32,
    icon: <Laptop className="w-3.5 h-3.5" />,
    description: 'DevPosting MERN platform, AutoHeal-J self-healing microservice & AlgoLabs visualizer.',
    highlightColor: '#D97706',
  },
  {
    id: 'research',
    title: 'Observatory Tower',
    tag: 'Research Interests',
    category: 'AI Systems',
    path: '/research',
    xPercent: 77,
    yPercent: 18,
    icon: <Telescope className="w-3.5 h-3.5" />,
    description: 'Context degradation & attention behavior in long-context LLMs, KV-cache dynamics, and agent loops.',
    highlightColor: '#7C3AED',
  },
  {
    id: 'reading',
    title: 'Study Bench',
    tag: 'Books & Notes',
    category: 'Reading',
    path: '/books',
    xPercent: 66,
    yPercent: 74,
    icon: <BookOpen className="w-3.5 h-3.5" />,
    description: 'Designing Data-Intensive Applications, systems papers, and foundational ML reading list.',
    highlightColor: '#059669',
  },
  {
    id: 'running',
    title: 'Wooden Stream Bridge',
    tag: 'Running & Trails',
    category: 'Hobby',
    path: '/hobbies',
    xPercent: 32,
    yPercent: 67,
    icon: <Footprints className="w-3.5 h-3.5" />,
    description: '5K campus laps, outdoor trails, endurance discipline, and clearing the mind between coding sessions.',
    highlightColor: '#2563EB',
  },
  {
    id: 'basketball',
    title: 'Courtyard Hoops',
    tag: 'Basketball',
    category: 'Hobby',
    path: '/hobbies',
    xPercent: 22,
    yPercent: 82,
    icon: <Dribbble className="w-3.5 h-3.5" />,
    description: 'Streetball pickup games, three-point shooting drills, and high-energy court time with peers.',
    highlightColor: '#EA580C',
  },
  {
    id: 'sketching',
    title: 'Garden Easel',
    tag: 'Doodles & Sketches',
    category: 'Art',
    path: '/hobbies',
    xPercent: 12,
    yPercent: 76,
    icon: <Palette className="w-3.5 h-3.5" />,
    description: 'Visual notebooks, hand-drawn paper doodles, anatomical sketches, and architectural line studies.',
    highlightColor: '#DC2626',
  },
  {
    id: 'play',
    title: 'Vintage Gramophone',
    tag: 'Arcade & Play',
    category: 'Mini-Games',
    path: '/play',
    xPercent: 69,
    yPercent: 79,
    icon: <Music className="w-3.5 h-3.5" />,
    description: 'Endless runner mini-game, basketball shootout, doodle scratchpad, and interactive experiments.',
    highlightColor: '#DB2777',
  },
  {
    id: 'blog',
    title: 'Writing Balcony',
    tag: 'Chronicles & Blog',
    category: 'Writing',
    path: '/blog',
    xPercent: 57,
    yPercent: 44,
    icon: <PenTool className="w-3.5 h-3.5" />,
    description: 'Honest technical write-ups on agentic workflows, database query optimization, and systems.',
    highlightColor: '#CA8A04',
  },
  {
    id: 'about',
    title: 'Courtyard Path',
    tag: 'About Divya',
    category: 'Journey',
    path: '/about',
    xPercent: 48,
    yPercent: 59,
    icon: <User className="w-3.5 h-3.5" />,
    description: 'Computer Science undergrad at Chandigarh University, self-taught builder, background & philosophy.',
    highlightColor: '#4F46E5',
  },
];

const DIALOGUE_LINES = [
  "That's me! 👋",
  "Click anywhere to guide me around!",
  "The observatory is where I explore AI papers 🔭",
  "The villa has my full-stack projects 💻",
  "I love running across campus trails 👟",
  "Books on the stone bench! Martin Kleppmann vibes 📚",
  "Welcome to my digital world! ☕",
];

export const DivyaWorldHero: React.FC = () => {
  const navigate = useNavigate();
  const worldRef = useRef<HTMLDivElement>(null);

  // Character walking physics state
  const [characterPos, setCharacterPos] = useState<{ x: number; y: number }>({ x: 860, y: 560 });
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 860, y: 560 });
  const [isWalking, setIsWalking] = useState(false);
  const [walkFacing, setWalkFacing] = useState<'left' | 'right'>('left');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  // Interactive states
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);
  const [photoArtistic, setPhotoArtistic] = useState(false);
  const [personalNoteOpen, setPersonalNoteOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Parallax mouse offset
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Doodle transparency cutout state
  const [doodleImgSrc, setDoodleImgSrc] = useState<string>('/divya-doodle.jpg');

  // Convert white background of doodle JPEG into transparent PNG in memory
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/divya-doodle.jpg';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 238 && g > 238 && b > 238) {
            data[i + 3] = 0;
          } else if (r > 220 && g > 220 && b > 220) {
            const avg = (r + g + b) / 3;
            data[i + 3] = Math.max(0, Math.floor((255 - avg) * 8));
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setDoodleImgSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('Canvas doodle cutout fallback:', err);
      }
    };
  }, []);

  // Initialize character placement relative to viewport
  useEffect(() => {
    if (worldRef.current) {
      const rect = worldRef.current.getBoundingClientRect();
      const initialX = rect.width * 0.85;
      const initialY = rect.height * 0.72;
      setCharacterPos({ x: initialX, y: initialY });
      setTargetPos({ x: initialX, y: initialY });
    }
  }, []);

  // Web Audio ambient soundscape (warm gentle chord)
  const toggleAmbientSound = () => {
    if (!soundActive) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create warm pentatonic chord oscillators with soft low-pass filter
        const freqs = [220, 277.18, 329.63, 440];
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);

        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          osc.connect(filter);
          osc.start();
        });

        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        setSoundActive(true);
      } catch {
        setSoundActive(false);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setSoundActive(false);
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Smooth walking animation loop toward target
  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      setCharacterPos((current) => {
        const dx = targetPos.x - current.x;
        const dy = targetPos.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 6) {
          setIsWalking(true);
          setWalkFacing(dx > 0 ? 'right' : 'left');

          // Smooth interpolation speed (easing)
          const speed = Math.min(distance * 0.08, 6.5);
          const nx = current.x + (dx / distance) * speed;
          const ny = current.y + (dy / distance) * speed;
          return { x: nx, y: ny };
        } else {
          if (isWalking) {
            setIsWalking(false);
          }
          return current;
        }
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos, isWalking]);

  // Handle click anywhere on the world to command Divya to walk there
  const handleWorldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore clicks if clicking directly on a button or link
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    if (!worldRef.current) return;
    const rect = worldRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep Divya inside bounds
    const boundedX = Math.max(60, Math.min(x, rect.width - 60));
    const boundedY = Math.max(140, Math.min(y, rect.height - 80));

    setTargetPos({ x: boundedX, y: boundedY });
    setShowSpeechBubble(true);
  };

  // Gentle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!worldRef.current) return;
    const rect = worldRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: nx * 14, y: ny * 10 });
  };

  const handleCharacterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueIndex((prev) => (prev + 1) % DIALOGUE_LINES.length);
    setShowSpeechBubble(true);
  };

  return (
    <div className="relative w-full overflow-hidden select-none bg-cream-200">
      {/* ============================================================
          MAIN INTERACTIVE HERO WORLD
          ============================================================ */}
      <div
        ref={worldRef}
        onClick={handleWorldClick}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[92vh] min-h-[660px] max-h-[960px] overflow-hidden cursor-crosshair border-b border-beige-dark/50"
      >
        {/* Layer 1: Illustrated Atmospheric Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out will-change-transform"
          style={{
            backgroundImage: `url('/divya-world-bg.jpg')`,
            transform: `translate3d(${mouseOffset.x * -1}px, ${mouseOffset.y * -1}px, 0) scale(1.04)`,
          }}
        />

        {/* Layer 2: Warm Vignette & Grain Overlay for Editorial Atmosphere */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-coffee-black/40 via-transparent to-coffee-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-coffee-espresso/25" />

        {/* Layer 3: Floating Dust & Ambient Warm Light motes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-amber-200/80 blur-[1px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-orange-200/60 blur-[1px] animate-ping" />
          <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 rounded-full bg-cream-50/70 blur-[0.5px] animate-bounce" />
        </div>

        {/* ============================================================
            TOP BAR HEADER (Editorial Intro & Status Badges)
            ============================================================ */}
        <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 md:p-8 flex items-start justify-between pointer-events-auto">
          {/* Top-Left: Personal Identity & Intentional Typography */}
          <div className="max-w-xl text-left space-y-1.5 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-50/85 backdrop-blur-md border border-beige-dark/40 shadow-warm-sm text-xs text-coffee font-mono">
              <span>👋 hey, I'm Divya</span>
              <span className="w-1 h-1 rounded-full bg-coffee-muted/40" />
              <span className="text-coffee-muted text-[11px]">CS Undergrad @ Chandigarh University</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(43,29,20,0.85)] leading-[1.08]">
              Building software so <br className="hidden sm:inline" />
              <span className="italic font-normal text-amber-100">systems don't break.</span>
            </h1>

            <p className="text-xs sm:text-sm text-amber-50/90 font-sans max-w-md drop-shadow-[0_1px_4px_rgba(43,29,20,0.8)] leading-relaxed">
              Full-stack architectures • AI & long-context systems • Curious explorations.
              <span className="hidden sm:inline text-amber-200/90 font-mono text-xs ml-1.5">
                (Click anywhere in the scene to guide me!)
              </span>
            </p>
          </div>

          {/* Top-Right: Status Indicators & Ambient Lo-Fi Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Location Pill */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coffee-black/60 backdrop-blur-md border border-cream-100/20 text-cream-100 text-xs font-mono shadow-warm-sm">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Chandigarh, IN</span>
            </div>

            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coffee-black/60 backdrop-blur-md border border-cream-100/20 text-cream-100 text-xs font-mono shadow-warm-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Active Candidate</span>
            </div>

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleAmbientSound}
              title={soundActive ? 'Mute ambient sound' : 'Play ambient study chord'}
              className="p-2 rounded-full bg-cream-50/90 hover:bg-white text-coffee-espresso border border-beige-dark/50 shadow-warm-sm transition-transform active:scale-95"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-accent-terracotta" />
              ) : (
                <VolumeX className="w-4 h-4 text-coffee-muted" />
              )}
            </button>
          </div>
        </header>

        {/* ============================================================
            INTERACTIVE LANDMARK HOTSPOTS (Clickable Pins in the Scene)
            ============================================================ */}
        {LANDMARKS.map((landmark) => {
          const isHovered = hoveredLandmark?.id === landmark.id;

          return (
            <div
              key={landmark.id}
              style={{
                left: `${landmark.xPercent}%`,
                top: `${landmark.yPercent}%`,
              }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
              onMouseEnter={() => setHoveredLandmark(landmark)}
              onMouseLeave={() => setHoveredLandmark(null)}
            >
              {/* Landmark Pin Button (Matching the Reference Screenshot Pill Design) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(landmark.path);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium shadow-warm-md transition-all duration-300 transform ${
                  isHovered
                    ? 'scale-110 -translate-y-1 bg-coffee-espresso text-cream-50 ring-2 ring-amber-400'
                    : 'bg-cream-50/95 text-coffee-espresso hover:bg-white border border-beige-dark/50'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: landmark.highlightColor }}
                />
                <span className="truncate max-w-[130px] sm:max-w-none">{landmark.tag}</span>
                <ArrowUpRight className="w-3 h-3 text-coffee-muted group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Pulsing Base Ring */}
              <div
                className="w-3 h-3 rounded-full mx-auto mt-1 opacity-70 animate-ping pointer-events-none"
                style={{ backgroundColor: landmark.highlightColor }}
              />

              {/* Hover Popover Preview Card */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3.5 rounded-xl bg-cream-50/95 backdrop-blur-md border border-beige-dark/60 shadow-warm-lg text-left z-30 pointer-events-auto animate-fadeIn">
                  <div className="flex items-center justify-between text-[10px] text-coffee-muted font-mono uppercase tracking-wider mb-1">
                    <span>{landmark.category}</span>
                    <span className="text-accent-terracotta">Click to visit →</span>
                  </div>
                  <h4 className="font-editorial text-base font-bold text-coffee-espresso">
                    {landmark.title}
                  </h4>
                  <p className="text-xs text-coffee-muted mt-1 leading-relaxed font-sans">
                    {landmark.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* ============================================================
            DIVYA'S WALKING DOODLE CHARACTER (Follows the Cursor)
            ============================================================ */}
        <div
          style={{
            left: `${characterPos.x}px`,
            top: `${characterPos.y}px`,
            transform: `translate(-50%, -85%) scaleX(${walkFacing === 'right' ? -1 : 1})`,
          }}
          onClick={handleCharacterClick}
          className="absolute z-25 cursor-pointer transition-transform duration-75 will-change-transform group"
        >
          {/* Walking shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-coffee-black/30 rounded-full blur-[3px]" />

          {/* Comic Speech Tag (Uninverted so text always reads correctly) */}
          <div
            style={{
              transform: `scaleX(${walkFacing === 'right' ? -1 : 1})`,
            }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300"
          >
            {showSpeechBubble && (
              <div className="px-3 py-1 rounded-full bg-cream-50 border border-coffee/30 shadow-warm-md text-coffee-espresso font-mono text-[11px] font-semibold whitespace-nowrap animate-bounce flex items-center gap-1.5">
                <span>{DIALOGUE_LINES[dialogueIndex]}</span>
              </div>
            )}
          </div>

          {/* The Doodle Character Sprite */}
          <div
            className={`relative w-28 sm:w-32 md:w-36 h-48 sm:h-56 select-none ${
              isWalking ? 'animate-walk' : 'animate-breathe'
            }`}
          >
            <img
              src={doodleImgSrc}
              alt="Divya Rao Doodle Character"
              className="w-full h-full object-contain filter drop-shadow-md pointer-events-none"
            />
          </div>
        </div>

        {/* ============================================================
            BOTTOM-LEFT: REAL AUTHENTIC PHOTO PORTRAIT FRAME
            ============================================================ */}
        <div className="absolute bottom-6 left-6 z-30 hidden sm:flex items-center gap-3">
          <div
            onDoubleClick={() => setPhotoArtistic((prev) => !prev)}
            onClick={() => setPersonalNoteOpen(true)}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-beige to-coffee-espresso shadow-warm-lg cursor-pointer group transition-transform hover:scale-105 active:scale-95"
            title="Double-click to toggle artistic edition, click to read personal note"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-cream-50 bg-beige">
              <img
                src="/divya-flowers.jpg"
                alt="Divya Rao"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  photoArtistic ? 'filter sepia contrast-125 saturate-150' : 'filter brightness-105'
                }`}
              />
            </div>
            {/* Online badge */}
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-warm-sm" />
          </div>

          <div className="text-left font-sans">
            <button
              onClick={() => setPersonalNoteOpen(true)}
              className="font-editorial text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(43,29,20,0.85)] hover:underline flex items-center gap-1"
            >
              <span>Divya Rao</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </button>
            <p className="text-[10px] text-amber-100 font-mono drop-shadow-[0_1px_2px_rgba(43,29,20,0.85)]">
              Double-click photo for artistic view
            </p>
          </div>
        </div>

        {/* ============================================================
            BOTTOM-CENTER: FLOATING PILL DOCK NAVIGATION
            (Matching the Reference Screenshot's Dock Nav)
            ============================================================ */}
        <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-xl">
          <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-full bg-coffee-espresso/90 backdrop-blur-md border border-cream-100/20 shadow-warm-xl text-cream-100 font-mono text-xs">
            {/* Dock Avatar Link */}
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-50/15 hover:bg-cream-50/25 transition text-cream-50 font-semibold"
            >
              <img
                src="/divya-flowers.jpg"
                alt="Divya"
                className="w-5 h-5 rounded-full object-cover border border-white/40"
              />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Quick Links */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
              <Link
                to="/projects"
                className="px-2.5 py-1 rounded-full hover:bg-cream-50/15 transition text-cream-100/90 hover:text-white"
              >
                Projects
              </Link>
              <Link
                to="/research"
                className="px-2.5 py-1 rounded-full hover:bg-cream-50/15 transition text-cream-100/90 hover:text-white"
              >
                Research
              </Link>
              <Link
                to="/hobbies"
                className="px-2.5 py-1 rounded-full hover:bg-cream-50/15 transition text-cream-100/90 hover:text-white"
              >
                Hobbies
              </Link>
              <Link
                to="/blog"
                className="px-2.5 py-1 rounded-full hover:bg-cream-50/15 transition text-cream-100/90 hover:text-white"
              >
                Blog
              </Link>
              <Link
                to="/play"
                className="px-2.5 py-1 rounded-full hover:bg-cream-50/15 transition text-cream-100/90 hover:text-white"
              >
                Play
              </Link>
              <Link
                to="/about"
                className="px-2.5 py-1 rounded-full hover:bg-cream-50/15 transition text-cream-100/90 hover:text-white"
              >
                About
              </Link>
            </div>

            {/* Contact / Resume Pill Button (Like reference Resume ↗) */}
            <Link
              to="/contact"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-coffee-black font-semibold shadow-warm-sm transition-transform active:scale-95"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      </div>

      {/* ============================================================
          PERSONAL NOTE MODAL (When clicking Divya's Portrait)
          ============================================================ */}
      {personalNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-xl p-6 sm:p-8 space-y-4 font-sans text-coffee-espresso">
            <button
              onClick={() => setPersonalNoteOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-beige/40 text-coffee-muted transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/divya-flowers.jpg"
                alt="Divya Rao"
                className="w-14 h-14 rounded-full object-cover border-2 border-beige-dark"
              />
              <div>
                <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                  Divya Rao
                </h3>
                <p className="text-xs text-coffee-muted font-mono">
                  Chandigarh, India • 2024–Present
                </p>
              </div>
            </div>

            <div className="text-xs leading-relaxed space-y-2.5 text-coffee border-t border-b border-beige-dark/40 py-3.5">
              <p>
                "Hello! I am an undergraduate Computer Science student at Chandigarh University.
                I spend my days architecting full-stack systems, reading systems & AI papers, and
                writing clean, reliable code."
              </p>
              <p>
                "Outside of the terminal, you'll usually find me running campus laps, playing
                basketball, sketching in pen, or re-reading <em>Designing Data-Intensive Applications</em>."
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                to="/about"
                onClick={() => setPersonalNoteOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-coffee hover:text-coffee-espresso underline"
              >
                Read Full Biography →
              </Link>
              <button
                onClick={() => setPersonalNoteOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-coffee-espresso text-cream-50 font-mono text-xs hover:bg-coffee transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
