import type { RootState } from '@/app/providers/store'

export const selectWorkerData = (state: RootState) => state.worker.data
export const selectWorkerLoading = (state: RootState) => state.worker.loading
export const selectWorkerError = (state: RootState) => state.worker.error 