import React, { useId, useState } from 'react';
import type { TripConfig } from '../../../types/blocks-schema';
import { BlockSwitch } from './blocks/BlockSwitch';

interface BlockRendererProps {
  config: TripConfig;
}

const MONO_FONT = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/**
 * Renders a TripConfig. Deliberately has no dependency on @embr/ui beyond
 * types: EmbrKitTabs overflowed on mobile and left dead whitespace, and
 * EmbrKitProvider's theme application mutates document.documentElement's
 * CSS variables globally (not scoped to this subtree) — a second, subtler
 * version of the same guide-theme-leaking-into-the-hub-shell risk this
 * component otherwise avoids by never touching document.body. Nothing
 * downstream (GuideCard, the block views) reads those variables anyway;
 * every color here comes straight from config.theme.colors.*.
 *
 * Nav placement follows DESIGN.md: desktop navigation stays in the header,
 * mobile navigation is fixed above the safe area at the bottom.
 */
export function BlockRenderer({ config }: BlockRendererProps) {
  const { theme } = config;
  const [activeBlockId, setActiveBlockId] = useState(config.blocks[0]?.id);
  const activeBlock = config.blocks.find((block) => block.id === activeBlockId) ?? config.blocks[0];
  const panelId = useId();
  const borderColor = theme.colors.border ?? `${theme.colors.text}1a`;

  const focusRingStyle: React.CSSProperties = { outlineColor: theme.colors.primary };

  const renderTab = (block: TripConfig['blocks'][number], variant: 'desktop' | 'mobile') => {
    const isActive = block.id === activeBlock?.id;
    const sharedProps = {
      type: 'button' as const,
      role: 'tab' as const,
      id: `${panelId}-tab-${block.id}`,
      'aria-selected': isActive,
      'aria-controls': `${panelId}-panel`,
      onClick: () => setActiveBlockId(block.id),
    };

    if (variant === 'desktop') {
      return (
        <button
          key={block.id}
          {...sharedProps}
          className="min-h-11 flex-1 rounded-md px-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
          style={{
            ...focusRingStyle,
            backgroundColor: isActive ? theme.colors.primary : 'transparent',
            color: isActive ? '#fff' : theme.colors.textSecondary,
          }}
        >
          {block.title}
        </button>
      );
    }

    return (
      <button
        key={block.id}
        {...sharedProps}
        className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 border-t-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
        style={{
          ...focusRingStyle,
          borderTopColor: isActive ? theme.colors.primary : 'transparent',
          color: isActive ? theme.colors.primary : theme.colors.textSecondary,
        }}
      >
        {block.title}
      </button>
    );
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col" style={{ backgroundColor: theme.colors.background }}>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ backgroundColor: `${theme.colors.surface}f2`, borderColor }}
      >
        <div className="mx-auto flex w-full max-w-[720px] items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <h1
            className="truncate text-lg font-semibold"
            style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.heading}', serif` }}
          >
            {config.name}
          </h1>
          {config.watermark && (
            <span
              className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={{ backgroundColor: `${theme.colors.primary}20`, color: theme.colors.primary, fontFamily: MONO_FONT }}
            >
              Preview
            </span>
          )}
        </div>

        {config.blocks.length > 1 && (
          <nav
            aria-label="Guide sections"
            role="tablist"
            className="mx-auto hidden w-full max-w-[720px] gap-1 px-4 pb-3 sm:px-6 md:flex"
          >
            {config.blocks.map((block) => renderTab(block, 'desktop'))}
          </nav>
        )}
      </header>

      <main
        id={`${panelId}-panel`}
        role="tabpanel"
        aria-labelledby={activeBlock ? `${panelId}-tab-${activeBlock.id}` : undefined}
        className="mx-auto w-full max-w-[720px] flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-12"
      >
        {activeBlock && <BlockSwitch block={activeBlock} theme={theme} clientId={config.clientId} />}
      </main>

      {config.blocks.length > 1 && (
        <nav
          aria-label="Guide sections"
          role="tablist"
          className="fixed inset-x-0 bottom-0 z-40 flex border-t pb-[env(safe-area-inset-bottom)] md:hidden"
          style={{ backgroundColor: `${theme.colors.surface}f7`, borderColor }}
        >
          {config.blocks.map((block) => renderTab(block, 'mobile'))}
        </nav>
      )}
    </div>
  );
}
