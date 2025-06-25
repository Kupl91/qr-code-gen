import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Получаем username из query параметров
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json(
        { error: 'Username parameter is required' },
        { status: 400 }
      )
    }

    // Получаем cookie из запроса
    const cookieHeader = request.headers.get('cookie')

    // Отправляем запрос на бэкэнд для получения данных пользователя
    const response = await fetch(
      `https://lk-dev.1440.space/lk_backend/lk_info/get_user_simplified?username=${username}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
      }
    )

    if (response.ok) {
      const userData = await response.json()
      return NextResponse.json(userData)
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('User info error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 