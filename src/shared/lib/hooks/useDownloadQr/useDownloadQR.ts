export function useDownloadQR() {
  const downloadQRCode = (elementId: string) => {
    const canvas = document.getElementById(elementId) as HTMLCanvasElement
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return { downloadQRCode }
} 