import { createContext, useContext, useMemo, ReactNode } from 'react';

// LiftKit theme configuration interface
export interface LiftKitTheme {
  primaryColor?: string;
  fontFamily?: string;
  borderRadius?: 'golden-ratio' | 'minimal' | 'rounded' | 'sharp';
  materialStyle?: 'glass' | 'flat' | 'rubber' | 'soft' | 'vibrant';
  scaling?: number;
  opticalCorrection?: boolean;
  accessibility?: 'standard' | 'high' | 'enhanced';
}

// Complete theme interface
export interface Theme {
  fontFamily: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    textSecondary?: string;
  };
  liftkit?: LiftKitTheme;
}

// Default theme
const defaultTheme: Theme = {
  fontFamily: 'Inter, system-ui, sans-serif',
  liftkit: {
    primaryColor: '#0F766E',
    fontFamily: 'Inter',
    borderRadius: 'golden-ratio',
    materialStyle: 'glass',
    scaling: 1.0,
    opticalCorrection: true,
    accessibility: 'standard'
  }
};

// Theme context
const ThemeContext = createContext<Theme>(defaultTheme);

// Theme provider component
export function ThemeProvider({ 
  children, 
  theme 
}: { 
  children: ReactNode; 
  theme?: Partial<Theme> 
}) {
  const mergedTheme = useMemo(() => ({
    ...defaultTheme,
    ...theme,
    liftkit: {
      ...defaultTheme.liftkit,
      ...theme?.liftkit
    }
  }), [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Enhanced useTheme hook
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  
  return useMemo(() => context, [context]);
}

// Utility hook to get LiftKit-specific theme
export function useLiftKitTheme(): LiftKitTheme {
  const theme = useTheme();
  return useMemo(() => theme.liftkit || defaultTheme.liftkit!, [theme]);
} 