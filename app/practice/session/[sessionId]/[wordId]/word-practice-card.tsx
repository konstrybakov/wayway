'use client'

import type { PracticeSession } from '@prisma/client'
import { useAtomValue } from 'jotai'

import { WordCardBack } from './back'
import { WordCardFront } from './front'
import { submittedAtom } from './state/submitted-atom'
import type { WordProgressForPractice } from './types'

type WordPracticeCardProps = {
  wordProgress: WordProgressForPractice
  practiceSession: PracticeSession
}

export const WordPracticeCard = ({
  wordProgress,
  practiceSession,
}: WordPracticeCardProps) => {
  const submitted = useAtomValue(submittedAtom)

  if (submitted) {
    return (
      <WordCardBack
        wordProgress={wordProgress}
        practiceSession={practiceSession}
      />
    )
  }

  return <WordCardFront word={wordProgress.word.translation} />
}
