import type { Prisma } from '@prisma/client'
import type { WordProgressForPracticeArgs } from './query-args'

export interface WordProgressForPractice
  extends Prisma.WordProgressGetPayload<typeof WordProgressForPracticeArgs> {}
