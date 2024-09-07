import type { Prisma } from '@prisma/client'

export const WordProgressForPracticeArgs = {
  include: {
    word: {
      include: {
        wordData: true,
      },
    },
  },
} satisfies Prisma.WordProgressFindFirstArgs
