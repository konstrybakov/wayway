import type { Prisma } from '@prisma/client'
import type { WordsToProofcheckArgs } from './query-args'

export type WordsToProofcheck = Prisma.WordGetPayload<
  typeof WordsToProofcheckArgs
>
