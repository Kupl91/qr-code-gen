import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks/redux'
import { selectWorkerData, workerActions } from '../slice'
import { getCachedData } from '@/shared/lib/store/middleware/cacheMiddleware'

export const useWorkerData = () => {
  const dispatch = useAppDispatch()
  const workerData = useAppSelector(selectWorkerData)

  useEffect(() => {
    // Если данных нет в store, пробуем загрузить из кэша
    if (!workerData) {
      const cachedData = getCachedData()
      if (cachedData?.worker) {
        dispatch(workerActions.setWorkerData(cachedData.worker.data))
      }
    }
  }, [dispatch, workerData])

  return workerData
} 