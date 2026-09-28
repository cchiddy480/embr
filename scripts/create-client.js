#!/usr/bin/env node

/*
  Embr Client Creator (Phase B)
  - Scaffolds a new trip guide config conforming to TripConfigSchema
    (packages/hub-app/src/types/blocks-schema.ts) with the standard
    schedule/contacts/updates blocks, ready to fill in by hand or via
    scripts/prospect-demo.js's AI import.
  - Only ever writes a JSON file — no custom React component, no registry
    edits, no ACCESS_CODE_MAPPING edits. The old "template-based" and
    "custom component" modes (and the industry-registry-clobbering code
    that went with them) are gone: every Phase B guide renders through
    BlockRenderer, and access codes live in Firestore (see
    scripts/configs-push.js), not a hardcoded map in source.

  Usage:
    node scripts/create-client.js --name "Smith Wedding" --access-code SMITH2026
    node scripts/create-client.js --name "Acme Offsite" --access-code ACME2026 --expiry 2026-12-01T00:00:00Z
*/

const fs = require('fs');

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function kebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Mirrors packages/hub-app/src/presets/trip.ts — keep both in sync by hand
// (see scripts/lib/trip-config-schema.js for why scripts stay plain JS).
const TRIP_PRESET_BLOCKS = [
  { type: 'schedule', id: 'schedule', title: 'Schedule', events: [] },
  { type: 'contacts', id: 'contacts', title: 'Contacts', contacts: [] },
  { type: 'updates', id: 'updates', title: 'Updates' },
];

// Matches the default theme documented in CLAUDE.md's "Create Firestore
// Config" example — a sane, brand-neutral starting point to be overridden
// with the client's real colors before sending anything to a prospect.
const DEFAULT_THEME = {
  colors: {
    primary: '#0F766E',
    secondary: '#22C55E',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  fonts: { heading: 'Inter', body: 'Inter' },
};

function createTripConfig(name, clientId, expiry) {
  return {
    clientId,
    name,
    expiry,
    status: 'preview',
    theme: DEFAULT_THEME,
    blocks: TRIP_PRESET_BLOCKS,
  };
}

function main() {
  const name = getArg('--name');
  const accessCode = getArg('--access-code');
  const expiryArg = getArg('--expiry');
  const help = hasFlag('--help') || hasFlag('-h');

  if (help || !name) {
    console.log(`
🚀 Embr Client Creator (Phase B)

Usage:
  node scripts/create-client.js --name "Client Name" [--access-code CODE] [--expiry ISO-DATETIME]

Options:
  --name         Trip/event name, e.g. "Smith Wedding" (required)
  --access-code  Short code guests can use instead of the direct link (optional,
                 registered in Firestore by configs-push.js, not stored in the
                 public config itself)
  --expiry       ISO 8601 datetime the guide expires (default: 1 year from now)
  --help, -h     Show this help

Next steps after creating:
  1. Edit the generated JSON: fill in real schedule/contacts, adjust theme colors.
  2. node scripts/configs-push.js --only <clientId>
    `);
    return;
  }

  const year = new Date().getFullYear();
  const clientId = `${kebabCase(name)}-${year}`;
  const expiry = expiryArg || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const config = createTripConfig(name, clientId, expiry);
  if (accessCode) config.accessCode = accessCode.toUpperCase();

  const configPath = `packages/hub-app/public/client-configs/${clientId}.json`;
  if (fs.existsSync(configPath)) {
    console.error(`❌ ${configPath} already exists — pick a different name or delete it first.`);
    process.exit(1);
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`✅ Config created: ${configPath}`);
  console.log(`\n📋 Next steps:`);
  console.log(`1. Fill in real schedule/contacts and theme colors in ${configPath}`);
  console.log(`2. node scripts/validate-client-config.js --file ${configPath}`);
  console.log(`3. node scripts/configs-push.js --only ${clientId}`);
  if (accessCode) console.log(`\n🔗 Access code: ${config.accessCode}`);
}

main();
