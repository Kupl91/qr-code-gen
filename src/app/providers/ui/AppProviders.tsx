'use client'

import { StoreProvider } from '../store'
import { QueryProvider } from './QueryProvider'
import { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </QueryProvider>
  )
} 