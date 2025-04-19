import { workerReducer, workerActions } from '../slice'
import { mockWorkerData } from '@/shared/api/mocks/worker'
import type { WorkerState } from '../../api/types'

describe('Worker Slice', () => {
  const initialState: WorkerState = {
    data: null,
    loading: false,
    error: null
  }

  it('должен вернуть начальное состояние', () => {
    expect(workerReducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('должен обработать setWorkerData', () => {
    const nextState = workerReducer(initialState, workerActions.setWorkerData(mockWorkerData))

    expect(nextState.data).toEqual(mockWorkerData)
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBe(null)
  })

  it('должен обработать setLoading', () => {
    const nextState = workerReducer(initialState, workerActions.setLoading(true))

    expect(nextState.loading).toBe(true)
  })

  it('должен обработать setError', () => {
    const error = 'Test error'
    const nextState = workerReducer(initialState, workerActions.setError(error))

    expect(nextState.error).toBe(error)
    expect(nextState.loading).toBe(false)
  })
}) 