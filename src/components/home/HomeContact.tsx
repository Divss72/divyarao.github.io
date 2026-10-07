import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../data/store';

export const HomeContact: React.FC = () => {
  return (
    <section className="p-8 sm:p-12 rounded-3xl bg-coffee-roast text-cream-100 shadow-warm-lg space-y-6 text-center max-w-4xl mx-auto">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-beige font-bold block">
          04 • Communication
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-cream-50">
          Have something interesting to build?
        </h2>
        <p className="font-editorial text-xl sm:text-2xl text-cream-200 italic">
          Let's talk.
        </p>
        <p className="text-cream-300 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed pt-1">
          I'm currently open for software engineering roles, fullstack projects, and MERN stack collaborations. Or simply reach out to chat about AI or book recommendations.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs pt-2">
        <Link
          to="/contact"
          className="px-6 py-3 rounded-xl bg-accent-terracotta text-white font-bold hover:bg-accent-rust shadow-warm-md transition"
        >
          Send a Message →
        </Link>
        <a
          href={`mailto:${SOCIAL_LINKS.email}`}
          className="px-6 py-3 rounded-xl border border-coffee-muted/60 bg-coffee-dark text-cream-200 hover:text-cream-50 transition"
        >
          {SOCIAL_LINKS.email}
        </a>
      </div>
    </section>
  );
};
