import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

import { prisma } from '@/lib/db/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const providers = [GitHub]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: '/signin',
  },
})
