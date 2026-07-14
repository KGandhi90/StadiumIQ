// @ts-check
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getAnalytics, logEvent } from 'firebase/analytics'

/**
 * Firebase integration.
 * Gracefully skips init when env vars are absent.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
}

const isConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
)

let app, db, auth, analytics

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
    analytics = getAnalytics(app)
    signInAnonymously(auth).catch(() => {
      // Anonymous auth failure — non-fatal, app continues
    })
  } catch (_) {
    // Firebase init failure — non-fatal, app uses mock data
  }
}

/**
 * Subscribe to real-time alerts from Firestore.
 * @param {Function} callback
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAlerts(callback) {
  if (!db) return () => {}
  const q = collection(db, 'alerts')
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

/**
 * Add an alert to Firestore.
 * @param {object} alert
 */
export async function addAlert(alert) {
  if (!db) return
  await addDoc(collection(db, 'alerts'), {
    ...alert,
    createdAt: serverTimestamp(),
  })
}

/**
 * Subscribe to crowd density data.
 * @param {Function} callback
 * @returns {Function} Unsubscribe function
 */
export function subscribeToCrowd(callback) {
  if (!db) return () => {}
  return onSnapshot(collection(db, 'crowd'), (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

/**
 * Track a GA4 event.
 * @param {string} eventName
 * @param {object} [params]
 */
export function trackEvent(eventName, params = {}) {
  if (!analytics) return
  logEvent(analytics, eventName, params)
}

export { db, auth, analytics }
