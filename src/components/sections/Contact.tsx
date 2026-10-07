import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 border-b border-border-subtle relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="05"
          title="Direct Transmission"
          systemTag="COMMUNICATION CHANNEL"
          subtitle="Initiate contact for high-impact software engineering roles, fullstack projects, or collaborative ventures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Terminal Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="neuro-card p-6 rounded-xl space-y-4">
              <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-telemetry-green" />
                COMMUNICATION DISPATCH TERMINAL
              </div>

              <h3 className="font-display text-2xl font-bold text-text-primary">
                Let's engineer something resilient.
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed font-sans">
                Currently open to full-time engineering roles, software internships, and high-impact distributed architecture projects.
              </p>

              {/* One-click email copy card */}
              <div className="p-4 rounded-lg bg-background-elevated border border-border-strong space-y-2">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider flex justify-between">
                  <span>DIRECT INBOX</span>
                  {copied ? (
                    <span className="text-telemetry-green font-bold">COPIED TO CLIPBOARD ✓</span>
                  ) : (
                    <span>CLICK TO COPY</span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm text-text-primary font-bold truncate">
                    {SOCIAL_LINKS.email}
                  </span>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1 bg-background-surface border border-border-subtle hover:border-accent text-accent font-mono text-xs rounded transition-all active:scale-95 whitespace-nowrap"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="pt-2 space-y-2">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                  VERIFIED IDENTIFIERS
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-background-elevated/70 border border-border-subtle hover:border-border-strong text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center justify-between"
                  >
                    <span>GitHub</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-background-elevated/70 border border-border-subtle hover:border-border-strong text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center justify-between"
                  >
                    <span>LinkedIn</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <div className="neuro-card p-6 sm:p-8 rounded-xl relative">
              <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-6 pb-3 border-b border-border-subtle">
                <span>FORM_ENDPOINT • FORMSPREE</span>
                <span className="text-accent font-semibold">DIRECT_INPUT</span>
              </div>

              <form action="https://formspree.io/f/xwvbbokd" method="POST" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                      IDENTIFIER / NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-background-elevated/90 border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                      RETURN DISPATCH / EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@organization.com"
                      className="w-full bg-background-elevated/90 border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                    TRANSMISSION CLASSIFICATION
                  </label>
                  <select
                    name="category"
                    className="w-full bg-background-elevated/90 border border-border-subtle rounded-lg px-4 py-3 text-text-secondary text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="hiring">Full-Time Software Role / Hiring Inquiry</option>
                    <option value="internship">Software Engineering Internship</option>
                    <option value="collaboration">Open Source & Systems Collaboration</option>
                    <option value="general">Technical Inquiry / General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                    PAYLOAD / MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Enter message details or architecture discussion points..."
                    className="w-full bg-background-elevated/90 border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-xs font-sans focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-coral shadow-[0_0_20px_rgba(255,59,48,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Dispatch Transmission</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
