import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Play, Sparkles, Trophy, Flame } from 'lucide-react';

export const PlayPreview: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-beige-dark/40 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold block mb-1">
            06 • Experiments & Arcade
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
            Play & Experiments
          </h2>
          <p className="text-coffee-muted font-sans text-sm sm:text-base mt-1 max-w-2xl">
            Interactive experiments, micro-games, and playful sandboxes that don’t need a serious corporate reason.
          </p>
        </div>
        <Link
          to="/play"
          className="font-mono text-xs text-accent-terracotta hover:underline font-bold whitespace-nowrap"
        >
          Open Arcade Center →
        </Link>
      </div>

      {/* Play Teaser Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-coffee-roast text-cream-50 border border-coffee shadow-warm-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-notebook-pattern opacity-10 pointer-events-none" />

        <div className="space-y-4 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-50/10 border border-cream-50/20 text-accent-terracotta font-mono text-xs font-bold">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>8-BIT RUNNER ARCADE</span>
          </div>

          <h3 className="font-editorial text-3xl sm:text-4xl font-bold leading-tight">
            Jump Over Distractor Obstacles & Collect Systems Books
          </h3>

          <p className="text-cream-100/80 font-sans text-xs sm:text-sm leading-relaxed">
            A retro side-scrolling platformer featuring morning runs, coffee mugs, basketballs, and textbook pickups across a warm coffee-toned landscape.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <Link
              to="/play"
              className="px-5 py-2.5 rounded-xl bg-accent-terracotta text-cream-50 hover:bg-accent-terracotta/90 font-bold shadow-warm-sm transition flex items-center gap-2 group cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Launch Runner Game</span>
            </Link>

            <span className="text-[11px] text-cream-100/60 font-mono">
              Spacebar to jump • Instant in-browser play
            </span>
          </div>
        </div>

        {/* Pixel Art Mini Teaser Box */}
        <div className="w-full md:w-64 h-44 rounded-2xl bg-coffee-black border border-cream-50/20 p-4 flex flex-col justify-between relative z-10 overflow-hidden shadow-warm-md">
          <div className="flex items-center justify-between font-mono text-[10px] text-accent-terracotta">
            <span>SCORE: 0240</span>
            <span className="text-emerald-400">FPS: 60</span>
          </div>

          {/* Mini Mock Track with sprite */}
          <div className="relative h-20 border-b-2 border-accent-terracotta flex items-end px-2">
            {/* Running Avatar Sprite */}
            <div className="w-8 h-8 rounded-lg bg-cream-50 border border-coffee flex items-center justify-center text-xs animate-bounce">
              🏃
            </div>

            {/* Book Collectible */}
            <div className="ml-16 mb-4 w-6 h-6 rounded bg-accent-terracotta/90 flex items-center justify-center text-[10px] shadow-warm-sm">
              📖
            </div>

            {/* Coffee obstacle */}
            <div className="ml-12 w-5 h-6 rounded bg-amber-700 flex items-center justify-center text-[10px]">
              ☕
            </div>
          </div>

          <div className="text-[9px] font-mono text-center text-cream-100/50">
            Click to launch full interactive mode
          </div>
        </div>
      </div>
    </section>
  );
};
