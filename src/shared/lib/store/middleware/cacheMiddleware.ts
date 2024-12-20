import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { workerActions } from '@/entities/worker'
import type { RootState } from '@/app/providers/store/config/store'

const CACHE_KEY = 'qr-generator-cache'
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000 // 24 часа

export const cacheMiddleware = createListenerMiddleware()

// Сохранение в localStorage при изменении данных
cacheMiddleware.startListening({
  matcher: isAnyOf(workerActions.setWorkerData),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    const cache = {
      data: state.worker,
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  }
})

// Утилита для проверки валидности кэша
export const isCacheValid = (timestamp: number) => {
  return Date.now() - timestamp < CACHE_EXPIRATION
}

// Утилита для получения кэшированных данных
export const getCachedData = () => {
  try {
    const cache = localStorage.getItem(CACHE_KEY)
    if (!cache) return null

    const { data, timestamp } = JSON.parse(cache)
    return isCacheValid(timestamp) ? data : null
  } catch {
    return null
  }
} 