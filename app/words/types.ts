import type { Prisma } from '@prisma/client'
import type { WordsForTable } from './prisma-args'

export type WordForTable = Prisma.WordGetPayload<typeof WordsForTable>
