import type { Prisma } from '@prisma/client'
import type { WordsForTableArgs } from './prisma-args'

export type WordForTable = Prisma.WordGetPayload<typeof WordsForTableArgs>
