import React from 'react';
import { GuideCard } from './GuideCard';
import type { InfoBlock, Theme } from '../../../../types/blocks-schema';

interface InfoBlockViewProps {
  block: InfoBlock;
  theme: Theme;
}

export function InfoBlockView({ block, theme }: InfoBlockViewProps) {
  const mapUrl = block.venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(block.venue.address)}`
    : null;

  return (
    <GuideCard theme={theme}>
      <p
        className="text-base whitespace-pre-line"
        style={{ color: theme.colors.textSecondary, fontFamily: `'${theme.fonts.body}', sans-serif` }}
      >
        {block.body}
      </p>
      {block.venue && (
        <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${theme.colors.border ?? `${theme.colors.text}1a`}` }}>
          <p className="font-semibold" style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.heading}', serif` }}>
            {block.venue.name}
          </p>
          <p className="text-sm mt-0.5" style={{ color: theme.colors.textSecondary }}>{block.venue.address}</p>
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-sm font-medium mt-1"
              style={{ color: theme.colors.primary }}
            >
              Get directions
            </a>
          )}
        </div>
      )}
    </GuideCard>
  );
}
