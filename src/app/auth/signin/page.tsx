import { Metadata } from 'next'
import { SignInForm } from '@/features/auth/ui/SignInForm/SignInForm'

export const metadata: Metadata = {
  title: 'Вход в систему',
  description: 'Авторизация в системе QR генератора'
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <SignInForm />
    </main>
  )
} 