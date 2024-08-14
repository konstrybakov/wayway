import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'

import { Manrope } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'
import { Menu } from './(menu)/menu'

const manrope = Manrope({
  variable: '--font-ui',
  display: 'swap',
  subsets: ['latin'],
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
      <body className={cn(manrope.className, 'min-h-screen flex flex-col')}>
        <Menu />
        <main className="flex flex-col items-center justify-center p-24 flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
