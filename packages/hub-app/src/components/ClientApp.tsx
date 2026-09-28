import React from 'react';
import type { TripConfig } from '../types/blocks-schema';
import { BlockRenderer } from './clients/renderers/BlockRenderer';

interface ClientAppProps {
  config: TripConfig;
}

/**
 * Every guide is a TripConfig now — useClientConfig.tsx only ever hands
 * back a config that's already passed TripConfigSchema, so there's no
 * legacy shape left to branch on. This used to be a chain of a dynamic
 * loader, a static registry, and a generic-template fallback for
 * hand-coded/multi-industry clients; none of that exists anymore.
 */
export function ClientApp({ config }: ClientAppProps) {
  return <BlockRenderer config={config} />;
}
