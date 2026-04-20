'use client'

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import firebaseConfig from './config'

// Initialize Firebase only on client side
let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

export function initializeFirebase() {
  if (typeof window === 'undefined') return null
  
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig)
    } catch (error) {
      console.error('Firebase initialization error:', error)
      return null
    }
  } else {
    app = getApps()[0]
  }
  
  auth = getAuth(app)
  db = getFirestore(app)
  
  return { app, auth, db }
}

export function getFirebaseAuth(): Auth | undefined {
  if (!auth) {
    initializeFirebase()
  }
  return auth
}

export function getFirebaseDb(): Firestore | undefined {
  if (!db) {
    initializeFirebase()
  }
  return db
}

export { app, auth, db }
export default app