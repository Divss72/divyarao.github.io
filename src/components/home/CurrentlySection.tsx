import React from 'react';
import { usePortfolioStore } from '../../data/usePortfolioStore';

export const CurrentlySection: React.FC = () => {
  const store = usePortfolioStore();
  const currently = store.getCurrently();

  const items = [
    {
      label: 'BUILDING',
      value: currently.building,
      detail: 'Iterating on full-stack features & schemas',
      icon: '💻',
    },
    {
      label: 'EXPLORING',
      value: currently.exploring,
      detail: 'Context degradation & attention behavior',
      icon: '🔬',
    },
    {
      label: 'READING',
      value: currently.reading,
      detail: `By ${currently.readingAuthor}`,
      icon: '📖',
    },
    {
      label: 'LEARNING',
      value: currently.obsessedWith,
      detail: 'Investigating core mechanics',
      icon: '💡',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-coffee-muted font-bold">
          Currently
        </span>
        <span className="font-mono text-[11px] text-coffee-muted">
          Live from my desk
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-5 rounded-2xl bg-cream-50 border border-beige-dark/50 shadow-warm-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold">
                  {item.label}
                </span>
                <span className="text-sm">{item.icon}</span>
              </div>
              <strong className="font-editorial text-base text-coffee-espresso font-sans block leading-snug">
                {item.value}
              </strong>
            </div>
            <p className="text-[11px] text-coffee-muted font-sans leading-tight pt-1 border-t border-beige/40">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
