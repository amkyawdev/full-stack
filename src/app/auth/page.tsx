'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Film, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react'

type AuthMode = 'login' | 'register'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/projects'
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const initialized = useRef(false)

  // Check if already logged in
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    
    const token = localStorage.getItem('auth_token')
    const user = localStorage.getItem('auth_user')
    if (token && user) {
      router.push(redirect)
    }
  }, [router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      localStorage.setItem('auth_token', `demo_${Date.now()}`)
      localStorage.setItem('auth_user', JSON.stringify({
        email,
        name: name || email.split('@')[0]
      }))
      
      setIsLoading(false)
      router.push(redirect)
    }, 800)
  }

  const handleDemoLogin = () => {
    localStorage.setItem('auth_token', `demo_${Date.now()}`)
    localStorage.setItem('auth_user', JSON.stringify({
      email: 'demo@movie-editor.com',
      name: 'Demo User'
    }))
    router.push(redirect)
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 mb-4">
            <Film className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Movie Editor</h1>
          <p className="text-gray-400">Professional video editing</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-medium mb-6 text-center text-white">
            {mode === 'login' ? '၀င်းပါ။' : 'အပါးလိုက်'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm mb-2 text-gray-300">အမည်</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="သင့်အမည်"
                    className="w-full pl-10 pr-4 py-3 bg-[#0f0f1a] rounded-xl border border-[#2a2a3e] focus:border-cyan-400 outline-none text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-gray-300">အီးမေးလ်</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0f0f1a] rounded-xl border border-[#2a2a3e] focus:border-cyan-400 outline-none text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-300">စကားဝှက်</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0f0f1a] rounded-xl border border-[#2a2a3e] focus:border-cyan-400 outline-none text-white"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  ဆွဲ့ပါ...
                </>
              ) : (
                <>
                  {mode === 'login' ? '၀င်းပါ။' : 'အပါးလိုက်'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-cyan-400 hover:underline"
            >
              {mode === 'login' 
                ? 'အပါးလိုက်လို လိုက်ပါ။' 
                : '၀င်းပြီးလို လိုက်ပါ။'}
            </button>
          </div>
        </div>

        {/* Demo Login */}
        <button
          onClick={handleDemoLogin}
          className="w-full mt-4 py-3 px-4 bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white font-medium rounded-xl transition-colors"
        >
          ဒီမိုအသုံးပြုမည် (Demo)
        </button>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    }>
      <AuthForm />
    </Suspense>
  )
}