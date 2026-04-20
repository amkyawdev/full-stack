'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Settings, User, Bell, Palette, HardDrive, Key, Shield, LogOut, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface UserSettings {
  name: string
  email: string
  avatar: string
}

interface AppSettings {
  theme: 'dark' | 'light'
  autoSave: boolean
  videoQuality: 'low' | 'medium' | 'high'
  defaultResolution: string
  notifications: boolean
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('account')
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: 'User',
    email: 'user@example.com',
    avatar: '',
  })
  
  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'dark',
    autoSave: true,
    videoQuality: 'high',
    defaultResolution: '1080p',
    notifications: true,
  })
  
  const switchTab = (tabId: string) => {
    setActiveTab(tabId)
    router.push(`/settings?tab=${tabId}`, { scroll: false })
  }

  const updateUserSetting = (key: keyof UserSettings, value: string) => {
    setUserSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateAppSetting = (key: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    // Would save to backend/Supabase
    alert('Settings saved!')
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    router.push('/auth')
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-ui-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-accent-cyan" />
          Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent-cyan text-ui-bg'
                    : 'hover:bg-ui-panel'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-ui-panel rounded-xl p-6">
            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium">Account Settings</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent-cyan">
                      {userSettings.name.charAt(0)}
                    </span>
                  </div>
                  <Button variant="secondary" size="sm">Change Avatar</Button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={userSettings.name}
                      onChange={(e) => updateUserSetting('name', e.target.value)}
                      className="w-full px-4 py-2 bg-ui-bg rounded-lg border border-ui-border focus:border-accent-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => updateUserSetting('email', e.target.value)}
                      className="w-full px-4 py-2 bg-ui-bg rounded-lg border border-ui-border focus:border-accent-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">API Key</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value="••••••••••••"
                        readOnly
                        className="flex-1 px-4 py-2 bg-ui-bg rounded-lg border border-ui-border"
                      />
                      <Button variant="secondary" size="sm">
                        <Key className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={saveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium">Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Theme</span>
                      <p className="text-sm text-text-secondary">Choose app theme</p>
                    </div>
                    <select
                      value={appSettings.theme}
                      onChange={(e) => updateAppSetting('theme', e.target.value)}
                      className="px-4 py-2 bg-ui-bg rounded-lg border border-ui-border"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Auto Save</span>
                      <p className="text-sm text-text-secondary">Automatically save changes</p>
                    </div>
                    <button
                      onClick={() => updateAppSetting('autoSave', !appSettings.autoSave)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        appSettings.autoSave ? 'bg-accent-cyan' : 'bg-ui-border'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        appSettings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Video Quality</span>
                      <p className="text-sm text-text-secondary">Default export quality</p>
                    </div>
                    <select
                      value={appSettings.videoQuality}
                      onChange={(e) => updateAppSetting('videoQuality', e.target.value)}
                      className="px-4 py-2 bg-ui-bg rounded-lg border border-ui-border"
                    >
                      <option value="low">Low (480p)</option>
                      <option value="medium">Medium (720p)</option>
                      <option value="high">High (1080p+)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Notifications</span>
                      <p className="text-sm text-text-secondary">Push notifications</p>
                    </div>
                    <button
                      onClick={() => updateAppSetting('notifications', !appSettings.notifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        appSettings.notifications ? 'bg-accent-cyan' : 'bg-ui-border'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        appSettings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                <Button onClick={saveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </motion.div>
            )}

            {activeTab === 'storage' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium">Storage</h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Used Storage</span>
                      <span>2.4 GB / 10 GB</span>
                    </div>
                    <div className="h-3 bg-ui-bg rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-accent-cyan rounded-full" />
                    </div>
                  </div>

                  <div className="p-4 bg-ui-bg rounded-lg">
                    <h3 className="font-medium mb-2">Storage Breakdown</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex justify-between">
                        <span>Videos</span>
                        <span>2.1 GB</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Exports</span>
                        <span>200 MB</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Thumbnails</span>
                        <span>50 MB</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Temporary</span>
                        <span>50 MB</span>
                      </li>
                    </ul>
                  </div>

                  <Button variant="secondary">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Manage Storage
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium">Security</h2>

                <div className="space-y-4">
                  <div className="p-4 bg-ui-bg rounded-lg">
                    <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Add extra security to your account
                    </p>
                    <Button variant="secondary" size="sm">Enable 2FA</Button>
                  </div>

                  <div className="p-4 bg-ui-bg rounded-lg">
                    <h3 className="font-medium mb-2">Active Sessions</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between items-center">
                        <span>Chrome on Windows</span>
                        <span className="text-green-500">Active now</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Safari on iPhone</span>
                        <span className="text-text-secondary">Last seen 2h ago</span>
                      </li>
                    </ul>
                  </div>

                  <Button variant="danger" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out All Devices
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}