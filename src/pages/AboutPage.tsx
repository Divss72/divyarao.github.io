import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../data/usePortfolioStore';
import { SOCIAL_LINKS, INITIAL_TELEMETRY } from '../data/store';
import { BookItem, PaperItem, ResearchItem } from '../types';
import { normalizeImagePath } from '../utils/image';

export const AboutPage: React.FC = () => {
  const store = usePortfolioStore();
  const activePhoto = store.getActivePhoto();
  const books = store.getBooks();
  const papers = store.getPapers();
  const researchItems = store.getResearch();
  const currently = store.getCurrently();

  // Reading Shelf tab: Books vs Papers
  const [readingTab, setReadingTab] = useState<'books' | 'papers'>('books');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(books[0] || null);
  const [selectedPaper, setSelectedPaper] = useState<PaperItem | null>(papers[0] || null);

  // Active Research Notebook Entry
  const [activeResearch, setActiveResearch] = useState<ResearchItem>(researchItems[0]);

  // Learning Loop Interactive Step
  const [learningStep, setLearningStep] = useState<number>(0);
  const learningSteps = [
    {
      label: 'BUILD',
      icon: '🔨',
      title: 'Start by building a prototype',
      desc: 'I like jumping in and building something before I fully understand every theory. Starting with working code gives me a tangible mental model to test.',
    },
    {
      label: 'ERROR',
      icon: '⚡',
      title: 'Run into the inevitable bugs',
      desc: 'A database query crawls past 400ms, an LLM agent hallucinates a tool argument, or memory spikes under load. The errors show me where my assumptions broke.',
    },
    {
      label: 'READ',
      icon: '📖',
      title: 'Dig into documentation & papers',
      desc: 'Now I have a concrete question. I read official docs, database execution plan references, or research papers (like "Lost in the Middle" or FlashAttention).',
    },
    {
      label: 'EXPERIMENT',
      icon: '🔬',
      title: 'Isolate & test small variations',
      desc: 'Test a compound index in MongoDB, benchmark distractor chunks in a RAG prompt, or add a loop dampener to an agent execution loop.',
    },
    {
      label: 'UNDERSTAND',
      icon: '💡',
      title: 'Connect practical mechanics to theory',
      desc: 'The concept clicks because I felt the problem firsthand. Now I actually understand how the system behaves under the hood.',
    },
    {
      label: 'BUILD AGAIN',
      icon: '🚀',
      title: 'Rebuild with clean, intentional design',
      desc: 'Re-architect the feature with proper types, error handling, and test cases. The resulting code is simple and resilient.',
    },
  ];

  return (
    <div className="space-y-28 py-10 px-4 sm:px-6 max-w-5xl mx-auto font-sans text-coffee-espresso">
      {/* Editorial Profile Frame */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-b border-beige-dark/40 pb-16">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group p-3 bg-cream-50 border border-beige-dark/60 rounded-2xl shadow-warm-lg">
            <div className="aspect-[4/5] w-72 sm:w-80 rounded-xl overflow-hidden bg-coffee-roast relative">
              <img
                src={normalizeImagePath(activePhoto)}
                alt="Divya Rao"
                className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-roast/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-cream-50/95 backdrop-blur-md rounded-lg border border-beige-dark/40 text-coffee-espresso font-mono text-xs">
                <span className="block font-bold tracking-wide">DIVYA RAO</span>
                <span className="text-[11px] text-coffee-muted">Chandigarh University • B.E. CSE (2024–Present)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-50 border border-beige-dark/50 text-xs font-mono text-coffee-dark">
            <span className="w-2 h-2 rounded-full bg-accent-sage animate-pulse" />
            <span>Available for SWE Roles, fullstack projects, mern stack projects</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-coffee-espresso">
              Divya Rao
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-coffee-muted italic">
              Computer Science Undergraduate & AI Enthusiast
            </p>
          </div>

          <p className="text-base text-coffee-dark leading-relaxed">
            I am a Computer Science & Engineering student at <strong className="text-coffee-espresso">Chandigarh University (2024–Present)</strong>. I spend most of my time building full-stack web applications, exploring Agentic AI and long-context models, reading systems books and research papers, and figuring out how things work by building them from scratch.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-cream-50 border border-beige-dark/40">
              <span className="text-coffee-muted text-[10px] block">LOCATION</span>
              <strong className="text-coffee-espresso">Chandigarh, India</strong>
            </div>
            <div className="p-3 rounded-xl bg-cream-50 border border-beige-dark/40">
              <span className="text-coffee-muted text-[10px] block">EDUCATION</span>
              <strong className="text-coffee-espresso">B.E. CSE (2024–Present)</strong>
            </div>
            <div className="p-3 rounded-xl bg-cream-50 border border-beige-dark/40 col-span-2 sm:col-span-1">
              <span className="text-coffee-muted text-[10px] block">AFFILIATION</span>
              <strong className="text-coffee-espresso">GSSoC & Alta Fellow</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — WHO I AM */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            01
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            Who I Am
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso leading-snug">
          Still figuring things out. Building things anyway.
        </h2>

        <div className="paper-card p-8 sm:p-10 space-y-4 text-base text-coffee-dark leading-relaxed">
          <p>
            I am a Computer Science undergraduate who likes understanding how things work by trying to build them.
          </p>
          <p>
            I started with software development — building full-stack MERN applications, solving DSA problems, and experimenting with different web technologies. Over time, I became fascinated by what happens underneath the applications: how models reason, how context degradation affects responses, how retrieval changes what an AI system knows, and how we can make software faster and more reliable.
          </p>
          <p>
            I like building things before I fully understand them. Usually, the bugs and edge cases force me to understand them. Rather than only consuming tutorials, I prefer hitting a concrete problem, opening the documentation or research paper, and testing an experiment until the mental model clicks.
          </p>
        </div>
      </section>

      {/* 02 — WHAT I LIKE BUILDING */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            02
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            What I Like Building
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          The Categories of Things I Work On
        </h2>

        <p className="text-base text-coffee-dark max-w-2xl leading-relaxed">
          I don't just write code to check off requirements. I build because each project lets me test a concrete idea or curiosity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full-Stack */}
          <div className="p-7 rounded-2xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                Full-Stack Applications
              </h3>
            </div>
            <p className="text-sm text-coffee-dark leading-relaxed">
              MERN stack platforms, backend APIs, and database-driven applications. Projects like{' '}
              <Link to="/projects/devposting" className="text-accent-terracotta underline font-semibold">
                DevPosting
              </Link>{' '}
              let me explore structured blogging, topic taxonomies, authentication pipelines, and indexing optimization in MongoDB.
            </p>
          </div>

          {/* AI Systems */}
          <div className="p-7 rounded-2xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                AI Systems & RAG
              </h3>
            </div>
            <p className="text-sm text-coffee-dark leading-relaxed">
              RAG setups, vector retrieval experiments, and multi-step AI agent loops. Exploring how strongly-typed tool schemas and memory buffers stop models from falling into hallucination cycles.
            </p>
          </div>

          {/* Experiments */}
          <div className="p-7 rounded-2xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎨</span>
              <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                Experiments & Visualizers
              </h3>
            </div>
            <p className="text-sm text-coffee-dark leading-relaxed">
              Interactive visual sandboxes like{' '}
              <Link to="/projects/algolabs" className="text-accent-terracotta underline font-semibold">
                AlgoLabs
              </Link>
              , animated Canvas step traces for sorting and trees, computer vision prototypes, and small technical explorations that turn abstract CS theories into visual reality.
            </p>
          </div>

          {/* Systems Exploration */}
          <div className="p-7 rounded-2xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                Systems & Monitoring
              </h3>
            </div>
            <p className="text-sm text-coffee-dark leading-relaxed">
              Experiments like{' '}
              <Link to="/projects/autoheal-j" className="text-accent-terracotta underline font-semibold">
                AutoHeal-J
              </Link>
              , testing sub-3s Prometheus metric scraping, simulated chaos injections, and automated container restart controllers in Spring Boot.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — WHAT I'M CURIOUS ABOUT */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            03
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            What I'm Curious About
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          What I Keep Coming Back To
        </h2>

        <p className="text-base text-coffee-dark max-w-2xl leading-relaxed">
          These are the active technical questions I am currently exploring and reading papers about. I haven't solved these problems; they are directions I am actively investigating.
        </p>

        <div className="space-y-4">
          {[
            {
              title: 'Long-Context LLMs & Context Degradation',
              prefix: 'I’m exploring',
              body: 'how models behave when prompts grow past 32k or 128k tokens. Does feeding an entire codebase or book into context actually yield accurate answers, or does attention degrade in the middle? I want to understand when selective retrieval clearly beats massive raw context windows.',
              tag: 'Attention Behavior',
            },
            {
              title: 'RAG Retrieval Quality & Noise',
              prefix: 'I’m interested in',
              body: 'how retrieved information directly shapes answer generation. When vector search returns 5 chunks and 2 are irrelevant distractors, how much does that noise hurt reasoning? I’ve been looking into contextual rerankers and hybrid search methods.',
              tag: 'Retrieval vs Generation',
            },
            {
              title: 'Agentic Tool Loops & Failure Modes',
              prefix: 'I’m trying to understand',
              body: 'why multi-step AI agents get caught in repetitive loops when a tool returns an error. How can we build bounded feedback loops that give the agent freedom to self-correct without burning tokens in circles?',
              tag: 'Agent Reliability',
            },
            {
              title: 'LLM Efficiency & Memory Footprints',
              prefix: 'I’ve been reading about',
              body: 'what makes inference fast or slow. How kv-cache memory limits batch size, how IO-aware algorithms like FlashAttention avoid memory bottlenecks, and how smaller fine-tuned models can match larger ones on targeted tasks.',
              tag: 'Inference Mechanics',
            },
            {
              title: 'Evaluation & Consistency',
              prefix: 'I want to investigate',
              body: 'how to rigorously evaluate AI applications beyond subjective "looks good to me" vibe checks. Designing synthetic test sets, measuring factual hallucination rates, and tracking benchmark drift.',
              tag: 'Empirical Testing',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                  {item.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cream-200 text-coffee font-mono text-[11px]">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-coffee-dark leading-relaxed">
                <strong className="text-accent-terracotta font-mono text-xs mr-1">
                  [{item.prefix}]
                </strong>{' '}
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — WHAT I'M READING */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            04
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            What I'm Reading
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          The Reading & Research Desk
        </h2>

        <p className="text-base text-coffee-dark max-w-2xl leading-relaxed">
          A live shelf of the systems books, AI papers, and technical articles currently on my desk with personal takeaways.
        </p>

        {/* Tab switch between Books & Research Papers */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setReadingTab('books')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer font-bold ${
              readingTab === 'books'
                ? 'bg-coffee text-cream-50 shadow-warm-sm'
                : 'bg-cream-50 border border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso'
            }`}
          >
            Books ({books.length})
          </button>
          <button
            onClick={() => setReadingTab('papers')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer font-bold ${
              readingTab === 'papers'
                ? 'bg-coffee text-cream-50 shadow-warm-sm'
                : 'bg-cream-50 border border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso'
            }`}
          >
            Research Papers ({papers.length})
          </button>
        </div>

        {/* Books Shelf View */}
        {readingTab === 'books' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-2">
              <span className="font-mono text-[10px] text-coffee-muted uppercase tracking-wider font-bold block">
                SELECT A BOOK FROM SHELF
              </span>
              <div className="space-y-2">
                {books.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBook(b)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      selectedBook?.id === b.id
                        ? 'bg-cream-50 border-coffee shadow-warm-sm'
                        : 'bg-cream-100/60 border-beige-dark/40 hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-coffee-muted mb-0.5">
                      <span>{b.genre}</span>
                      <span className="font-bold text-coffee-espresso">{b.status}</span>
                    </div>
                    <strong className="font-editorial text-base text-coffee-espresso block">
                      {b.title}
                    </strong>
                    <span className="text-xs text-coffee-muted">By {b.author}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedBook && (
              <div className="md:col-span-7 p-7 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-md space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-bold">
                    {selectedBook.status}
                  </span>
                  <span className="text-accent-gold">{'★'.repeat(Math.floor(selectedBook.rating))} ({selectedBook.rating}/5)</span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
                    {selectedBook.title}
                  </h3>
                  <span className="text-xs text-coffee-muted font-mono">By {selectedBook.author}</span>
                </div>

                <div className="space-y-2 text-sm text-coffee-dark leading-relaxed">
                  <p>{selectedBook.note}</p>
                  {selectedBook.takeaway && (
                    <div className="p-3.5 rounded-xl bg-cream-100 border border-beige/60">
                      <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider font-bold block mb-1">
                        PERSONAL TAKEAWAY
                      </span>
                      <p className="text-xs italic text-coffee-espresso font-editorial">
                        "{selectedBook.takeaway}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Papers Shelf View */}
        {readingTab === 'papers' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-2">
              <span className="font-mono text-[10px] text-coffee-muted uppercase tracking-wider font-bold block">
                SELECT A PAPER FROM LOG
              </span>
              <div className="space-y-2">
                {papers.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPaper(p)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      selectedPaper?.id === p.id
                        ? 'bg-cream-50 border-coffee shadow-warm-sm'
                        : 'bg-cream-100/60 border-beige-dark/40 hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-coffee-muted mb-0.5">
                      <span>{p.topic}</span>
                      <span className="font-bold text-coffee-espresso">{p.year}</span>
                    </div>
                    <strong className="font-editorial text-base text-coffee-espresso block">
                      {p.title}
                    </strong>
                    <span className="text-xs text-coffee-muted">{p.authors}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedPaper && (
              <div className="md:col-span-7 p-7 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-md space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-bold">
                    {selectedPaper.status}
                  </span>
                  {selectedPaper.link && (
                    <a
                      href={selectedPaper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-terracotta hover:underline"
                    >
                      Open ArXiv Paper ↗
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
                    {selectedPaper.title}
                  </h3>
                  <span className="text-xs text-coffee-muted font-mono">
                    {selectedPaper.authors} ({selectedPaper.year})
                  </span>
                </div>

                <div className="space-y-3 text-sm text-coffee-dark leading-relaxed">
                  <div>
                    <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider font-bold block mb-1">
                      WHY I'M READING IT
                    </span>
                    <p className="text-xs text-coffee-dark">{selectedPaper.whyReading}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-coffee-muted uppercase tracking-wider font-bold block mb-1">
                      READING NOTES
                    </span>
                    <p className="text-xs text-coffee-dark">{selectedPaper.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 05 — MY RESEARCH NOTEBOOK */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            05
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            My Research Notebook
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          Research as an Ongoing Investigation
        </h2>

        <p className="text-base text-coffee-dark max-w-2xl leading-relaxed">
          Projects are things I built. Research is things I am trying to understand. Here are active questions, experiments, and what I still don't know.
        </p>

        {/* Notebook Entry Selector */}
        <div className="flex flex-wrap gap-2">
          {researchItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveResearch(item)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition cursor-pointer font-bold ${
                activeResearch.id === item.id
                  ? 'bg-coffee text-cream-50 shadow-warm-sm'
                  : 'bg-cream-50 border border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso'
              }`}
            >
              {item.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Selected Notebook Dossier */}
        <div className="paper-card p-8 sm:p-10 space-y-6">
          <div className="border-b border-beige/60 pb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-[10px] font-bold">
              Status: {activeResearch.status}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-coffee-espresso mt-2">
              {activeResearch.title}
            </h3>
          </div>

          <div className="space-y-4">
            {/* The Question */}
            <div className="p-4 rounded-xl bg-cream-100 border border-beige/60">
              <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider font-bold block mb-1">
                QUESTION (WHY I'M INTERESTED)
              </span>
              <p className="text-base font-editorial font-bold text-coffee-espresso">
                "{activeResearch.question}"
              </p>
              <p className="text-xs text-coffee-muted font-sans mt-1">
                {activeResearch.whyInterested}
              </p>
            </div>

            {/* Reading & Testing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-cream-50 border border-beige-dark/40 space-y-1">
                <span className="text-[10px] font-mono text-coffee-muted uppercase tracking-wider font-bold block">
                  WHAT I'M READING
                </span>
                <p className="text-coffee-dark leading-relaxed">{activeResearch.whatReading}</p>
              </div>

              <div className="p-4 rounded-xl bg-cream-50 border border-beige-dark/40 space-y-1">
                <span className="text-[10px] font-mono text-coffee-muted uppercase tracking-wider font-bold block">
                  WHAT I'M TESTING
                </span>
                <p className="text-coffee-dark leading-relaxed">{activeResearch.whatTesting}</p>
              </div>
            </div>

            {/* Observations & Open Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-cream-50 border border-beige-dark/40 space-y-1">
                <span className="text-[10px] font-mono text-accent-sage uppercase tracking-wider font-bold block">
                  WHAT I FOUND SO FAR
                </span>
                <p className="text-coffee-dark leading-relaxed">{activeResearch.whatFound}</p>
              </div>

              <div className="p-4 rounded-xl bg-cream-50 border border-beige-dark/40 space-y-1">
                <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider font-bold block">
                  WHAT I STILL DON'T KNOW
                </span>
                <p className="text-coffee-dark leading-relaxed">{activeResearch.whatStillDontKnow}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — HOW I LEARN (Interactive Learning Loop) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            06
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            How I Learn
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          The Build → Error → Read → Experiment Loop
        </h2>

        <p className="text-base text-coffee-dark max-w-2xl leading-relaxed">
          I don't just consume tutorials in a vacuum. I learn by building until something breaks, then reading deeply to understand why. Click each step to see how I think through problems.
        </p>

        {/* Step indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-xs">
          {learningSteps.map((step, idx) => (
            <button
              key={step.label}
              onClick={() => setLearningStep(idx)}
              className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                learningStep === idx
                  ? 'bg-coffee text-cream-50 border-coffee font-bold shadow-warm-sm scale-102'
                  : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:bg-beige/30 hover:text-coffee-espresso'
              }`}
            >
              <span className="text-lg block mb-1">{step.icon}</span>
              <span className="text-[11px] block">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Active step explanation */}
        <div className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{learningSteps[learningStep].icon}</span>
            <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
              Step {learningStep + 1}: {learningSteps[learningStep].title}
            </h3>
          </div>
          <p className="text-sm text-coffee-dark leading-relaxed font-sans">
            {learningSteps[learningStep].desc}
          </p>
        </div>
      </section>

      {/* 07 — WHERE I'M HEADED */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            07
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            Where I'm Headed
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          What I'm Working Toward
        </h2>

        <div className="paper-card p-8 sm:p-10 space-y-4 text-base text-coffee-dark leading-relaxed">
          <p>
            I am working toward becoming a strong <strong className="text-coffee-espresso">AI Engineer</strong> and systems developer.
          </p>
          <p>
            I want to work at the intersection of practical application engineering and model intelligence: building systems that don't just make single API calls to an LLM, but orchestrate structured reasoning, manage long contexts efficiently, evaluate factual consistency, and run with high reliability.
          </p>
          <p>
            I am particularly interested in software engineering roles, full-stack projects, and applied AI fellowships where I can contribute working code alongside teams who care deeply about craft and foundational understanding.
          </p>
        </div>
      </section>

      {/* 08 — OUTSIDE THE CODE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            08
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            Outside the Code
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          Rhythms Outside the Screen
        </h2>

        <p className="text-base text-coffee-dark max-w-2xl leading-relaxed">
          I don't believe in spending 100% of my waking life staring at terminal output. The clarity needed for writing good software comes directly from physical movement and creative observation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link
            to="/hobbies"
            className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/50 hover:border-coffee shadow-warm-sm transition group"
          >
            <span className="text-2xl block mb-2">🏀</span>
            <strong className="font-editorial text-lg text-coffee-espresso group-hover:text-accent-terracotta block">
              Basketball Shootouts
            </strong>
            <p className="text-xs text-coffee-dark mt-1 leading-relaxed">
              Court rhythm, footwork, and jump shots. There is something deeply centering about shooting free throws after hours of debugging.
            </p>
          </Link>

          <Link
            to="/play"
            className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/50 hover:border-coffee shadow-warm-sm transition group"
          >
            <span className="text-2xl block mb-2">🏃</span>
            <strong className="font-editorial text-lg text-coffee-espresso group-hover:text-accent-terracotta block">
              Running
            </strong>
            <p className="text-xs text-coffee-dark mt-1 leading-relaxed">
              Early morning kilometers. Running is my favorite metaphor for learning: you don't sprint to the finish; you keep steady tempo through the fatigue.
            </p>
          </Link>

          <Link
            to="/hobbies"
            className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/50 hover:border-coffee shadow-warm-sm transition group"
          >
            <span className="text-2xl block mb-2">✏️</span>
            <strong className="font-editorial text-lg text-coffee-espresso group-hover:text-accent-terracotta block">
              Doodles & Sketches
            </strong>
            <p className="text-xs text-coffee-dark mt-1 leading-relaxed">
              Notebook diagrams, loose pen sketches, and architecture flowcharts. Putting pen to real paper helps clarify messy ideas.
            </p>
          </Link>

          <Link
            to="/hobbies"
            className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/50 hover:border-coffee shadow-warm-sm transition group"
          >
            <span className="text-2xl block mb-2">📖</span>
            <strong className="font-editorial text-lg text-coffee-espresso group-hover:text-accent-terracotta block">
              Reading Books
            </strong>
            <p className="text-xs text-coffee-dark mt-1 leading-relaxed">
              Distributed systems, cognitive psychology, and habits. A small stack of physical books always sits on my desk.
            </p>
          </Link>

          <Link
            to="/hobbies"
            className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/50 hover:border-coffee shadow-warm-sm transition group sm:col-span-2 lg:col-span-2"
          >
            <span className="text-2xl block mb-2">📽️</span>
            <strong className="font-editorial text-lg text-coffee-espresso group-hover:text-accent-terracotta block">
              Cinema & 35mm Films
            </strong>
            <p className="text-xs text-coffee-dark mt-1 leading-relaxed">
              Science fiction and philosophical cinema — Interstellar, The Matrix, Ex Machina, Whiplash, and Oppenheimer. Visual composition inspiration.
            </p>
          </Link>
        </div>
      </section>

      {/* 09 — CURRENTLY (Live Microcopy Status) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-beige text-coffee-espresso font-mono text-xs font-bold">
            09
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
            Currently
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
          Live Status from My Desk
        </h2>

        <div className="p-8 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
          <div>
            <span className="text-[10px] text-coffee-muted uppercase tracking-wider block font-bold mb-1">
              CURRENTLY READING
            </span>
            <strong className="font-editorial text-base text-coffee-espresso font-sans block">
              {currently.reading}
            </strong>
            <span className="text-coffee-muted text-[11px]">By {currently.readingAuthor}</span>
          </div>

          <div>
            <span className="text-[10px] text-coffee-muted uppercase tracking-wider block font-bold mb-1">
              CURRENTLY EXPLORING
            </span>
            <strong className="font-editorial text-base text-coffee-espresso font-sans block">
              {currently.exploring}
            </strong>
            <span className="text-coffee-muted text-[11px]">Reading papers & benchmarks</span>
          </div>

          <div>
            <span className="text-[10px] text-coffee-muted uppercase tracking-wider block font-bold mb-1">
              CURRENTLY BUILDING
            </span>
            <strong className="font-editorial text-base text-coffee-espresso font-sans block">
              {currently.building}
            </strong>
            <span className="text-coffee-muted text-[11px]">Iterating on features & schemas</span>
          </div>

          <div>
            <span className="text-[10px] text-coffee-muted uppercase tracking-wider block font-bold mb-1">
              OBSESSED WITH
            </span>
            <p className="text-xs text-coffee-dark font-sans leading-relaxed">
              {currently.obsessedWith}
            </p>
          </div>

          <div>
            <span className="text-[10px] text-coffee-muted uppercase tracking-wider block font-bold mb-1">
              PROBABLY DEBUGGING
            </span>
            <p className="text-xs text-coffee-dark font-sans leading-relaxed">
              {currently.debuggingNote}
            </p>
          </div>

          <div>
            <span className="text-[10px] text-coffee-muted uppercase tracking-wider block font-bold mb-1">
              USUALLY WITH
            </span>
            <p className="text-xs text-coffee-dark font-sans leading-relaxed">
              {currently.coffeeStatus}
            </p>
          </div>
        </div>
      </section>

      {/* 10 — LET'S TALK */}
      <section className="p-8 sm:p-12 rounded-3xl bg-coffee-roast text-cream-100 shadow-warm-lg space-y-5 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-beige font-bold block">
          10 — Let's Talk
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-cream-50 font-sans">
          Let's Build Something Together
        </h2>
        <p className="text-cream-300 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          I'm open for software engineering roles, fullstack projects, and MERN stack collaborations. Or simply reach out to chat about AI or book recommendations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs pt-2">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-accent-terracotta text-white font-bold hover:bg-accent-rust transition shadow-warm-md"
          >
            Send a Message →
          </Link>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="px-6 py-3 rounded-xl border border-coffee-muted/60 bg-coffee-dark text-cream-200 hover:text-cream-50 transition"
          >
            {SOCIAL_LINKS.email}
          </a>
        </div>
      </section>
    </div>
  );
};
