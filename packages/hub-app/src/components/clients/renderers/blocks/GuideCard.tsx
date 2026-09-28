import React from 'react';
import type { Theme } from '../../../../types/blocks-schema';

interface GuideCardProps {
  theme: Theme;
  className?: string;
  children: React.ReactNode;
}

/**
 * A plain bordered panel for guide content — deliberately not EmbrKitCard,
 * whose shared CSS (packages/ui) hardcodes a drop shadow. DESIGN.md is
 * explicit: "Borders define elevation. No glow, bouncing decoration,
 * heavy shadow, or gradient hero." Editing EmbrKitCard's CSS directly
 * would ripple into ~20 other consumers (legacy renderers, demo pages)
 * outside this scope, so this stays local to the guide-render path.
 * 16px radius matches DESIGN.md's "Panels: 16px radius" rule.
 */
export function GuideCard({ theme, className = '', children }: GuideCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border ?? `${theme.colors.text}1a`}`,
      }}
    >
      {children}
    </div>
  );
}
