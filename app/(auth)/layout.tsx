import type { Metadata } from 'next'

import '../globals.css'
import { sans } from '@/app/font'
import { cn } from '@/lib/utils'
import { CSPostHogProvider } from '../providers'

export const metadata: Metadata = {
  title: 'Sign in - WayWay',
  description: 'Sign in',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={cn(sans.className, 'min-h-screen flex flex-col')}>
          <main className="flex flex-col items-center justify-center p-24 flex-grow">
            {children}
          </main>
        </body>
      </CSPostHogProvider>
    </html>
  )
}
