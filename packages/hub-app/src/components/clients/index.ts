// Import from industry registries
import { HEALTHCARE_CLIENTS, PeakFormPhysioApp } from './healthcare';
import { EVENT_CLIENTS, WildRootsFestivalApp } from './events';
import { GenericClientApp } from './GenericClientApp';

// Main Client App Registry
export const CLIENT_APP_REGISTRY = {
  ...HEALTHCARE_CLIENTS,
  ...EVENT_CLIENTS,
} as const;

export type ClientAppId = keyof typeof CLIENT_APP_REGISTRY;

// Export individual components
export { PeakFormPhysioApp, WildRootsFestivalApp, GenericClientApp };

// Export industry registries for specialized access
export { HEALTHCARE_CLIENTS } from './healthcare';
export { EVENT_CLIENTS } from './events';
export { HOSPITALITY_CLIENTS } from './hospitality';
export { RETAIL_CLIENTS } from './retail';
export { SERVICES_CLIENTS } from './services';
export { OTHER_CLIENTS } from './other';
