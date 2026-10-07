import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 px-4 flex flex-col items-center justify-center text-center font-mono text-xs space-y-6 max-w-lg mx-auto">
      {/* Tiny lost character illustration */}
      <div className="w-20 h-20 rounded-3xl bg-coffee-roast text-cream-100 border border-beige-dark/50 flex flex-col items-center justify-center shadow-warm-lg space-y-1">
        <span className="text-3xl animate-bounce">🧭</span>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
          Error 404 • Page Not Found
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-coffee-espresso font-sans">
          Lost in the Coffee World
        </h1>
        <p className="text-sm font-sans text-coffee-dark leading-relaxed max-w-sm mx-auto">
          Looks like you took the wrong turn. The requested node or memory address does not exist in this coordinate space.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition shadow-warm-sm"
        >
          Return Home →
        </Link>
        <Link
          to="/play"
          className="px-6 py-2.5 rounded-xl border border-beige-dark/60 bg-cream-50 text-coffee-espresso hover:bg-beige/30 font-bold transition shadow-warm-sm"
        >
          Play My Journey 🏃
        </Link>
      </div>
    </div>
  );
};
