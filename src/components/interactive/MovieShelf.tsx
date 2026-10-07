import React, { useState } from 'react';
import { usePortfolioStore } from '../../data/usePortfolioStore';
import { MovieItem } from '../../types';

export const MovieShelf: React.FC = () => {
  const store = usePortfolioStore();
  const movies = store.getMovies();
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Filmstrip Wrapper */}
      <div className="p-6 bg-coffee-roast text-cream-100 rounded-2xl border border-coffee-muted/40 shadow-warm-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-xs border-b border-coffee-muted/40 pb-3">
          <div>
            <span className="text-[10px] text-accent-gold uppercase tracking-wider font-bold block">
              // 35MM CINEMATHEQUE ARCHIVE
            </span>
            <h4 className="font-editorial text-lg font-bold text-cream-50">
              Films & Cinematic Inspiration
            </h4>
          </div>
          <span className="text-cream-300/70 text-[11px]">
            {movies.length} FILMS ARCHIVED
          </span>
        </div>

        {/* Sprocket Holes Filmstrip Bar */}
        <div className="relative py-4 filmstrip-border overflow-x-auto">
          {/* Top Sprocket Perforations */}
          <div className="flex gap-4 px-2 mb-3 select-none pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-3.5 h-2.5 rounded-sm bg-coffee-black/90 flex-shrink-0" />
            ))}
          </div>

          {/* Film Frames Grid */}
          <div className="flex gap-5 px-2 overflow-x-auto pb-2">
            {movies.map((movie) => {
              const isSelected = selectedMovie?.id === movie.id;
              return (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className={`flex-shrink-0 w-64 p-3 rounded-lg bg-coffee-dark/90 border transition-all cursor-pointer group ${
                    isSelected
                      ? 'border-accent-gold shadow-[0_0_15px_rgba(197,155,39,0.3)] -translate-y-1'
                      : 'border-coffee-muted/40 hover:border-cream-300/50 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Frame Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-cream-400/80 mb-2">
                    <span>FRAME // {movie.year}</span>
                    <span className="text-accent-gold font-bold">★ {movie.rating}</span>
                  </div>

                  {/* Title & Director */}
                  <h5 className="font-editorial text-base font-bold text-cream-50 group-hover:text-beige transition-colors truncate">
                    {movie.title}
                  </h5>
                  <p className="text-[11px] font-mono text-cream-400/80 mb-3">
                    Dir. {movie.director}
                  </p>

                  {/* Short Logline / Thought */}
                  <p className="text-xs font-sans text-cream-200/90 line-clamp-3 leading-relaxed mb-3">
                    {movie.shortNote}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {movie.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-coffee-roast border border-coffee-muted/40 text-cream-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Sprocket Perforations */}
          <div className="flex gap-4 px-2 mt-3 select-none pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-3.5 h-2.5 rounded-sm bg-coffee-black/90 flex-shrink-0" />
            ))}
          </div>
        </div>

        <div className="text-[11px] font-mono text-cream-400/70 text-right">
          Click any frame to project detailed cinephile notes 📽️
        </div>
      </div>

      {/* Selected Film Projector Card */}
      {selectedMovie && (
        <div className="p-6 sm:p-8 rounded-2xl bg-cream-50 border border-beige-dark/70 shadow-warm-lg animate-fadeIn text-coffee-espresso relative">
          <button
            onClick={() => setSelectedMovie(null)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-beige-dark/50 flex items-center justify-center text-coffee-muted hover:text-coffee-dark hover:bg-beige/40 transition cursor-pointer"
          >
            ✕
          </button>

          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-coffee text-cream-50">
                {selectedMovie.year} RELEASE
              </span>
              <span className="font-mono text-xs text-accent-terracotta font-semibold">
                Director: {selectedMovie.director}
              </span>
              <span className="font-mono text-xs text-accent-gold font-bold">
                Rating: {selectedMovie.rating}/10
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              {selectedMovie.title}
            </h3>

            <div className="p-4 rounded-xl bg-cream-100 border border-beige/60 space-y-1">
              <span className="text-[10px] font-mono text-coffee-muted uppercase tracking-wider font-bold block">
                // CRITICAL NOTE & PHILOSOPHICAL TAKE
              </span>
              <p className="text-sm font-sans text-coffee-dark leading-relaxed">
                {selectedMovie.shortNote}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {selectedMovie.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-beige/60 text-coffee-roast border border-beige-dark/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
