import React from 'react';
import clsx from 'clsx';
import { useLiftKitTheme, useTheme } from '../theme';

export type InputProps = {
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
};

export function Input({
  label,
  icon,
  helperText,
  error,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  className,
  name,
}: InputProps) {
  const theme = useTheme();
  const liftKitTheme = useLiftKitTheme();

  // Golden ratio proportions (φ ≈ 1.618)
  const phi = 1.618;
  const baseFontSize = 16;
  const scaledSize = Math.round(baseFontSize * (liftKitTheme.scaling || 1.0));
  
  // Calculate golden ratio based padding and sizing
  const verticalPadding = Math.round(scaledSize / phi); // ~10px at base
  const horizontalPadding = Math.round(scaledSize * phi); // ~26px at base
  const minHeight = Math.round(scaledSize * phi * 1.8); // ~47px at base
  
  // Border radius based on golden ratio
  const getBorderRadius = () => {
    switch (liftKitTheme.borderRadius) {
      case 'golden-ratio':
        return Math.round(scaledSize / phi / 1.5); // ~7px at base
      case 'minimal':
        return '4px';
      case 'rounded':
        return '12px';
      case 'sharp':
        return '0px';
      default:
        return Math.round(scaledSize / phi / 1.5);
    }
  };

  // Material style effects
  const getMaterialStyles = () => {
    const baseStyles = 'transition-all duration-200 ease-out';
    switch (liftKitTheme.materialStyle) {
      case 'glass':
        return `${baseStyles} backdrop-blur-sm bg-opacity-80 shadow-inner`;
      case 'soft':
        return `${baseStyles} shadow-inner`;
      case 'vibrant':
        return `${baseStyles} shadow-lg border-2`;
      case 'rubber':
        return `${baseStyles} transform focus-within:scale-[1.01]`;
      case 'flat':
      default:
        return `${baseStyles} shadow-sm`;
    }
  };

  // Optical correction for visual balance
  const getOpticalCorrection = () => {
    if (!liftKitTheme.opticalCorrection) return '';
    // Add slight inner spacing to create breathing room
    return 'px-[calc(var(--horizontal-padding)+2px)]';
  };

  const primaryColor = liftKitTheme.primaryColor || theme.colors?.primary || '#0F766E';
  const borderRadius = getBorderRadius();

  const containerStyles: React.CSSProperties = {
    fontFamily: liftKitTheme.fontFamily || theme.fontFamily,
  };

  const inputContainerStyles: React.CSSProperties = {
    paddingTop: `${verticalPadding}px`,
    paddingBottom: `${verticalPadding}px`,
    paddingLeft: `${horizontalPadding}px`,
    paddingRight: `${horizontalPadding}px`,
    minHeight: `${minHeight}px`,
    borderRadius: typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`,
    '--horizontal-padding': `${horizontalPadding}px`,
    backgroundColor: theme.colors?.surface || '#1F2937',
    borderColor: error ? '#EF4444' : '#374151',
    '--tw-ring-color': error ? '#EF4444' : primaryColor,
  } as React.CSSProperties;

  const inputStyles: React.CSSProperties = {
    fontFamily: liftKitTheme.fontFamily || theme.fontFamily,
    fontSize: `${scaledSize}px`,
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: liftKitTheme.fontFamily || theme.fontFamily,
    fontSize: `${Math.round(scaledSize * 0.875)}px`, // 14px at base
    color: theme.colors?.text || '#FFFFFF',
  };

  const helperTextStyles: React.CSSProperties = {
    fontFamily: liftKitTheme.fontFamily || theme.fontFamily,
    fontSize: `${Math.round(scaledSize * 0.75)}px`, // 12px at base
    color: error ? '#EF4444' : theme.colors?.textSecondary || '#9CA3AF',
  };

  return (
    <div className={clsx('w-full flex flex-col', className)} style={containerStyles}>
      {label && (
        <label 
          className="font-semibold mb-2" 
          htmlFor={name}
          style={labelStyles}
        >
          {label}
        </label>
      )}
      <div 
        className={clsx(
          'flex items-center border transition-all',
          error 
            ? 'border-red-500 focus-within:border-red-500' 
            : 'border-gray-600 focus-within:border-opacity-100',
          disabled && 'opacity-60 cursor-not-allowed',
          'focus-within:ring-2 focus-within:ring-opacity-50',
          getMaterialStyles(),
          getOpticalCorrection()
        )}
        style={inputContainerStyles}
      >
        {icon && (
          <span 
            className="mr-3 flex-shrink-0" 
            style={{ 
              color: primaryColor, 
              fontSize: `${Math.round(scaledSize * 1.125)}px` // 18px at base
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'bg-transparent outline-none border-none w-full',
            'placeholder:text-gray-400',
            'focus:outline-none transition-colors',
            error ? 'text-red-100' : 'text-white'
          )}
          style={inputStyles}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : helperText ? `${name}-helper` : undefined
          }
        />
      </div>
      
      {/* Helper text with improved spacing */}
      <div className="mt-1" style={{ minHeight: '20px' }}>
        {helperText && !error && (
          <span 
            id={`${name}-helper`}
            className="block" 
            style={helperTextStyles}
          >
            {helperText}
          </span>
        )}
        {error && (
          <span 
            id={`${name}-error`}
            className="block" 
            style={helperTextStyles}
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
} 