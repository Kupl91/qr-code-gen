import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WorkerInfo } from '@/shared/api/types'

interface WorkerState {
  data: WorkerInfo | null
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
    setWorkerData: (state, action: PayloadAction<WorkerInfo>) => {
      state.data = action.payload
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { setWorkerData, setError, clearError } = workerSlice.actions
export default workerSlice.reducer 