'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PracticeSession } from '@prisma/client'
import { useAtomValue } from 'jotai'
import {
  ArrowBigUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  CornerDownLeftIcon,
} from 'lucide-react'
import { processPracticeAttempt } from './actions/process-word'
import { Grade } from './actions/process-word/utils'
import { guessAtom } from './state/guess-atom'
import type { WordProgressForPractice } from './types'

const normalize = (string: string) => string.toLowerCase().trim()

type WordCardBackProps = {
  wordProgress: WordProgressForPractice
  practiceSession: PracticeSession
}

export const WordCardBack = ({
  wordProgress,
  practiceSession,
}: WordCardBackProps) => {
  const guess = useAtomValue(guessAtom)
  const correct = normalize(guess) === normalize(wordProgress.word.word)

  const process = async (grade: Grade) => {
    await processPracticeAttempt(wordProgress, grade, practiceSession)
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-2 items-center">
          {correct ? (
            <>
              <CircleCheckIcon className="text-emerald-700" />
              <p className="text-emerald-700">Correct!</p>
            </>
          ) : (
            <>
              <CircleXIcon className="text-rose-700" />
              <p className="text-rose-700">Wrong!</p>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1 min-h-24 grid-cols-2">
        <div>
          <p className="text-2xl font-semibold">{wordProgress.word.word}</p>
          <p className="text-lg text-muted-foreground">
            {wordProgress.word.translation}
          </p>
        </div>
        {correct ? null : (
          <p className="text-rose-700 justify-self-end">{guess}</p>
        )}
        <div className="flex gap-2 col-span-2 items-center justify-end">
          {correct ? (
            <>
              <Button
                className="flex gap-3"
                onClick={() => process(Grade.Remembered)}
              >
                Remembered
                <CornerDownLeftIcon size={16} />
              </Button>
              <Button
                variant="outline"
                className="flex gap-3"
                onClick={() => process(Grade.Easy)}
              >
                Easy
                <div className="flex">
                  <ArrowBigUpIcon size={16} />
                  <CornerDownLeftIcon size={16} />
                </div>
              </Button>
            </>
          ) : (
            <>
              <Button
                className="flex gap-3"
                onClick={() => process(Grade.Partial)}
              >
                Partial
                <CornerDownLeftIcon size={16} />
              </Button>
              <Button
                className="flex gap-3"
                variant="outline"
                onClick={() => process(Grade.Forgot)}
              >
                Wrong
                <div className="flex">
                  <ArrowBigUpIcon size={16} />
                  <CornerDownLeftIcon size={16} />
                </div>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
