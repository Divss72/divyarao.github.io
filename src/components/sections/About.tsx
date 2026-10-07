import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 sm:px-8 border-b border-border-subtle relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="01"
          title="Engineering Profile"
          systemTag="IDENTIFIER • DR_CORE_SYS"
          subtitle="System profile, academic background, and engineering philosophy."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Architectural Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 md:w-96 group">
              {/* Technical Frame Crosshairs & Coordinates */}
              <div className="absolute -top-3 -left-3 font-mono text-[10px] text-accent tracking-tighter select-none z-20">
                ┌ [01]
              </div>
              <div className="absolute -top-3 -right-3 font-mono text-[10px] text-accent tracking-tighter select-none z-20">
                [SYS_ID: DR] ┐
              </div>
              <div className="absolute -bottom-3 -left-3 font-mono text-[10px] text-accent tracking-tighter select-none z-20">
                └ [LOC: CHD]
              </div>
              <div className="absolute -bottom-3 -right-3 font-mono text-[10px] text-accent tracking-tighter select-none z-20">
                [NODE_ACTIVE] ┘
              </div>

              {/* Laser line border */}
              <div className="relative p-2.5 border border-border-strong bg-background-surface/80 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-background-elevated">
                  <img
                    src="me1.jpeg"
                    alt="Divya Rao - Systems Engineer"
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  {/* Subtle technical gradient scan overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

                  {/* On-image HUD readout */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-background/90 backdrop-blur-md border border-border-subtle rounded-lg font-mono text-[10px] text-text-muted flex justify-between items-center">
                    <div>
                      <span className="block text-text-primary font-bold">DIVYA RAO</span>
                      <span>B.E. CSE • CHANDIGARH UNIV</span>
                    </div>
                    <span className="text-telemetry-green font-semibold">● ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-text-secondary text-base sm:text-lg leading-relaxed">
              <p>
                I am an Undergraduate <strong className="text-text-primary font-semibold">Computer Science & Engineering student</strong> at{' '}
                <span className="text-text-primary border-b border-accent/40">Chandigarh University (B.E. CSE 2024–Present)</span>. 
                My focus centers on constructing resilient digital systems that fuse high-performance backend infrastructure with intuitive, high-speed interfaces.
              </p>
              <p>
                My core disciplines span <strong className="text-text-primary">Full Stack Web Engineering</strong>,{' '}
                <strong className="text-text-primary">Microservices Resiliency & Fault Recovery</strong>,{' '}
                <strong className="text-text-primary">RAG / Agentic AI Systems</strong>, and Algorithmic Problem Solving.
              </p>
            </div>

            {/* Track Record & Distinctions Grid */}
            <div className="pt-4 border-t border-border-subtle">
              <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                VERIFIED TRACK RECORD & HONORS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-background-surface border border-border-subtle rounded-lg hover:border-accent/40 transition-colors">
                  <div className="font-mono text-accent text-xs font-bold mb-1">GSSoC '24</div>
                  <h4 className="font-display text-sm font-bold text-text-primary mb-1">
                    Open Source Contributor
                  </h4>
                  <p className="text-xs text-text-secondary">
                    GirlScript Summer of Code contributor across Open Source & AI Agents tracks.
                  </p>
                </div>

                <div className="p-4 bg-background-surface border border-border-subtle rounded-lg hover:border-accent/40 transition-colors">
                  <div className="font-mono text-telemetry-blue text-xs font-bold mb-1">ALTA FELLOW</div>
                  <h4 className="font-display text-sm font-bold text-text-primary mb-1">
                    AI Builders Fellow
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Selected fellow building state-of-the-art interactive agent workflows and LLM reasoning pipelines.
                  </p>
                </div>

                <div className="p-4 bg-background-surface border border-border-subtle rounded-lg hover:border-accent/40 transition-colors">
                  <div className="font-mono text-telemetry-purple text-xs font-bold mb-1">HACKATHON</div>
                  <h4 className="font-display text-sm font-bold text-text-primary mb-1">
                    National Finalist
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Recognized for architecting distributed fault-tolerant prototypes under competitive time constraints.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-subtle font-mono text-center">
              <div>
                <span className="block text-2xl font-bold font-display text-text-primary">15+</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Certifications</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-text-primary">40%</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Latency Reduced</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-accent">99.9%</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Uptime Target</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
