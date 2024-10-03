import type { Prisma } from '@prisma/client'

export const WordsForTableArgs = {
  select: {
    id: true,
    word: true,
    translation: true,
    pos: true,
    difficultyCategory: true,
    frequencyCategory: true,
    registerCategory: true,
    categories: {
      select: {
        name: true,
      },
    },
  },
} satisfies Prisma.WordFindManyArgs
