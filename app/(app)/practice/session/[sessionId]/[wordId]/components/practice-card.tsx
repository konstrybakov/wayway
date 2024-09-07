import { processPracticeAttempt } from '../actions/process-word'
import type { Grade } from '../actions/process-word/utils'
import { Front } from '../components/front'
import {
  PracticeCardContext,
  usePracticeCardContext,
  type PracticeCardContextType,
} from './practice-card-context'
import type { WordProgressForPractice } from '../types'
import { normalize } from '../utils/normalize'
import type { PracticeSession } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'
import { BackCorrect } from './back-variant/correct'
import { BackIncorrect } from './back-variant/incorrect'
import { BackSkipped } from './back-variant/skipped'
import { emptyInput, skippedInput } from '../utils/input-symbols'

type PracticeCardProps = {
  children: React.ReactNode
  wordProgress: WordProgressForPractice
  practiceSession: PracticeSession
}

export const PracticeCard = ({
  children,
  wordProgress,
  practiceSession,
}: PracticeCardProps) => {
  const [input, setInput] =
    useState<PracticeCardContextType['input']>(emptyInput)
  const word = wordProgress.word.word
  const translation = wordProgress.word.wordData.translation

  const practice = useCallback(
    async (grade: Grade) => {
      await processPracticeAttempt(
        input === skippedInput || input === emptyInput ? null : input,
        wordProgress,
        grade,
        practiceSession,
      )
    },
    [input, wordProgress, practiceSession],
  )

  const context = useMemo(
    () =>
      ({
        word,
        translation,
        input,
        setInput,
        practice,
      }) satisfies PracticeCardContextType,
    [input, word, translation, practice],
  )

  return (
    <PracticeCardContext.Provider value={context}>
      {children}
    </PracticeCardContext.Provider>
  )
}

export const PracticeCardFront = () => {
  const { input } = usePracticeCardContext()

  return input === emptyInput ? <Front /> : null
}

export const PracticeCardBack = () => {
  const { input, word } = usePracticeCardContext()

  if (input === emptyInput) return null
  if (input === skippedInput) return <BackSkipped />

  return normalize(input) === normalize(word) ? (
    <BackCorrect />
  ) : (
    <BackIncorrect input={input} />
  )
}

PracticeCard.Front = PracticeCardFront
PracticeCard.Back = PracticeCardBack
