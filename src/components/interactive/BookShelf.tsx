import React, { useState } from 'react';
import { usePortfolioStore } from '../../data/usePortfolioStore';
import { BookItem } from '../../types';

export const BookShelf: React.FC = () => {
  const store = usePortfolioStore();
  const books = store.getBooks();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [filter, setFilter] = useState<'All' | 'Reading' | 'Read' | 'Want to Read'>('All');

  const filteredBooks = filter === 'All' ? books : books.filter((b) => b.status === filter);

  // Warm book spine colors
  const spinePalette = [
    'bg-[#5C3D2E] text-[#F4EBDD] border-[#3D281E]',
    'bg-[#8A684D] text-[#FDFBF7] border-[#6B4A32]',
    'bg-[#2A1D16] text-[#DCC7A6] border-[#1B1410]',
    'bg-[#A37E5F] text-[#1B1410] border-[#8A684D]',
    'bg-[#4A3B32] text-[#F4EBDD] border-[#2A1D16]',
    'bg-[#6E503C] text-[#FDFBF7] border-[#4E3727]',
  ];

  return (
    <div className="space-y-6">
      {/* Filters and shelf controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-1.5 bg-cream-50 p-1 rounded-xl border border-beige-dark/50 shadow-warm-sm">
          {(['All', 'Reading', 'Read', 'Want to Read'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                filter === status
                  ? 'bg-coffee text-cream-50 font-bold shadow-warm-sm'
                  : 'text-coffee-muted hover:text-coffee-espresso'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="text-coffee-muted text-[11px]">
          Click any book to open reader dossier 📖
        </div>
      </div>

      {/* Physical Wooden/Paper Bookshelf */}
      <div className="relative pt-8 pb-4 px-6 bg-cream-50 rounded-2xl border border-beige-dark/60 shadow-warm-md overflow-hidden">
        {/* Books Row */}
        <div className="flex items-end justify-center sm:justify-start gap-3 sm:gap-4 overflow-x-auto pb-4 pt-10 min-h-[220px]">
          {filteredBooks.map((book, idx) => {
            const spineStyle = spinePalette[idx % spinePalette.length];
            const isSelected = selectedBook?.id === book.id;

            return (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className={`relative group cursor-pointer transition-all duration-300 flex-shrink-0 select-none ${
                  isSelected ? '-translate-y-6 scale-105' : 'hover:-translate-y-4 hover:scale-102'
                }`}
              >
                {/* Book Spine */}
                <div
                  className={`w-12 sm:w-14 h-48 sm:h-52 rounded-t-sm rounded-b-xs border shadow-warm-md flex flex-col justify-between p-2 relative overflow-hidden transition-colors ${spineStyle}`}
                >
                  {/* Subtle spine foil stamp */}
                  <div className="text-[9px] font-mono tracking-tighter opacity-70 border-b border-current/20 pb-1 text-center truncate">
                    ★ {book.rating}
                  </div>

                  {/* Vertical Spine Title */}
                  <div
                    className="font-serif text-[11px] sm:text-xs font-bold tracking-tight text-center truncate transform -rotate-90 origin-center whitespace-nowrap my-auto max-w-[150px]"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {book.title}
                  </div>

                  {/* Status Ribbon Tag */}
                  <div className="text-[8px] font-mono text-center opacity-80 uppercase tracking-widest border-t border-current/20 pt-1">
                    {book.status === 'Reading' ? 'NOW' : 'LOG'}
                  </div>
                </div>

                {/* Subtle shelf shadow */}
                <div className="w-full h-1.5 bg-coffee-dark/20 rounded-full blur-[1px] mt-1" />
              </div>
            );
          })}
        </div>

        {/* The Wooden Shelf Plank */}
        <div className="w-full h-4 bg-gradient-to-r from-coffee-dark via-coffee to-coffee-dark rounded shadow-warm-inner border-t border-beige/40" />
        <div className="w-full h-2 bg-coffee-roast/60 rounded-b" />
      </div>

      {/* Selected Book Dossier Modal / Detail Card */}
      {selectedBook && (
        <div className="p-6 sm:p-8 rounded-2xl bg-cream-50 border border-beige-dark/70 shadow-warm-lg animate-fadeIn text-coffee-espresso relative">
          <button
            onClick={() => setSelectedBook(null)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-beige-dark/50 flex items-center justify-center text-coffee-muted hover:text-coffee-dark hover:bg-beige/40 transition cursor-pointer"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-36 h-48 rounded-lg bg-coffee p-4 text-cream-50 shadow-warm-lg flex flex-col justify-between border-2 border-beige-dark/30 text-center">
                <span className="text-[10px] font-mono text-beige uppercase tracking-wider">
                  {selectedBook.genre}
                </span>
                <h4 className="font-editorial text-base font-bold leading-tight">
                  {selectedBook.title}
                </h4>
                <span className="text-xs text-cream-200 font-sans">
                  {selectedBook.author}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-accent-gold text-sm">
                {'★'.repeat(Math.floor(selectedBook.rating))}
                <span className="text-xs font-mono text-coffee-muted ml-1">
                  ({selectedBook.rating}/5)
                </span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-beige text-coffee-espresso">
                  {selectedBook.status}
                </span>
                <span className="text-xs font-mono text-coffee-muted">
                  GENRE: {selectedBook.genre}
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-coffee-espresso">
                {selectedBook.title}
              </h3>
              <p className="text-xs font-mono text-coffee-muted -mt-2">
                By {selectedBook.author}
              </p>

              <div className="p-4 rounded-xl bg-cream-100 border border-beige/60 space-y-1">
                <span className="text-[10px] font-mono text-accent-terracotta uppercase tracking-wider font-bold block">
                  // PERSONAL READER NOTE
                </span>
                <p className="text-sm font-sans text-coffee-dark leading-relaxed">
                  {selectedBook.note}
                </p>
              </div>

              {selectedBook.favoriteQuote && (
                <blockquote className="border-l-2 border-accent-terracotta pl-4 italic text-xs text-coffee-muted font-editorial leading-relaxed">
                  "{selectedBook.favoriteQuote}"
                </blockquote>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
