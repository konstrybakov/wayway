import type { Prisma } from '@prisma/client'
import type { WordsForTableArgs } from './query-args'

export interface WordForTable
  extends Prisma.WordGetPayload<typeof WordsForTableArgs> {}
