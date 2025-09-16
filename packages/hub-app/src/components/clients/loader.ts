// AUTO-GENERATED FILE. Do not edit manually.
// Run: npm run clients:loader
// This map is used to lazy-load client-specific apps on demand.

export const CLIENT_PLUGIN_LOADERS: Record<string, () => Promise<any>> = {
  'peakform-physio-2025': () => import('./healthcare/peakform-physio-2025'),
  'wildroots-festival-2025': () => import('./events/wildroots-festival-2025'),
};
