'use server'
import type { Translation } from '@/app/(search)/actions/search-word/types'
import { type Prisma, PrismaClient, type Word } from '@prisma/client'

const prisma = new PrismaClient()

export const saveWord = async (
  translation: Translation,
  form: 'base' | 'original',
  userId: string,
): Promise<Word> => {
  'use server'

  if (!userId) {
    throw new Error('User not authenticated')
  }

  const word = {
    word:
      form === 'original' ? translation.correctOriginal : translation.baseForm,
    translation:
      form === 'original'
        ? translation.translation
        : translation.baseTranslation,
    description: translation.description,
    categories: {
      connectOrCreate: translation.thematicCategory.map(category => ({
        where: { name: category },
        create: { name: category },
      })),
    },
    frequencyCategory: translation.frequencyCategory,
    difficultyCategory: translation.difficultyCategory,
    registerCategory: translation.registerCategory,
    pos: translation.partOfSpeech,
    examples: {
      createMany: {
        data: translation.examples.map(({ original, translation }) => ({
          original,
          translation,
        })),
      },
    },
    user: {
      connect: { id: userId },
    },
  } satisfies Prisma.WordCreateInput

  const result = await prisma.word.create({
    data: word,
  })

  return result
}
