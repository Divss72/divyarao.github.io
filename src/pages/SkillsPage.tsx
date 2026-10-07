import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../data/usePortfolioStore';

export const SkillsPage: React.FC = () => {
  const store = usePortfolioStore();
  const skillCategories = store.getSkills();
  const projects = store.getProjects();
  const blogs = store.getBlogs();

  // Selected skill details
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    projectSlugs?: string[];
    experienceTag?: string;
    categoryTitle: string;
  }>({
    name: 'Agentic AI',
    projectSlugs: ['devposting', 'autoheal-j'],
    experienceTag: 'Alta Fellow',
    categoryTitle: 'AI, ML & Agentic Systems',
  });

  // Find linked projects
  const linkedProjects = projects.filter((p) =>
    selectedSkill.projectSlugs?.includes(p.slug) ||
    p.techStack.some((t) => t.toLowerCase().includes(selectedSkill.name.toLowerCase()))
  );

  // Find linked blogs
  const linkedBlogs = blogs.filter((b) =>
    b.tags.some((t) => t.toLowerCase().includes(selectedSkill.name.toLowerCase())) ||
    b.content.toLowerCase().includes(selectedSkill.name.toLowerCase())
  );

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-6xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8">
        <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
          Technical Toolkit
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          Skills & Direct Implementations
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          No arbitrary 90% progress bars. Click any technology module below to inspect the projects and written essays where it is actively used.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat) => (
          <div
            key={cat.id}
            className="paper-card p-6 space-y-4 hover:border-beige-dark"
          >
            <div className="flex items-center justify-between border-b border-beige/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-editorial text-base font-bold text-coffee-espresso font-sans">
                  {cat.title}
                </h3>
              </div>
              <span className="text-[10px] text-coffee-muted">{cat.code}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() =>
                      setSelectedSkill({
                        name: skill.name,
                        projectSlugs: skill.projectSlugs,
                        experienceTag: skill.experienceTag,
                        categoryTitle: cat.title,
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-coffee text-cream-50 font-bold shadow-warm-sm scale-105'
                        : 'bg-cream-100 border border-beige-dark/50 text-coffee-dark hover:bg-beige/40'
                    }`}
                  >
                    <span>{skill.name}</span>
                    {skill.projectSlugs && skill.projectSlugs.length > 0 && (
                      <span className="text-[9px] opacity-70">✦</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Relationship Inspector Dossier */}
      <div className="p-8 rounded-2xl bg-cream-50 border border-beige-dark/70 shadow-warm-lg space-y-6 text-coffee-espresso">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige/60 pb-4">
          <div>
            <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
              Skill Relationships & Projects
            </span>
            <h3 className="font-editorial text-3xl font-bold font-sans">
              {selectedSkill.name}
            </h3>
            <span className="text-xs text-coffee-muted">
              Belongs to: {selectedSkill.categoryTitle}
            </span>
          </div>

          {selectedSkill.experienceTag && (
            <span className="px-3.5 py-1.5 rounded-full bg-beige text-coffee-espresso text-xs font-bold font-mono">
              Track: {selectedSkill.experienceTag}
            </span>
          )}
        </div>

        {/* Linked Projects */}
        <div className="space-y-3 font-sans">
          <h4 className="font-editorial text-xl font-bold text-coffee-espresso">
            Deployed in Real Projects ({linkedProjects.length})
          </h4>

          {linkedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {linkedProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.slug}`}
                  className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 hover:bg-beige/30 transition group flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span className="text-[10px] font-mono text-coffee-muted block">
                      {p.category}
                    </span>
                    <strong className="font-editorial text-lg text-coffee-espresso group-hover:text-accent-terracotta block transition">
                      {p.title}
                    </strong>
                    <p className="text-xs text-coffee-dark line-clamp-2 mt-1">
                      {p.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-accent-terracotta flex items-center justify-between pt-2 border-t border-beige/50">
                    <span>Inspect System</span>
                    <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-coffee-muted font-mono italic">
              Applied extensively across academic computer science problem solving and algorithms coursework at Chandigarh University.
            </p>
          )}
        </div>

        {/* Linked Blog Writings */}
        {linkedBlogs.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-beige/60 font-sans">
            <h4 className="font-editorial text-xl font-bold text-coffee-espresso">
              Related Written Essays ({linkedBlogs.length})
            </h4>
            <div className="space-y-2">
              {linkedBlogs.map((b) => (
                <Link
                  key={b.id}
                  to={`/blog/${b.slug}`}
                  className="p-3.5 rounded-xl bg-cream-100 border border-beige-dark/40 hover:bg-beige/30 transition flex items-center justify-between"
                >
                  <div>
                    <strong className="text-sm text-coffee-espresso block">
                      {b.title}
                    </strong>
                    <span className="text-xs font-mono text-coffee-muted">
                      {b.publishDate} • {b.readTime}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-accent-terracotta">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
