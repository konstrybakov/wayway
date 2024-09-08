import type { Prisma } from '@prisma/client'
import type { WordToProofcheckArgs } from './query-args'

export type WordToProofcheck = Prisma.WordGetPayload<
  typeof WordToProofcheckArgs
>
