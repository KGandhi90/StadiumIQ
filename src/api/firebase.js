// @ts-nocheck
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDoc,
} from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from 'firebase/app-check'
import { safeAsync } from '../utils/errorHandler'
import { clamp, getCrowdLevel } from '../utils/helpers'
import {
  LIVE_UPDATE_MS,
  ALERTS_LIMIT,
  CHECKED_IN,
  VENUE_CAPACITY,
  WAIT_LOW_MAX,
  WAIT_MED_MAX,
  FULL_TIME_MINUTE,
} from '../utils/constants'
import { mockData } from '../data/mockData'

// ─── INIT ─────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/** @type {ReturnType<typeof getFirestore>|undefined} */
let db
/** @type {ReturnType<typeof getAuth>|undefined} */
let auth

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    const app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
    const rcKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    if (rcKey) {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(rcKey),
        isTokenAutoRefreshEnabled: true,
      })
    }
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('[Firebase] init failed — running in mock mode:', err)
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

/** Auth deduplication flag */
let _authPending = false

/**
 * Signs in anonymously. Deduplicates concurrent calls.
 * @returns {Promise<void>}
 */
async function ensureAuth() {
  if (!auth || auth.currentUser || _authPending) return
  _authPending = true
  await safeAsync(
    () => signInAnonymously(auth),
    'ensureAuth',
    undefined
  )
  _authPending = false
}

// ─── STATUS ───────────────────────────────────────────────────────────────────

/**
 * Returns whether Firebase is configured and available.
 * @returns {boolean}
 */
export function isFirebaseAvailable() {
  return Boolean(db)
}

// ─── SEED ─────────────────────────────────────────────────────────────────────

/**
 * Seeds Firestore with initial venue and match state.
 * Safe to call on every app load — always writes venueState
 * and matchState (to keep them current), only seeds alerts
 * and volunteers if those collections are empty.
 * @returns {Promise<void>}
 */
export async function seedFirestoreIfEmpty() {
  if (!db) return
  await ensureAuth()

  return safeAsync(
    async () => {
      // Always write venueState and matchState
      const venueRef = doc(db, 'venueState', 'current')
      await setDoc(
        venueRef,
        {
          gates: mockData.gates,
          checkedIn: CHECKED_IN,
          avgWait: 4.2,
          crowdIndex: Math.round((CHECKED_IN / VENUE_CAPACITY) * 100),
          lastUpdated: serverTimestamp(),
        },
        { merge: false }
      )

      const matchRef = doc(db, 'matchState', 'current')
      await setDoc(
        matchRef,
        {
          homeTeam: mockData.match.homeTeam,
          awayTeam: mockData.match.awayTeam,
          homeScore: mockData.match.homeScore,
          awayScore: mockData.match.awayScore,
          minute: mockData.match.minute,
          status: mockData.match.status,
          group: mockData.match.group,
          venue: mockData.match.venue,
          attendance: mockData.match.attendance,
          capacity: mockData.match.capacity,
        },
        { merge: false }
      )

      // Only seed alerts if collection is empty
      const alertsSnap = await getDocs(collection(db, 'alerts'))
      if (alertsSnap.empty) {
        for (const alert of mockData.alerts) {
          await addDoc(collection(db, 'alerts'), {
            zone: alert.zone,
            msg: alert.msg,
            time: alert.time,
            resolved: alert.resolved,
            type: alert.type,
            createdAt: serverTimestamp(),
          })
        }
      }

      // Only seed volunteers if collection is empty
      const volSnap = await getDocs(collection(db, 'volunteers'))
      if (volSnap.empty) {
        for (const v of mockData.volunteers) {
          await addDoc(collection(db, 'volunteers'), {
            name: v.name,
            role: v.role,
            zone: v.zone,
            status: v.status,
          })
        }
      }

      // Only seed commentary if collection is empty
      const commSnap = await getDocs(collection(db, 'commentary'))
      if (commSnap.empty) {
        for (const entry of mockData.commentary) {
          await addDoc(collection(db, 'commentary'), {
            minute: entry.minute,
            text: entry.text,
            createdAt: serverTimestamp(),
          })
        }
      }
    },
    'seedFirestoreIfEmpty',
    undefined
  )
}

// ─── SIMULATION ENGINE ────────────────────────────────────────────────────────

/**
 * @typedef {object} SimulationHandle
 * @property {Function} stop - Stops all simulation intervals
 */

/**
 * Starts the centralised live-data simulation engine.
 * Writes to Firestore on schedule — ALL connected clients
 * receive updates via onSnapshot automatically.
 *
 * Only one client needs to run this (App.jsx mounts once).
 * The simulation is idempotent: multiple writers converge.
 *
 * @returns {SimulationHandle}
 */
export function startSimulation() {
  if (!db) return { stop: () => {} }

  /** @type {ReturnType<typeof setInterval>[]} */
  const intervals = []

  // ── Gate wait times — every LIVE_UPDATE_MS (12s) ──────────────────────────
  const gateInterval = setInterval(async () => {
    await safeAsync(
      async () => {
        await ensureAuth()
        const venueRef = doc(db, 'venueState', 'current')
        const snap = await getDoc(venueRef)
        if (!snap.exists()) return

        const prev = snap.data()
        const newGates = (prev.gates || []).map((gate) => {
          const nudge = Math.random() > 0.5 ? 1 : -1
          const wait = clamp(gate.wait + nudge, 1, 15)
          return {
            ...gate,
            wait,
            crowd: getCrowdLevel(wait, WAIT_LOW_MAX, WAIT_MED_MAX),
          }
        })

        const avgWait =
          Math.round(
            (newGates.reduce((s, g) => s + g.wait, 0) /
              newGates.length) *
              10
          ) / 10

        const newCheckedIn = clamp(
          (prev.checkedIn || CHECKED_IN) +
            Math.floor(Math.random() * 20 + 3),
          CHECKED_IN,
          VENUE_CAPACITY
        )

        await setDoc(
          venueRef,
          {
            gates: newGates,
            checkedIn: newCheckedIn,
            avgWait,
            crowdIndex: Math.round(
              (newCheckedIn / VENUE_CAPACITY) * 100
            ),
            lastUpdated: serverTimestamp(),
          },
          { merge: true }
        )
      },
      'gateSimulation',
      undefined
    )
  }, LIVE_UPDATE_MS)
  intervals.push(gateInterval)

  // ── Match minute — every 60 seconds ───────────────────────────────────────
  const matchInterval = setInterval(async () => {
    await safeAsync(
      async () => {
        await ensureAuth()
        const matchRef = doc(db, 'matchState', 'current')
        const snap = await getDoc(matchRef)
        if (!snap.exists()) return
        const prev = snap.data()
        if (prev.minute >= FULL_TIME_MINUTE) return
        await updateDoc(matchRef, { minute: prev.minute + 1 })
      },
      'matchSimulation',
      undefined
    )
  }, 60_000)
  intervals.push(matchInterval)

  // ── Attendance trickle — every 30 seconds ─────────────────────────────────
  const attendanceInterval = setInterval(async () => {
    await safeAsync(
      async () => {
        await ensureAuth()
        const matchRef = doc(db, 'matchState', 'current')
        const snap = await getDoc(matchRef)
        if (!snap.exists()) return
        const prev = snap.data()
        const newAttendance = clamp(
          (prev.attendance || CHECKED_IN) +
            Math.floor(Math.random() * 12),
          CHECKED_IN,
          VENUE_CAPACITY
        )
        await updateDoc(matchRef, { attendance: newAttendance })
      },
      'attendanceSimulation',
      undefined
    )
  }, 30_000)
  intervals.push(attendanceInterval)

  return { stop: () => intervals.forEach(clearInterval) }
}

// ─── LISTENERS ────────────────────────────────────────────────────────────────

/**
 * Subscribes to live venue state (gates, checkedIn, avgWait).
 * @param {function(object): void} onUpdate
 * @returns {function(): void} Unsubscribe
 */
export function subscribeVenueState(onUpdate) {
  if (!db) return () => {}
  const ref = doc(db, 'venueState', 'current')
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) onUpdate(snap.data())
  })
}

/**
 * Subscribes to live match state (score, minute, attendance).
 * @param {function(object): void} onUpdate
 * @returns {function(): void} Unsubscribe
 */
export function subscribeMatchState(onUpdate) {
  if (!db) return () => {}
  const ref = doc(db, 'matchState', 'current')
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) onUpdate(snap.data())
  })
}

/**
 * Subscribes to the alerts collection (descending by createdAt).
 * @param {function(Array): void} onUpdate
 * @returns {function(): void} Unsubscribe
 */
export function subscribeAlerts(onUpdate) {
  if (!db) return () => {}
  const q = query(
    collection(db, 'alerts'),
    orderBy('createdAt', 'desc'),
    limit(ALERTS_LIMIT)
  )
  return onSnapshot(q, (snap) => {
    onUpdate(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

/**
 * Subscribes to the volunteers collection.
 * @param {function(Array): void} onUpdate
 * @returns {function(): void} Unsubscribe
 */
export function subscribeVolunteers(onUpdate) {
  if (!db) return () => {}
  return onSnapshot(collection(db, 'volunteers'), (snap) => {
    onUpdate(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

/**
 * Subscribes to the commentary feed (descending by createdAt).
 * @param {function(Array): void} onUpdate
 * @returns {function(): void} Unsubscribe
 */
export function subscribeCommentary(onUpdate) {
  if (!db) return () => {}
  const q = query(
    collection(db, 'commentary'),
    orderBy('createdAt', 'desc'),
    limit(20)
  )
  return onSnapshot(q, (snap) => {
    onUpdate(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

// ─── MUTATIONS ────────────────────────────────────────────────────────────────

/**
 * Marks an alert as resolved in Firestore.
 * All subscribed clients see the change immediately.
 * @param {string} alertId - Firestore document ID
 * @returns {Promise<void>}
 */
export async function resolveAlert(alertId) {
  if (!db) return
  await ensureAuth()
  return safeAsync(
    () => updateDoc(doc(db, 'alerts', alertId), { resolved: true }),
    'resolveAlert',
    undefined
  )
}

/**
 * Toggles a volunteer's on-duty/break status in Firestore.
 * @param {string} volunteerId - Firestore document ID
 * @param {string} currentStatus - Current status value
 * @returns {Promise<void>}
 */
export async function toggleVolunteerStatus(
  volunteerId,
  currentStatus
) {
  if (!db) return
  await ensureAuth()
  return safeAsync(
    () =>
      updateDoc(doc(db, 'volunteers', volunteerId), {
        status: currentStatus === 'on-duty' ? 'break' : 'on-duty',
      }),
    'toggleVolunteer',
    undefined
  )
}

/**
 * Adds a new alert document to Firestore.
 * Used for broadcasts and AI-generated alerts.
 * @param {object} alert - Alert fields
 * @returns {Promise<void>}
 */
export async function addAlert(alert) {
  if (!db) return
  await ensureAuth()
  return safeAsync(
    () =>
      addDoc(collection(db, 'alerts'), {
        ...alert,
        createdAt: serverTimestamp(),
      }),
    'addAlert',
    undefined
  )
}

/**
 * Saves an AI commentary entry to Firestore.
 * All subscribed clients immediately see the new entry.
 * @param {string} minute - Match minute label (e.g. "67")
 * @param {string} text - Commentary text
 * @returns {Promise<void>}
 */
export async function saveCommentary(minute, text) {
  if (!db) return
  await ensureAuth()
  return safeAsync(
    () =>
      addDoc(collection(db, 'commentary'), {
        minute,
        text,
        createdAt: serverTimestamp(),
      }),
    'saveCommentary',
    undefined
  )
}
