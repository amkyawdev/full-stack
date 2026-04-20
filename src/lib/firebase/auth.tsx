'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface FirebaseAuthState {
  user: User | null
  loading: boolean
  error: string | null
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const FirebaseAuthContext = createContext<FirebaseAuthState | null>(null)

// Declare firebase on window
declare global {
  interface Window {
    firebase: any
    firebaseConfig: any
  }
}

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [auth, setAuth] = useState<any>(null)

  useEffect(() => {
    // Wait for firebase to load from CDN
    const checkFirebase = setInterval(() => {
      if (window.firebase && window.firebase.auth) {
        setAuth(window.firebase.auth())
        clearInterval(checkFirebase)
      }
    }, 100)
    
    // Cleanup after 10 seconds
    setTimeout(() => clearInterval(checkFirebase), 10000)
    
    return () => clearInterval(checkFirebase)
  }, [])

  useEffect(() => {
    if (!auth) return
    
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const signInWithGoogle = async () => {
    setError(null)
    try {
      if (!window.firebase) throw new Error('Firebase not loaded')
      const provider = new window.firebase.auth.GoogleAuthProvider()
      await window.firebase.auth().signInWithPopup(provider)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    }
  }

  const signInWithGithub = async () => {
    setError(null)
    try {
      if (!window.firebase) throw new Error('Firebase not loaded')
      const provider = new window.firebase.auth.GithubAuthProvider()
      await window.firebase.auth().signInWithPopup(provider)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'GitHub sign-in failed')
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    setError(null)
    try {
      if (!window.firebase) throw new Error('Firebase not loaded')
      await window.firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Email sign-in failed')
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    setError(null)
    try {
      if (!window.firebase) throw new Error('Firebase not loaded')
      await window.firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-up failed')
    }
  }

  const logout = async () => {
    setError(null)
    try {
      if (!window.firebase) throw new Error('Firebase not loaded')
      await window.firebase.auth().signOut()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-out failed')
    }
  }

  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGoogle,
        signInWithGithub,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext)
  if (!context) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider')
  }
  return context
}