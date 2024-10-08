'use server'

import 'server-only'

import { prisma } from '@/lib/db/client'
import { SELECT_NONE } from '@/lib/db/select-none'
import { auth } from '@clerk/nextjs/server'
import { Phase, type PracticeSession, type Prisma } from '@prisma/client'
import { addMinutes } from 'date-fns'
import { redirect } from 'next/navigation'
import {
  PracticeSessionForPracticeArgs,
  WordProgressForPracticeArgs,
} from '../_common/query-args'
import type { WordForPractice, WordProgressForPractice } from '../_common/types'
import { Grade, config } from './process-word/utils'

export const processPracticeAttempt = async (
  input: string | null,
  wordId: WordForPractice['id'],
  grade: Grade,
  sessionId: PracticeSession['id'],
) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('You must be authenticated to process practice attempts')
  }

  const wordProgress = await prisma.wordProgress.findUniqueOrThrow({
    where: {
      wordId,
    },
    ...WordProgressForPracticeArgs,
  })

  let updatedWordProgress: Prisma.WordProgressUpdateInput = {}

  switch (wordProgress.phase) {
    case Phase.Learning:
    case Phase.Relearning:
      updatedWordProgress = handleLearningPhase(wordProgress, grade)

      break

    case Phase.Review:
      updatedWordProgress = handleReviewPhase(wordProgress, grade)

      break
  }

  const attempt = {
    input,
    phase: wordProgress.phase,
    grade: grade,
    wordProgress: {
      connect: {
        id: wordProgress.id,
      },
    },
    word: {
      connect: {
        id: wordId,
      },
    },
    practiceSession: {
      connect: {
        id: sessionId,
      },
    },
    userId,
  } satisfies Prisma.PracticeAttemptCreateInput

  const session = await prisma.practiceSession.findUniqueOrThrow({
    where: { id: sessionId },
    ...PracticeSessionForPracticeArgs,
  })

  const sessionWords = session.words

  sessionWords.pop()

  const updatedSession = {
    words: sessionWords,
    completed: sessionWords.length === 0,
  } satisfies Prisma.PracticeSessionUpdateInput

  await prisma.$transaction([
    prisma.practiceAttempt.create({ data: attempt, ...SELECT_NONE }),
    prisma.practiceSession.update({
      where: { id: sessionId },
      data: updatedSession,
      ...SELECT_NONE,
    }),
    prisma.wordProgress.update({
      where: { id: wordProgress.id },
      data: {
        ...updatedWordProgress,
        lastReviewDate: new Date(),
      },
      ...SELECT_NONE,
    }),
  ])

  const nextRoute = updatedSession.completed ? 'results' : sessionWords.at(-1)

  redirect(`/practice/session/${sessionId}/${nextRoute}`)
}

const handleLearningPhase = (
  wordProgress: WordProgressForPractice,
  grade: Grade,
): Prisma.WordProgressUpdateInput => {
  const { learningSteps } = config

  switch (grade) {
    case Grade.Forgot:
      return {
        learningStep: 0,
        interval: learningSteps[0],
        nextReviewDate: calculateNextReviewDate(learningSteps[0]),
      }

    case Grade.Partial: {
      const interval = Math.floor(learningSteps[wordProgress.learningStep] / 2)

      return {
        interval,
        nextReviewDate: calculateNextReviewDate(interval),
      }
    }

    case Grade.Remembered: {
      if (wordProgress.learningStep + 1 < learningSteps.length) {
        const nextStep = wordProgress.learningStep + 1
        return {
          learningStep: nextStep,
          interval: learningSteps[nextStep],
          nextReviewDate: calculateNextReviewDate(learningSteps[nextStep]),
        }
      }

      return graduateToReviewPhase(wordProgress)
    }

    case Grade.Easy:
      return graduateToReviewPhase(wordProgress, true)
  }
}

const handleReviewPhase = (
  wordProgress: WordProgressForPractice,
  grade: Grade,
): Prisma.WordProgressUpdateInput => {
  const { intervalMultiplier, easyBonus, lapseIntervalMultiplier } = config
  let { interval, easeFactor } = wordProgress

  switch (grade) {
    case Grade.Forgot:
      return {
        phase: Phase.Relearning,
        learningStep: 0,
        // TODO: interval here is 1 minute - doesn't really make sense
        interval: Math.max(1, Math.round(interval * lapseIntervalMultiplier)),
        easeFactor: Math.max(1.3, easeFactor - 0.2),
        nextReviewDate: calculateNextReviewDate(config.learningSteps[0]),
      }

    case Grade.Partial:
      interval = Math.round(interval * 1.2 * intervalMultiplier)
      easeFactor = Math.max(1.3, easeFactor - easeFactor * 0.15)

      break

    case Grade.Remembered:
      interval = Math.round(interval * easeFactor * intervalMultiplier)

      break

    case Grade.Easy:
      interval = Math.round(
        interval * easeFactor * easyBonus * intervalMultiplier,
      )

      easeFactor = Math.min(2.5, easeFactor + easeFactor * 0.15)

      break
  }

  return {
    interval,
    easeFactor,
    nextReviewDate: calculateNextReviewDate(interval),
  }
}

const graduateToReviewPhase = (
  wordProgress: WordProgressForPractice,
  isEasy = false,
): Prisma.WordProgressUpdateInput => {
  const graduationInterval = isEasy
    ? config.learningSteps[config.learningSteps.length - 1]
    : wordProgress.interval

  const easyBonus = isEasy ? config.easyBonus : 1
  const interval = Math.round(graduationInterval * easyBonus)

  return {
    phase: Phase.Review,
    interval,
    nextReviewDate: calculateNextReviewDate(interval),
  }
}

const calculateNextReviewDate = (minutes: number): Date => {
  return addMinutes(new Date(), minutes)
}
