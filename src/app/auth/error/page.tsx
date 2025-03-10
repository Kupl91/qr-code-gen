import { Metadata } from 'next'
import { Card } from '@/shared/ui/card'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'

export const metadata: Metadata = {
  title: 'Ошибка авторизации',
  description: 'Произошла ошибка при авторизации'
}

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Ошибка авторизации</h1>
        <p className="mb-6">Произошла ошибка при попытке входа в систему. Пожалуйста, попробуйте снова.</p>
        <Link href="/auth/signin" passHref>
          <Button>Вернуться на страницу входа</Button>
        </Link>
      </Card>
    </main>
  )
} 