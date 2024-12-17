export const useDownloadQR = () => {
  const downloadQRCode = (qrCodeId: string) => {
    const canvas = document.getElementById(qrCodeId) as HTMLCanvasElement
    if (canvas) {
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "qr-code.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }
  }

  return { downloadQRCode }
}
