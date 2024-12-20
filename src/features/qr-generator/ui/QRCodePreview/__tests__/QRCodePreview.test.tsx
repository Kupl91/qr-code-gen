import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { QRCodePreview } from '../QRCodePreview'
import { useDownloadQR } from "@/shared/lib/hooks"
import { mockWorkerData } from '@/shared/api/mocks/worker'

// Мокаем хук для скачивания
jest.mock("@/shared/lib/hooks", () => ({
  useDownloadQR: jest.fn()
}))

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

  it('отображает информацию о работнике', () => {
    render(
      <QRCodePreview
        value="BEGIN:VCARD..."
        data={mockWorkerData}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText(mockWorkerData.firstname)).toBeInTheDocument()
    expect(screen.getByText(mockWorkerData.lastname)).toBeInTheDocument()
  })

  it('вызывает функцию скачивания при клике на QR-код', () => {
    render(
      <QRCodePreview
        value="BEGIN:VCARD..."
        data={mockWorkerData}
        onEdit={mockOnEdit}
      />
    )

    const qrCodeContainer = screen.getByRole('img', { name: /qr code/i })
    fireEvent.click(qrCodeContainer)
    
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