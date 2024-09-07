import type { Prisma } from '@prisma/client'

export const WordsForTableArgs = {
  include: {
    wordData: true,
    categories: {
      select: {
        name: true,
      },
    },
  },
} satisfies Prisma.WordFindManyArgs
