import type { Prisma } from '@prisma/client'

export const WordProgressForPracticeArgs = {
  include: {
    word: {
      include: {
        categories: true,
        examples: true,
      },
    },
  },
} satisfies Prisma.WordProgressFindFirstArgs
