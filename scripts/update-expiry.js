const admin = require('firebase-admin');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { key: null, clientIds: [], expiry: '2026-12-31T23:59:59Z' };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--key') out.key = args[++i];
    else if (a === '--expiry') out.expiry = args[++i];
    else if (a === '--clients') {
      const list = args[++i] || '';
      out.clientIds = list.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  if (!out.key) throw new Error('Missing --key <serviceAccountPath>');
  if (out.clientIds.length === 0) throw new Error('Missing --clients <id1,id2,...>');
  return out;
}

async function main() {
  const { key, clientIds, expiry } = parseArgs();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const serviceAccount = require(path.resolve(key));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  const db = admin.firestore();

  for (const clientId of clientIds) {
    await db.collection('client-configs').doc(clientId).set({ expiry }, { merge: true });
    console.log(`Updated ${clientId} expiry → ${expiry}`);
  }
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });


