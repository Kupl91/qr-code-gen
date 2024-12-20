import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { QRCodePreview } from '../QRCodePreview'
import { mockWorkerData } from '@/shared/api/mocks/worker'
import { useDownloadQR } from '@/shared/lib/hooks/useDownloadQr'

// Мокаем QR-код компонент полностью
jest.mock('@jackybaby/react-custom-qrcode', () => ({
  QRCode: ({ value, options }: { value: string; options?: QRCodeOptions }) => (
    <div data-testid="qr-code" data-value={value}>
      <canvas id="qr-code-canvas" />
      QR Code Mock
    </div>
  )
}))

jest.mock('@/shared/lib/hooks/useDownloadQr', () => ({
  useDownloadQR: jest.fn()
}))

interface QRCodeOptions {
  width: number;
  height: number;
  type: string;
  quality: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
}

describe('QRCodePreview', () => {
  const mockOnEdit = jest.fn()
  const mockDownloadQR = jest.fn()
  
  beforeEach(() => {
    (useDownloadQR as jest.Mock).mockReturnValue({
      downloadQRCode: mockDownloadQR
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('отображает информацию о работнике', async () => {
    await act(async () => {
      render(
        <QRCodePreview
          value="BEGIN:VCARD..."
          data={mockWorkerData}
          onEdit={mockOnEdit}
        />
      )
    })

    expect(screen.getByText(new RegExp(mockWorkerData.firstname))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(mockWorkerData.lastname))).toBeInTheDocument()
  })

  it('вызывает функцию скачивания при клике на QR-код', () => {
    render(
      <QRCodePreview
        value="BEGIN:VCARD..."
        data={mockWorkerData}
        onEdit={mockOnEdit}
      />
    )

    const qrCode = screen.getByTestId('qr-code')
    fireEvent.click(qrCode)
    
    expect(mockDownloadQR).toHaveBeenCalledWith('qr-code-canvas')
  })

  it('вызывает onEdit при клике на кнопку редактирования', () => {
    render(
      <QRCodePreview
        value="BEGIN:VCARD..."
        data={mockWorkerData}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getByText('Редактировать')
    fireEvent.click(editButton)
    
    expect(mockOnEdit).toHaveBeenCalled()
  })

  it('загружает логотип при монтировании', () => {
    const mockImage = {
      onload: null,
      src: ''
    }
    
    global.Image = jest.fn().mockImplementation(() => mockImage)
    
    render(
      <QRCodePreview
        value="BEGIN:VCARD..."
        data={mockWorkerData}
        onEdit={mockOnEdit}
      />
    )

    expect(mockImage.src).toBe('/main-logo.svg')
  })
}) 