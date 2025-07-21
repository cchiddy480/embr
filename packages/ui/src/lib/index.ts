// EmbrKit Design System - Core Exports
// Import all EmbrKit CSS
import './embrkit-core.css';
import './embrkit-button.css';
import './embrkit-components.css';

// Re-export existing utilities (browser-compatible only)
export * from './colorUtils';
export * from './utilities';
export * from './debugUtils';
// Note: fs.ts removed - contains Node.js-specific code not suitable for browser

// Note: EmbrKitTheme and applyEmbrKitTheme are now exported from components/embrkit.tsx to avoid conflicts 