import React from 'react';
import { SOCIAL_LINKS } from '../../data/store';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-coffee-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-cream-50 border border-beige-dark/50 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-warm-lg overflow-hidden text-coffee-roast">
        {/* Header */}
        <div className="p-6 border-b border-beige/60 flex items-center justify-between bg-cream-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coffee text-cream-50 flex items-center justify-center font-serif text-lg font-bold shadow-warm-sm">
              DR
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-coffee-espresso">
                Curriculum Vitae — Divya Rao
              </h3>
              <p className="text-xs text-coffee-muted font-mono">
                B.E. CSE • AI Engineer & Systems Developer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-beige-dark/40 flex items-center justify-center text-coffee-muted hover:text-coffee-espresso hover:bg-beige/40 transition cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-terracotta font-bold mb-2">
              Academic Background
            </h4>
            <div className="p-4 rounded-xl bg-cream-100 border border-beige/60">
              <strong className="block text-base font-editorial text-coffee-espresso">
                Bachelor of Engineering — Computer Science & Engineering
              </strong>
              <div className="text-xs text-coffee-muted mt-1 flex flex-wrap gap-x-4">
                <span>📍 Chandigarh University, India</span>
                <span>🎓 Active Candidate (2024–Present)</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-terracotta font-bold mb-2">
              Verified Distinctions & Fellowships
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-cream-100 rounded-lg border border-beige/50">
                <span className="font-bold text-coffee-espresso block">GSSoC Contributor (2024–Present)</span>
                <span className="text-coffee-muted">Open-source contributions across web platforms and developer tooling.</span>
              </div>
              <div className="p-3 bg-cream-100 rounded-lg border border-beige/50">
                <span className="font-bold text-coffee-espresso block">Alta AI Builders Fellow (Apr–May 2026)</span>
                <span className="text-coffee-muted">Explored agentic workflows, LLM reasoning pipelines, and long-context systems.</span>
              </div>
              <div className="p-3 bg-cream-100 rounded-lg border border-beige/50">
                <span className="font-bold text-coffee-espresso block">National Hackathon Finalist</span>
                <span className="text-coffee-muted">Recognized for building working prototypes under hackathon constraints.</span>
              </div>
              <div className="p-3 bg-cream-100 rounded-lg border border-beige/50">
                <span className="font-bold text-coffee-espresso block">Technical Certifications</span>
                <span className="text-coffee-muted">Foundational cloud concepts, development, and algorithmic problem solving.</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-terracotta font-bold mb-2">
              Core Technical Competencies
            </h4>
            <div className="space-y-2 text-xs">
              <p>
                <strong className="text-coffee-espresso">Languages & AI:</strong> Python, Java, JavaScript, TypeScript, C++, SQL, Agentic AI, RAG, LLM Prompting, Vector DBs
              </p>
              <p>
                <strong className="text-coffee-espresso">Backend & Systems:</strong> Node.js, Express, Spring Boot, MongoDB (Compound Indexing), PostgreSQL, RESTful APIs, JWT
              </p>
              <p>
                <strong className="text-coffee-espresso">DevOps & Cloud:</strong> Docker, Kubernetes, Prometheus, Linux, Railway, Cloudflare Pages, Git/GitHub
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-beige/60 bg-cream-100 flex items-center justify-between">
          <a
            href={SOCIAL_LINKS.cvRequest}
            className="px-5 py-2.5 rounded-lg bg-coffee text-cream-50 font-mono text-xs font-semibold hover:bg-coffee-roast shadow-warm-sm transition flex items-center gap-2"
          >
            <span>Request Official PDF Dispatch</span>
            <span>↗</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-beige-dark/50 text-coffee-muted text-xs hover:bg-beige/30 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
