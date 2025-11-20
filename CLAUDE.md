# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Context Files

**ALWAYS READ THESE FILES FIRST:**
1. `EMBR_KNOWLEDGE_LEDGER.md` - Complete project reference, architectural decisions, and current status
2. `.cursorrules` - Client architecture conventions, development workflows, and quality standards
3. `DEV_LOG.md` - Recent development history and session notes

## Project Overview

Embr is a **Universal Micro-App Framework** for creating single-purpose digital tools (breathing timers, business menus, event guides, property showcases, etc.). The mission: "One App. One Purpose. Fast. Branded. Brilliant."

### Core Architecture
- **Monorepo**: Next.js 14 + TypeScript + Capacitor
- **Design System**: EmbrKit (37 components, hybrid approach)
- **Distribution**: PWA-first with native mobile wrapper
- **Configuration**: JSON-driven client configs stored in Firestore

## Development Commands

### Starting a Development Session
```bash
# MANDATORY: Ask user platform (Mac/Windows), then run:
npm run session:init
# This checks Git sync, installs dependencies, runs quality checks, updates dev log

# After session complete:
npm run session:end
```

### Common Development Tasks
```bash
# Development
npm run dev                    # Start hub-app dev server (Next.js)
npm run build                  # Build hub-app for production
npm run lint                   # Run ESLint
npm run test                   # Run tests in all workspaces

# Client Development
npm run client:create          # Create new client configuration
npm run client:validate        # Validate all client configs
npm run configs:push           # Push all configs to Firestore
npm run configs:push:one       # Push single config: npm run configs:push:one -- <slug>
npm run clients:loader         # Regenerate client loader (after adding/removing clients)

# Git Workflow (Session-Based - MANDATORY)
npm run git:session <name>     # Create session branch: session/name-YYYY-MM-DD
npm run git:save "message"     # Save progress during session
npm run git:end                # Merge session to main and cleanup

# Quality Assurance
npm run audit:theme            # Check for hardcoded colors/styling violations
npm run check:isolation        # Ensure demo pages and client configs are separate
npm run tsprune:hub            # Find unused TypeScript exports in hub-app
npm run tsprune:ui             # Find unused TypeScript exports in ui package
npm run depcheck:root          # Check for unused dependencies at root
npm run depcheck:hub           # Check for unused dependencies in hub-app
npm run depcheck:ui            # Check for unused dependencies in ui

# Dev Log Management
npm run devlog:update          # Ensure today's entry exists and update DEV_LOG.md
npm run devlog:append -- "msg" # Add timestamped bullet to today's changes

# Documentation
npm run update:docs            # Update project documentation

# Capacitor (Mobile Development)
cd packages/hub-app
npm run cap:sync               # Sync web assets to native projects
npm run cap:open:ios           # Open iOS project in Xcode (Mac only)
npm run cap:open:android       # Open Android project in Android Studio
```

## Repository Structure

```
embr/
├── packages/
│   ├── hub-app/                    # Next.js Hub Application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── clients/       # Client-specific micro-apps
│   │   │   │   │   ├── [industry]/[client-id]/
│   │   │   │   │   │   ├── ClientApp.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── GenericClientApp.tsx  # Fallback renderer
│   │   │   │   │   ├── index.ts   # CLIENT_APP_REGISTRY
│   │   │   │   │   └── loader.ts  # Auto-generated lazy loader
│   │   │   │   ├── ClientApp.tsx  # Client router
│   │   │   │   └── AccessCodeEntry.tsx
│   │   │   ├── app/
│   │   │   │   ├── page.tsx       # Hub landing page
│   │   │   │   ├── embrkit-demo/  # Design system showcase
│   │   │   │   └── embrkit-components-demo/
│   │   │   └── lib/
│   │   └── public/
│   │       └── client-configs/    # JSON config files (legacy)
│   ├── ui/                        # @embr/ui - EmbrKit Design System
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── embrkit.tsx   # All 37 React components
│   │   │   └── lib/
│   │   │       ├── embrkit-core.css         # Design tokens
│   │   │       └── embrkit-components.css   # Component styles
│   └── standalone-app/            # Standalone app generator
├── scripts/                       # Build & automation utilities
├── docs/                          # Documentation
└── firebase.json                  # Firebase/Firestore config
```

## Client App Development Architecture

### Client Independence System (CRITICAL)

Each client micro-app is a **completely independent React component** with:
- Unique UI layouts and content structures
- Custom styling and interactions
- Business-specific features and workflows
- Complete visual independence from other clients

### Creating a New Client App

#### 1. Directory Structure
```
packages/hub-app/src/components/clients/
└── [industry]/              # healthcare, events, hospitality, retail, services, other
    └── [client-slug-2025]/
        ├── ClientApp.tsx    # Main component
        ├── components/      # Optional: client-specific components
        ├── styles/         # Optional: client-specific styles
        ├── types/          # Optional: client-specific types
        └── index.ts        # Re-export: export { default as ClientApp } from './ClientApp'
```

#### 2. Component Implementation
```typescript
// ClientApp.tsx
import { EmbrKitProvider, EmbrKitContainer, EmbrKitButton } from '@embr/ui';

interface ClientAppProps {
  config: ClientConfig;
}

export default function ClientApp({ config }: ClientAppProps) {
  // Use EmbrKit components for foundation + custom code for unique visuals
  const embrKitTheme = {
    colors: {
      primary: config.theme.colors.primary,
      // ... map all theme colors
    }
  };

  return (
    <EmbrKitProvider initialTheme={embrKitTheme}>
      <EmbrKitContainer>
        {/* Independent, purpose-built UI for this client */}
      </EmbrKitContainer>
    </EmbrKitProvider>
  );
}
```

#### 3. Registration
```typescript
// packages/hub-app/src/components/clients/[industry]/index.ts
export const INDUSTRY_CLIENTS = {
  'client-slug-2025': ClientApp,
} as const;

// packages/hub-app/src/components/clients/index.ts
import { HEALTHCARE_CLIENTS } from './healthcare';
import { EVENTS_CLIENTS } from './events';
// ... other industries

export const CLIENT_APP_REGISTRY = {
  ...HEALTHCARE_CLIENTS,
  ...EVENTS_CLIENTS,
  // ... other industries
} as const;
```

#### 4. Generate Lazy Loader
```bash
npm run clients:loader
```

#### 5. Create Firestore Config
```json
{
  "clientId": "client-slug-2025",
  "name": "Client Name",
  "pluginId": "client-slug-2025",
  "configVersion": "1.0",
  "expiry": "2025-12-31T23:59:59Z",
  "theme": {
    "colors": {
      "primary": "#0f766e",
      "secondary": "#22c55e",
      "background": "#ffffff",
      "surface": "#f9fafb",
      "surfaceElevated": "#ffffff",
      "text": "#1a1a1a",
      "textSecondary": "#6b7280",
      "border": "#e5e7eb",
      "buttonOutline": "#0f766e"
    },
    "typography": {
      "fontFamily": "Inter, system-ui, sans-serif"
    }
  },
  "navigation": [...],
  "features": [...],
  "content": {...}
}
```

#### 6. Deploy Config
```bash
# Push to Firestore
npm run configs:push:one -- client-slug-2025

# Update dev log
npm run devlog:append -- "Created client-slug-2025 client app"
```

### Hybrid Development Model (REQUIRED)

**EmbrKit Components (50% Speed) + Custom Code (100% Control) = Perfect Micro-Apps**

#### Use EmbrKit For:
- Structure and layout (Container, Grid, Stack)
- Common UI patterns (Button, Card, Input, Modal)
- Data display (Table, StatCard, DataCard)
- Forms (FormField, FormInput, FileUpload)
- Navigation (Navbar, Tabs, Breadcrumbs)
- Feedback (Alert, Loading, Toast)

#### Use Custom Code For:
- Unique visual elements (decorative graphics, animations)
- Brand-specific layouts (hero sections, feature grids)
- Advanced interactions (custom animations, micro-interactions)
- Specialized functionality (complex forms, data visualizations)
- Integration code (third-party APIs, custom logic)

#### Client Theming Tokens (MANDATORY)
```css
/* Approved theme tokens - inject via EmbrKitProvider */
--embr-primary-color
--embr-secondary-color
--embr-background
--embr-surface
--embr-surface-elevated
--embr-text
--embr-text-secondary
--embr-border
--embr-button-outline-color
--embr-primary-hover (optional)
--embr-secondary-hover (optional)
```

**NEVER use:**
- Hardcoded hex colors in client code
- Tailwind `ring-*` utilities
- Client theme colors in Hub shell

## Git Workflow (MANDATORY)

### Session-Based Development
Every development session MUST use session branches:

```bash
# Start session
npm run git:session <descriptive-name>
# Creates: session/descriptive-name-YYYY-MM-DD

# Save progress frequently
npm run git:save "Implemented feature X"

# End session (merges to main, deletes session branch)
npm run git:end
```

### Branch Naming Convention
- Session branches: `session/wildroots-fixes-2025-01-27`
- Feature branches: `feature/embrkit-improvements`
- Never work directly on `main`

### Status Checking
```bash
npm run git:status  # Check current branch and uncommitted changes
```

## EmbrKit Design System

### Core Principles
- **Border Radius**: Use `--embr-radius-2xl` (1rem/16px) for primary components
- **Typography**: Inter font family with `font-weight: 600` for buttons/headings
- **Colors**: Primary teal (#0f766e) with success/warning/error variants
- **Spacing**: Golden ratio-based spacing system
- **Accessibility**: WCAG AA compliance required

### Component Usage
```typescript
import {
  EmbrKitProvider,
  EmbrKitButton,
  EmbrKitCard,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitStatCard,
  EmbrKitModal,
  // ... 37 total components
} from '@embr/ui';
```

### Demo Pages
- `/embrkit-demo` - Design system principles, colors, typography
- `/embrkit-components-demo` - Interactive component showcase
- `/embrkit-themes-demo` - Theme sandbox for visual verification

## Hub App Visual Baseline (LOCKED)

The Hub shell uses **fixed Embr-branded colors** and does NOT inherit client themes.

### Hub Color Palette (DO NOT CHANGE)
```css
/* Background & Surfaces */
--hub-background: #101926
--hub-surface: #22304a
--hub-border: #2d3c5a

/* Text */
--hub-text: #FEFEFE
--hub-text-secondary: #EDEDED / #D1D5DB

/* Primary/Accent */
--hub-primary: #0F766E
--hub-primary-hover: #13a89a
--hub-accent-ring: #38F9E4
```

### Protected Hub Files
- `packages/hub-app/src/app/globals.css`
- `packages/hub-app/src/app/layout.tsx`
- `packages/hub-app/src/app/page.tsx`
- `packages/hub-app/src/components/AccessCodeEntry.tsx`
- `packages/hub-app/src/components/LoadingScreen.tsx`

**Do NOT replace Hub's fixed hex colors with theme variables.**

## Quality Assurance

### Before Creating PR
```bash
# Run quality checks
npm run audit:theme         # Check for hardcoded colors/styling violations
npm run check:isolation     # Ensure demo/client separation
npm run lint                # ESLint check

# Manual checks
# - Hub baseline visuals unchanged (compare to git tag)
# - 30-second keyboard focus test
# - Test client with access code
```

### Focus Policy
- Outlines allowed ONLY on filled and ghost controls
- MUST use `--embr-button-outline-color`
- MUST appear only on `:focus-visible`
- NO Tailwind `ring-*` utilities

### Theme Compliance
- NO hardcoded colors (hex/rgba) in client code
- USE CSS custom properties or config brand constants
- Client theming scoped inside `ClientApp` only

## Firebase/Firestore Configuration

### Service Account Setup
Ensure service account is available via:
- `GOOGLE_APPLICATION_CREDENTIALS` (file path)
- `FIREBASE_SERVICE_ACCOUNT` (file path or JSON string)
- `./firebase-service-account.json` at repo root

### Security Guidelines
- **DO NOT commit** raw service account keys to repo
- Use env vars pointing to files outside repo
- In CI: use OIDC Workload Identity Federation or secret manager

### Config Operations
```bash
# Push all configs
npm run configs:push

# Push single config
npm run configs:push:one -- <client-slug>

# Dry run (preview)
node scripts/configs-push.js --dry

# Custom options
node scripts/configs-push.js --dir ./path --collection client-configs-staging
```

## Testing

### Test Client with Access Code
```bash
npm run dev
# Navigate to: http://localhost:3000/?client=<clientId>
# Or: http://localhost:3000/c/<clientId>
```

### Manual Testing Checklist
- [ ] Client loads correctly with access code
- [ ] Theme colors applied correctly
- [ ] Navigation works
- [ ] All interactive elements keyboard accessible
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Offline functionality (if applicable)
- [ ] No console errors

## Common Pitfalls to Avoid

### Client App Development
❌ **DON'T**: Create generic templates that all clients share
❌ **DON'T**: Use hardcoded colors or content
❌ **DON'T**: Make clients look like carbon copies
❌ **DON'T**: Share layouts/structures between clients
❌ **DON'T**: Edit `clients/loader.ts` manually

✅ **DO**: Create unique, purpose-built experiences
✅ **DO**: Use client's brand colors via theme tokens
✅ **DO**: Implement business-specific features
✅ **DO**: Run `npm run clients:loader` after adding clients

### Hub Shell Development
❌ **DON'T**: Replace Hub's fixed colors with theme variables
❌ **DON'T**: Leak client theming into Hub shell
❌ **DON'T**: Modify Hub baseline without explicit approval

✅ **DO**: Keep client theming scoped inside `ClientApp`
✅ **DO**: Maintain Hub visual baseline
✅ **DO**: Check against Hub color palette before changes

## Platform-Specific Notes

### Mac Development
- Full iOS testing available (Xcode required)
- Safari compatibility testing
- Native builds via Capacitor
- Cross-platform validation

### Windows Development
- Web development focus
- Chrome/Edge testing
- Windows PWA features
- No iOS testing (use Mac for that)

## TypeScript Configuration

- Strict mode enabled
- Path aliases configured:
  - `@/*` → `packages/hub-app/src/*`
  - `@/components/*` → `packages/hub-app/src/components/*`
  - `@/lib/*` → `packages/hub-app/src/lib/*`
  - `@/types/*` → `packages/hub-app/src/types/*`

## Key Scripts Reference

### Session Management
- `npm run session:init` - Initialize development session
- `npm run session:end` - End development session

### Git Workflow
- `npm run git:session <name>` - Create session branch
- `npm run git:save "message"` - Save session progress
- `npm run git:end` - Merge session and cleanup
- `npm run git:status` - Check current status

### Client Development
- `npm run client:create` - Create new client config
- `npm run client:validate` - Validate all client configs
- `npm run clients:loader` - Regenerate client loader
- `npm run configs:push` - Deploy configs to Firestore
- `npm run configs:push:one -- <slug>` - Deploy single config

### Quality Assurance
- `npm run audit:theme` - Theme compliance check
- `npm run check:isolation` - Demo isolation check
- `npm run lint` - Code quality check
- `npm run test` - Run all tests

### Dev Log
- `npm run devlog:update` - Update dev log
- `npm run devlog:append -- "message"` - Add log entry

## Success Metrics

- **Development Speed**: 50%+ faster with hybrid approach
- **Visual Control**: 95%+ visual parity with custom designs
- **Brand Integrity**: Client branding perfectly preserved
- **Accessibility**: WCAG AA compliant
- **Performance**: Sub-3-second load times

---

**Remember**: Embr is a Universal Micro-App Framework that can create ANY single-purpose digital tool while maintaining perfect brand integrity and blazing-fast performance. Every decision should support: "One App. One Purpose. Fast. Branded. Brilliant."
