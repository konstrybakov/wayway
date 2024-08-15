'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PracticeSession } from '@prisma/client'
import { CircleXIcon, CornerDownLeftIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { processPracticeAttempt } from '../actions/process-word'
import { Grade } from '../actions/process-word/utils'
import type { WordProgressForPractice } from '../types'

type SkippedCardBackProps = {
  wordProgress: WordProgressForPractice
  practiceSession: PracticeSession
}

export const SkippedCardBack = ({
  wordProgress,
  practiceSession,
}: SkippedCardBackProps) => {
  const process = async (grade: Grade) => {
    await processPracticeAttempt(wordProgress, grade, practiceSession)
  }

  useHotkeys('enter', () => {
    process(Grade.Forgot)
  })

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-2 items-center">
          <CircleXIcon className="text-orange-700" />
          <p className="text-orange-700">Skipped!</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 grid-cols-2">
        <div>
          <p className="text-2xl font-semibold">{wordProgress.word.word}</p>
          <p className="text-lg text-muted-foreground">
            {wordProgress.word.translation}
          </p>
        </div>
        <div className="flex gap-2 col-span-2 items-center justify-end">
          <Button
            className="flex gap-3 bg-stone-700"
            onClick={() => process(Grade.Partial)}
          >
            Next
            <CornerDownLeftIcon size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
