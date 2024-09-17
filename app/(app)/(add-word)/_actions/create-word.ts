'use server'

import 'server-only'

import { auth } from '@/app/(auth)/auth'
import { prisma } from '@/lib/db/client'
import type { ActionResponsePromise } from '@/lib/types/action-response'
import type { Prisma, Word } from '@prisma/client'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { redirect } from 'next/navigation'
import type { AddWordFormValues } from '../types'

export const actionCreateWord = async (
  addWordFormValues: AddWordFormValues,
): ActionResponsePromise<{ word: Word }> => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/signin')
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
      user: {
        connect: {
          id: user.id,
        },
      },
      wordProgress: {
        create: {
          user: {
            connect: { id: user.id },
          },
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
