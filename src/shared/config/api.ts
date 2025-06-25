// Утилита для формирования API путей
export const getApiPath = (path: string): string => {
  return path.startsWith('/') ? path : `/${path}`
}

// API пути для системы
export const API_PATHS = {
  AUTH: {
    LOGIN: getApiPath('/api/auth/login'),
    LOGOUT: getApiPath('/api/auth/logout'),
  },
  USER: {
    INFO: getApiPath('/api/user/info'),
  },
} as const

// Константы для аутентификации
export const COMPANY_DOMAIN = "@1440.space"

// Функция для формирования полного email из логина
export const formatUsername = (userLogin: string): string => {
  // Если уже содержит @, возвращаем как есть
  if (userLogin.includes("@")) {
    return userLogin
  }
  
  // Добавляем корпоративный домен
  return `${userLogin}${COMPANY_DOMAIN}`
}

// Функция для извлечения логина из email
export const extractLogin = (email: string): string => {
  if (email.includes("@")) {
    return email.split("@")[0]
  }
  return email
} 