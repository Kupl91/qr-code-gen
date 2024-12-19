import { configureStore } from '@reduxjs/toolkit'
import { workerReducer } from '@/entities/worker'

export const store = configureStore({
  reducer: {
    worker: workerReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 