import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { usePortfolioStore } from '../data/usePortfolioStore';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const store = usePortfolioStore();
  const project = store.getProjectBySlug(slug || '');

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const [activeGalleryImg, setActiveGalleryImg] = useState<string>(
    project.galleryImages?.[0]?.url || project.image
  );

  return (
    <article className="space-y-16 py-10 px-4 sm:px-6 max-w-5xl mx-auto font-mono text-xs">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-coffee-muted text-[11px]">
        <Link to="/" className="hover:text-coffee-espresso transition">
          Home
        </Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-coffee-espresso transition">
          Projects
        </Link>
        <span>/</span>
        <span className="text-coffee-espresso font-bold">{project.title}</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-beige-dark/50 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-beige text-coffee-espresso">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-accent-sage/20 text-accent-sage">
            STATUS: {project.status}
          </span>
          <span className="text-coffee-muted text-[11px]">
            ROLE: {project.myRole}
          </span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          {project.title}
        </h1>
        <p className="text-coffee-muted font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
          {project.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold shadow-warm-sm transition flex items-center gap-2"
            >
              <span>Visit Live Platform</span>
              <span>↗</span>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl border border-beige-dark/60 bg-cream-50 text-coffee-espresso hover:bg-beige/40 font-bold shadow-warm-sm transition flex items-center gap-2"
          >
            <span>Source Code (GitHub)</span>
            <span>↗</span>
          </a>
        </div>
      </header>

      {/* Main Showcase Image Gallery */}
      <section className="space-y-4">
        <div className="rounded-2xl overflow-hidden border border-beige-dark/70 shadow-warm-md bg-coffee-roast">
          <div className="aspect-video w-full bg-coffee-black relative">
            <img
              src={activeGalleryImg}
              alt={project.title}
              className="w-full h-full object-cover object-top transition duration-300"
            />
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {project.galleryImages && project.galleryImages.length > 1 && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-coffee-muted text-[11px]">Captures:</span>
            {project.galleryImages.map((g) => (
              <button
                key={g.url}
                onClick={() => setActiveGalleryImg(g.url)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-[11px] ${
                  activeGalleryImg === g.url
                    ? 'bg-coffee text-cream-50 font-bold shadow-warm-sm'
                    : 'bg-cream-100 border border-beige-dark/40 text-coffee-muted hover:text-coffee-espresso'
                }`}
              >
                {g.caption.split('—')[0]}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Metrics & Benchmarks Grid */}
      {(project.metrics ?? []).length > 0 && (
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(project.metrics ?? []).map((m) => (
          <div key={m.label} className="p-4 rounded-xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm">
            <span className="text-[10px] text-coffee-muted block uppercase tracking-wider">
              {m.label}
            </span>
            <strong className="text-xl sm:text-2xl font-editorial font-bold text-coffee-espresso block mt-1">
              {m.value}
            </strong>
          </div>
        ))}
      </section>
      )}

      {/* Problem & Solution Dual Columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
        <div className="paper-card p-6 sm:p-8 space-y-3">
          <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            The Problem & Need
          </span>
          <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
            Challenges in Existing Systems
          </h3>
          <p className="text-sm text-coffee-dark leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="paper-card p-6 sm:p-8 space-y-3">
          <span className="font-mono text-[10px] text-accent-sage uppercase tracking-wider font-bold block">
            Solution & Design
          </span>
          <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
            Engineered Resolution
          </h3>
          <p className="text-sm text-coffee-dark leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* Architecture Flow Diagram */}
      {project.architectureFlow?.steps && (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block font-mono">
            System Architecture Flow
          </span>
          <span className="text-coffee-muted text-[11px] font-mono">END-TO-END FLOW</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.architectureFlow.steps.map((step, idx) => (
            <div
              key={step.step}
              className="p-5 rounded-xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-coffee text-cream-50 text-[10px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-[9px] text-coffee-muted font-mono">STEP {idx + 1}</span>
              </div>
              <h4 className="font-editorial text-base font-bold text-coffee-espresso font-sans">
                {step.step}
              </h4>
              <p className="text-xs text-coffee-dark font-sans leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Key Features & Hardening */}
      {(project.keyFeatures ?? []).length > 0 && (
      <section className="paper-card p-6 sm:p-8 space-y-4 font-sans">
        <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
          Key Technical Highlights
        </span>
        <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
          Production Capabilities
        </h3>
        <ul className="space-y-2.5 text-sm text-coffee-dark">
          {(project.keyFeatures ?? []).map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-accent-terracotta font-bold">✦</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </section>
      )}

      {/* Challenges & Key Learnings */}
      {((project.challenges ?? []).length > 0 || (project.learnings ?? []).length > 0) && (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
        {(project.challenges ?? []).length > 0 && (
        <div className="p-6 rounded-xl bg-cream-50 border border-beige-dark/50 space-y-3">
          <span className="font-mono text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            Challenges Overcome
          </span>
          <ul className="space-y-2 text-xs text-coffee-dark">
            {(project.challenges ?? []).map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-coffee font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        )}

        {(project.learnings ?? []).length > 0 && (
        <div className="p-6 rounded-xl bg-cream-50 border border-beige-dark/50 space-y-3">
          <span className="font-mono text-[10px] text-accent-sage uppercase tracking-wider font-bold block">
            Engineering Retrospective & Takeaways
          </span>
          <ul className="space-y-2 text-xs text-coffee-dark">
            {(project.learnings ?? []).map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-coffee font-bold">•</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
        )}
      </section>
      )}

      {/* Complete Tech Stack */}
      {(project.techStack ?? []).length > 0 && (
      <section className="space-y-3 pt-6 border-t border-beige-dark/50">
        <span className="text-[10px] text-coffee-muted uppercase tracking-wider font-bold block font-mono">
          Technologies & Tools Leveraged
        </span>
        <div className="flex flex-wrap gap-2">
          {(project.techStack ?? []).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-cream-50 border border-beige-dark/50 text-coffee-espresso text-xs font-semibold shadow-warm-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
      )}

      {/* Back to Archive CTA */}
      <div className="pt-8 border-t border-beige-dark/50 flex justify-between items-center">
        <Link
          to="/projects"
          className="text-accent-terracotta hover:underline font-bold flex items-center gap-1.5"
        >
          <span>← Back to Projects Archive</span>
        </Link>
        <Link
          to="/contact"
          className="px-5 py-2.5 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition shadow-warm-sm"
        >
          Discuss This Project →
        </Link>
      </div>
    </article>
  );
};
