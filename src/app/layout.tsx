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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 