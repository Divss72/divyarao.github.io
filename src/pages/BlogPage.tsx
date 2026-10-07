import React, { useState } from 'react';
import { usePortfolioStore } from '../data/usePortfolioStore';
import { BlogCard } from '../components/blog/BlogCard';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  const store = usePortfolioStore();
  const blogs = store.getBlogs(); // Published only for public readers

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'AI & LLMs',
    'Distributed Systems',
    'Web Engineering',
    'Algorithms',
    'Life & Books',
  ];

  // Real-time search & category filter
  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory =
      activeCategory === 'ALL' || b.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-6xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-4 border-b border-beige-dark/50 pb-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            Engineering & AI Chronicles
          </span>
          <Link
            to="/admin"
            className="text-[11px] text-coffee-muted hover:text-coffee-espresso flex items-center gap-1"
          >
            <span>🔒 Author Portal (Write / Edit)</span>
          </Link>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          Essays, Systems & Reflections
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          Deep-dives into Agentic AI loop design, compound MongoDB indexing performance, microservice autonomous resilience, and algorithm notes.
        </p>

        {/* Search Bar & Category Filters */}
        <div className="pt-4 space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or architecture..."
              className="w-full bg-cream-50 border border-beige-dark/60 rounded-xl px-4 py-3 text-xs font-mono text-coffee-espresso placeholder:text-coffee-muted/70 focus:outline-none focus:border-coffee shadow-warm-sm transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-coffee-muted hover:text-coffee-espresso text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg border transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-coffee text-cream-50 border-coffee font-bold shadow-warm-sm'
                    : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="space-y-6">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-coffee-muted border border-dashed border-beige-dark/60 rounded-2xl bg-cream-50">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="font-sans text-base text-coffee-espresso font-bold">
              No matching essays found.
            </p>
            <p className="text-xs text-coffee-muted mt-1">
              Try adjusting your search query or switching categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* RSS & Author CTA */}
      <div className="p-6 rounded-2xl bg-cream-50 border border-beige-dark/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <span className="font-bold text-coffee-espresso block">
            Subscribe via RSS Feed
          </span>
          <span className="text-[11px] text-coffee-muted font-sans">
            Follow technical publications via your favorite RSS reader.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition shadow-warm-sm"
          >
            feed.xml 📡
          </a>
          <Link
            to="/admin"
            className="px-4 py-2 rounded-lg border border-beige-dark/60 text-coffee-dark hover:bg-beige/30 transition"
          >
            Write Post ✍️
          </Link>
        </div>
      </div>
    </div>
  );
};
