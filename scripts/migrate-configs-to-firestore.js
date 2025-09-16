const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Resolve service account path (CLI arg: --key <path>)
function resolveServiceAccount() {
  const args = process.argv.slice(2);
  const keyFlagIndex = args.indexOf('--key');
  let keyPath = keyFlagIndex !== -1 ? args[keyFlagIndex + 1] : null;
  if (!keyPath) {
    // fallback to default location relative to repo root
    keyPath = path.join(__dirname, '..', 'firebase-service-account.json');
  }
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Service account key not found at: ${keyPath}. Provide with --key <path>`);
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(keyPath);
}
const serviceAccount = resolveServiceAccount();

// Path to your configs directory
const CONFIGS_DIR = path.join(__dirname, '../packages/hub-app/public/client-configs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function migrateConfigs() {
  const files = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const filePath = path.join(CONFIGS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(raw);
    const clientId = config.clientId || path.basename(file, '.json');
    await db.collection('client-configs').doc(clientId).set(config, { merge: true });
    console.log(`Migrated ${file} as ${clientId}`);
  }
  console.log('Migration complete!');
}

migrateConfigs().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 