import { useMemo } from 'react';

export function useTheme() {
  // This can be expanded to pull from context or props if needed
  return useMemo(() => ({
    fontFamily: 'Inter, system-ui, sans-serif',
  }), []);
} 