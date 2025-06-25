'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useLogin, useAuth } from '@/shared/lib/hooks/useAuth'
import { formatUsername, COMPANY_DOMAIN } from '@/shared/config/api'
import { toast } from 'sonner'

interface FormData {
  username: string
  password: string
}

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const loginMutation = useLogin()
  const { getLastLogin } = useAuth()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
  } = useForm<FormData>()

  // Загружаем последний использованный логин при монтировании компонента
  useEffect(() => {
    const lastLogin = getLastLogin()
    if (lastLogin) {
      setValue('username', lastLogin)
    }
  }, [getLastLogin, setValue])

  // Показываем ошибку при неудачной попытке входа
  useEffect(() => {
    if (loginMutation.error) {
      const errorMessage = loginMutation.error.message || 'Неверное имя пользователя или пароль'
      setError(errorMessage)
      toast.error("Ошибка входа", {
        description: errorMessage,
        duration: 4000,
      })
    }
  }, [loginMutation.error])

  // Показываем toast при успешном входе
  useEffect(() => {
    if (loginMutation.isSuccess) {
      toast.success("Успешный вход", {
        description: "Добро пожаловать в систему QR генератора",
        duration: 3000,
      })
    }
  }, [loginMutation.isSuccess])

  const onSubmit = async (data: FormData) => {
    setError(null)
    
    if (!data.username || !data.password) {
      setError('Заполните все поля')
      toast.error("Заполните все поля", {
        description: "Введите логин и пароль для входа в систему",
        duration: 3000,
      })
      return
    }

    // Автоматически добавляем домен если его нет
    const username = formatUsername(data.username)
    
    loginMutation.mutate({ username, password: data.password })
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
            <Label htmlFor="username">Логин</Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="p.molchanov"
                {...register('username', { required: 'Введите логин' })}
                error={errors.username?.message}
                className="pr-28"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-sm text-gray-400 font-mono">{COMPANY_DOMAIN}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Введите только логин, домен <code className="bg-gray-100 px-1 rounded">{COMPANY_DOMAIN}</code> добавится автоматически
            </p>
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
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Выполняется вход...' : 'Войти'}
          </Button>
        </div>
      </form>
    </Card>
  )
} 