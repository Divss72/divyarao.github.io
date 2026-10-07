import React, { useState } from 'react';
import { SOCIAL_LINKS, INITIAL_TELEMETRY } from '../data/store';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 max-w-5xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="space-y-3 border-b border-beige-dark/50 pb-8">
        <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
          Get in Touch
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-coffee-espresso font-sans">
          Let's Talk
        </h1>
        <p className="text-coffee-muted font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          Open to software engineering roles, fullstack projects, MERN stack collaborations, and AI discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Inboxes */}
        <div className="lg:col-span-5 space-y-6">
          <div className="paper-card p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] text-accent-sage uppercase tracking-wider font-bold block">
                Direct Contact
              </span>
              <h3 className="font-editorial text-2xl font-bold text-coffee-espresso font-sans">
                Say Hello
              </h3>
            </div>

            {/* Email Quick-Copy Card */}
            <div className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-coffee-muted">
                <span>PRIMARY INBOX</span>
                {copied ? (
                  <span className="text-accent-sage font-bold">COPIED TO CLIPBOARD ✓</span>
                ) : (
                  <span>CLICK TO COPY</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-coffee-espresso truncate">
                  {SOCIAL_LINKS.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1 rounded bg-cream-50 border border-beige-dark/60 text-coffee-dark hover:bg-beige/40 transition cursor-pointer flex-shrink-0"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Location & Response Latency */}
            <div className="space-y-1.5 text-xs text-coffee-dark pt-2 border-t border-beige/60">
              <div>Location: {INITIAL_TELEMETRY.location}</div>
              <div>Status: Available for SWE roles & fullstack projects</div>
              <div>University: Chandigarh University (2024–Present)</div>
            </div>

            {/* Social channels */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-coffee-muted font-bold block">
                Connect Online
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-cream-100 border border-beige-dark/40 hover:bg-beige/30 transition flex items-center justify-between"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-cream-100 border border-beige-dark/40 hover:bg-beige/30 transition flex items-center justify-between"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="paper-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-beige/60 pb-3">
              <span className="font-bold text-coffee-espresso font-sans text-base">Send a Direct Message</span>
              <span className="text-accent-terracotta text-[10px]">Formspree Verified</span>
            </div>

            <form
              action="https://formspree.io/f/xwvbbokd"
              method="POST"
              className="space-y-4"
            >
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="alex@example.com"
                    className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
                  What are you reaching out about?
                </label>
                <select
                  name="topic"
                  className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
                >
                  <option value="hiring">Full-Time Software Engineering Role / Internship</option>
                  <option value="project">Full-Stack / MERN Project Collaboration</option>
                  <option value="ai">AI / Agentic Discussion</option>
                  <option value="general">Say Hello / Book Recommendations</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about what you're working on or want to talk about..."
                  className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-sans focus:outline-none focus:border-coffee transition resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold uppercase tracking-wider transition shadow-warm-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
