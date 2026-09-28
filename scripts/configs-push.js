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
const { getAdminDb, admin } = require('./lib/firebase-admin-init');
const { TripConfigSchema, isTripConfigShape } = require('./lib/trip-config-schema');

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

function assertLegacyRequiredFields(config, fileName) {
  // Phase A fallback for configs that don't have a `blocks` array (the old
  // template-based shape). Trip-shaped configs go through the full
  // TripConfigSchema validation in validateAndPreparePush instead.
  const required = ['clientId', 'name', 'version', 'expiry', 'theme', 'navigation'];
  const missing = required.filter((k) => !(k in config));
  if (missing.length) {
    throw new Error(`${fileName}: missing required fields: ${missing.join(', ')}`);
  }
}

/**
 * Validates and prepares one config for push. Returns:
 *   { publicPayload, accessCode|null, isTripConfig }
 * For a trip-shaped config (`blocks` array present): validates against
 * TripConfigSchema (throws with zod's own issue list on failure), returns
 * the *parsed* output as publicPayload — zod strips any unknown fields
 * (like an authoring-time `accessCode`) automatically since the schema
 * isn't `.passthrough()`'d, so the raw input's `accessCode` (if any) is
 * read separately here, before validation, for the access-codes upsert.
 * For a legacy config: unchanged Phase A behavior (fail-hard field check,
 * accessCode stays embedded in the pushed doc as before).
 */
function validateAndPreparePush(rawConfig, fileName) {
  if (isTripConfigShape(rawConfig)) {
    const accessCode = typeof rawConfig.accessCode === 'string' ? rawConfig.accessCode.toUpperCase() : null;
    const result = TripConfigSchema.safeParse(rawConfig);
    if (!result.success) {
      const issues = result.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`).join('; ');
      throw new Error(`${fileName}: TripConfigSchema validation failed: ${issues}`);
    }
    return { publicPayload: result.data, accessCode, isTripConfig: true };
  }

  assertLegacyRequiredFields(rawConfig, fileName);
  return { publicPayload: rawConfig, accessCode: null, isTripConfig: false };
}

async function pushConfigs() {
  const repoRoot = resolveRepoRoot();
  const configsDir = resolveConfigsDir(repoRoot);
  const onlySlug = getArg('--only');
  const dryRun = hasFlag('--dry');
  const collectionName = getArg('--collection') || 'client-configs';

  const db = getAdminDb(repoRoot);

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
    const rawCfg = readJsonFile(filePath);
    if (!rawCfg.clientId) rawCfg.clientId = slug;

    const { publicPayload, accessCode, isTripConfig } = validateAndPreparePush(rawCfg, base);

    const docRef = db.collection(collectionName).doc(publicPayload.clientId);
    const expireAt = isTripConfig && publicPayload.expiry
      ? admin.firestore.Timestamp.fromDate(new Date(publicPayload.expiry))
      : null;

    // `expireAt`/`paidState.isPaid` are only ever set here on first
    // creation. Once a trip exists, the Stripe webhook (Phase D) owns
    // paidState and may set expireAt to null on payment to remove TTL
    // eligibility — a plain re-push (e.g. editing the schedule) must never
    // clobber that back to a stale timestamp or isPaid:false.
    const privateRef = isTripConfig ? db.collection('private').doc(publicPayload.clientId) : null;
    const isFirstPush = isTripConfig && !dryRun ? !(await privateRef.get()).exists : false;

    if (dryRun) {
      console.log(`- would set ${publicPayload.clientId} from ${base}${accessCode ? ` (access code ${accessCode})` : ''}`);
    } else {
      batch.set(
        docRef,
        isTripConfig && isFirstPush ? { ...publicPayload, expireAt } : publicPayload,
        { merge: true }
      );

      if (isTripConfig) {
        // Sensitive/internal state lives under private/, admin-SDK only —
        // never in the public client-configs doc.
        if (isFirstPush) {
          batch.set(privateRef, { paidState: { isPaid: false }, expireAt }, { merge: true });
        }

        if (accessCode) {
          const codeRef = db.collection('access-codes').doc(accessCode);
          batch.set(codeRef, { tripId: publicPayload.clientId, revoked: false }, { merge: true });
        }
      }
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


