import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, FileText, ArrowRight, Bookmark } from 'lucide-react';

export const ExploringSection: React.FC = () => {
  const topics = [
    {
      title: 'Long-Context Attention Degradation',
      question: 'How does model behavior and recall degrade when facts are placed in the middle of long contexts?',
      focus: 'Attention behavior & retrieval trade-offs',
      status: 'Exploring',
    },
    {
      title: 'Agentic Tool Loops & Dampeners',
      question: 'Why do LLM agents get stuck in repetitive failure loops when tools error, and how do dampeners help?',
      focus: 'Bounded state & error schemas',
      status: 'Prototyping',
    },
    {
      title: 'RAG Retrieval Noise & Selection',
      question: 'When vector search brings in noisy distractor chunks, how much does it hurt downstream reasoning?',
      focus: 'Context compression & reranking',
      status: 'Reading Papers',
    },
  ];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-beige-dark/40 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold block mb-1">
            02 • Inquiry & Curiosity
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
            What I Explore
          </h2>
          <p className="text-coffee-muted font-sans text-sm sm:text-base mt-1 max-w-2xl">
            Active research questions I am currently reading papers about and testing with small code prototypes. These are personal investigations — not formal publications.
          </p>
        </div>
        <Link
          to="/research"
          className="font-mono text-xs text-accent-terracotta hover:underline font-bold whitespace-nowrap"
        >
          Research Notes & Log →
        </Link>
      </div>

      {/* Inquiry Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((t) => (
          <div
            key={t.title}
            className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm flex flex-col justify-between space-y-4 hover:border-coffee transition"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cream-100 border border-beige-dark/40 text-coffee">
                  {t.status}
                </span>
                <FlaskConical className="w-3.5 h-3.5 text-accent-terracotta" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-coffee-espresso leading-snug">
                {t.title}
              </h3>
              <p className="text-xs font-sans text-coffee-dark italic leading-relaxed">
                "{t.question}"
              </p>
            </div>

            <div className="pt-2 border-t border-beige/60 text-[11px] font-mono text-coffee-muted">
              Focus: {t.focus}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Sub-Branch: Reading / Notes Index Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-cream-100 border border-beige-dark/60 shadow-warm-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-accent-terracotta font-bold">
            <Bookmark className="w-3.5 h-3.5" />
            <span>SUB-BRANCH: READING & RESEARCH NOTES</span>
          </div>
          <h4 className="font-editorial text-2xl font-bold text-coffee-espresso">
            Active Study: Designing Data-Intensive Applications
          </h4>
          <p className="text-xs font-sans text-coffee-dark leading-relaxed">
            Martin Kleppmann’s foundational text on storage engines, replication, and consensus. Alongside papers like Nelson Liu's <em>Lost in the Middle</em> and Yao et al.'s <em>ReAct</em>.
          </p>
        </div>

        <Link
          to="/research"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-cream-50 border border-beige-dark/60 hover:border-coffee text-coffee-espresso font-mono text-xs font-bold transition flex items-center gap-2 shadow-warm-sm"
        >
          <BookOpen className="w-4 h-4 text-coffee" />
          <span>Browse Notes Notebook</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};
