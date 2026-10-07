import React from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

export const Certifications: React.FC = () => {
  const verifiedCerts = [
    {
      code: 'CERT_01',
      title: 'Full Stack & Software Engineering',
      issuer: 'Verified Industry Credentials',
      tag: 'ARCHITECTURE',
    },
    {
      code: 'CERT_02',
      title: 'Algorithmic Problem Solving & Data Structures',
      issuer: 'Technical Assessments',
      tag: 'DSA / CORE',
    },
    {
      code: 'CERT_03',
      title: 'Distributed Systems & Database Management',
      issuer: 'Enterprise Platforms',
      tag: 'BACKEND',
    },
    {
      code: 'CERT_04',
      title: 'AI, Machine Learning & Modern Cloud Ops',
      issuer: 'Specialized Track Badges',
      tag: 'CLOUD_AI',
    },
  ];

  return (
    <section id="certs" className="py-24 px-6 sm:px-8 border-b border-border-subtle relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          title="Verified Credentials"
          systemTag="CREDENTIALS • 15_VERIFIED"
          subtitle="Accredited technical certifications spanning cloud architecture, algorithmic engineering, and software systems."
        />

        <div className="neuro-card p-8 sm:p-12 rounded-2xl relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span>LINKEDIN VERIFIED CREDENTIAL REPOSITORY</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-black text-text-primary uppercase tracking-tight">
                15+ Professional Certifications & Diplomas
              </h3>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                Comprehensive technical certifications validating proficiency across programming languages, 
                high-availability system design, cloud containerization, and advanced algorithmic paradigms.
              </p>

              {/* Sample credentials tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {verifiedCerts.map((cert) => (
                  <div
                    key={cert.code}
                    className="p-3 bg-background-elevated/80 border border-border-subtle rounded-lg flex items-center justify-between font-mono"
                  >
                    <div>
                      <span className="text-[10px] text-accent block">{cert.code}</span>
                      <span className="text-xs text-text-primary font-sans font-semibold">{cert.title}</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-background-surface border border-border-subtle text-text-muted">
                      {cert.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-8">
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-text-primary mb-2">
                15<span className="text-accent">+</span>
              </div>
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6 text-center">
                Verified Credentials On Record
              </div>

              <a
                href={`${SOCIAL_LINKS.linkedin}details/certifications/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-coral shadow-[0_0_20px_rgba(255,59,48,0.3)] transition-all flex items-center justify-center gap-2 group-hover:scale-105"
              >
                <span>View All On LinkedIn</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
