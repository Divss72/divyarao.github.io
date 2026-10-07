import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, INITIAL_TELEMETRY } from '../../data/store';

export const Footer: React.FC = () => {
  const [coffeeCount, setCoffeeCount] = useState(3);
  const [coffeeToast, setCoffeeToast] = useState(false);

  const drinkCoffee = () => {
    setCoffeeCount((c) => c + 1);
    setCoffeeToast(true);
    setTimeout(() => setCoffeeToast(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-coffee-roast text-cream-200 border-t border-coffee-muted/40 font-mono text-xs pt-16 pb-12 px-6 sm:px-8 relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 bottom-0 text-[120px] font-serif font-black text-coffee-espresso/40 pointer-events-none select-none leading-none -mb-8 -mr-8">
        DR
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Column 1: Identity & Location */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-beige text-coffee-espresso flex items-center justify-center font-serif text-lg font-bold">
                DR
              </div>
              <div>
                <h3 className="font-editorial text-xl font-bold text-cream-50">
                  Divya Rao
                </h3>
                <p className="text-[11px] text-cream-300/70">
                  Computer Science Undergraduate & Builder
                </p>
              </div>
            </div>

            <p className="text-cream-300/80 font-sans text-sm leading-relaxed max-w-sm">
              Building full-stack web applications, exploring long-context models and agentic workflows, and figuring out how things work.
            </p>

            <div className="pt-2 text-[11px] text-cream-400/80 space-y-1">
              <div>📍 {INITIAL_TELEMETRY.location} ({INITIAL_TELEMETRY.coordinates})</div>
              <div>🎓 Chandigarh University • B.E. CSE (2024–Present)</div>
              <div>⚡ Status: Available for SWE roles & fullstack projects</div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-beige font-bold mb-3">
                Pages
              </h4>
              <ul className="space-y-2 text-cream-300/80">
                <li><Link to="/" className="hover:text-cream-50 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-cream-50 transition-colors">About Story</Link></li>
                <li><Link to="/projects" className="hover:text-cream-50 transition-colors">Projects Archive</Link></li>
                <li><Link to="/skills" className="hover:text-cream-50 transition-colors">Skills Matrix</Link></li>
                <li><Link to="/experience" className="hover:text-cream-50 transition-colors">Experience</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-beige font-bold mb-3">
                Writing & Play
              </h4>
              <ul className="space-y-2 text-cream-300/80">
                <li><Link to="/research" className="hover:text-cream-50 transition-colors">Research Journal</Link></li>
                <li><Link to="/blog" className="hover:text-cream-50 transition-colors">Editorial Blog</Link></li>
                <li><Link to="/hobbies" className="hover:text-cream-50 transition-colors">Hobbies & Books</Link></li>
                <li><Link to="/play" className="hover:text-cream-50 transition-colors">Play Arcade</Link></li>
                <li><Link to="/contact" className="hover:text-cream-50 transition-colors">Contact Terminal</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Playful Coffee Interaction & Socials */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] uppercase tracking-wider text-beige font-bold mb-1">
              Fuel & Coffee
            </h4>

            {/* Coffee cup interactive micro-widget */}
            <div className="p-3.5 rounded-xl bg-coffee-dark/80 border border-coffee-muted/40 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cream-300">Coffee consumed today:</span>
                <span className="font-bold text-beige">{coffeeCount} ☕</span>
              </div>
              <button
                onClick={drinkCoffee}
                className="w-full py-1.5 px-3 rounded-lg bg-beige/20 hover:bg-beige/30 text-cream-50 text-[11px] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Brew another cup (+1)</span>
                <span>✨</span>
              </button>
              {coffeeToast && (
                <div className="text-[10px] text-accent-sage text-center animate-pulse">
                  System caffeinated! Code compiling faster.
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-300 hover:text-cream-50 transition"
              >
                GitHub ↗
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-300 hover:text-cream-50 transition"
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-cream-300 hover:text-cream-50 transition"
              >
                Email ↗
              </a>
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige hover:underline transition"
              >
                RSS Feed 📡
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-coffee-muted/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-400/70">
          <div>
            © {new Date().getFullYear()} Divya Rao • Built with warm coffee, paper textures & autonomous code.
          </div>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-cream-200 transition">
              sitemap.xml
            </a>
            <span>•</span>
            <Link to="/admin" className="hover:text-cream-200 transition">
              admin
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-beige transition flex items-center gap-1 cursor-pointer"
            >
              <span>[↑ Back to Top]</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
