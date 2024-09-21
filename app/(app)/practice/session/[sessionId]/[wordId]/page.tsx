import 'server-only'
import { prisma } from '@/lib/db/client'

import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs/server'
import { Practice } from './_components/practice'
import { WordProgressForPracticeArgs } from './query-args'

interface WordPracticePageProps {
  params: {
    sessionId: string
    wordId: string
  }
}

export default async function WordPracticePage({
  params: { sessionId, wordId },
}: WordPracticePageProps) {
  const { userId } = auth().protect()

  const [practiceSession, wordProgress] = await prisma.$transaction([
    prisma.practiceSession.findUnique({
      where: { id: sessionId, userId },
    }),
    prisma.wordProgress.findUnique({
      where: {
        wordId_userId: { wordId: Number(wordId), userId },
      },
      ...WordProgressForPracticeArgs,
    }),
  ])

  if (!practiceSession || !wordProgress) {
    redirect('/practice')
  }

  return (
    <Practice wordProgress={wordProgress} practiceSession={practiceSession} />
  )
}
