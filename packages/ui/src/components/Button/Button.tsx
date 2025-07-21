import React from 'react';
import clsx from 'clsx';
import { useLiftKitTheme, useTheme } from '../theme';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export function Button({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  type = 'button',
  className,
}: ButtonProps) {
  const theme = useTheme();
  const liftKitTheme = useLiftKitTheme();

  // Golden ratio proportions (φ ≈ 1.618)
  const phi = 1.618;
  const baseFontSize = 16;
  const scaledSize = Math.round(baseFontSize * (liftKitTheme.scaling || 1.0));
  
  // Calculate golden ratio based padding and sizing
  const verticalPadding = Math.round(scaledSize / phi); // ~10px at base
  const horizontalPadding = Math.round(scaledSize * phi); // ~26px at base
  const minHeight = Math.round(scaledSize * phi * 1.5); // ~39px at base
  
  // Border radius based on golden ratio
  const getBorderRadius = () => {
    switch (liftKitTheme.borderRadius) {
      case 'golden-ratio':
        return Math.round(scaledSize / phi / 2); // ~5px at base
      case 'minimal':
        return '2px';
      case 'rounded':
        return '8px';
      case 'sharp':
        return '0px';
      default:
        return Math.round(scaledSize / phi / 2);
    }
  };

  // Material style effects
  const getMaterialStyles = () => {
    const baseStyles = 'transition-all duration-200 ease-out';
    switch (liftKitTheme.materialStyle) {
      case 'glass':
        return `${baseStyles} backdrop-blur-sm bg-opacity-90 shadow-lg`;
      case 'soft':
        return `${baseStyles} shadow-soft`;
      case 'vibrant':
        return `${baseStyles} shadow-xl transform hover:scale-[1.02]`;
      case 'rubber':
        return `${baseStyles} transform hover:scale-95 active:scale-90`;
      case 'flat':
      default:
        return `${baseStyles} shadow-sm`;
    }
  };

  // Optical correction for visual balance
  const getOpticalCorrection = () => {
    if (!liftKitTheme.opticalCorrection) return '';
    // Slightly reduce horizontal padding to compensate for visual weight
    return 'px-[calc(var(--horizontal-padding)-2px)]';
  };

  const baseClasses = clsx(
    'inline-flex items-center justify-center',
    'font-bold font-sans',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    'text-center whitespace-nowrap',
    getMaterialStyles(),
    getOpticalCorrection()
  );

  const variantClasses = {
    primary: clsx(
      'text-white',
      'focus-visible:ring-opacity-50',
      'hover:shadow-md active:shadow-sm'
    ),
    secondary: clsx(
      'bg-transparent border-2',
      'hover:bg-opacity-10 focus:bg-opacity-20',
      'focus-visible:ring-opacity-30'
    ),
    ghost: clsx(
      'bg-transparent',
      'hover:bg-opacity-10 focus:bg-opacity-20',
      'focus-visible:ring-opacity-30'
    ),
  };

  const primaryColor = liftKitTheme.primaryColor || theme.colors?.primary || '#0F766E';
  const borderRadius = getBorderRadius();

  const dynamicStyles: React.CSSProperties = {
    fontFamily: liftKitTheme.fontFamily || theme.fontFamily,
    fontSize: `${scaledSize}px`,
    paddingTop: `${verticalPadding}px`,
    paddingBottom: `${verticalPadding}px`,
    paddingLeft: `${horizontalPadding}px`,
    paddingRight: `${horizontalPadding}px`,
    minHeight: `${minHeight}px`,
    borderRadius: typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`,
    '--horizontal-padding': `${horizontalPadding}px`,
    // Variant-specific colors
    ...(variant === 'primary' && {
      backgroundColor: primaryColor,
      '--tw-ring-color': primaryColor,
    }),
    ...(variant === 'secondary' && {
      borderColor: primaryColor,
      color: primaryColor,
      '--tw-ring-color': primaryColor,
    }),
    ...(variant === 'ghost' && {
      color: primaryColor,
      '--tw-ring-color': primaryColor,
    }),
  } as React.CSSProperties;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variantClasses[variant], className)}
      style={dynamicStyles}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
} 