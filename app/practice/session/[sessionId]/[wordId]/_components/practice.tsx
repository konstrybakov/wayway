'use client'

import type { WordForPractice } from '../_common/types'
import { PracticeCard } from './practice-card'

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
