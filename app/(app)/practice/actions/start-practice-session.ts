'use server'

import 'server-only'

import { prisma } from '@/lib/db/client'
import { Phase, PracticeSessionType, type Prisma } from '@prisma/client'
import { shuffle } from 'fast-shuffle'
import type { User } from 'next-auth'
import { redirect } from 'next/navigation'

export interface StartSessionOptions {
  phases: Phase[]
  practiceTypes: PracticeSessionType[]
  userId: User['id']
  size: number | null
  count?: boolean
}

export const startSession = async ({
  phases,
  practiceTypes,
  userId,
  size,
  count = false,
}: StartSessionOptions) => {
  'use server'

  const phase: Phase[] = []

  phases.includes(Phase.Learning) &&
    phase.push(Phase.Learning, Phase.Relearning)

  phases.includes(Phase.Review) && phase.push(Phase.Review)

  const reviewFilter = {
    nextReviewDate: {
      lt: new Date(),
    },
  } satisfies Prisma.WordProgressWhereInput

  const newFilter = {
    nextReviewDate: null,
    lastReviewDate: null,
  } satisfies Prisma.WordProgressWhereInput

  const filters: Prisma.WordProgressWhereInput[] = []

  practiceTypes.includes(PracticeSessionType.Review) &&
    filters.push(reviewFilter)
  practiceTypes.includes(PracticeSessionType.New) && filters.push(newFilter)

  const words = await prisma.wordProgress.findMany({
    where: {
      userId,
      phase: {
        in: phase,
      },
      OR: filters,
    },
    select: {
      wordId: true,
    },
    orderBy: [{ nextReviewDate: 'asc' }, { createdAt: 'asc' }],
    ...(size && { take: size }),
  })

  if (count) {
    return words.length
  }

  const [, session] = await prisma.$transaction([
    prisma.practiceSession.updateMany({
      where: {
        userId,
      },
      data: {
        completed: true,
      },
    }),
    prisma.practiceSession.create({
      data: {
        user: {
          connect: { id: userId },
        },
        size,
        words: shuffle(words.map(({ wordId }) => wordId)),
        phase: phases,
        practiceType: practiceTypes,
      },
    }),
  ])

  redirect(`/practice/session/${session.id}/${session.words[0]}`)
}
