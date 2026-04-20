'use client'

import { useState, useEffect, ReactNode } from 'react'
import { X, Loader } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  isLoading?: boolean
  type?: 'info' | 'warning' | 'success' | 'error'
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  isLoading = false,
  type = 'info',
}: DialogProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 200)
    }
  }, [isOpen])

  if (!isVisible) return null

  const typeStyles = {
    info: 'border-accent-cyan',
    warning: 'border-yellow-500',
    success: 'border-green-500',
    error: 'border-red-500',
  }

  const typeIcons = {
    info: '',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div 
        className={`relative bg-ui-panel rounded-2xl w-full max-w-md p-6 shadow-2xl border-2 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        } transition-all duration-200 ${typeStyles[type]}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-ui-bg rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{typeIcons[type]}</span>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>

        {/* Content */}
        <div className="mb-6 text-text-secondary">{children}</div>

        {/* Actions */}
        <div className="flex gap-3">
          {onConfirm && (
            <Button onClick={onConfirm} disabled={isLoading} className="flex-1">
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                confirmText
              )}
            </Button>
          )}
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  confirmText?: string
  onConfirm: () => void
}

export function ConfirmDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Confirm',
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="warning"
      confirmText={confirmText}
      onConfirm={onConfirm}
    >
      {message}
    </Dialog>
  )
}