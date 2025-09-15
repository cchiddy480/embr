// Events Industry Client Apps
import { WildRootsFestivalApp } from './wildroots-festival-2025';

// Events industry registry
export const EVENT_CLIENTS = {
  'wildroots-festival-2025': WildRootsFestivalApp,
} as const;

// Re-export for external use
export { WildRootsFestivalApp };

export type EventClientId = keyof typeof EVENT_CLIENTS;
