import { prisma } from '@/lib/db/client'

const words = await prisma.word.findMany({ include: { wordProgress: true } })

for (const word of words) {
  if (!word.wordProgress) {
    await prisma.wordProgress.create({
      data: {
        wordId: word.id,
        userId: word.userId,
      },
    })
  }
}
