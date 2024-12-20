import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { WorkerForm } from '../WorkerForm'
import { mockWorkerData } from '@/shared/api/mocks/worker'
import { useAppDispatch } from '@/shared/lib/hooks/redux'

// Мокаем Redux хуки
jest.mock('@/shared/lib/hooks/redux', () => ({
  useAppDispatch: jest.fn()
}))

describe('WorkerForm', () => {
  const mockDispatch = jest.fn()
  const mockOnSave = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('отображает форму с defaultValues', () => {
    render(
      <WorkerForm
        defaultValues={mockWorkerData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )

    expect(screen.getByDisplayValue(mockWorkerData.firstname)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockWorkerData.lastname)).toBeInTheDocument()
  })

  it('показывает ошибки валидации при отправке пустой формы', async () => {
    render(
      <WorkerForm
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )

    const submitButton = screen.getByText('Сохранить')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Минимум 2 символа')).toBeInTheDocument()
    })
  })

  it('вызывает onSave с валидными данными', async () => {
    render(
      <WorkerForm
        defaultValues={mockWorkerData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )

    const submitButton = screen.getByText('Сохранить')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(mockWorkerData)
    })
  })

  it('вызывает onCancel при клике на кнопку отмены', () => {
    render(
      <WorkerForm
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )

    const cancelButton = screen.getByText('Назад')
    fireEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })
}) 