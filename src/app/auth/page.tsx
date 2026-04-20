'use client'

import { useState } from 'react'
import { Film, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type AuthMode = 'login' | 'register'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Demo: Simulate auth
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to home after successful login
      window.location.href = '/'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-ui-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-cyan/20 mb-4">
            <Film className="w-8 h-8 text-accent-cyan" />
          </div>
          <h1 className="text-2xl font-bold">Movie Editor</h1>
          <p className="text-text-secondary">Professional video editing</p>
        </div>

        {/* Auth Card */}
        <div className="bg-ui-panel rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-medium mb-6 text-center">
            {mode === 'login' ? '၀င်းပါ။' : 'အပါးလိုက်'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm mb-2">အမည်</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="သင့်အမည်"
                    className="w-full pl-10 pr-4 py-3 bg-ui-bg rounded-xl border border-ui-border focus:border-accent-cyan outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">အီးမေးလ်</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-ui-bg rounded-xl border border-ui-border focus:border-accent-cyan outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">စကားဝှက်</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-ui-bg rounded-xl border border-ui-border focus:border-accent-cyan outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 text-red-500 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  ဆွဲ့ပါ...
                </>
              ) : (
                <>
                  {mode === 'login' ? '၀င်းပါ။' : 'အပါးလိုက်'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-accent-cyan hover:underline"
            >
              {mode === 'login' 
                ? 'အပါးလိုက်လို လိုက်ပါ။' 
                : '၀င်းပြီးလို လိုက်ပါ။'}
            </button>
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center text-sm text-text-secondary mt-6">
          Demo mode - ဆွဲ့ပပါ နဲ့ ဝင်းပါပါ။
        </p>
      </div>
    </div>
  )
}