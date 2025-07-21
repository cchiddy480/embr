import React from 'react';
import clsx from 'clsx';
import { useLiftKitTheme, useTheme } from '../theme';

export type CardProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  opticalCorrection?: boolean; // Override the theme setting per card
};

export function Card({ 
  header, 
  children, 
  footer, 
  className, 
  style,
  opticalCorrection 
}: CardProps) {
  const theme = useTheme();
  const liftKitTheme = useLiftKitTheme();

  // Golden ratio proportions (φ ≈ 1.618)
  const phi = 1.618;
  const baseFontSize = 16;
  const scaledSize = Math.round(baseFontSize * (liftKitTheme.scaling || 1.0));
  
  // Calculate golden ratio based padding and spacing
  const basePadding = Math.round(scaledSize * phi); // ~26px at base
  const innerSpacing = Math.round(scaledSize / phi); // ~10px at base
  const sectionSpacing = Math.round(scaledSize * phi / 2); // ~13px at base
  
  // Border radius based on golden ratio
  const getBorderRadius = () => {
    switch (liftKitTheme.borderRadius) {
      case 'golden-ratio':
        return Math.round(scaledSize / phi); // ~10px at base
      case 'minimal':
        return '6px';
      case 'rounded':
        return '16px';
      case 'sharp':
        return '0px';
      default:
        return Math.round(scaledSize / phi);
    }
  };

  // Material style effects
  const getMaterialStyles = () => {
    const baseStyles = 'transition-all duration-200 ease-out';
    switch (liftKitTheme.materialStyle) {
      case 'glass':
        return `${baseStyles} backdrop-blur-sm bg-opacity-90 shadow-xl border-opacity-20`;
      case 'soft':
        return `${baseStyles} shadow-soft border-opacity-30`;
      case 'vibrant':
        return `${baseStyles} shadow-2xl border-2 transform hover:scale-[1.01]`;
      case 'rubber':
        return `${baseStyles} transform hover:scale-[0.99] active:scale-[0.98]`;
      case 'flat':
      default:
        return `${baseStyles} shadow-md border-opacity-40`;
    }
  };

  // Optical correction for content spacing
  const useOpticalCorrection = opticalCorrection ?? liftKitTheme.opticalCorrection;
  const getContentPadding = () => {
    if (!useOpticalCorrection) return basePadding;
    // Reduce top padding slightly to compensate for line-height visual weight
    return {
      paddingTop: Math.round(basePadding * 0.85), // ~22px at base
      paddingBottom: basePadding,
      paddingLeft: basePadding,
      paddingRight: basePadding,
    };
  };

  const borderRadius = getBorderRadius();
  const contentPadding = getContentPadding();

  const cardStyles: React.CSSProperties = {
    fontFamily: liftKitTheme.fontFamily || theme.fontFamily,
    borderRadius: typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`,
    backgroundColor: theme.colors?.surface || '#1F2937',
    borderColor: theme.colors?.primary ? `${theme.colors.primary}20` : '#374151',
    ...(typeof contentPadding === 'number' 
      ? { padding: `${contentPadding}px` }
      : contentPadding
    ),
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: `${sectionSpacing}px`,
  };

  const footerStyles: React.CSSProperties = {
    marginTop: `${sectionSpacing}px`,
  };

  const contentStyles: React.CSSProperties = {
    // Add slight negative margin to content if optical correction is enabled
    // to better balance visual spacing
    ...(useOpticalCorrection && {
      marginTop: `-${Math.round(innerSpacing * 0.3)}px`,
    }),
  };

  return (
    <div
      className={clsx(
        'border flex flex-col',
        'focus-within:ring-2 focus-within:ring-opacity-20',
        getMaterialStyles(),
        className
      )}
      style={{
        ...cardStyles,
        '--tw-ring-color': liftKitTheme.primaryColor || theme.colors?.primary || '#0F766E',
      } as React.CSSProperties}
    >
      {header && (
        <div style={headerStyles}>
          {header}
        </div>
      )}
      
      <div 
        className="flex-1" 
        style={contentStyles}
      >
        {children}
      </div>
      
      {footer && (
        <div style={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
} 