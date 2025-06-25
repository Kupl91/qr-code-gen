import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { LoginCredentials, LoginResponse, LogoutResponse, AuthUser } from '@/shared/types/auth'
import { extractLogin, API_PATHS } from '@/shared/config/api'
import { useAppDispatch } from './redux'
import { workerActions } from '@/entities/worker'

// Функция для логина
async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(API_PATHS.AUTH.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include', // Важно для работы с cookies
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Login failed')
  }

  return response.json()
}

// Функция для логаута
async function logoutUser(): Promise<LogoutResponse> {
  const response = await fetch(API_PATHS.AUTH.LOGOUT, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Logout failed')
  }

  return response.json()
}

// Хук для логина
export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      // Очищаем старые данные из Redux
      dispatch(workerActions.clearWorkerData())
      
      // Очищаем кэш запросов
      queryClient.clear()
      
      // Сохраняем информацию о пользователе в localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Сохраняем последний использованный логин (без домена)
      const userLogin = extractLogin(variables.username)
      localStorage.setItem('lastLogin', userLogin)
      
      // Перенаправляем на главную страницу
      router.push('/')
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })
}

// Хук для логаута
export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      try {
        console.log('Logout successful, clearing data...')
        
        // Очищаем localStorage
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        localStorage.removeItem('lastLogin')
        
        // Очищаем Redux store
        dispatch(workerActions.clearWorkerData())
        
        // Очищаем кэш запросов
        queryClient.clear()
        
        console.log('Data cleared, redirecting to login...')
        
        // Перенаправляем на страницу логина
        router.push('/auth/signin')
      } catch (error) {
        console.error('Error in logout onSuccess:', error)
        // Всё равно пытаемся перенаправить
        window.location.href = '/auth/signin'
      }
    },
    onError: (error) => {
      console.error('Logout error:', error)
      try {
        // Даже при ошибке очищаем локальные данные
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        localStorage.removeItem('lastLogin')
        dispatch(workerActions.clearWorkerData())
        queryClient.clear()
        router.push('/auth/signin')
      } catch (clearError) {
        console.error('Error clearing data on logout error:', clearError)
        // Принудительное перенаправление
        window.location.href = '/auth/signin'
      }
    },
  })
}

// Хук для проверки аутентификации
export function useAuth() {
  const router = useRouter()

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      const user = localStorage.getItem('user')
      
      return {
        isAuthenticated: !!isAuthenticated,
        user: user ? JSON.parse(user) as AuthUser : null,
      }
    }
    
    return {
      isAuthenticated: false,
      user: null,
    }
  }

  const requireAuth = () => {
    const { isAuthenticated } = checkAuth()
    if (!isAuthenticated) {
      router.push('/auth/signin')
    }
    return isAuthenticated
  }

  const getLastLogin = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastLogin') || ''
    }
    return ''
  }

  return {
    ...checkAuth(),
    requireAuth,
    getLastLogin,
  }
} 