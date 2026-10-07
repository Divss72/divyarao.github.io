import React from 'react';
import { Link } from 'react-router-dom';
import { ParticlePortrait } from '../visual/ParticlePortrait';
import { ArrowDown, Gamepad2, BookOpen, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-2 sm:pt-6 pb-12 border-b border-beige-dark/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Clean Editorial Identity */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow & Status */}
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-terracotta font-bold block">
              HELLO, I'M DIVYA
            </span>
            <h1 className="font-editorial text-5xl sm:text-7xl font-bold tracking-tight text-coffee-espresso leading-[1.05]">
              Divya Rao
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-coffee-muted italic">
              Computer Science Undergraduate · Builder · Curious Researcher
            </p>
          </div>

          {/* Human Description */}
          <p className="text-coffee-dark font-sans text-base sm:text-lg leading-relaxed max-w-xl">
            I build software, explore AI systems, read about things I don't understand yet, and occasionally disappear into books, basketball, sketches, and movies.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <a
              href="#world-map"
              className="px-5 py-2.5 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold shadow-warm-sm transition flex items-center gap-2 group cursor-pointer"
            >
              <Compass className="w-4 h-4 text-accent-terracotta group-hover:rotate-45 transition-transform" />
              <span>Explore My World</span>
              <ArrowDown className="w-3.5 h-3.5 opacity-80" />
            </a>

            <Link
              to="/play"
              className="px-5 py-2.5 rounded-xl bg-cream-50 border border-beige-dark/60 text-coffee-espresso hover:bg-beige/40 font-bold shadow-warm-sm transition flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-coffee-muted" />
              <span>Play My Journey</span>
              <span>→</span>
            </Link>

            <Link
              to="/research"
              className="px-4 py-2.5 rounded-xl text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read My Notes</span>
              <span>↗</span>
            </Link>
          </div>
        </div>

        {/* Right: Interactive Portrait with double-click toggle */}
        <div className="lg:col-span-5 flex justify-center">
          <ParticlePortrait />
        </div>
      </div>
    </section>
  );
};
