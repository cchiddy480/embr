# @embr/ui (EmbrKit)

Embr's shared React component library and CSS design tokens. Used throughout `packages/hub-app`'s guide-render path and hub shell.

## Usage

```tsx
import { EmbrKitProvider, EmbrKitButton } from '@embr/ui';

function App() {
  return (
    <EmbrKitProvider>
      <EmbrKitButton variant="primary">Get Started</EmbrKitButton>
    </EmbrKitProvider>
  );
}
```

### Theming

```tsx
import { EmbrKitProvider } from '@embr/ui';

const customTheme = {
  colors: { primary: '#8B2C4A', accent: '#33C3FF', background: '#FAFAFA' },
  fonts: { heading: 'Playfair Display', body: 'Inter' },
};

<EmbrKitProvider initialTheme={customTheme}>{/* ... */}</EmbrKitProvider>
```

`useEmbrKitTheme()` exposes `updateTheme()` for runtime theme changes.

## Where EmbrKit Fits, and Where It Doesn't

This package is a starting point for structure and common UI (containers, cards, buttons, tabs), not a visual mandate. The repo's actual visual design source of truth is `DESIGN.md` at the repo root — a guide's real look (colors, spacing, elevation, typography, copy rules) is governed by that spec and by each guide's own `config.theme`, not by EmbrKit's own default tokens below. Some of EmbrKit's shared CSS (card drop-shadows, default icon sets on a couple of components) currently predates `DESIGN.md` and doesn't match it — where that's the case, the guide-render path in `packages/hub-app` uses a small local primitive instead (see `GuideCard.tsx`) rather than editing shared CSS that would ripple into unrelated consumers.

There is no "standalone vs. hub" tiering — every guide (and the hub shell) draws from this same package.

## Design Tokens

EmbrKit's own default tokens (its baseline, independent of any guide's configured theme):

```css
--embr-teal: #0F766E;
--embr-deep-charcoal: #1F2937;
--embr-cream-white: #FEFEFE;

--embr-h1-size: 3rem;
--embr-h2-size: 2rem;
--embr-body-size: 1.125rem;
```

A guide's actual rendered colors come from its own `config.theme.colors.*`, applied via `EmbrKitProvider`'s `applyEmbrKitTheme()` — see `EMBR_KNOWLEDGE_LEDGER.md` for the full data model.

## Development

This package has no build step of its own — `packages/hub-app` consumes its TypeScript source directly via the npm workspace. There's nothing to `npm run build` or `npm run dev` here; work in `packages/hub-app` and this package's changes are picked up live.
