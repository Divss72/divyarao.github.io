import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../data/usePortfolioStore';

export const ProjectsPage: React.FC = () => {
  const store = usePortfolioStore();
  const projects = store.getProjects();
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'FULL STACK', 'SYSTEMS', 'ALGORITHMS'];

  const filteredProjects =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => {
          if (filter === 'FULL STACK') return p.category.includes('FULL_STACK');
          if (filter === 'SYSTEMS') return p.category.includes('SYSTEMS');
          if (filter === 'ALGORITHMS') return p.category.includes('ALGORITHMS');
          return true;
        });

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-7xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8">
        <div className="flex items-center gap-2 text-accent-terracotta uppercase tracking-wider font-bold">
          <span>Portfolio Archive</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          Software Projects
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          Full-stack web applications, systems experiments, and interactive algorithmic visualizers built while learning and exploring.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl border transition cursor-pointer ${
                filter === cat
                  ? 'bg-coffee text-cream-50 border-coffee font-bold shadow-warm-sm'
                  : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase with Varied Compositions */}
      <div className="space-y-16">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.id}
            className="paper-card p-6 sm:p-10 transition-all hover:shadow-warm-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Media Column (Alternating for visual rhythm) */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''} space-y-3`}>
                <div className="rounded-xl overflow-hidden border border-beige-dark/70 shadow-warm-md bg-coffee-roast">
                  <div className="aspect-video w-full bg-coffee-black relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition duration-500 hover:scale-102"
                    />
                  </div>
                </div>

                {/* Sub-label */}
                <div className="flex items-center justify-between text-[11px] text-coffee-muted">
                  <span>Production Screenshot</span>
                  <span className="text-accent-terracotta font-semibold">
                    Status: {project.status}
                  </span>
                </div>
              </div>

              {/* Information Column */}
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''} space-y-5`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-beige text-coffee-espresso">
                      INDEX #{project.indexNumber}
                    </span>
                    <span className="text-[10px] text-coffee-muted">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso font-sans">
                    <Link to={`/projects/${project.slug}`} className="hover:text-accent-terracotta transition">
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-coffee-muted mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-sm font-sans text-coffee-dark leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="p-2.5 rounded-lg bg-cream-100 border border-beige/60">
                      <span className="text-coffee-muted text-[10px] block">{m.label}</span>
                      <strong className="text-coffee-espresso text-sm font-bold">{m.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-cream-200 border border-beige-dark/40 text-coffee text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="text-[10px] text-coffee-muted self-center">
                      +{project.techStack.length - 5} more
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="px-4 py-2 rounded-lg bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition flex items-center gap-1.5 shadow-warm-sm"
                  >
                    <span>Full Case Study</span>
                    <span>→</span>
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-beige-dark/60 bg-cream-50 text-coffee-espresso hover:bg-beige/30 transition"
                    >
                      Live Demo ↗
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-beige-dark/50 bg-cream-50 text-coffee-muted hover:text-coffee-espresso transition"
                    title="Source Repository"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
