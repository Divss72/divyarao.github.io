import React, { useState } from 'react';
import { usePortfolioStore } from '../data/usePortfolioStore';
import { ResearchItem } from '../types';

export const ResearchPage: React.FC = () => {
  const store = usePortfolioStore();
  const researchItems = store.getResearch();
  const [selectedItem, setSelectedItem] = useState<ResearchItem>(researchItems[0]);

  // Research workflow pipeline
  const workflowSteps = [
    { label: 'INTEREST', desc: 'Curiosity sparked by real engineering friction' },
    { label: 'READING', desc: 'ArXiv papers, documentation & benchmarks' },
    { label: 'QUESTION', desc: 'Formulating a falsifiable, specific hypothesis' },
    { label: 'EXPERIMENT', desc: 'Isolated test harness or small script' },
    { label: 'OBSERVATION', desc: 'Recording empirical metrics & failure cases' },
    { label: 'NEXT QUESTION', desc: 'Iterating with deeper conceptual understanding' },
  ];

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-6xl mx-auto font-sans text-coffee-espresso">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-terracotta" />
          <span className="text-xs font-mono uppercase tracking-wider text-coffee-muted font-bold">
            Personal Research Notebook
          </span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso">
          What I'm Trying to Understand
        </h1>
        <p className="text-coffee-dark font-sans text-base max-w-3xl leading-relaxed">
          Projects are things I built. Research is things I am trying to understand. I am an undergraduate exploring long-context attention, RAG noise dynamics, agentic feedback loops, and LLM efficiency. These notes document active questions, papers I'm reading, experiments I'm running, and what I still don't know.
        </p>
      </div>

      {/* Visual Research Workflow Timeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-coffee-muted font-bold">
            The Research Process (Click Steps)
          </span>
          <span className="font-mono text-xs text-coffee-muted">
            Current Stage: {workflowSteps[selectedItem.currentStepIndex || 2].label}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {workflowSteps.map((step, idx) => {
            const isCurrent = idx === (selectedItem.currentStepIndex || 2);
            return (
              <div
                key={step.label}
                className={`p-4 rounded-xl border transition-all text-left ${
                  isCurrent
                    ? 'bg-cream-50 border-coffee-dark shadow-warm-sm ring-1 ring-coffee-dark/20'
                    : 'bg-cream-100/50 border-beige-dark/40 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                  <span className="text-coffee-muted font-bold">0{idx + 1}</span>
                  {isCurrent && (
                    <span className="px-1.5 py-0.2 rounded bg-accent-terracotta text-white font-bold text-[9px]">
                      ACTIVE
                    </span>
                  )}
                </div>
                <strong className="block text-xs font-bold text-coffee-espresso mb-1">
                  {step.label}
                </strong>
                <p className="text-[11px] text-coffee-dark leading-snug">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Research Notebook Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Research Entries List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-coffee-muted font-bold">
            Active Research Questions ({researchItems.length})
          </div>

          <div className="space-y-3">
            {researchItems.map((item) => {
              const isSelected = item.id === selectedItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cream-50 border-coffee shadow-warm-md -translate-x-1'
                      : 'bg-cream-100/70 border-beige-dark/40 hover:bg-cream-50 hover:border-beige-dark'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-coffee-muted mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-beige/60 text-coffee-espresso font-bold">
                      {item.status}
                    </span>
                    <span>Entry #{item.id}</span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-coffee-espresso leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream-200 text-coffee">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Notebook Lab Sheet */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FDFBF7] border border-beige-dark/70 shadow-warm-lg space-y-6 text-coffee-espresso relative">
            <div className="flex items-center justify-between border-b border-beige/60 pb-3 font-mono text-xs text-coffee-muted">
              <span>RESEARCH FIELD LOG</span>
              <span className="font-bold text-coffee-espresso">Status: {selectedItem.status}</span>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[10px]">
                {selectedItem.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-beige text-coffee-espresso">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
                {selectedItem.title}
              </h2>
            </div>

            {/* Research Core Sections */}
            <div className="space-y-5 font-sans">
              {/* Question */}
              <div className="p-4 rounded-xl bg-cream-100 border border-beige/60 space-y-1">
                <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                  CORE QUESTION
                </span>
                <p className="text-base font-editorial font-bold text-coffee-espresso">
                  "{selectedItem.question}"
                </p>
                {selectedItem.whyInterested && (
                  <p className="text-xs text-coffee-dark mt-1 font-sans">
                    <strong className="text-coffee-muted font-mono">Why I'm Interested:</strong> {selectedItem.whyInterested}
                  </p>
                )}
              </div>

              {/* What I'm Reading & Testing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-cream-50 border border-beige-dark/40 space-y-1">
                  <span className="font-mono text-[10px] text-coffee-muted uppercase tracking-wider font-bold block">
                    WHAT I'M READING
                  </span>
                  <p className="text-coffee-dark leading-relaxed">
                    {selectedItem.whatReading}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cream-50 border border-beige-dark/40 space-y-1">
                  <span className="font-mono text-[10px] text-coffee-muted uppercase tracking-wider font-bold block">
                    WHAT I'M TESTING
                  </span>
                  <p className="text-coffee-dark leading-relaxed">
                    {selectedItem.whatTesting}
                  </p>
                </div>
              </div>

              {/* What Found & Still Don't Know */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-accent-sage/10 border border-accent-sage/30 space-y-1">
                  <span className="font-mono text-[10px] text-accent-sage uppercase tracking-wider font-bold block">
                    WHAT I FOUND SO FAR
                  </span>
                  <p className="text-coffee-espresso leading-relaxed font-semibold">
                    {selectedItem.whatFound}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-accent-terracotta/10 border border-accent-terracotta/30 space-y-1">
                  <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                    WHAT I STILL DON'T KNOW
                  </span>
                  <p className="text-coffee-dark leading-relaxed">
                    {selectedItem.whatStillDontKnow}
                  </p>
                </div>
              </div>

              {selectedItem.references && (
                <div className="p-3.5 rounded-xl bg-cream-100 border border-beige/60 text-xs font-mono text-coffee-muted">
                  <span className="font-bold text-coffee-espresso mr-2">REFERENCES:</span>
                  <span>{selectedItem.references}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
