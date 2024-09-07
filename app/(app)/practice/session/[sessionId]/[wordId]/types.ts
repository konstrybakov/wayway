import type { Prisma } from '@prisma/client'
import type { WordProgressForPracticeArgs } from './query-args'

export type WordProgressForPractice = Prisma.WordProgressGetPayload<
  typeof WordProgressForPracticeArgs
>
