import React, { useState } from 'react';
import { usePortfolioStore } from '../data/usePortfolioStore';
import { BookItem } from '../types';
import { BookOpen, Star, Bookmark, Quote, Search, Filter } from 'lucide-react';

export const BooksPage: React.FC = () => {
  const store = usePortfolioStore();
  const books = store.getBooks();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Reading' | 'Completed' | 'Want to Read'>('ALL');

  // Filter books based on search & status
  const filteredBooks = books.filter((b) => {
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'Completed' && (b.status === 'Completed' || b.status === 'Read')) ||
      b.status === statusFilter;

    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.note && b.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.genre && b.genre.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const readingBooks = books.filter((b) => b.status === 'Reading');
  const completedBooks = books.filter((b) => b.status === 'Completed' || b.status === 'Read');
  const wishlistBooks = books.filter((b) => b.status === 'Want to Read');

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-6xl mx-auto font-sans text-coffee-espresso">
      {/* Header */}
      <div className="space-y-4 border-b border-beige-dark/50 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-terracotta font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>READING ARCHIVE & FOUNDATIONS</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso">
          Books on My Desk
        </h1>

        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          Physical books on distributed systems, cognitive psychology, machine learning fundamentals, and software craftsmanship that shape how I think and build.
        </p>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg font-mono text-xs">
          <div className="p-3 bg-cream-50 rounded-xl border border-beige-dark/50 text-center">
            <div className="text-[10px] text-coffee-muted uppercase">Currently Reading</div>
            <div className="text-xl font-bold font-editorial text-accent-terracotta mt-0.5">
              {readingBooks.length}
            </div>
          </div>
          <div className="p-3 bg-cream-50 rounded-xl border border-beige-dark/50 text-center">
            <div className="text-[10px] text-coffee-muted uppercase">Finished</div>
            <div className="text-xl font-bold font-editorial text-coffee-espresso mt-0.5">
              {completedBooks.length}
            </div>
          </div>
          <div className="p-3 bg-cream-50 rounded-xl border border-beige-dark/50 text-center">
            <div className="text-[10px] text-coffee-muted uppercase">On Study List</div>
            <div className="text-xl font-bold font-editorial text-coffee-espresso mt-0.5">
              {wishlistBooks.length}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="relative flex-grow max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or takeaway..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-cream-50 border border-beige-dark/60 text-xs focus:border-coffee focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['ALL', 'Reading', 'Completed', 'Want to Read'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg border text-xs transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-coffee text-cream-50 border-coffee font-bold shadow-warm-xs'
                    : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/40'
                }`}
              >
                {st === 'ALL' ? 'All Books' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBooks.map((book) => {
          const isReading = book.status === 'Reading';
          const isWishlist = book.status === 'Want to Read';

          return (
            <article
              key={book.id}
              className="p-7 rounded-2xl bg-cream-50 border border-beige-dark/60 shadow-warm-sm flex flex-col justify-between space-y-5 hover:border-coffee transition"
            >
              <div className="space-y-4">
                {/* Header Badge & Rating */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      isReading
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : isWishlist
                        ? 'bg-beige/60 text-coffee-muted border border-beige-dark/40'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    {book.status}
                  </span>

                  {book.rating && (
                    <div className="flex items-center gap-1 text-accent-terracotta text-xs">
                      {Array.from({ length: Math.floor(book.rating) }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-coffee-muted text-[11px] ml-1 font-bold">
                        {book.rating}/5
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Author */}
                <div className="space-y-1">
                  <h3 className="font-editorial text-2xl font-bold text-coffee-espresso leading-snug">
                    {book.title}
                  </h3>
                  <div className="text-xs font-mono text-coffee-muted">
                    by <span className="font-semibold text-coffee-dark">{book.author}</span>
                    {book.genre && <span> • {book.genre}</span>}
                  </div>
                </div>

                {/* Personal Note */}
                {book.note && (
                  <p className="text-xs font-sans text-coffee-dark leading-relaxed">
                    {book.note}
                  </p>
                )}

                {/* Core Takeaway Card */}
                {book.takeaway && (
                  <div className="p-3.5 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-accent-terracotta flex items-center gap-1">
                      <Bookmark className="w-3 h-3" />
                      <span>Key Takeaway</span>
                    </span>
                    <p className="text-xs font-sans text-coffee-espresso font-medium italic">
                      "{book.takeaway}"
                    </p>
                  </div>
                )}

                {/* Favorite Quote */}
                {book.favoriteQuote && (
                  <div className="text-[11px] font-sans text-coffee-muted italic border-l-2 border-accent-terracotta/60 pl-3">
                    "{book.favoriteQuote}"
                  </div>
                )}
              </div>

              {/* Footer Metadata */}
              <div className="pt-3 border-t border-beige/60 flex items-center justify-between font-mono text-[10px] text-coffee-muted">
                <span>Physical Edition • Personal Library</span>
                <span>Active Reading Log</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BooksPage;
