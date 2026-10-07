import React from 'react';

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  systemTag?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  subtitle,
  systemTag,
  className = '',
}) => {
  return (
    <div className={`mb-12 border-b border-border-subtle pb-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 border border-accent/30 bg-accent/10 rounded">
            [{index}]
          </span>
          {systemTag && (
            <span className="font-mono text-[11px] text-text-muted tracking-widest uppercase">
              {systemTag}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
          <span>PARITY: OK</span>
          <span className="text-border-strong">•</span>
          <span className="text-accent animate-pulse">● LIVE</span>
        </div>
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary text-sm md:text-base max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
