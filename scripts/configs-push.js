#!/usr/bin/env node

/*
  Embr Configs Push
  - Pushes JSON configs from packages/hub-app/public/client-configs to Firestore
  - Reuses firebase-admin with a service account
  - Supports pushing all or a single config
  - Safe by default: merge writes; optional --dry run

  Usage:
    node scripts/configs-push.js                  # push all
    node scripts/configs-push.js --only slug      # push only slug.json
    node scripts/configs-push.js --dir ./path     # custom dir
    node scripts/configs-push.js --dry            # dry run

  Service account resolution order:
    1) GOOGLE_APPLICATION_CREDENTIALS (path)
    2) FIREBASE_SERVICE_ACCOUNT (path or JSON string)
    3) ./firebase-service-account.json (repo root)
*/

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Best-effort load of .env.local/.env if dotenv is available
try {
  const dotenv = require('dotenv');
  const repoRoot = process.cwd();
  const envLocal = path.join(repoRoot, '.env.local');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  dotenv.config();
} catch (_) {
  // dotenv not installed; environment variables may still be set by shell/CI
}

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function resolveRepoRoot() {
  return process.cwd();
}

function resolveConfigsDir(repoRoot) {
  const dirArg = getArg('--dir');
  const defaultDir = path.join(repoRoot, 'packages', 'hub-app', 'public', 'client-configs');
  return path.resolve(dirArg ? dirArg : defaultDir);
}

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

function initFirebaseAdmin(serviceAccount) {
  if (admin.apps && admin.apps.length) return;
  if (serviceAccount) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } else {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
  }
}

function listConfigFiles(configsDir) {
  if (!fs.existsSync(configsDir)) return [];
  return fs
    .readdirSync(configsDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(configsDir, f));
}

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON: ${filePath}`);
  }
}

function warnIfMissingFields(config, fileName) {
  const required = ['clientId', 'name', 'version', 'expiry', 'theme', 'navigation'];
  const missing = required.filter((k) => !(k in config));
  if (missing.length) {
    console.warn(`[warn] ${fileName}: missing fields: ${missing.join(', ')} (pushing anyway)`);
  }
}

async function pushConfigs() {
  const repoRoot = resolveRepoRoot();
  const configsDir = resolveConfigsDir(repoRoot);
  const onlySlug = getArg('--only');
  const dryRun = hasFlag('--dry');
  const collectionName = getArg('--collection') || 'client-configs';

  const serviceAccount = loadServiceAccount(repoRoot);
  initFirebaseAdmin(serviceAccount);
  const db = admin.firestore();

  const files = listConfigFiles(configsDir);
  if (!files.length) {
    console.log(`[info] No JSON files found in ${configsDir}`);
    return;
  }

  const selectedFiles = onlySlug
    ? files.filter((f) => path.basename(f).replace(/\.json$/, '') === onlySlug)
    : files;

  if (onlySlug && !selectedFiles.length) {
    console.error(`[error] --only ${onlySlug} not found in ${configsDir}`);
    process.exit(1);
  }

  console.log(`[info] Pushing ${selectedFiles.length} config(s) to collection '${collectionName}'${dryRun ? ' [dry-run]' : ''}`);

  const batch = db.batch();
  let count = 0;

  for (const filePath of selectedFiles) {
    const base = path.basename(filePath);
    const slug = base.replace(/\.json$/, '');
    const cfg = readJsonFile(filePath);
    if (!cfg.clientId) cfg.clientId = slug;
    warnIfMissingFields(cfg, base);

    const docRef = db.collection(collectionName).doc(cfg.clientId);
    if (dryRun) {
      console.log(`- would set ${cfg.clientId} from ${base}`);
    } else {
      batch.set(docRef, cfg, { merge: true });
    }
    count += 1;
  }

  if (!dryRun && count > 0) {
    await batch.commit();
    console.log(`[ok] Pushed ${count} config(s).`);
  } else if (dryRun) {
    console.log('[ok] Dry run complete.');
  }
}

pushConfigs().catch((err) => {
  console.error('[error] Push failed:', err.message);
  process.exit(1);
});


