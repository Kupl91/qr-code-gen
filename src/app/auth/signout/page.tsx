import { Metadata } from 'next'
import { Card } from '@/shared/ui/card'
import { SignOutButton } from '@/features/auth/ui/SignOutButton/SignOutButton'

export const metadata: Metadata = {
  title: 'Выход из системы',
  description: 'Выход из системы QR генератора'
}

export default function SignOutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Выход из системы</h1>
        <p className="mb-6">Вы уверены, что хотите выйти из системы?</p>
        <div className="flex justify-center">
          <SignOutButton />
        </div>
      </Card>
    </main>
  )
} 