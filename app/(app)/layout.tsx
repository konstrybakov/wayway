import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'

import '../globals.css'
import { dmSans } from '@/app/font'
import { cn } from '@/lib/utils'
import { CSPostHogProvider } from '../providers'
import { Menu } from './components/menu/menu'

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
      <CSPostHogProvider>
        <body className={cn(dmSans.className, 'min-h-screen flex flex-col')}>
          <Menu />
          <main className="flex flex-col items-center justify-center p-24 flex-grow">
            {children}
          </main>
          <Toaster />
        </body>
      </CSPostHogProvider>
    </html>
  )
}
