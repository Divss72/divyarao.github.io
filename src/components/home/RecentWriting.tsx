import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../../data/usePortfolioStore';

export const RecentWriting: React.FC = () => {
  const store = usePortfolioStore();
  const blogs = store.getBlogs().slice(0, 2);

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-beige-dark/40 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold block mb-1">
            03 • Notes & Reflections
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-coffee-espresso">
            Recent Writing
          </h2>
          <p className="text-coffee-muted font-sans text-sm sm:text-base mt-1">
            Practical notes and observations from building projects, reading papers, and debugging systems.
          </p>
        </div>
        <Link
          to="/blog"
          className="font-mono text-xs text-accent-terracotta hover:underline font-bold whitespace-nowrap"
        >
          All Essays ({store.getBlogs().length}) →
        </Link>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((post) => (
          <article
            key={post.id}
            className="p-7 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm flex flex-col justify-between space-y-4 hover:border-coffee transition"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-[11px] text-coffee-muted">
                <span className="px-2 py-0.5 rounded bg-beige text-coffee-espresso font-bold">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.publishDate}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-coffee-espresso leading-snug">
                <Link to={`/blog/${post.slug}`} className="hover:text-accent-terracotta transition">
                  {post.title}
                </Link>
              </h3>

              <p className="text-sm font-sans text-coffee-dark leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-beige/50">
              <Link
                to={`/blog/${post.slug}`}
                className="font-mono text-xs font-bold text-accent-terracotta hover:underline flex items-center gap-1.5"
              >
                <span>Read Essay</span>
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
