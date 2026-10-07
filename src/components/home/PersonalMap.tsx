import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  FolderGit2,
  FlaskConical,
  Coffee,
  FileText,
  Gamepad2,
  Mail,
  ArrowRight,
  BookOpen,
  Sparkles,
  Terminal,
  Activity,
} from 'lucide-react';

export const PersonalMap: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const destinations = [
    {
      id: 'about',
      title: 'WHO I AM',
      tagline: 'Mindset & Approach',
      description: 'How I think, what I care about, and how I approach building things.',
      link: '/about',
      linkText: 'About me →',
      icon: User,
      badge: 'Chapter 01',
      details: ['Undergrad at Chandigarh University', 'Curious learner', 'Hands-on builder'],
    },
    {
      id: 'projects',
      title: 'WHAT I BUILD',
      tagline: 'Systems & Code',
      description: "Projects, experiments, applications, and systems I've actually built.",
      link: '/projects',
      linkText: 'View projects →',
      icon: FolderGit2,
      badge: 'Working Systems',
      details: ['DevPosting (MERN Community)', 'AlgoLabs (Interactive DSA)', 'AutoHeal-J (Spring Boot Telemetry)'],
    },
    {
      id: 'research',
      title: 'WHAT I EXPLORE',
      tagline: 'Questions & Inquiries',
      description: "Questions I'm currently trying to understand — paper readings and exploratory test prototypes.",
      link: '/research',
      linkText: 'Explore inquiries →',
      icon: FlaskConical,
      badge: 'Active Reading',
      details: ['Long-context attention degradation', 'Agentic tool loop dampeners', 'RAG retrieval noise'],
      subBranch: {
        title: 'READING / NOTES',
        description: 'Systems books & paper summaries',
        link: '/research',
      },
    },
    {
      id: 'hobbies',
      title: 'LIFE OUTSIDE CODE',
      tagline: 'Balance & Craft',
      description: 'Physical books, basketball free-throws, morning runs, pen sketches, and sci-fi cinema.',
      link: '/hobbies',
      linkText: 'Explore hobbies →',
      icon: Coffee,
      badge: 'Habits & Rhythm',
      details: ['Bookshelf deep dives', 'Court tempo', '35mm sci-fi films'],
    },
    {
      id: 'blog',
      title: 'BLOG & REFLECTIONS',
      tagline: 'Technical Essays',
      description: 'Things I write while figuring things out — documenting what failed and what worked.',
      link: '/blog',
      linkText: 'Read essays →',
      icon: FileText,
      badge: 'Writing',
      details: ['Agent loop design notes', 'MongoDB compound indexing', 'Prometheus telemetry'],
    },
    {
      id: 'play',
      title: 'PLAY & EXPERIMENTS',
      tagline: 'Interactive Canvas',
      description: "Experiments, games, and things that don't need a serious reason.",
      link: '/play',
      linkText: 'Start playing →',
      icon: Gamepad2,
      badge: 'Arcade',
      details: ['8-Bit Runner game', 'Basketball mini court', 'Interactive particle physics'],
    },
    {
      id: 'contact',
      title: 'GET IN TOUCH',
      tagline: 'Direct Dispatch',
      description: 'Say hello, talk systems or agentic AI, or share a book recommendation.',
      link: '/contact',
      linkText: 'Open channels →',
      icon: Mail,
      badge: 'Inbox Open',
      details: ['Chandigarh, India', 'divyarao2403@gmail.com', 'GitHub & LinkedIn'],
    },
  ];

  return (
    <section id="world-map" className="space-y-10 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-beige-dark/40 pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-terracotta font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PERSONAL CONSTELLATION</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-coffee-espresso">
            Explore My World
          </h2>
          <p className="text-coffee-muted font-sans text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
            The homepage is a map of who I am. Every node represents a different part of my journey — choose where you’d like to go.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-coffee-muted bg-cream-50 px-3 py-1.5 rounded-xl border border-beige-dark/50">
          <Activity className="w-3.5 h-3.5 text-accent-sage animate-pulse" />
          <span>7 Connected Realms</span>
        </div>
      </div>

      {/* Central Interactive Map Container */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-cream-50/70 border border-beige-dark/70 shadow-warm-lg overflow-hidden">
        {/* Subtle Decorative Map Grid */}
        <div className="absolute inset-0 bg-notebook-pattern opacity-40 pointer-events-none" />

        {/* Central Core Emblem (Desktop) */}
        <div className="hidden lg:flex items-center justify-center mb-10 relative z-10">
          <div className="px-6 py-2.5 rounded-full bg-coffee text-cream-50 font-mono text-xs font-bold shadow-warm-md flex items-center gap-3 border border-coffee-roast">
            <span className="w-2 h-2 rounded-full bg-accent-terracotta animate-ping" />
            <span>CORE NODE: DIVYA RAO</span>
            <span className="text-[10px] text-cream-100/70 opacity-80">• Personal Digital World</span>
          </div>
        </div>

        {/* Constellation Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {destinations.map((dest, idx) => {
            const Icon = dest.icon;
            const isHovered = hoveredNode === dest.id;

            return (
              <Link
                key={dest.id}
                to={dest.link}
                onMouseEnter={() => setHoveredNode(dest.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`group relative p-6 sm:p-7 rounded-2xl bg-cream-100 border transition-all duration-300 flex flex-col justify-between space-y-4 shadow-warm-sm hover:shadow-warm-md cursor-pointer ${
                  isHovered
                    ? 'border-coffee -translate-y-1 bg-cream-50'
                    : 'border-beige-dark/60 hover:border-coffee/70'
                }`}
              >
                {/* Node Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-beige/50 border border-beige-dark/50 flex items-center justify-center text-coffee group-hover:bg-coffee group-hover:text-cream-50 transition-colors shadow-warm-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-beige/40 text-coffee-muted border border-beige-dark/30">
                      {dest.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider font-bold block">
                      {dest.tagline}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-coffee-espresso group-hover:text-coffee transition-colors">
                      {dest.title}
                    </h3>
                  </div>

                  <p className="text-xs font-sans text-coffee-dark leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* Sub-Branch (for Research -> Reading/Notes) */}
                {dest.subBranch && (
                  <div className="p-2.5 rounded-xl bg-beige/30 border border-beige-dark/40 font-mono text-[10px] text-coffee-dark flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold">
                      <BookOpen className="w-3 h-3 text-accent-terracotta" />
                      {dest.subBranch.title}
                    </span>
                    <span className="text-coffee-muted text-[9px]">{dest.subBranch.description}</span>
                  </div>
                )}

                {/* Concrete Details / Bullet Points */}
                <div className="space-y-1.5 pt-2 border-t border-beige/60 font-mono text-[11px] text-coffee-muted">
                  {dest.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-coffee-muted/60" />
                      <span className="truncate">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Action Footer */}
                <div className="pt-2 flex items-center justify-between font-mono text-xs text-coffee font-bold group-hover:text-accent-terracotta transition-colors">
                  <span>{dest.linkText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Interactive Legend */}
        <div className="mt-8 pt-6 border-t border-beige/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] text-coffee-muted relative z-10">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-coffee" />
            <span>Interactive Map Architecture • Each destination leads to a dedicated world</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-coffee-espresso font-semibold">Hover to illuminate • Click to navigate</span>
          </div>
        </div>
      </div>
    </section>
  );
};
