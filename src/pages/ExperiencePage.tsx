import React, { useState } from 'react';
import { usePortfolioStore } from '../data/usePortfolioStore';
import { SOCIAL_LINKS } from '../data/store';

export const ExperiencePage: React.FC = () => {
  const store = usePortfolioStore();
  const experiences = store.getExperience();
  const [selectedExpId, setSelectedExpId] = useState<string>(experiences[0]?.id || '');

  const activeExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-5xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8">
        <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
          Chronological Journey
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          Experience & Fellowships
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          Applied fellowships, open source contributions, hackathon prototypes, and academic foundations at Chandigarh University (2024–Present).
        </p>
      </div>

      {/* Interactive Timeline Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Timeline Nodes Navigation */}
        <div className="md:col-span-5 space-y-4">
          <div className="text-[10px] uppercase tracking-wider text-coffee-muted font-bold">
            TIMELINE MILESTONES (SELECT NODE)
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-beige-dark/60">
            {experiences.map((exp) => {
              const isSelected = exp.id === activeExp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cream-50 border-coffee shadow-warm-md -translate-x-1'
                      : 'bg-cream-100/70 border-beige-dark/40 hover:bg-cream-50 hover:border-beige-dark'
                  }`}
                >
                  {/* Timeline Point Marker */}
                  <span
                    className={`absolute -left-[29px] top-5 w-3 h-3 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'bg-accent-terracotta border-coffee-roast scale-125'
                        : 'bg-cream-50 border-beige-dark'
                    }`}
                  />

                  <div className="flex items-center justify-between text-[10px] text-coffee-muted mb-1">
                    <span>{exp.period}</span>
                    <span className="px-2 py-0.5 rounded bg-beige/60 text-coffee-espresso font-bold">
                      {exp.badge}
                    </span>
                  </div>

                  <strong className="font-editorial text-base text-coffee-espresso block font-sans">
                    {exp.role}
                  </strong>
                  <span className="text-xs text-coffee-muted">
                    {exp.organization} • {exp.location}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Card */}
        <div className="md:col-span-7 space-y-6">
          <div className="p-8 rounded-2xl bg-cream-50 border border-beige-dark/70 shadow-warm-lg space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-coffee text-cream-50">
                  {activeExp.period}
                </span>
                <span className="text-xs text-accent-terracotta font-semibold">
                  {activeExp.organization}
                </span>
              </div>
              <h2 className="font-editorial text-3xl font-bold text-coffee-espresso font-sans">
                {activeExp.role}
              </h2>
              <span className="text-xs text-coffee-muted">
                📍 {activeExp.location}
              </span>
            </div>

            <div className="space-y-3 font-sans">
              <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                Responsibilities & Key Outcomes
              </span>
              <ul className="space-y-3 text-sm text-coffee-dark leading-relaxed">
                {activeExp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-accent-terracotta font-bold">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Continuous Learning & Academic Foundations */}
          <div className="p-6 rounded-2xl bg-coffee-roast text-cream-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-warm-md">
            <div>
              <strong className="font-editorial text-xl text-cream-50 block font-sans">
                Continuous Learning & Foundations
              </strong>
              <p className="text-xs text-cream-300 font-sans mt-0.5">
                Algorithms, system design, operating systems, and full-stack development coursework.
              </p>
            </div>
            <a
              href={`${SOCIAL_LINKS.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-beige text-coffee-espresso font-mono text-xs font-bold hover:bg-cream-100 transition whitespace-nowrap shadow-warm-sm"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
