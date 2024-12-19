// src/app/page.tsx
import { QRGeneratorWidget } from "@/widgets/qr-generator";
import reportWebVitals from '../reportWebVitals';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <QRGeneratorWidget />
    </main>
  );
}

// Передача функции для обработки метрик
reportWebVitals(console.log); // Вывод метрик в консоль