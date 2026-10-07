import { useState, useEffect } from 'react';
import { portfolioStore } from './store';

export function usePortfolioStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = portfolioStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  return portfolioStore;
}
