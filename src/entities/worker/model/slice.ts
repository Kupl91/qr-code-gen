import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/providers/store/config/store'
import type { WorkerDTO } from '../api/types'

interface WorkerState {
  data: WorkerDTO | null
  loading: boolean
  error: string | null
}

const initialState: WorkerState = {
  data: null,
  loading: false,
  error: null
}

export const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setWorkerData: (state, action: PayloadAction<WorkerDTO>) => {
      state.data = action.payload
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const selectWorkerData = (state: RootState) => state.worker.data

export const workerActions = workerSlice.actions
export const workerReducer = workerSlice.reducer 