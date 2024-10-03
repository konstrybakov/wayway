'use server'

import { SELECT_NONE } from '@/lib/db/select-none'
import { auth } from '@clerk/nextjs/server'
import { type Prisma, PrismaClient } from '@prisma/client'
import type { Translation } from './search-word/_common/types'

const prisma = new PrismaClient()

export const saveWord = async (
  translation: Translation,
  form: 'base' | 'original',
) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('You must be authenticated to save a word')
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
        create: { name: category, user: { connect: { id: userId } } },
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
    wordProgress: {
      create: {
        userId,
      },
    },
  } satisfies Prisma.WordCreateInput

  const result = await prisma.word.create({
    data: word,
    ...SELECT_NONE,
  })

  return result
}
