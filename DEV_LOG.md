## Embr Dev Log

Purpose: a concise, chronological record of notable changes and decisions. Reviewed at the start of a session alongside `EMBR_KNOWLEDGE_LEDGER.md`.

Newest entries at the top. Update with `npm run devlog:update` (ensures today's heading exists) and `npm run devlog:append -- "message"` (adds a bullet under today's heading).

## Entries

### 2026-09-28
- Repo-wide cleanup: removed everything left over from the old "Universal Micro-App Framework" direction (multi-industry per-client renderers and registry/loader system, 2 hand-coded demo clients, 13 old template-showcase demo configs, the 28-page `templates-showcase` gallery, `standalone-app`, the entire Capacitor + QR-code dependency stack, several dead scripts, two already-broken npm scripts, stray root files, `docs/` and `PRODUCTION_CHECKLIST.md`). Rewrote `README.md`, `CLAUDE.md`, and `EMBR_KNOWLEDGE_LEDGER.md` to describe the current product — a single config-driven `TripConfig`/`BlockRenderer` block engine — instead of the retired framework vision. `ClientApp.tsx`/`useClientConfig.tsx` simplified to the single `TripConfig` shape, dropping the old generic-fallback-theme dead code.
- Brought the four block view components (Schedule/Info/Contacts/Updates) and a new `GuideCard` primitive into compliance with `DESIGN.md`'s actual rules (no em dashes, no emoji, border-only elevation instead of `EmbrKitCard`'s drop-shadow, monospace time/date) — found via direct user feedback on a rendered test guide, not caught by an earlier token-compatibility-only check.
- Ran a timed, real end-to-end guide-creation test (import → validate → local render) to measure actual time-to-guide.
- Rewrote `BlockRenderer.tsx` for DESIGN.md compliance: replaced `EmbrKitTabs` (mobile overflow, dead whitespace) with a small local tab component — desktop nav in the header, mobile nav fixed at the bottom, per DESIGN.md. Dropped `EmbrKitProvider`/`EmbrKitContainer` entirely; nothing in the guide-render path reads the CSS variables it set, and removing it closed a real bug where its theme application mutated `document.documentElement` globally, not scoped to the guide. Used the `embr-landing` marketing site's polished `GuidePreview` demo component as the concrete reference for the tab treatment and status-pill styling. Verified live via Playwright at 1280px, 375px, and DESIGN.md's 320px minimum (no horizontal overflow at any width), plus a new `BlockRenderer.test.tsx`.

### Earlier (condensed)
The detailed daily logs before this date described the earlier "Universal Micro-App Framework" direction in depth and have been retired along with that direction — see `EMBR_KNOWLEDGE_LEDGER.md`'s History section for the shape of what changed and why. Summary of the major prior milestones, for continuity:
- EmbrKit design system built out (component library + CSS tokens).
- Template-showcase gallery and per-industry hand-coded demo clients built (later deleted — no real customer behind either).
- Hub app visual baseline established and protected.
- Pivot to a single product (live trip/event guides) on one config-driven block engine: `TripConfigSchema`, `BlockRenderer`, Firestore data model (`client-configs`/`access-codes`/`private`), the `import-guide` Claude Code skill, and a dormant API-based import pipeline kept for a future self-serve endpoint.
- A brand/design overhaul (`DESIGN.md`, Ink/Paper/Signal tokens) superseded the original golden-ratio/fixed-teal EmbrKit visual language.
