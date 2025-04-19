import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next()
    
    // Настройка заголовков кэширования
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, stale-while-revalidate=60'
    )

    // Для статических ресурсов (изображения, шрифты)
    if (req.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|woff2?)$/)) {
      response.headers.set(
        'Cache-Control',
        'public, max-age=31536000, immutable'
      )
    }

    return response
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/signin'
    }
  }
)

// Защищаем только главную страницу
export const config = {
  matcher: ['/']
} 