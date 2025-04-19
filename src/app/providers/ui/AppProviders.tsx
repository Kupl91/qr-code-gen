'use client'

import { StoreProvider } from '../store'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
  session?: any
}

export function AppProviders({ children, session }: AppProvidersProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {children}
      </StoreProvider>
    </SessionProvider>
  )
} 