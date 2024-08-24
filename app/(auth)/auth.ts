import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Keycloak from 'next-auth/providers/keycloak'

import { prisma } from '@/lib/db/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const providers = []

providers.push(GitHub)

if (process.env.DEV_AUTH === 'keycloak') {
  providers.push(Keycloak)
}

export { providers }

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: '/signin',
  },
})
