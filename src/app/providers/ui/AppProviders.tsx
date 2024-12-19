'use client'

import { StoreProvider } from '../store'
import { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
} 