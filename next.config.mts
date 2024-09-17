import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty'],
  },
} satisfies NextConfig

export default nextConfig
