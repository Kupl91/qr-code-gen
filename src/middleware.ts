import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Настройка заголовков кэширования
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=60'
  )

  // Для статических ресурсов (изображения, шрифты)
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|woff2?)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  }

  return response
}

export const config = {
  matcher: [
    // Применяем middleware ко всем маршрутам, кроме API и статических файлов
    '/((?!api|_next/static|favicon.ico).*)',
  ],
} 