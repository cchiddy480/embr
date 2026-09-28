# EMBR KNOWLEDGE LEDGER
*Project reference: what Embr is, how it's built, and how we got here.*

## Table of Contents
1. [What Embr Is](#what-embr-is)
2. [Data Model](#data-model)
3. [Architecture](#architecture)
4. [Design System & Brand](#design-system--brand)
5. [Guide Authoring](#guide-authoring)
6. [Firestore](#firestore)
7. [Current Status](#current-status)
8. [History: How We Got Here](#history-how-we-got-here)

---

## What Embr Is

Embr sells a **done-for-you live event/trip guide**: a planner hands over an itinerary, Embr turns it into one branded link — schedule, contacts, key info, live updates — that guests actually open, instead of a PDF or a scroll of WhatsApp messages. Positioning: *"the pinned link in your WhatsApp group, not a replacement for it."*

This is a deliberate narrowing from an earlier, broader "Universal Micro-App Framework" concept (breathing timers, business menus, property showcases, etc., across many industries). That direction is retired — see [History](#history-how-we-got-here). Everything below describes the current, singular product.

The marketing site is a separate repo, [`cchiddy480/embr-landing`](https://github.com/cchiddy480/embr-landing) (`build-embr.co.uk`), kept apart deliberately (different framework versions, independent deploy cadence, no shared code with this repo). Its pricing and positioning copy describe this product and can drift — when either changes here, check it against `embr-landing`'s `src/app/page.tsx`.

---

## Data Model

Every guide is a **`TripConfig`** — one zod schema, one shape, no exceptions. Defined in `packages/hub-app/src/types/blocks-schema.ts`:

```ts
TripConfig = {
  clientId: string;              // slug, e.g. "smith-jones-wedding-2026"
  name: string;
  expiry: string;                 // ISO datetime — drives the expired-guide state
  status: 'preview' | 'active' | 'expired';
  theme: {
    colors: { primary, secondary, background, surface, text, textSecondary, border? };
    fonts: { heading, body };
  };
  blocks: Block[];                // discriminated union, see below
}
```

**Block types** (each with its own schema + its own view component under `renderers/blocks/`):
- `schedule` — day-grouped events (title, time, location, map link, timezone notes)
- `info` — free-text sections, optionally with a venue block
- `contacts` — name/role/phone/whatsapp/email cards
- `updates` — live, Firestore-backed announcements (the only block with a real-time listener; content isn't in the config, it's read from `client-configs/{clientId}/updates`)

There is no other config shape anywhere in the app. `useClientConfig.tsx` runs `TripConfigSchema.safeParse()` at every load point — cached, Firestore, and static-JSON-fallback — and refuses anything that doesn't validate rather than rendering a guess.

---

## Architecture

```
packages/
├── hub-app/                              Next.js 14 app
│   ├── src/types/blocks-schema.ts        TripConfigSchema — single source of truth
│   ├── src/presets/trip.ts               default blocks + DEFAULT_THEME for a new guide
│   ├── src/components/
│   │   ├── ClientApp.tsx                 one line: config -> <BlockRenderer config={config} />
│   │   ├── clients/renderers/
│   │   │   ├── BlockRenderer.tsx         nav + dispatches each block to its view component
│   │   │   └── blocks/                   ScheduleBlockView, InfoBlockView, ContactsBlockView, UpdatesBlockView, GuideCard
│   │   └── AccessCodeEntry.tsx, LoadingScreen.tsx   hub shell (fixed colors, never themed)
│   ├── src/hooks/useClientConfig.tsx     loads + validates a guide: cache -> Firestore -> static JSON -> "no guide found"
│   └── src/lib/
│       ├── import.ts, import-prompt.ts, safeFetchUrl.ts   dormant API-based AI import pipeline
│       └── firebase.ts, firebaseAdmin.ts
└── ui/                                   @embr/ui (EmbrKit) — shared components + CSS tokens
```

There is **no per-client code**. A new guide is a new `TripConfig` JSON document, nothing else — no component to write, no registry to update, no loader to regenerate.

### Rendering path
`page.tsx` resolves a `clientId` or access code → `useClientConfig` loads and validates a `TripConfig` → `ClientApp` hands it straight to `BlockRenderer` → `BlockRenderer` renders nav (tabs) and dispatches each configured block to its view component. Every block view is themed purely from `config.theme.colors.*` (inline styles / CSS custom properties scoped to the guide subtree) — nothing in the render path reads or depends on the hub shell's global CSS, and nothing in it ever touches `document.body` directly, so guide theming structurally cannot leak into the hub shell.

### Guide lifecycle
`status` (`preview`/`active`/`expired`) plus `expiry` drive what a guest sees: a live guide, or an honest branded "this trip has ended" state — never a raw 404 or a broken render. An unresolvable `clientId`/access code surfaces the same honest "no guide found" state rather than falling back to a fabricated placeholder config.

---

## Design System & Brand

**`DESIGN.md`** (repo root) is the authoritative visual spec: Ink/Paper/Signal color tokens, an 8px spacing grid, typography rules (Geist Mono for time/date/version/status), motion (150–500ms, respects `prefers-reduced-motion`), elevation via borders only (no shadow/glow/gradient), a 2px focus ring with 3px offset in the guide's own primary color, ≥44px tap targets, mobile nav fixed at the bottom vs. desktop nav in the header, and interface-copy rules (no em dashes, emoji, jargon, or hype). Check any guide-render-path change against these actual rules — a component can be fully theme-token-compatible and still violate DESIGN.md's layout/typography/copy rules; both checks matter, and only checking token compatibility has caused real regressions before (see History).

**EmbrKit** (`@embr/ui`) is the shared component library — a starting point, not a mandate. Some of its shared CSS (card drop-shadows, default emoji icon sets on `EmbrKitQuickContact`/`EmbrKitAlert`) currently doesn't match DESIGN.md. Prefer a small local primitive scoped to the guide-render path (see `GuideCard.tsx`, a plain bordered panel) over editing shared EmbrKit CSS that ripples into unrelated consumers.

**Hub shell vs. guide theming**: the hub shell (access-code entry, loading screen) has fixed colors and never inherits a guide's theme; guide theming is scoped entirely inside `ClientApp` → `BlockRenderer` → block views. See `CLAUDE.md`'s Protected Hub Files list.

---

## Guide Authoring

**Day-to-day flow**: the **`import-guide` Claude Code skill** (`.claude/skills/import-guide/SKILL.md`). In a Claude Code session working in this repo: paste or point at an itinerary → the skill extracts a `TripConfig` following the same extraction discipline as the API pipeline's system prompt (never invent times/venues/contacts, preserve timezones exactly as written, flag ambiguity rather than silently resolving it) → writes it to `public/client-configs/<clientId>.json` → validates against `TripConfigSchema` → only on explicit go-ahead, pushes to Firestore via `scripts/configs-push.js` and reports the live link.

**Dormant API pipeline** (`lib/import.ts`, `@anthropic-ai/sdk`, `import-prompt.ts`, `safeFetchUrl.ts`, `scripts/prospect-demo.ts`): built for a future *headless, unattended* caller — a public `/try` page that doesn't exist yet. Every guide today is founder-run and human-reviewed anyway, so the interactive skill above replaced this for routine use. Kept in the repo, unused, deliberately — it's exactly what a future self-serve endpoint would need, and costs nothing to leave dormant.

---

## Firestore

```
client-configs/{clientId}                # PUBLIC, get-only — the live TripConfig
client-configs/{clientId}/updates/{id}   # PUBLIC, get+list — live updates, written server-side only
access-codes/{CODE}                      # PUBLIC, get-only — code -> clientId, no PII
private/{clientId}                       # ADMIN-ONLY — paidState, expireAt (TTL); reachable only via firebase-admin
```
Written exclusively by `scripts/configs-push.js`, which validates before writing, strips any access code off the public payload into its own `access-codes/{CODE}` doc, and upserts `private/{clientId}` with `paidState.isPaid: false` on first push. `node scripts/configs-push.js --dry` previews a push without writing — the default path in most dev environments, which don't have local Firestore credentials.

---

## Current Status

- **Schema + block engine**: done. `TripConfigSchema`, `BlockRenderer`, all four block views, Vitest coverage.
- **Firestore + config pipeline**: done. `configs-push.js` and `validate-client-config.js` both validate against the zod schema; access codes live in Firestore, not a hardcoded mapping.
- **Guide authoring**: done, via the `import-guide` skill. The API-based pipeline exists but is dormant.
- **Repo cleanup**: done. Every file, script, dependency, and doc describing the old multi-industry/native-app/QR-code vision has been removed (legacy renderers, industry client folders, `standalone-app`, `templates-showcase`, Capacitor/QR dependencies, stale docs). What remains matches this document.
- **Self-serve loop** (public `/try`, Stripe Checkout, edit links, referral): not built. Every guide today is created by hand via the skill and sold directly — this is a deliberate sequencing choice (sell before building more automation), not an oversight.
- **DESIGN.md compliance in the block engine**: done. The four block view components (`ScheduleBlockView`, `InfoBlockView`, `ContactsBlockView`, `UpdatesBlockView`), `GuideCard`, and `BlockRenderer` itself all follow DESIGN.md's rules — no em dashes, no emoji, border-only elevation, monospace time/date/status, desktop nav in the header, mobile nav fixed at the bottom, a 2px focus ring in the guide's own primary color. `BlockRenderer` has no dependency on `@embr/ui` beyond types: its own small tab component replaced `EmbrKitTabs` (which overflowed on mobile and left dead whitespace), and dropping `EmbrKitProvider` closed a real bug where its theme application mutated `document.documentElement`'s CSS variables globally — a second, subtler version of the guide-theme-leaking-into-the-hub-shell risk this component otherwise structurally avoids by never touching `document.body`.

---

## History: How We Got Here

Embr started as a broader "Universal Micro-App Framework" — the idea that the same engine could produce *any* single-purpose branded tool (breathing timers, business menus, property showcases, event guides) across many industries, distributed as a native-feeling app via Capacitor and QR codes. That version of the repo had: a per-client React component for every customer (hand-coded, one folder per industry), a static registry + auto-generated lazy loader mapping `clientId` → component, five industry-specific renderers, a 28-page template showcase gallery, a standalone-app generator for producing branded native builds, and a full Capacitor dependency stack.

None of that ever shipped to a real customer, and Capacitor was never actually initialized (no `capacitor.config.*`, no `ios`/`android` project directory ever existed). The product direction narrowed to a single vertical — live trip/event guides — built on one config-driven block engine instead of per-client code. Once that engine (`TripConfig` + `BlockRenderer`) covered every real use case, the old multi-industry machinery was pure dead weight: two hand-coded demo clients with no real customer behind them, five unused renderers, an unused native-app dependency stack, and docs that actively misdescribed the product to anyone (human or AI) reading them.

The full deletion pass removed: the 5 template renderers and their industry-folder registry/loader system; the 2 hand-coded demo clients; all 13 old demo `client-configs`; the 28-page `templates-showcase`; `packages/standalone-app`; the entire `@capacitor/*` dependency stack plus QR-code libraries; several already-dead scripts and two already-broken npm scripts; and the stale `docs/` directory and `PRODUCTION_CHECKLIST.md`, both of which described the old vision in detail. `README.md`, `CLAUDE.md`, this ledger, and `DEV_LOG.md` were rewritten to match — see the corresponding `DEV_LOG.md` entry for the date this happened.

A separate, still-visible artifact of an earlier design system (LiftKit-derived golden-ratio spacing, a fixed teal `#0F766E` brand color) has since been superseded by a Codex-authored redesign (`DESIGN.md`, Ink/Paper/Signal tokens) — treat `DESIGN.md` as current and anything describing golden-ratio spacing or a fixed teal brand color as historical.
