import type { Prisma } from '@prisma/client'

export const WordsToProofcheckArgs = {
  include: {
    wordData: true,
  },
} satisfies Prisma.WordFindManyArgs
