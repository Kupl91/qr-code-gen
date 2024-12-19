import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setWorkerData: (state, action: PayloadAction<WorkerDTO>) => {
      state.data = action.payload
    }
  }
})

export const { setWorkerData } = workerSlice.actions
export const workerReducer = workerSlice.reducer 