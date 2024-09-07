'use client'

import { PracticeCard } from '@/app/(app)/practice/session/[sessionId]/[wordId]/components/practice-card'
import type { WordProgressForPractice } from '@/app/(app)/practice/session/[sessionId]/[wordId]/types'
import type { PracticeSession } from '@prisma/client'

type PracticeProps = {
  wordProgress: WordProgressForPractice
  practiceSession: PracticeSession
}

export const Practice = ({ wordProgress, practiceSession }: PracticeProps) => {
  return (
    <PracticeCard wordProgress={wordProgress} practiceSession={practiceSession}>
      <PracticeCard.Front />
      <PracticeCard.Back />
    </PracticeCard>
  )
}