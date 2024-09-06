import type { Prisma } from '@prisma/client'
import type { WordsForTableArgs } from './query-args'

export type WordForTable = Prisma.WordGetPayload<typeof WordsForTableArgs>
