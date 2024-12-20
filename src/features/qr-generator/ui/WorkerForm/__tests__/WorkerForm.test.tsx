import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WorkerForm } from '../WorkerForm'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { workerReducer } from '@/entities/worker'

describe('WorkerForm', () => {
  const mockOnSave = jest.fn()
  const mockOnCancel = jest.fn()
  
  const store = configureStore({
    reducer: {
      worker: workerReducer
    }
  })

  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('показывает ошибки валидации при отправке пустой формы', async () => {
    await act(async () => {
      renderWithProvider(
        <WorkerForm
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )
    })

    const submitButton = screen.getByText('Сохранить')
    await act(async () => {
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      const errors = screen.getAllByText(/Минимум 2 символа/i)
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  it('вызывает onSave с валидными данными', async () => {
    const validData = {
      firstname: 'John',
      lastname: 'Doe',
      organization: 'Company',
      position: 'Developer',
      phoneWork: '+79991234567',
      phoneMobile: '+79997654321',
      email: 'john@example.com',
      website: 'https://example.com'
    }

    await act(async () => {
      renderWithProvider(
        <WorkerForm
          defaultValues={validData}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )
    })

    const submitButton = screen.getByText('Сохранить')
    await act(async () => {
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled()
      const savedData = mockOnSave.mock.calls[0][0]
      expect(savedData).toEqual(expect.objectContaining({
        firstname: validData.firstname,
        lastname: validData.lastname,
        organization: validData.organization,
        position: validData.position
      }))
    })
  })

  it('вызывает onCancel при клике на кнопку "Назад"', async () => {
    await act(async () => {
      renderWithProvider(
        <WorkerForm
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )
    })

    const backButton = screen.getByText('Назад')
    await act(async () => {
      await userEvent.click(backButton)
    })

    expect(mockOnCancel).toHaveBeenCalled()
  })
}) 