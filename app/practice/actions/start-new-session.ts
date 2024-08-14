'use server'

import { prisma } from '@/lib/db/client'
import { Phase } from '@prisma/client'
import type { User } from 'next-auth'
import { redirect } from 'next/navigation'
import 'server-only'

export const startNewSession = async (
  userId: User['id'] /* , type: 'new' */,
) => {
  'use server'
  const size = 15

  const words = await prisma.wordProgress.findMany({
    where: {
      userId,
      phase: {
        in: [Phase.Learning, Phase.Relearning],
      },
      nextReviewDate: {
        lt: new Date(),
      },
    },
    take: size,
    orderBy: { nextReviewDate: 'asc' },
    select: {
      wordId: true,
    },
  })

  console.log('Words with next review date falling due:', words)

  if (words.length < size) {
    const newWords = await prisma.wordProgress.findMany({
      where: {
        userId,
        phase: {
          in: [Phase.Learning, Phase.Relearning],
        },
        lastReviewDate: null,
        nextReviewDate: null,
      },
      orderBy: {
        word: {
          createdAt: 'asc',
        },
      },
      take: size - words.length,
      select: {
        wordId: true,
      },
    })

    console.log('New words:', newWords)

    words.push(...newWords)
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
        words: words.map(({ wordId }) => wordId),
      },
    }),
  ])

  redirect(`/practice/session/${session.id}/${session.words[0]}`)
}
