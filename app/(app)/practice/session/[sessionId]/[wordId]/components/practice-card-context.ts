import type { Grade } from '@/app/(app)/practice/session/[sessionId]/[wordId]/actions/process-word/utils'
import { createContext, useContext } from 'react'

type PracticeCardContextType = {
  word: string
  translation: string
  input: string
  setInput: (input: string) => void
  submitted: boolean
  setSubmitted: (submitted: boolean) => void
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
