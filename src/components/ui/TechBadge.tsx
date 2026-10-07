import React from 'react';

interface TechBadgeProps {
  label: string;
  variant?: 'default' | 'accent' | 'telemetry' | 'outline';
  size?: 'sm' | 'md';
  active?: boolean;
  onClick?: () => void;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  active = false,
  onClick,
}) => {
  const baseClasses =
    'inline-flex items-center font-mono rounded transition-all duration-200 border';

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-[11px] tracking-wide'
      : 'px-3.5 py-1.5 text-xs tracking-wider';

  const variantClasses = {
    default: active
      ? 'bg-accent/15 border-accent text-accent font-semibold'
      : 'bg-background-elevated/70 border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary',
    accent:
      'bg-accent/10 border-accent/30 text-accent font-semibold hover:bg-accent/20',
    telemetry:
      'bg-telemetry-green/10 border-telemetry-green/30 text-telemetry-green font-mono',
    outline:
      'bg-transparent border-border-subtle text-text-muted hover:border-text-secondary hover:text-text-primary',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {label}
    </button>
  );
};
