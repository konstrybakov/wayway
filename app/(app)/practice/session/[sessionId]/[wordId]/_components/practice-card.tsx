import { normalizeString } from '@/lib/utils/normalize-string'
import type { PracticeSession } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'
import { processPracticeAttempt } from '../_actions/process-word'
import type { Grade } from '../_actions/process-word/utils'
import { emptyInput, skippedInput } from '../_utils/input-symbols'
import type { WordProgressForPractice } from '../types'
import { BackCorrect } from './back-variant/correct'
import { BackIncorrect } from './back-variant/incorrect'
import { BackSkipped } from './back-variant/skipped'
import { Front } from './front'
import {
  PracticeCardContext,
  type PracticeCardContextType,
  usePracticeCardContext,
} from './practice-card-context'

interface PracticeCardProps {
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
  const word = wordProgress.word

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
        input,
        setInput,
        practice,
      }) satisfies PracticeCardContextType,
    [input, word, practice],
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

  return normalizeString(input) === normalizeString(word.word) ? (
    <BackCorrect />
  ) : (
    <BackIncorrect input={input} />
  )
}

PracticeCard.Front = PracticeCardFront
PracticeCard.Back = PracticeCardBack
