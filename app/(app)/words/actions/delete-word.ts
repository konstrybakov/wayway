'use server'

import { prisma } from '@/lib/db/client'

import 'server-only'

export const deleteWord = async (id: number) => {
  'use server'

  const result = await prisma.wordData.deleteMany({
    where: {
      word: {
        id,
      },
    },
  })

  return result
}
