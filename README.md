# Embr

Turn an itinerary into a live trip/event guide your guests will actually open.

> The pinned link in your WhatsApp group, not a replacement for it.

Embr is a **done-for-you live event guide**: send us an itinerary, we turn it into one branded link — schedule, contacts, key info, live updates — instead of a PDF nobody re-opens or messages buried in a group chat.

## How It Works

Every guide is a single config document (a `TripConfig`) rendered through one block engine — there's no per-client code, no template catalog, no app install. A guide is built by hand from a real itinerary (via a Claude Code skill, see below), pushed to Firestore, and served at a branded link.

## Architecture

```
embr/
├── packages/
│   ├── hub-app/          # Next.js 14 app: the block engine, guide rendering, config loading
│   └── ui/                # @embr/ui (EmbrKit) — shared design system
├── scripts/                # Config validation/push, dev-log, git-session helpers
├── .claude/skills/         # import-guide — the day-to-day guide-authoring flow
├── DESIGN.md               # Visual design spec — source of truth for guide UI
├── CLAUDE.md                # Guidance for AI coding assistants working in this repo
└── EMBR_KNOWLEDGE_LEDGER.md # Full project reference
```

## Quick Start

### Prerequisites
- Node.js ≥ 18, npm ≥ 9

### Installation

```bash
git clone https://github.com/cchiddy480/embr.git
cd embr
npm install
npm run dev
```

The hub app runs at `http://localhost:3000`.

### Environment Setup

Firebase config for the client SDK goes in `packages/hub-app/.env.local`. Firestore admin access (needed for `scripts/configs-push.js`) comes from a service account — see `CLAUDE.md`'s Firebase/Firestore Setup section. Never commit a raw service account key.

## Creating a Guide

The normal flow is the `import-guide` Claude Code skill (`.claude/skills/import-guide/SKILL.md`) — paste or point at an itinerary in a Claude Code session in this repo, and it extracts a `TripConfig`, validates it, and (on your go-ahead) pushes it live.

To do it by hand instead:

```bash
# Scaffold a new config
npm run client:create

# Validate all configs under packages/hub-app/public/client-configs/
npm run client:validate

# Preview a Firestore push without writing
node scripts/configs-push.js --dry

# Push one guide
npm run configs:push:one -- <clientId>
```

View it locally at `http://localhost:3000/c/<clientId>` or `http://localhost:3000/?client=<clientId>`.

## Development

```bash
npm run build          # Production build
npm run lint           # ESLint
npm run test           # Vitest
npm run audit:theme    # Flag hardcoded colors in client-facing code
```

See `CLAUDE.md` for the full command reference, data model, and architecture notes.

## Contributing

1. Create a branch (`npm run git:session <name>` or `git checkout -b feature/your-feature`)
2. Make your changes, commit
3. Push and open a pull request

## License

MIT.
