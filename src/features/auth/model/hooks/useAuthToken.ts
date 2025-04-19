'use client'

import { useSession } from 'next-auth/react'

export function useAuthToken() {
  const { data: session } = useSession()
  return session?.accessToken
} 