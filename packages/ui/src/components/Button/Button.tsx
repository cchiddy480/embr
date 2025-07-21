import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../theme';

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
  const base =
    'w-full flex items-center justify-center font-bold font-sans rounded-2xl px-6 py-3 min-h-[48px] text-base transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm';
  const variants = {
    primary:
      'bg-[#0F766E] text-white hover:bg-[#14B8A6] focus:bg-[#14B8A6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.25)]',
    secondary:
      'bg-transparent border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E]/10 focus:bg-[#0F766E]/20',
    ghost:
      'bg-transparent text-[#0F766E] hover:bg-[#0F766E]/10 focus:bg-[#0F766E]/20',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], className)}
      aria-disabled={disabled}
      style={{ fontFamily: theme.fontFamily }}
    >
      {children}
    </button>
  );
} 