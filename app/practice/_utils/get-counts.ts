import { prisma } from '@/lib/db/client'
import { auth } from '@clerk/nextjs/server'
import { Phase } from '@prisma/client'
import { isBefore } from 'date-fns/isBefore'

export const getCounts = async () => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('You must be authenticated to get counts')
  }

  const wordProgress = await prisma.wordProgress.findMany({
    where: { userId },
    select: {
      phase: true,
      nextReviewDate: true,
      _count: {
        select: {
          practiceAttempts: true,
        },
      },
    },
  })

  const newCount = wordProgress.filter(
    word => word._count.practiceAttempts === 0,
  ).length

  const learningCount = wordProgress.filter(
    word =>
      (word.phase === Phase.Learning || word.phase === Phase.Relearning) &&
      word._count.practiceAttempts,
  ).length

  const learningDueForReviewCount = wordProgress.filter(
    word =>
      (word.phase === Phase.Learning || word.phase === Phase.Relearning) &&
      word.nextReviewDate &&
      isBefore(word.nextReviewDate, new Date()),
  ).length

  const masteredDueForReviewCount = wordProgress.filter(
    word =>
      word.phase === Phase.Review &&
      word.nextReviewDate &&
      isBefore(word.nextReviewDate, new Date()),
  ).length

  const masteredCount = wordProgress.filter(
    word => word.phase === Phase.Review,
  ).length

  const formatter = new Intl.NumberFormat()

  return {
    totalCount: formatter.format(wordProgress.length),
    newCount: formatter.format(newCount),
    learningCount: formatter.format(learningCount),
    learningDueForReviewCount: formatter.format(learningDueForReviewCount),
    masteredCount: formatter.format(masteredCount),
    masteredDueForReviewCount: formatter.format(masteredDueForReviewCount),
  }
}
