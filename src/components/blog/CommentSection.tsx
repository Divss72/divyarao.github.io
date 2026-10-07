import React, { useState } from 'react';
import { portfolioStore } from '../../data/store';
import { usePortfolioStore } from '../../data/usePortfolioStore';

interface CommentSectionProps {
  blogSlug: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ blogSlug }) => {
  const store = usePortfolioStore();
  const comments = store.getComments(blogSlug);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots

    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      // Post to backend server API
      const res = await fetch('/api/public/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug,
          author: name.trim(),
          email: email.trim() || undefined,
          content: message.trim(),
        }),
      });

      if (!res.ok) {
        // Fallback to local store if server offline
        portfolioStore.addComment({
          blogSlug,
          authorName: name.trim(),
          authorEmail: email.trim() || undefined,
          content: message.trim(),
        });
      }
    } catch {
      portfolioStore.addComment({
        blogSlug,
        authorName: name.trim(),
        authorEmail: email.trim() || undefined,
        content: message.trim(),
      });
    }

    setName('');
    setEmail('');
    setMessage('');
    setSubmitting(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  return (
    <section className="pt-12 border-t border-beige-dark/50 space-y-8 font-mono text-xs">
      <div className="flex items-center justify-between">
        <h4 className="font-editorial text-2xl font-bold text-coffee-espresso font-sans">
          Community Discussions ({comments.length})
        </h4>
        <span className="text-[11px] text-coffee-muted">
          Peer Reflections & Inquiries
        </span>
      </div>

      {/* Comment Form */}
      <div className="p-6 bg-cream-50 rounded-2xl border border-beige-dark/60 shadow-warm-sm">
        <h5 className="font-editorial text-base font-bold text-coffee-espresso mb-4">
          Leave a Thought or Technical Query
        </h5>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for spam prevention */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
                Your Name / Handle *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
              />
            </div>
            <div>
              <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
                Email (Optional, not published)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@domain.com"
                className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
              Comment / Reflection *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share thoughts on this architecture or ask a question..."
              className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-sans focus:outline-none focus:border-coffee transition resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-coffee text-cream-50 hover:bg-coffee-roast font-mono text-xs font-bold transition shadow-warm-sm cursor-pointer disabled:opacity-50"
            >
              Post Comment ✦
            </button>
            {successMsg && (
              <span className="text-accent-sage font-bold text-[11px] animate-fadeIn">
                Comment published successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="p-6 text-center text-coffee-muted border border-dashed border-beige-dark/50 rounded-xl bg-cream-100/50">
            No comments on this article yet. Be the first to spark the conversation!
          </div>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              className="p-5 rounded-xl bg-cream-50 border border-beige-dark/40 shadow-warm-sm space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-coffee text-cream-50 flex items-center justify-center font-bold text-[10px]">
                    {comm.authorName.charAt(0).toUpperCase()}
                  </div>
                  <strong className="text-coffee-espresso font-mono">
                    {comm.authorName}
                  </strong>
                </div>
                <span className="text-coffee-muted text-[10px]">{comm.timestamp}</span>
              </div>
              <p className="text-xs font-sans text-coffee-dark leading-relaxed pl-8">
                {comm.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
