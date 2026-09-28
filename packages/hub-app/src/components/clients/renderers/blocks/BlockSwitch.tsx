import React from 'react';
import type { Block, Theme } from '../../../../types/blocks-schema';
import { ScheduleBlockView } from './ScheduleBlockView';
import { InfoBlockView } from './InfoBlockView';
import { ContactsBlockView } from './ContactsBlockView';
import { UpdatesBlockView } from './UpdatesBlockView';

interface BlockSwitchProps {
  block: Block;
  theme: Theme;
  clientId: string;
}

export function BlockSwitch({ block, theme, clientId }: BlockSwitchProps) {
  switch (block.type) {
    case 'schedule':
      return <ScheduleBlockView block={block} theme={theme} />;
    case 'info':
      return <InfoBlockView block={block} theme={theme} />;
    case 'contacts':
      return <ContactsBlockView block={block} theme={theme} />;
    case 'updates':
      return <UpdatesBlockView block={block} theme={theme} clientId={clientId} />;
    default: {
      // Exhaustiveness check: BlockSchema is a closed discriminated union,
      // so this only fires if a new block type is added to the schema
      // without a matching case here.
      const _exhaustive: never = block;
      return null;
    }
  }
}
