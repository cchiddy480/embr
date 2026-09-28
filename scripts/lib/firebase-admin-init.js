/*
  Shared firebase-admin bootstrap for CLI scripts (configs-push.js,
  log-review.js, review-streak.js). Extracted from configs-push.js so the
  service-account resolution logic (env var / file / ADC) lives in one
  place instead of being copy-pasted per script.
*/

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

function loadServiceAccount(repoRoot) {
  const gac = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (gac && fs.existsSync(gac)) {
    return JSON.parse(fs.readFileSync(gac, 'utf8'));
  }
  const fsa = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (fsa) {
    if (fsa.trim().startsWith('{')) {
      return JSON.parse(fsa);
    }
    const p = path.resolve(fsa);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  const fallback = path.join(repoRoot, 'firebase-service-account.json');
  if (fs.existsSync(fallback)) {
    return JSON.parse(fs.readFileSync(fallback, 'utf8'));
  }
  // No explicit key found. Fall back to Application Default Credentials (ADC),
  // which supports OIDC (google-github-actions/auth) in CI without static keys.
  return null;
}

/** Initializes firebase-admin (idempotent) and returns a Firestore instance. */
function getAdminDb(repoRoot = process.cwd()) {
  if (!(admin.apps && admin.apps.length)) {
    const serviceAccount = loadServiceAccount(repoRoot);
    if (serviceAccount) {
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    } else {
      admin.initializeApp({ credential: admin.credential.applicationDefault() });
    }
  }
  return admin.firestore();
}

module.exports = { loadServiceAccount, getAdminDb, admin };
