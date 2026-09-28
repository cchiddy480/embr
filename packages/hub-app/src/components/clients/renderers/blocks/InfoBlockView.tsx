import React from 'react';
import { EmbrKitCard } from '@embr/ui';
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
    <EmbrKitCard className="p-6">
      <p
        className="text-base whitespace-pre-line"
        style={{ color: theme.colors.textSecondary, fontFamily: `'${theme.fonts.body}', sans-serif` }}
      >
        {block.body}
      </p>
      {block.venue && (
        <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.colors.border ?? `${theme.colors.text}15` }}>
          <p className="font-semibold" style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.heading}', serif` }}>
            {block.venue.name}
          </p>
          <p style={{ color: theme.colors.textSecondary }}>{block.venue.address}</p>
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-sm font-medium mt-1"
              style={{ color: theme.colors.primary }}
            >
              Directions ↗
            </a>
          )}
        </div>
      )}
    </EmbrKitCard>
  );
}
