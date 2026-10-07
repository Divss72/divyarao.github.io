import React, { useState } from 'react';
import { RunnerGame } from '../components/interactive/RunnerGame';
import { BasketballCourt } from '../components/interactive/BasketballCourt';
import { DoodleCanvas } from '../components/interactive/DoodleCanvas';
import { Link } from 'react-router-dom';

export const PlayPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'runner' | 'basketball' | 'doodle'>('runner');

  return (
    <div className="space-y-12 py-10 px-4 sm:px-6 max-w-5xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
          Interactive Creative Arcade
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          The Play Arcade
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base leading-relaxed">
          Where code meets play. Test your reflexes in the journey runner, practice slingshot jump shots, or draw in the notebook sketchpad.
        </p>

        {/* Game Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveGame('runner')}
            className={`px-5 py-2.5 rounded-xl border transition cursor-pointer font-bold ${
              activeGame === 'runner'
                ? 'bg-coffee text-cream-50 border-coffee shadow-warm-sm'
                : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30'
            }`}
          >
            🏃 Play My Journey (Runner)
          </button>
          <button
            onClick={() => setActiveGame('basketball')}
            className={`px-5 py-2.5 rounded-xl border transition cursor-pointer font-bold ${
              activeGame === 'basketball'
                ? 'bg-coffee text-cream-50 border-coffee shadow-warm-sm'
                : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30'
            }`}
          >
            🏀 Basketball Shootout
          </button>
          <button
            onClick={() => setActiveGame('doodle')}
            className={`px-5 py-2.5 rounded-xl border transition cursor-pointer font-bold ${
              activeGame === 'doodle'
                ? 'bg-coffee text-cream-50 border-coffee shadow-warm-sm'
                : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30'
            }`}
          >
            ✏️ Sketchbook Doodle
          </button>
        </div>
      </div>

      {/* Active Game Stage */}
      <div className="transition-all duration-300">
        {activeGame === 'runner' && (
          <div className="space-y-4">
            <RunnerGame />
          </div>
        )}

        {activeGame === 'basketball' && (
          <div className="space-y-4">
            <BasketballCourt />
          </div>
        )}

        {activeGame === 'doodle' && (
          <div className="space-y-4">
            <DoodleCanvas />
          </div>
        )}
      </div>

      {/* Return to Portfolio Footer */}
      <div className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 text-center space-y-3 font-sans">
        <h4 className="font-editorial text-xl font-bold text-coffee-espresso">
          Done playing? Explore the technical architectures.
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <Link
            to="/projects"
            className="px-5 py-2 rounded-lg bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition"
          >
            Projects Archive →
          </Link>
          <Link
            to="/about"
            className="px-5 py-2 rounded-lg border border-beige-dark/60 text-coffee-dark hover:bg-beige/30 transition"
          >
            About Story →
          </Link>
        </div>
      </div>
    </div>
  );
};
