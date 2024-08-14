import { prisma } from '@/lib/db/client'
import { Phase } from '@prisma/client'

await prisma.$transaction([
  prisma.practiceSession.deleteMany(),
  prisma.practiceAttempt.deleteMany(),
  prisma.wordProgress.updateMany({
    data: {
      lastReviewDate: null,
      nextReviewDate: null,
      easeFactor: 2.5,
      interval: 0,
      learningStep: 0,
      phase: Phase.Learning,
    },
  }),
])
