import type { Prisma } from '@prisma/client'

export const WordProgressForPracticeArgs = {
  select: {
    id: true,
    phase: true,
    learningStep: true,
    interval: true,
    easeFactor: true,
  },
} satisfies Omit<Prisma.WordProgressFindUniqueArgs, 'where'>

export const WordForPracticeArgs = {
  select: {
    id: true,
    translation: true,
    pos: true,
    word: true,
    categories: {
      select: {
        name: true,
      },
    },
    examples: {
      select: {
        original: true,
        translation: true,
      },
    },
  },
} satisfies Omit<Prisma.WordFindUniqueArgs, 'where'>

export const PracticeSessionForPracticeArgs = {
  select: {
    words: true,
  },
} satisfies Omit<Prisma.PracticeSessionFindUniqueArgs, 'where'>
