import React from 'react';
import { Link } from 'react-router-dom';
import { DivyaWorldHero } from '../components/world/DivyaWorldHero';
import {
  ArrowRight,
  Code2,
  Telescope,
  BookOpen,
  Sparkles,
  Heart,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../data/store';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full font-sans text-coffee-espresso">
      {/* ============================================================
          01 — THE INTERACTIVE HERO WORLD (MAIN STAGE)
          ============================================================ */}
      <DivyaWorldHero />

      {/* ============================================================
          02 — CLEAN EDITORIAL DISCOVERY (BREATHING & UNCLUTTERED)
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-24">
        {/* Core Philosophy Statement */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono tracking-widest text-coffee-muted uppercase">
            Curiosity • Systems • Craft
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-coffee-espresso">
            "I build things, study how they work, and document what I learn."
          </h2>
          <p className="text-sm sm:text-base text-coffee-muted leading-relaxed font-sans">
            Currently a Computer Science undergraduate at Chandigarh University. Passionate about
            resilient backend systems, attention mechanisms in language models, and practical software engineering.
          </p>
        </div>

        {/* 03 — WHAT I BUILD (3 REAL PROJECTS, NO FAKE METRICS) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-beige-dark/40 pb-4">
            <div>
              <span className="text-xs font-mono text-coffee-muted uppercase tracking-wider">
                01 / Engineering
              </span>
              <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
                Selected Works
              </h3>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-coffee hover:text-accent-terracotta transition font-semibold"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DevPosting */}
            <Link
              to="/projects/devposting"
              className="group block p-5 rounded-2xl bg-cream-50/80 border border-beige-dark/50 hover:border-coffee/50 shadow-warm-sm hover:shadow-warm-md transition-all duration-300"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-beige/40 mb-4 border border-beige-dark/30">
                <img
                  src="/devposting-chronicles.png"
                  alt="DevPosting Community Platform"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider">
                Full-Stack Web Platform
              </span>
              <h4 className="font-editorial text-xl font-bold text-coffee-espresso group-hover:text-accent-terracotta transition mt-1">
                DevPosting
              </h4>
              <p className="text-xs text-coffee-muted mt-2 leading-relaxed font-sans">
                A community platform for developers featuring chronicled blogging, topics explore engine, and compound-indexed feeds.
              </p>
            </Link>

            {/* AutoHeal-J */}
            <Link
              to="/projects/autoheal-j"
              className="group block p-5 rounded-2xl bg-cream-50/80 border border-beige-dark/50 hover:border-coffee/50 shadow-warm-sm hover:shadow-warm-md transition-all duration-300"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-beige/40 mb-4 border border-beige-dark/30">
                <img
                  src="/project-autoheal.jpg"
                  alt="AutoHeal-J Microservice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider">
                Distributed Systems
              </span>
              <h4 className="font-editorial text-xl font-bold text-coffee-espresso group-hover:text-accent-terracotta transition mt-1">
                AutoHeal-J
              </h4>
              <p className="text-xs text-coffee-muted mt-2 leading-relaxed font-sans">
                Self-healing microservice prototype using Spring Boot, Prometheus telemetry, and automated container recovery policies.
              </p>
            </Link>

            {/* AlgoLabs */}
            <Link
              to="/projects/algolabs"
              className="group block p-5 rounded-2xl bg-cream-50/80 border border-beige-dark/50 hover:border-coffee/50 shadow-warm-sm hover:shadow-warm-md transition-all duration-300"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-beige/40 mb-4 border border-beige-dark/30">
                <img
                  src="/project-algolabs.jpg"
                  alt="AlgoLabs Interactive Visualizer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider">
                Interactive Engineering
              </span>
              <h4 className="font-editorial text-xl font-bold text-coffee-espresso group-hover:text-accent-terracotta transition mt-1">
                AlgoLabs
              </h4>
              <p className="text-xs text-coffee-muted mt-2 leading-relaxed font-sans">
                Interactive visualizer for graph algorithms, shortest-path solvers, and dynamic programming call stacks.
              </p>
            </Link>
          </div>
        </div>

        {/* 04 — WHAT I EXPLORE & READ (GENUINE INQUIRIES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Research Inquiries */}
          <div className="p-6 sm:p-8 rounded-2xl bg-cream-50/60 border border-beige-dark/50 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-coffee-muted uppercase tracking-wider">
              <Telescope className="w-4 h-4 text-purple-600" />
              <span>Research Exploration</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              Attention & Long-Context Models
            </h3>
            <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed font-sans">
              Currently analyzing how context degradation impacts reasoning in extended context windows (128k+ tokens),
              how KV-cache compression behaves under load, and how agentic loop dampeners prevent hallucination cycles.
            </p>
            <Link
              to="/research"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-coffee hover:text-purple-700 transition"
            >
              <span>View Research Inquiries & Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Current Reading */}
          <div className="p-6 sm:p-8 rounded-2xl bg-cream-50/60 border border-beige-dark/50 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-coffee-muted uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Currently Reading</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              Designing Data-Intensive Applications
            </h3>
            <p className="text-xs text-coffee-muted font-mono">
              By Martin Kleppmann • Chapters on Replication, Consensus & Partitioning
            </p>
            <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed font-sans">
              Deep-diving into reliable distributed storage, leaderless replication models, and linearizability tradeoffs.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-coffee hover:text-emerald-700 transition"
            >
              <span>Browse Full Reading Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 05 — LIFE OUTSIDE CODE */}
        <div className="space-y-6">
          <div className="border-b border-beige-dark/40 pb-4">
            <span className="text-xs font-mono text-coffee-muted uppercase tracking-wider">
              03 / Offline
            </span>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              Life Outside Code
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Books', tag: 'Systems & Sci-Fi', icon: '📚', path: '/books' },
              { label: 'Basketball', tag: 'Pickup & Shooting', icon: '🏀', path: '/hobbies' },
              { label: 'Running', tag: '5K Campus Laps', icon: '👟', path: '/hobbies' },
              { label: 'Doodling', tag: 'Pen & Paper', icon: '✏️', path: '/hobbies' },
              { label: 'Sketching', tag: 'Line & Structure', icon: '🎨', path: '/hobbies' },
              { label: 'Movies', tag: 'Cinema & Direction', icon: '🎬', path: '/hobbies' },
            ].map((hobby) => (
              <Link
                key={hobby.label}
                to={hobby.path}
                className="group p-4 rounded-xl bg-cream-50/70 border border-beige-dark/40 hover:border-coffee/50 text-center space-y-1 transition-all hover:-translate-y-0.5"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {hobby.icon}
                </div>
                <div className="font-editorial font-bold text-sm text-coffee-espresso">
                  {hobby.label}
                </div>
                <div className="text-[10px] text-coffee-muted font-mono truncate">
                  {hobby.tag}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 06 — PERSONAL CONTACT INVITATION */}
        <div className="p-8 sm:p-12 rounded-3xl bg-coffee-espresso text-cream-100 shadow-warm-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-lg mx-auto space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
              Let's Connect
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
              Open for Summer Internships & Collaborative Engineering
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-sans">
              Always eager to discuss full-stack platforms, distributed systems, research ideas, or pick up a game of basketball.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-coffee-black font-mono text-xs font-semibold shadow-warm-sm transition-transform active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>divyarao2403@gmail.com</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream-100/15 hover:bg-cream-100/25 text-cream-100 font-mono text-xs transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream-100/15 hover:bg-cream-100/25 text-cream-100 font-mono text-xs transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
