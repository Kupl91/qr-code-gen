import "./globals.css"
import localFont from "next/font/local"
import { Providers } from './providers'

const geistSans = localFont({
  src: [
    {
      path: '../shared/assets/fonts/GeistVF.woff',
      weight: '100 900',
      style: 'normal',
    }
  ],
  variable: '--font-geist-sans',
})

const geistMono = localFont({
  src: [
    {
      path: '../shared/assets/fonts/GeistMonoVF.woff',
      weight: '100 900',
      style: 'normal',
    }
  ],
  variable: '--font-geist-mono',
})

const factFont = localFont({
  src: [
    {
      path: '../shared/assets/fonts/FactVF.woff',
      weight: '100 900',
      style: 'normal',
    }
  ],
  variable: '--font-fact'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${factFont.variable} font-fact antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 