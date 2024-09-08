import type { Prisma } from '@prisma/client'

export const WordToProofcheckArgs = {
  include: {
    wordData: true,
  },
} satisfies Prisma.WordFindManyArgs
