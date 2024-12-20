import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/shared/config/store'
import type { WorkerDTO } from '../api/types'

interface WorkerState {
  data: WorkerDTO | null
}

const initialState: WorkerState = {
  data: null
}

export const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setWorkerData: (state, action: PayloadAction<WorkerDTO>) => {
      state.data = action.payload
    }
  }
})

export const selectWorkerData = (state: RootState) => state.worker.data

export const workerActions = workerSlice.actions
export const workerReducer = workerSlice.reducer 