import React from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';

interface HeroProps {
  onOpenCv?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  return (
    <header className="py-20 md:py-28 px-6 max-w-7xl mx-auto border-b border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for software engineering roles & internships</span>
          </div>

          {/* Display Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Full Stack Alchemist & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Systems Engineer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
            Bridging high-throughput backend architecture, autonomous fault recovery, and interactive AI systems. 
            Building resilient, scalable software from database internals to slick interfaces.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm shadow-blue-500/30 transition flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <span>↓</span>
            </a>

            <button
              onClick={onOpenCv}
              className="px-6 py-3 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:border-slate-400 hover:text-slate-900 shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View My CV</span>
            </button>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-300 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-400 transition"
              title="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-300 bg-white text-slate-600 hover:text-blue-600 hover:border-slate-400 transition"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Profile Card */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-72 sm:w-80 group">
            <div className="card-clean p-2 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                <img
                  src="/divya-profile.png"
                  alt="Divya Rao"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-display font-bold text-slate-900 text-base">Divya Rao</h3>
                <p className="text-xs text-slate-500 font-medium">B.E. Computer Science • Chandigarh University</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
