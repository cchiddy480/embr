import React, { useState } from 'react';
import { EmbrKitProvider, EmbrKitContainer, EmbrKitTabs, EmbrKitTab, EmbrKitTabPanel } from '@embr/ui';
import type { TripConfig } from '../../../types/blocks-schema';
import { BlockSwitch } from './blocks/BlockSwitch';

interface BlockRendererProps {
  config: TripConfig;
}

/**
 * Renders a Phase B TripConfig (the `blocks` array shape). Unlike
 * FestivalRenderer/GenericClientApp, this never touches `document.body` —
 * the themed background lives entirely on this component's own wrapping
 * div, so a guide's theme can never leak into the hub shell or any other
 * mounted tree, structurally rather than just by convention.
 */
export function BlockRenderer({ config }: BlockRendererProps) {
  const [activeBlockId, setActiveBlockId] = useState(config.blocks[0]?.id);

  const embrKitTheme = {
    primaryColor: config.theme.colors.primary,
    secondaryColor: config.theme.colors.secondary,
    backgroundColor: config.theme.colors.background,
    surfaceColor: config.theme.colors.surface,
    textColor: config.theme.colors.text,
    textSecondaryColor: config.theme.colors.textSecondary,
    fontFamily: `'${config.theme.fonts.body}', sans-serif`,
    headingFontFamily: `'${config.theme.fonts.heading}', serif`,
  };

  return (
    <EmbrKitProvider initialTheme={embrKitTheme}>
      <div
        className="min-h-screen min-h-[100dvh]"
        style={{ backgroundColor: config.theme.colors.background }}
      >
        <div
          className="sticky top-0 z-50 backdrop-blur-md border-b px-6 py-4"
          style={{
            backgroundColor: `${config.theme.colors.surface}f2`,
            borderColor: config.theme.colors.border ?? `${config.theme.colors.text}15`,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <h1
              className="text-lg font-semibold"
              style={{ color: config.theme.colors.text, fontFamily: `'${config.theme.fonts.heading}', serif` }}
            >
              {config.name}
            </h1>
            {config.watermark && (
              <span
                className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap"
                style={{ backgroundColor: `${config.theme.colors.primary}20`, color: config.theme.colors.primary }}
              >
                Preview
              </span>
            )}
          </div>
        </div>

        <EmbrKitContainer size="lg" className="px-4 pt-6 pb-12">
          <EmbrKitTabs activeTab={activeBlockId} onTabChange={setActiveBlockId}>
            {config.blocks.map((block) => (
              <EmbrKitTab key={block.id} id={block.id}>
                {block.title}
              </EmbrKitTab>
            ))}
            {config.blocks.map((block) => (
              <EmbrKitTabPanel key={block.id} id={block.id}>
                <div className="pt-6">
                  <BlockSwitch block={block} theme={config.theme} clientId={config.clientId} />
                </div>
              </EmbrKitTabPanel>
            ))}
          </EmbrKitTabs>
        </EmbrKitContainer>
      </div>
    </EmbrKitProvider>
  );
}
