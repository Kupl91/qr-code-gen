import { NextRequest, NextResponse } from 'next/server'

// Отключаем проверку SSL сертификатов для разработки
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Формируем данные для отправки на бэкэнд
    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)

    // Отправляем запрос на реальный бэкэнд
    const response = await fetch(
      'https://lk-dev.1440.space/lk_backend/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        redirect: 'follow',
      }
    )

    if (response.ok) {
      // Получаем cookies из ответа
      const setCookieHeader = response.headers.get('set-cookie')
      
      // Создаем успешный ответ
      const successResponse = NextResponse.json(
        { 
          success: true, 
          message: 'Login successful',
          user: { username }
        },
        { status: 200 }
      )

      // Передаем cookie в ответ клиенту
      if (setCookieHeader) {
        successResponse.headers.set('Set-Cookie', setCookieHeader)
      }

      return successResponse
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 