import { Toaster } from '@/components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils/cn'
import { Menu } from './_components/menu'
import { sans } from './font'
import { CSPostHogProvider } from './providers'

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
    <ClerkProvider>
      <html lang="en">
        <CSPostHogProvider>
          <body className={cn(sans.className, 'min-h-screen flex flex-col')}>
            <Menu />
            <main className="flex flex-col items-center justify-center p-24 flex-grow">
              {children}
            </main>
            <Toaster />
          </body>
        </CSPostHogProvider>
      </html>
    </ClerkProvider>
  )
}
