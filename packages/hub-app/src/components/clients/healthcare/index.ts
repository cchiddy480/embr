// Healthcare Industry Client Apps
import { PeakFormPhysioApp } from './peakform-physio-2025';

// Healthcare industry registry
export const HEALTHCARE_CLIENTS = {
  'peakform-physio-2025': PeakFormPhysioApp,
} as const;

// Re-export for external use
export { PeakFormPhysioApp };

export type HealthcareClientId = keyof typeof HEALTHCARE_CLIENTS;
