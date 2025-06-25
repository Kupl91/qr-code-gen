import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Получаем cookie из запроса
    const cookieHeader = request.headers.get('cookie')

    // Отправляем запрос на реальный бэкэнд для логаута
    const response = await fetch(
      'https://lk-dev.1440.space/lk_backend/auth/logout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
      }
    )

    // Создаем ответ с очисткой cookie
    const logoutResponse = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    )

    // Очищаем cookie на клиенте
    logoutResponse.headers.set(
      'Set-Cookie',
      'lk=; HttpOnly; Max-Age=0; Path=/; SameSite=none; Secure'
    )

    return logoutResponse
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 