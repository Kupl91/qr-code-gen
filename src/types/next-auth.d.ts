import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id?: string
    } & DefaultSession['user']
  }
  
  interface User {
    accessToken?: string
  }
} 