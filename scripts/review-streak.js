#!/usr/bin/env node

/*
  Embr Review Streak (Phase C)
  - Prints the current consecutive "no_fixes" streak from import-reviews,
    newest first. Per the production plan: human review of an AI import
    can be made optional only once the most recent 10 entries are ALL
    no_fixes, strictly consecutive — one "fixed" or "rejected" anywhere in
    that window resets the streak to zero. This script only reports the
    number; turning review off is a separate, deliberate decision, never
    automatic.

  Usage:
    node scripts/review-streak.js
*/

const { getAdminDb } = require('./lib/firebase-admin-init');

const STREAK_TARGET = 10;

async function main() {
  const db = getAdminDb();
  const snap = await db.collection('import-reviews').orderBy('timestamp', 'desc').limit(50).get();

  if (snap.empty) {
    console.log('📊 No reviews logged yet.');
    return;
  }

  let streak = 0;
  for (const doc of snap.docs) {
    const { outcome } = doc.data();
    if (outcome === 'no_fixes') {
      streak += 1;
    } else {
      break;
    }
  }

  console.log(`📊 Current no_fixes streak: ${streak} (${snap.size} reviews checked)`);
  if (streak >= STREAK_TARGET) {
    console.log(`✅ Streak has reached the plan's threshold (${STREAK_TARGET}) — human review of AI imports may be turned off as a deliberate decision, if you want to.`);
  } else {
    console.log(`   ${STREAK_TARGET - streak} more consecutive no_fixes needed before that's an option.`);
  }
}

main().catch((e) => {
  console.error('❌ Failed to compute review streak:', e.message);
  process.exit(1);
});
