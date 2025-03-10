'use client'

import { QRGenerator } from '@/features/qr-generator'
import { signOut } from 'next-auth/react'
import { Button } from '@/shared/ui/button'

export function QRGeneratorWidget() {
  return (
    <div className="container mx-auto px-fluid-1 py-fluid-2 flex items-center justify-center">
      <QRGenerator />
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        >
          Выйти
        </Button>
      </div>
    </div>
  )
} 