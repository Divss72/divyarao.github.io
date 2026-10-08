import React from 'react';
import { Link } from 'react-router-dom';

export const SelectedProjects: React.FC = () => {
  return (
    <section className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-beige-dark/40 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold block mb-1">
            01 • Portfolio
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
            Selected Work
          </h2>
          <p className="text-coffee-muted font-sans text-sm sm:text-base mt-1">
            Working applications where I turned technical questions into software systems.
          </p>
        </div>
        <Link
          to="/projects"
          className="font-mono text-xs text-accent-terracotta hover:underline font-bold whitespace-nowrap"
        >
          View All Projects (3) →
        </Link>
      </div>

      <div className="space-y-12">
        {/* Project 1: DevPosting (Large Image + Text Layout) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-beige-dark/70 shadow-warm-sm bg-coffee-roast">
                <div className="aspect-video w-full bg-coffee-black relative">
                  <img
                    src="/devposting-chronicles.png"
                    alt="DevPosting Community Feed Screenshot"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                  FULL-STACK APPLICATION
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-coffee-espresso">
                  DevPosting
                </h3>
              </div>

              <p className="text-sm font-sans text-coffee-dark leading-relaxed">
                A full-stack developer community and blogging platform built with React, Node.js, Express, and MongoDB. Features topic taxonomies, community rants, JWT authentication, and compound indexing for feed queries.
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['React', 'Node.js', 'Express', 'MongoDB', 'Zod', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-2.5 py-0.5 rounded-md bg-cream-100 border border-beige-dark/40 text-coffee-dark">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <Link
                  to="/projects/devposting"
                  className="px-4 py-2 rounded-xl bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition shadow-warm-sm flex items-center gap-1.5"
                >
                  <span>Project Details</span>
                  <span>→</span>
                </Link>
                <a
                  href="https://devposting.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-beige-dark/60 bg-cream-100 text-coffee-espresso hover:bg-beige/40 transition"
                >
                  Live Demo ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: AlgoLabs (Text on Left + Image on Right Layout) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                  ALGORITHM VISUALIZER
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-coffee-espresso">
                  AlgoLabs
                </h3>
              </div>

              <p className="text-sm font-sans text-coffee-dark leading-relaxed">
                An interactive sandbox to master Data Structures & Algorithms visually with frame-by-frame execution, custom array inputs, and animated step traces across sorting routines and tree traversals.
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['React', 'TypeScript', 'Canvas / SVG', 'Vite', 'Cloudflare'].map((tech) => (
                  <span key={tech} className="px-2.5 py-0.5 rounded-md bg-cream-100 border border-beige-dark/40 text-coffee-dark">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <Link
                  to="/projects/algolabs"
                  className="px-4 py-2 rounded-xl bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition shadow-warm-sm flex items-center gap-1.5"
                >
                  <span>Project Details</span>
                  <span>→</span>
                </Link>
                <a
                  href="https://algolabs-frontend.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-beige-dark/60 bg-cream-100 text-coffee-espresso hover:bg-beige/40 transition"
                >
                  Live Sandbox ↗
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden border border-beige-dark/70 shadow-warm-sm bg-coffee-roast">
                <div className="aspect-video w-full bg-coffee-black relative">
                  <img
                    src="/project-algolabs-real.png"
                    alt="AlgoLabs Visualizer Interface"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project 3: AutoHeal-J (Horizontal Card / Strip Layout) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold">
                SYSTEMS EXPERIMENT
              </span>
              <span className="text-coffee-muted text-xs">•</span>
              <span className="text-xs font-mono text-coffee-muted">Java & Monitoring</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
              AutoHeal-J
            </h3>
            <p className="text-sm font-sans text-coffee-dark leading-relaxed">
              An experimental Spring Boot project testing Prometheus metric scraping and automated container restarts under simulated chaos and high error thresholds.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] pt-1">
              {['Java', 'Spring Boot', 'Prometheus', 'Docker'].map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded bg-cream-100 border border-beige-dark/40 text-coffee-dark">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs whitespace-nowrap self-stretch sm:self-auto justify-end">
            <Link
              to="/projects/autoheal-j"
              className="px-4 py-2 rounded-xl bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition shadow-warm-sm flex items-center gap-1.5"
            >
              <span>Case Study</span>
              <span>→</span>
            </Link>
            <a
              href="https://github.com/Divss72/Java_AutoHeal-J"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl border border-beige-dark/60 bg-cream-100 text-coffee-espresso hover:bg-beige/40 transition"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
