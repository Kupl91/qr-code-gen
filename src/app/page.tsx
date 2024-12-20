import { Metadata } from 'next'
import { QRGeneratorWidget } from "@/widgets/qr-generator"

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Генератор QR-кодов с контактной информацией'
}

// Настройка кэширования страницы
export const revalidate = 3600 // Ревалидация каждый час

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <QRGeneratorWidget />
    </main>
  )
} 