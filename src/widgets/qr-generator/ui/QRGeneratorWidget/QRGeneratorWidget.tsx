'use client'

import { QRGenerator } from '@/features/qr-generator'

export function QRGeneratorWidget() {
  return (
    <div className="container mx-auto px-fluid-1 py-fluid-2 flex items-center justify-center">
      <QRGenerator />
    </div>
  )
} 