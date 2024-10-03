import { createContext, useContext } from 'react'
import type { Grade } from '../_actions/process-word/utils'
import type { WordForPractice } from '../_common/types'
import type { EmptyInput, SkippedInput } from '../_utils/input-symbols'

export interface PracticeCardContextType {
  word: WordForPractice
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
