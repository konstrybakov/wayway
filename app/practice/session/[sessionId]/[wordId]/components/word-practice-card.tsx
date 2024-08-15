'use client'

import type { PracticeSession } from '@prisma/client'
import { useAtomValue } from 'jotai'
import { WordCardFront } from './front'

import { resultAtom } from '../state/result-atom'
import type { WordProgressForPractice } from '../types'
import { CorrectCardBack } from './correct-back'
import { IncorrectCardBack } from './incorrect-back'
import { SkippedCardBack } from './skipped-back'

type WordPracticeCardProps = {
  wordProgress: WordProgressForPractice
  practiceSession: PracticeSession
}

export const WordPracticeCard = ({
  wordProgress,
  practiceSession,
}: WordPracticeCardProps) => {
  const result = useAtomValue(resultAtom)

  if (result === 'correct') {
    return (
      <CorrectCardBack
        wordProgress={wordProgress}
        practiceSession={practiceSession}
      />
    )
  }

  if (result === 'incorrect') {
    return (
      <IncorrectCardBack
        wordProgress={wordProgress}
        practiceSession={practiceSession}
      />
    )
  }

  if (result === 'skipped') {
    return (
      <SkippedCardBack
        wordProgress={wordProgress}
        practiceSession={practiceSession}
      />
    )
  }

  return (
    <WordCardFront
      translation={wordProgress.word.translation}
      word={wordProgress.word.word}
    />
  )
}
