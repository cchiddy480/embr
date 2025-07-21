// EmbrKit Design System - Main Export
// This is the main entry point for @embr/ui package

// Export EmbrKit core styles, themes, and utilities
export * from './lib/index';

// Export EmbrKit React components and providers
export * from './components/embrkit';

// Export existing theme system for backward compatibility
export * from './components/theme';

// Export existing components for backward compatibility
// (These can be gradually migrated to EmbrKit styling)
export { Button } from './components/Button/Button';
export { Input } from './components/Input/Input';
export { Card } from './components/Card/Card';

// Version info
export const EMBRKIT_VERSION = '0.1.0';

// EmbrKit Component Re-exports for convenience
export {
  EmbrKitProvider,
  EmbrKitButton,
  EmbrKitCard,
  EmbrKitCardHeader,
  EmbrKitCardContent,
  EmbrKitCardFooter,
  EmbrKitInput,
  EmbrKitTextarea,
  EmbrKitBadge,
  EmbrKitModal,
  EmbrKitToast,
  EmbrKitContainer,
  EmbrKitStack,
  EmbrKitGrid,
  EmbrKitNavbar,
  EmbrKitNavbarLink,
  EmbrKitTabs,
  EmbrKitTab,
  EmbrKitTabPanel,
  EmbrKitBreadcrumbs,
  useEmbrKitTheme
} from './components/embrkit'; 