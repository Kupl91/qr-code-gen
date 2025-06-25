'use client'

import { useEffect } from 'react'
import { QRGeneratorWidget } from "@/widgets/qr-generator"
import { useAuth } from '@/shared/lib/hooks/useAuth'

export default function HomePage() {
  const { requireAuth } = useAuth()

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <QRGeneratorWidget />
    </main>
  )
} 