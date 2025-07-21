import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../theme';

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
  return (
    <div className={clsx('w-full flex flex-col gap-1', className)}>
      {label && (
        <label className="text-sm font-semibold text-white mb-1" htmlFor={name} style={{ fontFamily: theme.fontFamily }}>
          {label}
        </label>
      )}
      <div className={clsx(
        'flex items-center bg-[#1F2937] rounded-2xl px-4 py-2 min-h-[44px] border transition',
        error ? 'border-red-500 focus-within:border-red-500' : 'border-[#2d3c5a] focus-within:border-[#0F766E]',
        disabled && 'opacity-60 cursor-not-allowed',
        'focus-within:ring-2 focus-within:ring-teal-400'
      )}>
        {icon && <span className="mr-2 text-lg text-[#0F766E]">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'bg-transparent outline-none border-none w-full text-white placeholder:text-gray-400 text-base',
            'font-sans',
            'focus:outline-none',
            'transition'
          )}
          style={{ fontFamily: theme.fontFamily }}
          aria-invalid={!!error}
        />
      </div>
      {helperText && !error && (
        <span className="text-xs text-gray-400 mt-1" style={{ fontFamily: theme.fontFamily }}>{helperText}</span>
      )}
      {error && (
        <span className="text-xs text-red-500 mt-1" style={{ fontFamily: theme.fontFamily }}>{error}</span>
      )}
    </div>
  );
} 