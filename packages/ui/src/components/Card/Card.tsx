import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../theme';

export type CardProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Card({ header, children, footer, className, style }: CardProps) {
  const theme = useTheme();
  return (
    <div
      className={clsx(
        'bg-[#1F2937] rounded-2xl shadow-md border border-[#2d3c5a] p-4 flex flex-col gap-2',
        className
      )}
      style={{ fontFamily: theme.fontFamily, ...style }}
    >
      {header && <div className="mb-2">{header}</div>}
      <div>{children}</div>
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
} 