import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Editor',
  description: 'Professional Movie Editor Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* CDN Resources */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-icons/4.12.0/react-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <script src="https://unpkg.com/lucide@latest" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00d2ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Movie Editor" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%230f0f1a' width='192' height='192'/><text x='96' y='120' font-size='80' text-anchor='middle' fill='%2300d2ff'>🎬</text></svg>" />
        
        {/* Firebase SDK - Use environment variables in production */}
        {/* 
        For security, set these in .env.local:
        NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
        NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
        NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
        */}
        <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
        
        {/* Firebase Config - Replace with environment variables in production */}
        <script dangerouslySetInnerHTML={{__html: `
          // Use environment variables in production
          var firebaseConfig = {
            apiKey: "${process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''}",
            authDomain: "${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ''}",
            databaseURL: "${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || ''}",
            projectId: "${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ''}",
            storageBucket: "${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ''}",
            messagingSenderId: "${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ''}",
            appId: "${process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''}",
            measurementId: "${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''}"
          };
          // Initialize Firebase
          if (firebaseConfig.apiKey && !firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
        `}} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}