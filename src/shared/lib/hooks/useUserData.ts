import { useQuery } from '@tanstack/react-query'
import { useMemo, useState, useEffect } from 'react'
import type { UserData, WorkerDataFromUser } from '@/shared/types/user'
import { extractLogin } from '@/shared/config/api'

// Функция для получения данных пользователя
async function fetchUserData(username: string): Promise<UserData> {
  const response = await fetch(`/api/user/info?username=${username}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  return response.json()
}

// Функция для преобразования данных пользователя в формат WorkerForm
export function mapUserToWorkerData(userData: UserData): WorkerDataFromUser {
  return {
    fullname: userData.full_name,
    organization: userData.department,
    position: userData.job_title,
    email: userData.email,
    phoneWork: userData.phone,
    phoneMobile: userData.mobile,
    website: '', // Можно добавить поле website в API
    photo: userData.photo ? `data:image/jpeg;base64,${userData.photo}` : undefined
  }
}

// Хук для получения данных пользователя
export function useUserData(username?: string) {
  return useQuery({
    queryKey: ['userData', username],
    queryFn: () => fetchUserData(username!),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
  })
}

// Хук для получения данных пользователя в формате WorkerForm
export function useWorkerDataFromUser(username?: string) {
  const { data: userData, ...rest } = useUserData(username)

  const workerData = useMemo(() => {
    return userData ? mapUserToWorkerData(userData) : undefined
  }, [userData])

  return {
    ...rest,
    data: workerData,
  }
}

// Хук для получения данных текущего пользователя
export function useCurrentUserData() {
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    const updateUsername = () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user')
        if (user) {
          const userData = JSON.parse(user)
          setUsername(extractLogin(userData.username))
        } else {
          setUsername(undefined)
        }
      }
    }

    // Инициализация
    updateUsername()

    // Слушаем изменения в localStorage
    window.addEventListener('storage', updateUsername)
    
    return () => {
      window.removeEventListener('storage', updateUsername)
    }
  }, [])

  return useUserData(username)
}

// Хук для получения данных текущего пользователя в формате WorkerForm
export function useCurrentWorkerData() {
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    const updateUsername = () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user')
        if (user) {
          const userData = JSON.parse(user)
          setUsername(extractLogin(userData.username))
        } else {
          setUsername(undefined)
        }
      }
    }

    // Инициализация
    updateUsername()

    // Слушаем изменения в localStorage
    window.addEventListener('storage', updateUsername)
    
    return () => {
      window.removeEventListener('storage', updateUsername)
    }
  }, [])

  return useWorkerDataFromUser(username)
} 