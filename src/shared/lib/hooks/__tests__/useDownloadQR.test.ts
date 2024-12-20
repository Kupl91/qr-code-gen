import { renderHook } from '@testing-library/react'
import { useDownloadQR } from '../useDownloadQr'


describe('useDownloadQR', () => {
  beforeAll(() => {
    // Мокаем Canvas API
    global.HTMLCanvasElement.prototype.toDataURL = jest.fn()
  })

  it('возвращает функoadQRCode', () => {
   const { result } = renderHook(() => useDownloadQR())
   expect(typeof result.current.downloadQRCode).toBe('function')
 })
  it('скачивает QR код в формате PNG', () => {
   // ... тест скачивания
 })
})