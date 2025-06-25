'use client'

import { QRGenerator } from '@/features/qr-generator'
import { SignOutButton } from '@/features/auth/ui/SignOutButton/SignOutButton'

export function QRGeneratorWidget() {
  return (
    <div className="container mx-auto px-fluid-1 py-fluid-2 flex items-center justify-center">
      <QRGenerator />
      <div className="absolute top-4 right-4">
        <SignOutButton />
      </div>
    </div>
  )
} 