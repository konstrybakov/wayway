import type { Prisma } from '@prisma/client'

export const WordsForTable = {
  include: {
    categories: {
      select: {
        name: true,
      },
    },
  },
} satisfies Prisma.WordFindManyArgs
