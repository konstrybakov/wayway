'use server'

import { prisma } from '@/lib/db/client'
import { SELECT_NONE } from '@/lib/db/select-none'

import 'server-only'

export const deleteWord = async (id: number) => {
  'use server'

  const result = await prisma.word.delete({
    where: { id },
    ...SELECT_NONE,
  })

  return result
}
