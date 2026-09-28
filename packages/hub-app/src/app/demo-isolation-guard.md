# Demo Pages Isolation Strategy

## Core Principle
Demo pages (`/embrkit-*-demo`) and real guide rendering must stay isolated. Changes to one should never affect the other.

## Current Isolation

### Fully Isolated
- **Demo pages**: use inline CSS variables, no external theme dependency.
- **Guide rendering**: uses `useClientConfig` (loads + validates a `TripConfig`) and `ClientApp` → `BlockRenderer`.
- **Routing**: demo pages are separate routes (`/embrkit-*`), unrelated to `/c/[clientId]` or `?client=`.

### Shared Dependencies (Monitor)
- Both draw on `@embr/ui` (EmbrKit components).
- Demo pages override CSS variables with inline styles rather than relying on global tokens.

## Isolation Rules

```typescript
// Demo pages: inline CSS variables only
const demoStyles = `
  :root {
    --embr-primary-color: #0F766E;
    --embr-background: #101926;
  }
`;

// Never: demo pages reading global CSS variables that a real guide also sets
<div style={{ backgroundColor: 'var(--embr-background)' }}>
```

```typescript
// Guide rendering: always through the real flow
const { config } = useClientConfig();
<ClientApp config={config} />

// Never: a demo page importing guide-specific code, or vice versa
```

## When Working on Demo Pages
1. Use inline CSS variables only.
2. Import `@embr/ui` for components.
3. Test demo pages independently.
4. Never modify global CSS variables.
5. Never import guide-rendering code.

## When Working on Guide Rendering
1. Use `useClientConfig` + `ClientApp` → `BlockRenderer`.
2. Test against a real or scratch `TripConfig` (see `EMBR_KNOWLEDGE_LEDGER.md` for the schema).
3. Never import demo-specific code.
4. Never modify demo page styling.

## File Organization

```
packages/hub-app/src/app/
├── embrkit-demo/page.tsx              # Independent
├── embrkit-components-demo/page.tsx   # Independent
├── embrkit-themes-demo/page.tsx       # Independent
└── page.tsx / c/[clientId]/page.tsx   # Real guide rendering (via ClientApp)

packages/hub-app/src/
├── hooks/useClientConfig.tsx          # Guide config loading + validation
├── components/ClientApp.tsx           # config -> BlockRenderer
└── types/blocks-schema.ts             # TripConfigSchema — the single config shape
```

## Emergency Recovery

```bash
# Reset demo pages
git checkout HEAD -- packages/hub-app/src/app/embrkit-*-demo/

# Reset guide rendering
git checkout HEAD -- packages/hub-app/src/hooks/useClientConfig.tsx
git checkout HEAD -- packages/hub-app/src/components/ClientApp.tsx
```

## Automated Check
`npm run check:isolation` (`scripts/check-demo-isolation.js`) flags demo pages importing guide-rendering code or vice versa.
