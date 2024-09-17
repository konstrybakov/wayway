import type { Prisma } from '@prisma/client'

export const WordProgressForPracticeArgs = {
  include: {
    word: {
      include: {
        categories: true,
      },
    },
  },
} satisfies Prisma.WordProgressFindFirstArgs
