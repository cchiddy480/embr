// Server-only Firebase Admin SDK setup.
//
// Never import this from a client component — it reads the service account
// key from FIREBASE_SERVICE_ACCOUNT and bypasses firestore.rules entirely.
// All privileged writes (config pushes, Stripe webhook activation, edit-link
// updates) go through this, never through the client `firebase` SDK.
import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const ADMIN_APP_NAME = 'embr-admin';

function getAdminApp(): App {
  // Named app + getApps().find (not getApps().length) avoids re-initializing
  // on Next.js dev-mode hot reload and on serverless cold-start reuse, even
  // if other named Firebase apps exist in the same process.
  const existing = getApps().find((app) => app.name === ADMIN_APP_NAME);
  if (existing) return existing;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error(
      '[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT is not set. Server-side Firestore access is unavailable.'
    );
  }

  const serviceAccount = JSON.parse(raw);
  return initializeApp({ credential: cert(serviceAccount) }, ADMIN_APP_NAME);
}

export const adminDb = getFirestore(getAdminApp());
