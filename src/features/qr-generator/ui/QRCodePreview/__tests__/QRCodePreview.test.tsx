import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { QRCodePreview } from '../QRCodePreview'
import { WorkerDTO } from '@/entities/worker'
import { useDownloadQR } from '@/shared/lib/hooks/useDownloadQr'

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

// Мокаем QRCode компонент
jest.mock('@jackybaby/react-custom-qrcode', () => ({
  QRCode: ({ value }: { value: string }) => (
    <div data-testid="qr-code" data-value={value}>
      QR Code Mock
    </div>
  )
}))

// Мокаем useDownloadQR хук
jest.mock('@/shared/lib/hooks/useDownloadQR', () => ({
  useDownloadQR: () => ({
    downloadAsImage: jest.fn(),
    downloadAsPDF: jest.fn(),
    isDownloading: false
  })
}))

describe('QRCodePreview', () => {
  const mockOnEdit = jest.fn()
  const mockValue = 'test-vcard-data'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders worker data correctly', () => {
    render(
      <QRCodePreview
        value={mockValue}
        data={testWorkerData}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText(new RegExp(testWorkerData.fullname))).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(
      <QRCodePreview
        value={mockValue}
        data={testWorkerData}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getByRole('button', { name: /редактировать/i })
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('renders QR code with correct value', () => {
    render(
      <QRCodePreview
        value={mockValue}
        data={testWorkerData}
        onEdit={mockOnEdit}
      />
    )

    const qrCode = screen.getByTestId('qr-code')
    expect(qrCode).toHaveAttribute('data-value', mockValue)
  })

  it('displays worker information correctly', () => {
    render(
      <QRCodePreview
        value={mockValue}
        data={testWorkerData}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText(testWorkerData.position)).toBeInTheDocument()
    expect(screen.getByText(testWorkerData.organization)).toBeInTheDocument()
    expect(screen.getByText(testWorkerData.email)).toBeInTheDocument()
  })
}) 