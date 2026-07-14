import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_GA_MEASUREMENT_ID,
};

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app, db, auth, analytics;

if (isConfigured) {
  try {
    app       = initializeApp(firebaseConfig);
    db        = getFirestore(app);
    auth      = getAuth(app);
    analytics = getAnalytics(app);

    // Anonymous auth on init
    signInAnonymously(auth).catch(console.warn);
  } catch (err) {
    console.warn('Firebase init error:', err);
  }
}

// ── Alerts ───────────────────────────────────────────────────
export function subscribeToAlerts(callback) {
  if (!db) {
    console.info('[Firebase] Not configured — using mock data');
    return () => {};
  }
  const q = collection(db, 'alerts');
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export async function addAlert(alert) {
  if (!db) return;
  await addDoc(collection(db, 'alerts'), {
    ...alert,
    createdAt: serverTimestamp(),
  });
}

// ── Crowd data ────────────────────────────────────────────────
export function subscribeToCrowd(callback) {
  if (!db) return () => {};
  return onSnapshot(collection(db, 'crowd'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ── Analytics ─────────────────────────────────────────────────
export function trackEvent(eventName, params = {}) {
  if (!analytics) return;
  logEvent(analytics, eventName, params);
}

export { db, auth, analytics };
