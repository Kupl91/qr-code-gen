import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QRGenerator } from '../QRGenerator'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { workerReducer } from '@/entities/worker'

// Мокаем QRCode компонент
jest.mock('@jackybaby/react-custom-qrcode', () => ({
  QRCode: () => <div data-testid="qr-code">QR Code Mock</div>
}))

describe('QRGenerator', () => {
  const store = configureStore({
    reducer: {
      worker: workerReducer
    }
  })

  const renderWithRedux = (component: React.ReactNode) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  it('отображает QRCodePreview по умолчанию', () => {
    renderWithRedux(<QRGenerator />)
    expect(screen.getByText('Редактировать')).toBeInTheDocument()
  })

  it('переключается в режим редактирования', () => {
    renderWithRedux(<QRGenerator />)
    fireEvent.click(screen.getByText('Редактировать'))
    expect(screen.getByText('Сохранить')).toBeInTheDocument()
  })

  it('сохраняет данные в Redux store', () => {
    renderWithRedux(<QRGenerator />)
    // ... тест сохранения данных
  })
}) 