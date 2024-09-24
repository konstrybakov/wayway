'use server'

import 'server-only'

import { prisma } from '@/lib/db/client'
import { SELECT_NONE } from '@/lib/db/select-none'
import type { ActionResponsePromise } from '@/lib/types/action-response'
import { auth } from '@clerk/nextjs/server'
import type { Prisma } from '@prisma/client'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { AddWordFormValues, CreateWordResponseData } from '../types'

export const actionCreateWord = async (
  addWordFormValues: AddWordFormValues,
): ActionResponsePromise<CreateWordResponseData> => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('You must be authenticated to add a word')
  }

  const wordData = {
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
    ...(addWordFormValues.category && {
      categories: {
        connect: {
          name: addWordFormValues.category,
        },
      },
    }),
  } satisfies Prisma.WordUncheckedCreateInput

  const word = await prisma.word.create({
    data: wordData,
    ...SELECT_NONE,
  })

  return {
    success: true,
    status: StatusCodes.CREATED,
    statusPhrase: ReasonPhrases.CREATED,
    data: { wordId: word.id },
  }
}
