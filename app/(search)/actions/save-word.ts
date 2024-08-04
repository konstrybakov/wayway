'use server'
import type { Translation } from '@/app/(search)/actions/search-word/types'
import { type Prisma, PrismaClient, type Word } from '@prisma/client'

const prisma = new PrismaClient()

export const saveWord = async (
  translation: Translation,
  form: 'base' | 'original',
): Promise<Word> => {
  'use server'

  const word = {
    word:
      form === 'original' ? translation.correctOriginal : translation.baseForm,
    translation:
      form === 'original'
        ? translation.translation
        : translation.baseTranslation,
    description: translation.description,
    category: translation.thematicCategory,
    frequencyCategory: translation.frequencyCategory,
    difficultyCategory: translation.difficultyCategory,
    registerCategory: translation.registerCategory,
    pos: translation.partOfSpeech,
    examples: translation.examples,
  } satisfies Prisma.WordCreateInput

  const result = await prisma.word.create({
    data: word,
  })

  return result
}
