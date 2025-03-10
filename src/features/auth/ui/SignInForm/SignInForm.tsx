'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

interface FormData {
  username: string
  password: string
}

export function SignInForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false
      })
      
      if (result?.error) {
        setError('Неверное имя пользователя или пароль')
        return
      }
      
      router.push('/')
    } catch (err) {
      setError('Произошла ошибка при входе. Пожалуйста, попробуйте снова.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Вход в систему</h1>
        <p className="text-muted-foreground mt-2">Введите ваши учетные данные</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              placeholder="p.molchanov"
              {...register('username', { required: 'Введите имя пользователя' })}
              error={errors.username?.message}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Введите пароль' })}
              error={errors.password?.message}
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-500 font-medium py-1">{error}</div>
          )}
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Выполняется вход...' : 'Войти'}
          </Button>
        </div>
      </form>
    </Card>
  )
} 