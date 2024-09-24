import { normalizeString } from '@/lib/utils/normalize-string'
import { useParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { processPracticeAttempt } from '../_actions/process-word'
import type { Grade } from '../_actions/process-word/utils'
import { emptyInput, skippedInput } from '../_utils/input-symbols'
import type { WordForPractice, WordPracticePageProps } from '../types'
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
  word: WordForPractice
}

export const PracticeCard = ({ children, word }: PracticeCardProps) => {
  const params = useParams<WordPracticePageProps['params']>()
  const [input, setInput] =
    useState<PracticeCardContextType['input']>(emptyInput)

  const practice = useCallback(
    async (grade: Grade) => {
      await processPracticeAttempt(
        input === skippedInput || input === emptyInput ? null : input,
        Number(params.wordId),
        grade,
        params.sessionId,
      )
    },
    [input, params.wordId, params.sessionId],
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
