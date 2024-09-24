import type { Prisma } from '@prisma/client'
import type {
  WordForPracticeArgs,
  WordProgressForPracticeArgs,
} from './query-args'

export interface WordProgressForPractice
  extends Prisma.WordProgressGetPayload<typeof WordProgressForPracticeArgs> {}

export interface WordPracticePageProps {
  params: {
    sessionId: string
    wordId: string
  }
}

export interface WordForPractice
  extends Prisma.WordGetPayload<typeof WordForPracticeArgs> {}
