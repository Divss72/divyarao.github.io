import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Film, Flame, PenTool, Sparkles, Trophy } from 'lucide-react';

export const HobbyPreview: React.FC = () => {
  // Basketball mini-interaction state
  const [ballShooting, setBallShooting] = useState(false);
  const [basketsScored, setBasketsScored] = useState(0);

  const triggerShot = () => {
    if (ballShooting) return;
    setBallShooting(true);
    setTimeout(() => {
      setBasketsScored((prev) => prev + 1);
      setBallShooting(false);
    }, 700);
  };

  // Bookshelf active hover state
  const [activeBook, setActiveBook] = useState<string | null>(null);

  const books = [
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', color: 'bg-[#8c4830]' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', color: 'bg-[#2b3a4a]' },
    { title: 'Deep Learning', author: 'Ian Goodfellow', color: 'bg-[#405342]' },
    { title: 'Clean Code', author: 'Robert C. Martin', color: 'bg-[#5a4332]' },
  ];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-beige-dark/40 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold block mb-1">
            04 • Balance & Craft
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
            Life Outside Code
          </h2>
          <p className="text-coffee-muted font-sans text-sm sm:text-base mt-1 max-w-2xl">
            Software is only one part of who I am. Stepping away from screens to read, shoot hoops, run, sketch, and watch cinema keeps my thinking clear.
          </p>
        </div>
        <Link
          to="/hobbies"
          className="font-mono text-xs text-accent-terracotta hover:underline font-bold whitespace-nowrap"
        >
          Explore All Hobbies (5) →
        </Link>
      </div>

      {/* Interactive Micro-Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. BASKETBALL INTERACTION */}
        <div className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-accent-terracotta uppercase font-bold tracking-wider">
                COURT RHYTHM
              </span>
              <span className="font-mono text-[10px] text-coffee-muted flex items-center gap-1">
                <Trophy className="w-3 h-3 text-coffee" />
                <span>Baskets: {basketsScored}</span>
              </span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              Basketball Free-Throws
            </h3>
            <p className="text-xs font-sans text-coffee-muted leading-relaxed">
              Focus, arc, release, and rhythm after long hours at the keyboard. Tap the ball to shoot!
            </p>
          </div>

          {/* Mini Interactive Court Canvas */}
          <div
            onClick={triggerShot}
            className="h-32 rounded-xl bg-cream-100 border border-beige-dark/50 relative overflow-hidden flex items-end justify-between p-3 cursor-pointer group hover:border-coffee transition"
            title="Click to shoot!"
          >
            {/* Court Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-coffee-espresso" />
              <div className="absolute bottom-0 left-1/4 w-1/2 h-full border border-coffee-espresso rounded-t-full" />
            </div>

            {/* Basketball */}
            <div
              className={`w-9 h-9 rounded-full bg-accent-terracotta border-2 border-coffee shadow-warm-sm flex items-center justify-center text-[10px] text-cream-50 font-bold transition-all duration-700 select-none ${
                ballShooting
                  ? 'translate-x-36 -translate-y-16 scale-90 rotate-180'
                  : 'group-hover:-translate-y-1'
              }`}
            >
              🏀
            </div>

            {/* Basketball Hoop */}
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-8 border-2 border-coffee-espresso bg-cream-50/80 rounded-sm flex items-center justify-center">
                <div className="w-8 h-1.5 bg-accent-terracotta rounded-full" />
              </div>
              <div className="w-8 h-6 border-x border-b border-dashed border-coffee-muted/60" />
            </div>

            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-coffee-muted/70 group-hover:text-coffee transition">
              {ballShooting ? 'Swish! ✦' : 'Click to shoot'}
            </span>
          </div>

          <Link to="/hobbies" className="font-mono text-xs text-coffee hover:underline font-bold">
            Read court story →
          </Link>
        </div>

        {/* 2. PHYSICAL BOOKSHELF INTERACTION */}
        <div className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-accent-terracotta uppercase font-bold tracking-wider">
              PHYSICAL READING
            </span>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              Books on My Desk
            </h3>
            <p className="text-xs font-sans text-coffee-muted leading-relaxed">
              Paper books on distributed systems, psychology, and algorithms always sit by my workspace.
            </p>
          </div>

          {/* Mini Interactive Bookshelf */}
          <div className="h-32 rounded-xl bg-cream-100 border border-beige-dark/50 flex items-end justify-center gap-2 p-3 overflow-hidden">
            {books.map((b, i) => (
              <div
                key={b.title}
                onMouseEnter={() => setActiveBook(b.title)}
                onMouseLeave={() => setActiveBook(null)}
                className={`w-10 sm:w-12 rounded-t-md transition-all duration-300 cursor-pointer flex items-center justify-center text-cream-50 font-mono text-[9px] p-1 shadow-warm-sm border border-black/20 ${
                  b.color
                } ${activeBook === b.title ? '-translate-y-4 h-26' : 'h-20 hover:-translate-y-2'}`}
                title={`${b.title} by ${b.author}`}
              >
                <span className="[writing-mode:vertical-rl] truncate max-h-16 select-none opacity-90">
                  {b.title}
                </span>
              </div>
            ))}
          </div>

          <Link to="/hobbies" className="font-mono text-xs text-coffee hover:underline font-bold">
            Browse full bookshelf →
          </Link>
        </div>

        {/* 3. RUNNING & 35MM CINEMA */}
        <div className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-accent-terracotta uppercase font-bold tracking-wider">
              ENDURANCE & CINEMA
            </span>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              Running & 35mm Sci-Fi
            </h3>
            <p className="text-xs font-sans text-coffee-muted leading-relaxed">
              Morning kilometers for endurance; Nolan & Wachowski films for narrative pacing and philosophy.
            </p>
          </div>

          {/* Mini Interactive Film Strip */}
          <div className="h-32 rounded-xl bg-coffee-black text-cream-50 p-2.5 flex flex-col justify-between border border-coffee-roast">
            <div className="flex items-center justify-between text-[8px] font-mono opacity-60 border-b border-coffee-muted/40 pb-1">
              <span>FILM // 35MM</span>
              <span>FRAME RATE: 24FPS</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
              <div className="p-1.5 rounded bg-coffee-roast/80 border border-beige/10">
                <span className="block font-bold">Interstellar</span>
                <span className="text-[8px] opacity-70">Nolan</span>
              </div>
              <div className="p-1.5 rounded bg-coffee-roast/80 border border-beige/10">
                <span className="block font-bold">The Matrix</span>
                <span className="text-[8px] opacity-70">1999</span>
              </div>
              <div className="p-1.5 rounded bg-coffee-roast/80 border border-beige/10">
                <span className="block font-bold">Oppenheimer</span>
                <span className="text-[8px] opacity-70">2023</span>
              </div>
            </div>

            <div className="text-[9px] font-mono text-center text-accent-terracotta">
              "Endurance is built step by step."
            </div>
          </div>

          <Link to="/hobbies" className="font-mono text-xs text-coffee hover:underline font-bold">
            Explore movie & running log →
          </Link>
        </div>
      </div>
    </section>
  );
};
