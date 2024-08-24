import type { Prisma } from '@prisma/client'

export const WordProgressForPracticeArgs = {
  include: {
    word: true,
  },
} satisfies Prisma.WordProgressFindFirstArgs
