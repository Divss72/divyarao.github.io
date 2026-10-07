import React from 'react';

interface CrosshairMarkerProps {
  className?: string;
  label?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const CrosshairMarker: React.FC<CrosshairMarkerProps> = ({
  className = '',
  label,
  position = 'top-left',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] text-accent/80 select-none ${className}`}
    >
      <span className="font-bold text-accent">+</span>
      {label && <span className="text-text-muted tracking-wider uppercase">{label}</span>}
    </div>
  );
};
