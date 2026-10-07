import React, { useState } from 'react';
import { BookShelf } from '../components/interactive/BookShelf';
import { BasketballCourt } from '../components/interactive/BasketballCourt';
import { DoodleCanvas } from '../components/interactive/DoodleCanvas';
import { MovieShelf } from '../components/interactive/MovieShelf';
import { Link } from 'react-router-dom';

export const HobbiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'books' | 'basketball' | 'doodle' | 'movies'>('all');

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-6xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8">
        <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block font-mono">
          Creative Playground & Personal Archive
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          Books, Courts, Sketches & Cinema
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          The physical and creative dimensions that balance systems engineering. Interact with the wooden bookshelf, shoot free-throws on the hardwood, sketch in the notebook, or browse 35mm cinema reels.
        </p>

        {/* Quick Tab Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Dimensions' },
            { id: 'books', label: '📖 Bookshelf' },
            { id: 'basketball', label: '🏀 Basketball Shootout' },
            { id: 'doodle', label: '✏️ Sketchpad' },
            { id: 'movies', label: '📽️ 35mm Cinema' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl border transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-coffee text-cream-50 border-coffee font-bold shadow-warm-sm'
                  : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Running Journey Teaser Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-coffee-roast via-coffee to-coffee-dark text-cream-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-warm-md">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-accent-gold text-xs">
            <span>🏃</span>
            <span className="font-bold">SIGNATURE MINI-GAME</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-cream-50 font-sans">
            Ready to Run Through My Journey?
          </h3>
          <p className="text-xs text-cream-300 font-sans">
            Play the endless runner collecting coffee, books, and AI nodes across real career milestones.
          </p>
        </div>
        <Link
          to="/play"
          className="px-6 py-3 rounded-xl bg-accent-terracotta text-white font-bold hover:bg-accent-rust shadow-warm-md transition whitespace-nowrap"
        >
          Play Arcade Mode →
        </Link>
      </div>

      {/* Section 1: Bookshelf */}
      {(activeTab === 'all' || activeTab === 'books') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-beige/60 pb-2">
            <div>
              <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block font-mono">
                01 Bookshelf
              </span>
              <h2 className="font-editorial text-3xl font-bold text-coffee-espresso font-sans">
                The Interactive Bookshelf
              </h2>
            </div>
            <span className="text-coffee-muted text-[11px] font-mono">
              SYSTEMS ARCHITECTURE & MIND
            </span>
          </div>
          <BookShelf />
        </section>
      )}

      {/* Section 2: Basketball Micro-Game */}
      {(activeTab === 'all' || activeTab === 'basketball') && (
        <section className="space-y-4 pt-8">
          <div className="flex items-center justify-between border-b border-beige/60 pb-2">
            <div>
              <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block font-mono">
                02 Basketball Court
              </span>
              <h2 className="font-editorial text-3xl font-bold text-coffee-espresso font-sans">
                Basketball Free-Throw Court
              </h2>
            </div>
            <span className="text-coffee-muted text-[11px] font-mono">
              PHYSICS ENGINE & HOOP SHOT
            </span>
          </div>
          <BasketballCourt />
        </section>
      )}

      {/* Section 3: Sketchpad & Doodles */}
      {(activeTab === 'all' || activeTab === 'doodle') && (
        <section className="space-y-4 pt-8">
          <div className="flex items-center justify-between border-b border-beige/60 pb-2">
            <div>
              <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block font-mono">
                03 Sketchbook
              </span>
              <h2 className="font-editorial text-3xl font-bold text-coffee-espresso font-sans">
                Sketchbook & Doodles
              </h2>
            </div>
            <span className="text-coffee-muted text-[11px] font-mono">
              WARM COFFEE INK DRAWING PAD
            </span>
          </div>
          <DoodleCanvas />
        </section>
      )}

      {/* Section 4: 35mm Cinema Reel */}
      {(activeTab === 'all' || activeTab === 'movies') && (
        <section className="space-y-4 pt-8">
          <div className="flex items-center justify-between border-b border-beige/60 pb-2">
            <div>
              <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block font-mono">
                04 Cinematheque
              </span>
              <h2 className="font-editorial text-3xl font-bold text-coffee-espresso font-sans">
                35mm Cinematic Filmstrip
              </h2>
            </div>
            <span className="text-coffee-muted text-[11px] font-mono">
              SCI-FI & PHILOSOPHICAL CINEMA
            </span>
          </div>
          <MovieShelf />
        </section>
      )}
    </div>
  );
};
