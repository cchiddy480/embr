#!/usr/bin/env node

/*
  Embr Review Logger (Phase C)
  - Logs the outcome of a human review of an AI-imported guide to
    import-reviews/{id} in Firestore: { importId, timestamp, outcome,
    fieldsChanged }.
  - fieldsChanged is computed as an objective deep-diff between the
    config file as scripts/prospect-demo.js first wrote it
    (prospects/output/<clientId>.original.json) and the config file as it
    stands now (packages/hub-app/public/client-configs/<clientId>.json) —
    so "outcome: no_fixes" can only be recorded when nothing actually
    changed, not just because it "looked fine".
  - This IS what scripts/review-streak.js reads to decide whether human
    review can be made optional yet — see the production plan's exact
    criterion (10 strictly consecutive no_fixes entries).

  Usage:
    node scripts/log-review.js <clientId>              # outcome inferred: no_fixes if nothing changed, else fixed
    node scripts/log-review.js <clientId> --no-fixes    # assert no changes; errors if the diff isn't actually empty
    node scripts/log-review.js <clientId> --rejected    # outcome: rejected (this draft isn't going to a prospect)
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getAdminDb } = require('./lib/firebase-admin-init');
const { deepDiff } = require('./lib/deep-diff');

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function main() {
  const clientId = process.argv[2];
  if (!clientId || hasFlag('--help') || hasFlag('-h')) {
    console.log(`
📝 Embr Review Logger

Usage:
  node scripts/log-review.js <clientId> [--no-fixes | --rejected]
    `);
    process.exit(clientId ? 0 : 1);
  }

  const currentPath = path.join(process.cwd(), 'packages', 'hub-app', 'public', 'client-configs', `${clientId}.json`);
  const originalPath = path.join(process.cwd(), 'prospects', 'output', `${clientId}.original.json`);

  if (!fs.existsSync(currentPath)) {
    console.error(`❌ Current config not found: ${currentPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(originalPath)) {
    console.error(`❌ No original snapshot found for ${clientId} at ${originalPath}. This only works for guides created via scripts/prospect-demo.js.`);
    process.exit(1);
  }

  const current = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
  const original = JSON.parse(fs.readFileSync(originalPath, 'utf8'));
  const fieldsChanged = deepDiff(original, current);

  let outcome;
  if (hasFlag('--rejected')) {
    outcome = 'rejected';
  } else if (hasFlag('--no-fixes')) {
    if (fieldsChanged.length > 0) {
      console.error(`❌ --no-fixes asserted but ${fieldsChanged.length} field(s) actually changed: ${fieldsChanged.join(', ')}`);
      console.error(`   Run without --no-fixes to log this honestly as 'fixed'.`);
      process.exit(1);
    }
    outcome = 'no_fixes';
  } else {
    outcome = fieldsChanged.length > 0 ? 'fixed' : 'no_fixes';
  }

  (async () => {
    const db = getAdminDb();
    const importId = clientId;
    const reviewId = crypto.randomUUID();
    await db.collection('import-reviews').doc(reviewId).set({
      importId,
      timestamp: Date.now(),
      outcome,
      fieldsChanged,
    });
    console.log(`✅ Logged review for ${clientId}: outcome=${outcome}${fieldsChanged.length ? `, fieldsChanged=[${fieldsChanged.join(', ')}]` : ''}`);
  })().catch((e) => {
    console.error('❌ Failed to log review:', e.message);
    process.exit(1);
  });
}

main();
