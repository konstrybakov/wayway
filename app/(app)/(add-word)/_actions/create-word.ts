'use server'

import 'server-only'

import { prisma } from '@/lib/db/client'
import type { ActionResponsePromise } from '@/lib/types/action-response'
import { auth } from '@clerk/nextjs/server'
import type { Prisma, Word } from '@prisma/client'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { AddWordFormValues } from '../types'

export const actionCreateWord = async (
  addWordFormValues: AddWordFormValues,
): ActionResponsePromise<{ word: Word }> => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('You must be authenticated to add a word')
  }

  const wordData: Prisma.WordCreateArgs = {
    data: {
      word: addWordFormValues.word,
      translation: addWordFormValues.translation,
      description: addWordFormValues.description,
      pos: addWordFormValues.pos,
      difficultyCategory: addWordFormValues.difficultyCategory,
      registerCategory: addWordFormValues.registerCategory,
      frequencyCategory: addWordFormValues.frequencyCategory,
      userId,
      wordProgress: {
        create: {
          userId,
        },
      },
    },
  }

  if (addWordFormValues.category) {
    wordData.data.categories = {
      connect: {
        name: addWordFormValues.category,
      },
    }
  }

  const word = await prisma.word.create(wordData)

  return {
    success: true,
    status: StatusCodes.CREATED,
    statusPhrase: ReasonPhrases.CREATED,
    data: { word },
  }
}
