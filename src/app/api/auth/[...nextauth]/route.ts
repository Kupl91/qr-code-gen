import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from '@/features/auth/config/authConfig'

// Настройка NextAuth с использованием Credentials Provider
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Имя пользователя", type: "text" },
        password: { label: "Пароль", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Запрос на получение токена
          const response = await fetch(`${process.env.API_URL}/api/auth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
            },
            body: new URLSearchParams({
              grant_type: "password",
              username: credentials.username,
              password: credentials.password,
              client_id: "string",
              client_secret: "string"
            })
          })

          if (response.ok) {
            const data = await response.json()
            
            // Получаем информацию о пользователе
            const userResponse = await fetch(`${process.env.API_URL}/api/employee?email=${credentials.username}@1440.space`, {
              headers: {
                "Authorization": `Bearer ${data.access_token}`
              }
            })
            
            if (userResponse.ok) {
              const userData = await userResponse.json()
              return {
                id: userData.userId,
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                image: null,
                accessToken: data.access_token,
              }
            }
            
            // Если не получили данные пользователя, но получили токен
            return {
              id: credentials.username,
              name: credentials.username,
              email: `${credentials.username}@1440.space`,
              accessToken: data.access_token,
            }
          }
          
          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  callbacks: {
    async jwt({ token, user }) {
      // Добавляем accessToken в JWT
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      // Добавляем accessToken в сессию
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 