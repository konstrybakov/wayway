import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'

import localFont from 'next/font/local'

import './globals.css'
import { cn } from '@/lib/utils'
import { Menu } from './(menu)/menu'

const satoshi = localFont({
  src: './fonts/satoshi/variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
})

export const metadata: Metadata = {
  title: 'WayWay',
  description: 'WayWay',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(satoshi.className, 'min-h-screen flex flex-col')}>
        <Menu />
        <main className="flex flex-col items-center justify-center p-24 flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
