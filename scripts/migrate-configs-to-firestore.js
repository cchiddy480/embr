const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path to your service account key
const serviceAccount = require('../firebase-service-account.json');

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