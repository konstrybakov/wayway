'use server'

import { prisma } from '@/lib/db/client'
import { SELECT_NONE } from '@/lib/db/select-none'
import type { Word } from '@prisma/client'

import 'server-only'

export const deleteWord = async (id: Word['id']) => {
  'use server'

  const result = await prisma.word.delete({
    where: { id },
    ...SELECT_NONE,
  })

  return result
}
