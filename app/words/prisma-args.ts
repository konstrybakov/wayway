import type { Prisma } from '@prisma/client'

export const WordsForTableArgs = {
  include: {
    categories: {
      select: {
        name: true,
      },
    },
  },
} satisfies Prisma.WordFindManyArgs
