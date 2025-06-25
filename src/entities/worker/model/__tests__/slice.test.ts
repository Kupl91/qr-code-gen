import { workerReducer, workerActions, WorkerState } from '../slice'
import { WorkerDTO } from '../types'

// Тестовые данные для проверки
const testWorkerData: WorkerDTO = {
  fullname: 'Тестов Тест Тестович',
  organization: 'Test Organization',
  position: 'Test Position',
  email: 'test@example.com',
  phoneWork: '+1234567890',
  phoneMobile: '+0987654321',
  website: 'https://test.com'
}

describe('worker slice', () => {
  const initialState: WorkerState = {
    data: null
  }

  it('should handle setWorkerData', () => {
    const nextState = workerReducer(initialState, workerActions.setWorkerData(testWorkerData))
    
    expect(nextState.data).toEqual(testWorkerData)
  })

  it('should handle clearWorkerData', () => {
    const stateWithData: WorkerState = {
      data: testWorkerData
    }
    
    const nextState = workerReducer(stateWithData, workerActions.clearWorkerData())
    
    expect(nextState.data).toBeNull()
  })
}) 