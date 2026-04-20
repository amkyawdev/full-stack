'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, User, Palette, HardDrive, Shield, LogOut, Save } from 'lucide-react'

interface UserSettings {
  name: string
  email: string
}

interface AppSettings {
  theme: 'dark' | 'light'
  autoSave: boolean
  videoQuality: 'low' | 'medium' | 'high'
  notifications: boolean
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('account')
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: 'User',
    email: 'user@example.com',
  })
  
  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'dark',
    autoSave: true,
    videoQuality: 'high',
    notifications: true,
  })

  const updateUserSetting = (key: keyof UserSettings, value: string) => {
    setUserSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateAppSetting = (key: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    router.push('/auth')
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-4 md:p-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8 text-white">
          <Settings className="w-8 h-8 text-cyan-400" />
          Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-black'
                    : 'text-gray-400 hover:bg-[#1a1a2e]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-[#1a1a2e] rounded-xl p-6">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-white">Account Settings</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-cyan-400">
                      {userSettings.name.charAt(0)}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-[#2a2a3e] text-white rounded-lg text-sm hover:bg-[#3a3a4e]">
                    Change Avatar
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-300">Name</label>
                    <input
                      type="text"
                      value={userSettings.name}
                      onChange={(e) => updateUserSetting('name', e.target.value)}
                      className="w-full px-4 py-2 bg-[#0f0f1a] rounded-lg border border-[#2a2a3e] focus:border-cyan-400 outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-300">Email</label>
                    <input
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => updateUserSetting('email', e.target.value)}
                      className="w-full px-4 py-2 bg-[#0f0f1a] rounded-lg border border-[#2a2a3e] focus:border-cyan-400 outline-none text-white"
                    />
                  </div>
                </div>

                <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg flex items-center gap-2 hover:bg-cyan-600">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-white">Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white">Theme</span>
                      <p className="text-sm text-gray-400">Choose app theme</p>
                    </div>
                    <select
                      value={appSettings.theme}
                      onChange={(e) => updateAppSetting('theme', e.target.value)}
                      className="px-4 py-2 bg-[#0f0f1a] rounded-lg border border-[#2a2a3e] text-white"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white">Auto Save</span>
                      <p className="text-sm text-gray-400">Automatically save changes</p>
                    </div>
                    <button
                      onClick={() => updateAppSetting('autoSave', !appSettings.autoSave)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        appSettings.autoSave ? 'bg-cyan-500' : 'bg-[#2a2a3e]'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        appSettings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white">Notifications</span>
                      <p className="text-sm text-gray-400">Push notifications</p>
                    </div>
                    <button
                      onClick={() => updateAppSetting('notifications', !appSettings.notifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        appSettings.notifications ? 'bg-cyan-500' : 'bg-[#2a2a3e]'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        appSettings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg flex items-center gap-2 hover:bg-cyan-600">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-white">Storage</h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2 text-gray-300">
                      <span>Used Storage</span>
                      <span>2.4 GB / 10 GB</span>
                    </div>
                    <div className="h-3 bg-[#0f0f1a] rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-cyan-500 rounded-full" />
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-[#2a2a3e] text-white rounded-lg flex items-center gap-2 hover:bg-[#3a3a4e]">
                    <HardDrive className="w-4 h-4" />
                    Manage Storage
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-white">Security</h2>

                <div className="space-y-4">
                  <div className="p-4 bg-[#0f0f1a] rounded-lg">
                    <h3 className="font-medium mb-2 text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Add extra security to your account
                    </p>
                    <button className="px-4 py-2 bg-[#2a2a3e] text-white rounded-lg text-sm hover:bg-[#3a3a4e]">
                      Enable 2FA
                    </button>
                  </div>

                  <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}