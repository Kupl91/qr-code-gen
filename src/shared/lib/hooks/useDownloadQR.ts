/**
 * Хук для скачивания QR-кода в формате PNG
 */
import { useCallback } from 'react';

export function useDownloadQR() {
  /**
   * Функция для скачивания QR-кода
   * @param elementId - ID элемента с QR-кодом
   */
  const downloadQRCode = useCallback((elementId: string) => {
    try {
      const canvas = document.getElementById(elementId) as HTMLCanvasElement;
      
      if (!canvas) {
        console.error('QR-код не найден');
        return;
      }
      
      // Создаем ссылку для скачивания
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Ошибка при скачивании QR-кода:', error);
    }
  }, []);

  return { downloadQRCode };
} 