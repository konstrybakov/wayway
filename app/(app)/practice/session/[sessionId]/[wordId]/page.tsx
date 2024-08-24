import { prisma } from '@/lib/db/client'

import { redirect } from 'next/navigation'
import { WordPracticeCard } from './components/word-practice-card'

import 'server-only'
import { auth } from '@/app/(auth)/auth'
import { Provider } from 'jotai'

type WordPracticePageProps = {
  params: {
    sessionId: string
    wordId: string
  }
}

export default async function WordPracticePage({
  params: { sessionId, wordId },
}: WordPracticePageProps) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/signin')
  }

  const [practiceSession, word] = await prisma.$transaction([
    prisma.practiceSession.findUnique({
      where: { id: sessionId, userId },
    }),
    prisma.wordProgress.findUnique({
      where: {
        wordId_userId: { wordId: Number(wordId), userId },
      },
      include: { word: true },
    }),
  ])

  if (!practiceSession || !word) {
    redirect('/practice')
  }

  return (
    <Provider key={new Date().getTime()}>
      <WordPracticeCard
        key={new Date().getTime()}
        wordProgress={word}
        practiceSession={practiceSession}
      />
    </Provider>
  )
}
