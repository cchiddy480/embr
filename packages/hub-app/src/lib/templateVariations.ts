import { TemplateVariation } from '../types/client';

/**
 * Variation Style Definitions
 * Each variation has distinct visual characteristics that apply across all templates
 */

export interface VariationStyles {
  // Typography
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  bodyWeight: number;
  letterSpacing: string;

  // Layout & Spacing
  borderRadius: string;          // Card/button roundness
  cardSpacing: string;           // Padding inside cards
  sectionSpacing: string;        // Vertical spacing between sections
  containerMaxWidth: string;     // Max content width

  // Visual Effects
  shadowIntensity: string;       // Box shadow depth
  hoverTransform: string;        // Hover elevation
  animationDuration: string;     // Transition speeds
  borderStyle: string;           // Border thickness/style

  // Design Language
  accentUsage: 'bold' | 'subtle' | 'minimal'; // How prominently accents are used
  layoutDensity: 'compact' | 'balanced' | 'spacious'; // Content density
}

/**
 * Modern Variation
 * Contemporary, clean, minimalist aesthetics
 * - Sans-serif fonts (Inter)
 * - Medium border radius (1rem)
 * - Subtle shadows
 * - Balanced spacing
 */
const modernStyles: VariationStyles = {
  headingFont: "'Inter', sans-serif",
  bodyFont: "'Inter', sans-serif",
  headingWeight: 600,
  bodyWeight: 400,
  letterSpacing: '-0.01em',

  borderRadius: '1rem',
  cardSpacing: '2rem',
  sectionSpacing: '5rem',
  containerMaxWidth: '1200px',

  shadowIntensity: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  hoverTransform: 'translateY(-4px)',
  animationDuration: '300ms',
  borderStyle: '1px solid',

  accentUsage: 'subtle',
  layoutDensity: 'balanced',
};

/**
 * Classic Variation
 * Traditional, timeless, elegant styling
 * - Serif fonts (Playfair Display, Cormorant)
 * - Minimal border radius
 * - Deep shadows
 * - Generous spacing
 */
const classicStyles: VariationStyles = {
  headingFont: "'Playfair Display', serif",
  bodyFont: "'Merriweather', serif",
  headingWeight: 700,
  bodyWeight: 400,
  letterSpacing: '0em',

  borderRadius: '0.25rem',
  cardSpacing: '2.5rem',
  sectionSpacing: '6rem',
  containerMaxWidth: '1100px',

  shadowIntensity: '0 10px 30px rgb(0 0 0 / 0.15)',
  hoverTransform: 'translateY(-2px)',
  animationDuration: '400ms',
  borderStyle: '2px solid',

  accentUsage: 'subtle',
  layoutDensity: 'spacious',
};

/**
 * Minimal Variation
 * Ultra-clean, maximum whitespace, stripped-back
 * - Light sans-serif fonts
 * - No border radius
 * - Flat design (no shadows)
 * - Maximum spacing
 */
const minimalStyles: VariationStyles = {
  headingFont: "'Inter', sans-serif",
  bodyFont: "'Inter', sans-serif",
  headingWeight: 300,
  bodyWeight: 300,
  letterSpacing: '0.02em',

  borderRadius: '0',
  cardSpacing: '3rem',
  sectionSpacing: '8rem',
  containerMaxWidth: '900px',

  shadowIntensity: 'none',
  hoverTransform: 'translateY(-1px)',
  animationDuration: '200ms',
  borderStyle: '1px solid',

  accentUsage: 'minimal',
  layoutDensity: 'spacious',
};

/**
 * Vibrant Variation
 * Bold, energetic, high-contrast design
 * - Bold sans-serif fonts
 * - Large border radius
 * - Strong shadows
 * - Tight spacing
 */
const vibrantStyles: VariationStyles = {
  headingFont: "'Inter', sans-serif",
  bodyFont: "'Inter', sans-serif",
  headingWeight: 800,
  bodyWeight: 500,
  letterSpacing: '-0.02em',

  borderRadius: '1.5rem',
  cardSpacing: '1.75rem',
  sectionSpacing: '4rem',
  containerMaxWidth: '1280px',

  shadowIntensity: '0 20px 50px rgb(0 0 0 / 0.2)',
  hoverTransform: 'translateY(-8px) scale(1.02)',
  animationDuration: '250ms',
  borderStyle: '3px solid',

  accentUsage: 'bold',
  layoutDensity: 'compact',
};

/**
 * Get variation styles for a specific variation type
 */
export function getVariationStyles(variation?: TemplateVariation): VariationStyles {
  switch (variation) {
    case 'classic':
      return classicStyles;
    case 'minimal':
      return minimalStyles;
    case 'vibrant':
      return vibrantStyles;
    case 'modern':
    default:
      return modernStyles;
  }
}

/**
 * Template-specific variation customizations
 * Allows templates to override specific variation properties
 */
export interface TemplateVariationOverrides {
  [key: string]: Partial<VariationStyles>;
}

/**
 * Get variation styles with template-specific overrides
 */
export function getTemplateVariationStyles(
  variation: TemplateVariation = 'modern',
  overrides?: Partial<VariationStyles>
): VariationStyles {
  const baseStyles = getVariationStyles(variation);
  return {
    ...baseStyles,
    ...overrides,
  };
}
