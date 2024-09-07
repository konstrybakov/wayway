import { processPracticeAttempt } from '../actions/process-word'
import type { Grade } from '../actions/process-word/utils'
import { Front } from '../components/front'
import {
  PracticeCardContext,
  usePracticeCardContext,
} from './practice-card-context'
import type { WordProgressForPractice } from '../types'
import { normalize } from '../utils/normalize'
import type { PracticeSession } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'
import { BackCorrect } from './back-variant/correct'
import { BackIncorrect } from './back-variant/incorrect'
import { BackSkipped } from './back-variant/skipped'

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
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const word = wordProgress.word.word
  const translation = wordProgress.word.translation

  const practice = useCallback(
    async (grade: Grade) => {
      await processPracticeAttempt(input, wordProgress, grade, practiceSession)
    },
    [input, wordProgress, practiceSession],
  )

  const context = useMemo(
    () => ({
      word,
      translation,
      input,
      setInput,
      submitted,
      setSubmitted,
      practice,
    }),
    [input, word, submitted, translation, practice],
  )

  return (
    <PracticeCardContext.Provider value={context}>
      {children}
    </PracticeCardContext.Provider>
  )
}

export const PracticeCardFront = () => {
  const { submitted } = usePracticeCardContext()

  return submitted ? null : <Front />
}

export const PracticeCardBack = () => {
  const { input, word, submitted } = usePracticeCardContext()

  if (!submitted) return null
  if (input === '') return <BackSkipped />

  return normalize(input) === normalize(word) ? (
    <BackCorrect />
  ) : (
    <BackIncorrect />
  )
}

PracticeCard.Front = PracticeCardFront
PracticeCard.Back = PracticeCardBack
