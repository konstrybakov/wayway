import type { Prisma } from '@prisma/client'
import type { WordProgressForPracticeArgs } from './prisma-args'

export type WordProgressForPractice = Prisma.WordProgressGetPayload<
  typeof WordProgressForPracticeArgs
>
