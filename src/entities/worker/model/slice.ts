import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { WorkerDTO } from '../api/types'
import type { WorkerState } from '../api/types'

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

export const { actions: workerActions } = workerSlice
export const { reducer: workerReducer } = workerSlice 