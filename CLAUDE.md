# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Essential Context Files

**Read these first:**
1. `EMBR_KNOWLEDGE_LEDGER.md` — full project reference: data model, architecture, current status
2. `DESIGN.md` — the brand/visual design spec. This is the source of truth for how a guide looks; do not improvise past it.
3. `DEV_LOG.md` — recent development history

## What Embr Is

Embr is a **done-for-you live event/trip guide**. A planner sends an itinerary; Embr turns it into a single branded link — schedule, contacts, key info, live updates — that guests actually open, instead of a PDF or a wall of WhatsApp messages. One product, one config shape, one render path. It is not a multi-industry template platform and does not have a native app — see "What Embr Is Not" below.

### Core Architecture
- **Monorepo**: Next.js 14 + TypeScript, npm workspaces (`packages/hub-app`, `packages/ui`)
- **Config-driven**: every guide is a `TripConfig` (zod schema, see below) — no per-client code
- **Rendering**: a single block engine (`BlockRenderer` + one component per block type) renders every guide
- **Design system**: `@embr/ui` (EmbrKit) — shared components/tokens, themed per-guide from `TripConfig.theme`
- **Data**: Firestore (`client-configs`, `access-codes`, `private`) is the source of truth for a live guide
- **Distribution**: a plain web link (`/c/<clientId>` or an access code), no app install, no QR-only flow

### What Embr Is Not
These were true of an earlier direction and are no longer accurate — don't reintroduce them without a real reason:
- Not a "Universal Micro-App Framework" with per-industry hand-coded client apps (healthcare/events/retail/etc. registries) — deleted.
- Not a native iOS/Android app — Capacitor was never actually initialized (no `capacitor.config.*`, no `ios`/`android` project) and has been removed from dependencies.
- Not a template-showcase product — the 28-page `templates-showcase` gallery and `standalone-app` generator have been deleted.
- No QR-code distribution path.

## Development Commands

```bash
# Development
npm run dev                    # Start hub-app dev server (Next.js)
npm run build                  # Build hub-app for production
npm run lint                   # ESLint
npm run test                   # Vitest, all workspaces

# Guide authoring (see .claude/skills/import-guide/SKILL.md — the normal day-to-day flow)
npm run client:create          # Scaffold a new guide config by hand
npm run client:validate        # Validate all configs in public/client-configs against TripConfigSchema
npm run configs:push           # Push all configs to Firestore
npm run configs:push:one -- <slug>   # Push a single config
node scripts/configs-push.js --dry   # Preview a push without writing

# Quality
npm run audit:theme            # Flag hardcoded colors / styling violations in client-facing code
npm run check:isolation        # Ensure demo pages and guide configs stay separate
npm run tsprune:hub / tsprune:ui     # Find unused TypeScript exports
npm run depcheck:root / :hub / :ui   # Find unused dependencies

# Dev log
npm run devlog:update          # Refresh DEV_LOG.md's latest-entry date
npm run devlog:append -- "msg" # Add a timestamped bullet to today's entry

# Git workflow (session-based, optional but recommended)
npm run git:session <name>     # Create a session branch
npm run git:save "message"     # Commit + push progress
npm run git:end                # Merge session branch to main and clean up
npm run git:status             # Check current branch/status
```

## Repository Structure

```
embr/
├── packages/
│   ├── hub-app/                          # Next.js app
│   │   ├── src/
│   │   │   ├── types/blocks-schema.ts    # TripConfigSchema — the single config shape
│   │   │   ├── presets/trip.ts           # Default blocks + theme for a new guide
│   │   │   ├── components/
│   │   │   │   ├── ClientApp.tsx         # config -> BlockRenderer
│   │   │   │   ├── clients/renderers/
│   │   │   │   │   ├── BlockRenderer.tsx # tabs/nav + dispatches to one view per block type
│   │   │   │   │   └── blocks/           # ScheduleBlockView, InfoBlockView, ContactsBlockView, UpdatesBlockView, GuideCard
│   │   │   │   └── AccessCodeEntry.tsx
│   │   │   ├── hooks/useClientConfig.tsx # loads + validates a guide (Firestore, then static JSON fallback)
│   │   │   └── lib/
│   │   │       ├── import.ts, import-prompt.ts, safeFetchUrl.ts   # dormant API-based AI import pipeline (see below)
│   │   │       └── firebase.ts, firebaseAdmin.ts
│   │   └── public/client-configs/        # static JSON fallback + local authoring output
│   └── ui/                               # @embr/ui (EmbrKit) — design system
│       └── src/
│           ├── components/embrkit.tsx    # React components
│           └── lib/embrkit-*.css         # design tokens + component styles
├── scripts/                              # config validation/push, dev-log, session/git workflow helpers
├── .claude/skills/import-guide/          # the day-to-day guide-authoring flow (see below)
└── DESIGN.md                             # visual design spec — source of truth for guide UI
```

## The Config Shape

Every guide is a `TripConfig` (`packages/hub-app/src/types/blocks-schema.ts`, zod): `clientId`, `name`, `expiry`, `status` (`preview`/`active`/`expired`), `theme` (colors + fonts), and a `blocks` array. A block is one of `schedule`, `info`, `contacts`, `updates` — each has its own schema and its own view component under `renderers/blocks/`. There is no other config shape; `useClientConfig.tsx` validates against `TripConfigSchema` at every load point and refuses anything that doesn't parse.

Adding a new block type means: extend the schema, add a view component, wire it into `BlockRenderer`. There is no per-client component to write.

## Authoring a Guide

The normal flow is the **`import-guide` Claude Code skill** (`.claude/skills/import-guide/SKILL.md`): paste or point at an itinerary in a Claude Code session working in this repo, it extracts a `TripConfig`, writes it to `public/client-configs/<clientId>.json`, validates it, and — only on explicit go-ahead — pushes it to Firestore via `configs-push.js`.

There is also a **dormant, API-based import pipeline** (`lib/import.ts` + `@anthropic-ai/sdk`, `import-prompt.ts`'s system prompt, `safeFetchUrl.ts`'s SSRF-safe fetcher, `scripts/prospect-demo.ts`) built for a future unattended endpoint (a public `/try` page) that doesn't exist yet. It's kept as-is, unused, for when that endpoint is built — do not delete it, and do not wire it up without a reason to.

## Firestore Data Model

```
client-configs/{clientId}        # PUBLIC, get-only — the live TripConfig
client-configs/{clientId}/updates/{id}   # PUBLIC, get+list — live updates, written server-side only
access-codes/{CODE}              # PUBLIC, get-only — code -> clientId lookup, no PII
private/{clientId}               # ADMIN-ONLY — paid state, edit tokens, planner contact info
```
Written by `scripts/configs-push.js`. There are no local Firestore credentials in most dev environments — use `--dry` to preview a push without writing.

## Design (DESIGN.md is authoritative)

`DESIGN.md` at the repo root defines the actual visual/brand rules (Ink/Paper/Signal color tokens, spacing grid, typography, motion, focus ring, elevation via borders not shadows, no emoji/em dashes/hype in interface copy, mobile-bottom-nav vs desktop-header-nav, etc). When building or reviewing anything in the guide-render path, check it against DESIGN.md's actual rules, not just "does it use the theme tokens" — token-compatibility and visual-quality compliance are different checks and both matter.

### EmbrKit Usage
`@embr/ui` components are a starting point, not a mandate — some of its shared CSS (e.g. card shadows, default icon sets) currently doesn't match DESIGN.md's rules. Prefer a small local primitive (see `GuideCard.tsx`) over fighting a shared component's CSS, rather than editing shared styles that ripple into unrelated consumers.

### Hub Shell vs. Guide Theming
The hub shell (the landing/access-code entry experience, not a specific guide) uses its own fixed colors and must not inherit a guide's theme. Guide theming (`config.theme.colors.*`) is scoped entirely inside the guide-render path (`ClientApp` → `BlockRenderer` → block views) and must never leak into hub shell components. Protected hub files:
- `packages/hub-app/src/app/globals.css`
- `packages/hub-app/src/app/layout.tsx`
- `packages/hub-app/src/app/page.tsx`
- `packages/hub-app/src/components/AccessCodeEntry.tsx`
- `packages/hub-app/src/components/LoadingScreen.tsx`

## Testing

```bash
npm run test              # Vitest, all workspaces
```
Covers `TripConfigSchema` (valid/invalid configs) and one render test per block view component. For UI changes, also verify manually: `npm run dev`, then `http://localhost:3000/c/<clientId>` or `?client=<clientId>` against a real or scratch config.

## Common Pitfalls

❌ Don't add a per-client React component — everything goes through `TripConfig` + `BlockRenderer`.
❌ Don't hardcode colors in the guide-render path — use `config.theme.colors.*` or DESIGN.md's tokens.
❌ Don't let guide theming touch the hub shell, or vice versa.
❌ Don't treat "renders without crashing" as "matches DESIGN.md" — check the actual visual rules (shadows, emoji, em dashes, spacing, focus ring, mobile nav placement).
❌ Don't wire up the dormant API import pipeline casually — it's there for a future public endpoint, not for routine use.

✅ Do use the `import-guide` skill for day-to-day guide creation.
✅ Do validate every config against `TripConfigSchema` before it goes near Firestore.
✅ Do check DESIGN.md when touching anything in the guide-render path.

## TypeScript Configuration

- Strict mode enabled.
- Path aliases: `@/*` → `packages/hub-app/src/*`, plus `@/components/*`, `@/lib/*`, `@/types/*`.

## Firebase/Firestore Setup

Service account via `GOOGLE_APPLICATION_CREDENTIALS`, `FIREBASE_SERVICE_ACCOUNT`, or `./firebase-service-account.json` at repo root (never commit the raw key). In CI/production, use a secret store or OIDC Workload Identity Federation.

---

**Remember**: Embr is a done-for-you live event guide, config-driven through a single block engine. Every decision should support that — not the old multi-industry framework vision.
