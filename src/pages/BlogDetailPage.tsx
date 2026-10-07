import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { usePortfolioStore } from '../data/usePortfolioStore';
import { CommentSection } from '../components/blog/CommentSection';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const store = usePortfolioStore();
  const blog = store.getBlogBySlug(slug || '');

  const [copiedLink, setCopiedLink] = useState(false);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="space-y-12 py-10 px-4 sm:px-6 max-w-4xl mx-auto font-mono text-xs">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-coffee-muted text-[11px]">
        <Link to="/" className="hover:text-coffee-espresso transition">
          Home
        </Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-coffee-espresso transition">
          Blog
        </Link>
        <span>/</span>
        <span className="text-coffee-espresso font-bold truncate max-w-xs sm:max-w-md">
          {blog.title}
        </span>
      </nav>

      {/* Header Hero */}
      <header className="space-y-4 border-b border-beige-dark/50 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="paper-tag font-bold">
            {blog.category}
          </span>
          <span className="text-coffee-muted">
            {blog.publishDate} • {blog.readTime}
          </span>
          {blog.isDraft && (
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
              DRAFT
            </span>
          )}
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-coffee-espresso font-sans leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg font-sans text-coffee-dark/90 leading-relaxed italic border-l-2 border-beige-dark pl-4">
          {blog.excerpt}
        </p>

        {/* Author Bio Bar & Share */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-beige/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-coffee text-cream-50 flex items-center justify-center font-bold text-sm">
              DR
            </div>
            <div>
              <strong className="text-coffee-espresso font-sans text-sm block">
                Divya Rao
              </strong>
              <span className="text-[11px] text-coffee-muted font-mono">
                Computer Science Student • Developer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              className="px-3 py-1.5 rounded-lg border border-beige-dark/60 bg-cream-50 hover:bg-beige/30 text-coffee-dark transition cursor-pointer"
            >
              {copiedLink ? 'Link Copied! ✓' : 'Share Article ↗'}
            </button>
            <Link
              to="/admin"
              className="px-3 py-1.5 rounded-lg border border-beige-dark/40 text-coffee-muted hover:text-coffee-espresso text-[11px]"
            >
              Edit in CMS
            </Link>
          </div>
        </div>
      </header>

      {/* Main Prose Content */}
      <section className="prose prose-warm font-sans text-sm sm:text-base text-coffee-dark leading-relaxed space-y-6 max-w-none">
        <div className="whitespace-pre-line leading-relaxed font-sans">
          {blog.content}
        </div>
      </section>

      {/* Tags Cluster */}
      <section className="pt-6 border-t border-beige-dark/50 flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-coffee-muted font-bold mr-2">
          TOPICS:
        </span>
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-cream-100 border border-beige-dark/50 text-coffee text-xs font-mono"
          >
            #{tag}
          </span>
        ))}
      </section>

      {/* Community Comments Section */}
      <CommentSection blogSlug={blog.slug} />

      {/* Back to Blog */}
      <div className="pt-8 border-t border-beige-dark/50 flex justify-between items-center">
        <Link
          to="/blog"
          className="text-accent-terracotta hover:underline font-bold flex items-center gap-1.5"
        >
          <span>← Back to Essays Index</span>
        </Link>
        <Link
          to="/contact"
          className="px-5 py-2.5 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition shadow-warm-sm"
        >
          Discuss Technical Ideas →
        </Link>
      </div>
    </article>
  );
};
