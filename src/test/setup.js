import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Stub all Vite env vars
vi.stubEnv('VITE_GEMINI_API_KEY', 'test-gemini-key')
vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TEST123')
vi.stubEnv('VITE_FIREBASE_API_KEY', 'test-fb-key')
vi.stubEnv('VITE_FIREBASE_AUTH_DOMAIN', 'test.firebaseapp.com')
vi.stubEnv('VITE_FIREBASE_PROJECT_ID', 'test-project')
vi.stubEnv('VITE_FIREBASE_STORAGE_BUCKET', 'test.appspot.com')
vi.stubEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', '123456789')
vi.stubEnv('VITE_FIREBASE_APP_ID', '1:123:web:abc')
vi.stubEnv('VITE_RECAPTCHA_SITE_KEY', '')

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}))

// Mock Gemini SDK
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: class {
      getGenerativeModel() {
        return {
          startChat: vi.fn(() => ({
            sendMessage: vi.fn(async () => ({
              response: {
                text: () => 'Mocked Gemini response in English',
              },
            })),
          })),
          generateContent: vi.fn(async () => ({
            response: { text: () => 'Mocked commentary line.' },
          })),
        }
      }
    },
  }
})

// Mock Firebase
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
  setDoc: vi.fn(async () => {}),
  addDoc: vi.fn(async () => ({ id: 'mock-id' })),
  updateDoc: vi.fn(async () => {}),
  getDocs: vi.fn(async () => ({ docs: [], empty: true })),
  getDoc: vi.fn(async () => ({
    exists: () => false,
    data: () => ({}),
  })),
  onSnapshot: vi.fn(() => () => {}),
  query: vi.fn(() => ({})),
  orderBy: vi.fn(),
  limit: vi.fn(),
  where: vi.fn(),
  serverTimestamp: vi.fn(() => ({ _type: 'serverTimestamp' })),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
  signInAnonymously: vi.fn(async () => ({
    user: { uid: 'test-uid' },
  })),
}))

vi.mock('firebase/app-check', () => ({
  initializeAppCheck: vi.fn(),
  ReCaptchaV3Provider: vi.fn(),
}))
