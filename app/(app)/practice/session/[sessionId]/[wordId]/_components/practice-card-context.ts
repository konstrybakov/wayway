import type { Grade } from '@/app/(app)/practice/session/[sessionId]/[wordId]/_actions/process-word/utils'
import { createContext, useContext } from 'react'
import type { EmptyInput, SkippedInput } from '../_utils/input-symbols'
import type { WordProgressForPractice } from '../types'

export interface PracticeCardContextType {
  word: WordProgressForPractice['word']
  input: EmptyInput | SkippedInput | string
  setInput: (input: SkippedInput | string) => void
  practice: (grade: Grade) => Promise<void>
}

export const PracticeCardContext =
  createContext<PracticeCardContextType | null>(null)

export const usePracticeCardContext = () => {
  const context = useContext(PracticeCardContext)

  if (!context) {
    throw new Error('usePracticeCardContext must be used within a PracticeCard')
  }

  return context
}
