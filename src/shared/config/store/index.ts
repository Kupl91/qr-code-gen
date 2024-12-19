import { configureStore } from '@reduxjs/toolkit'
import { workerReducer } from '@/entities/worker'

export const store = configureStore({
  reducer: {
    worker: workerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 