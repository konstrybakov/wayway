import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'

import { DM_Sans } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'
import { Menu } from './components/menu/menu'

const dmSans = DM_Sans({
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
      <body className={cn(dmSans.className, 'min-h-screen flex flex-col')}>
        <Menu />
        <main className="flex flex-col items-center justify-center p-24 flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
