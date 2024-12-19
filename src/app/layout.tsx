import "./globals.css"
import { AppProviders } from '@/shared/lib/providers'
import { factFont, geistSans, geistMono } from '@/shared/config/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={`${factFont.variable} ${geistSans.variable} ${geistMono.variable} font-fact antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
} 