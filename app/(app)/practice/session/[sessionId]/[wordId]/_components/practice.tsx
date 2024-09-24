'use client'

import { PracticeCard } from '@/app/(app)/practice/session/[sessionId]/[wordId]/_components/practice-card'
import type { WordForPractice } from '../types'

interface PracticeProps {
  word: WordForPractice
}

export const Practice = ({ word }: PracticeProps) => {
  return (
    <PracticeCard word={word}>
      <PracticeCard.Front />
      <PracticeCard.Back />
    </PracticeCard>
  )
}
