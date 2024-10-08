'use server'

import 'server-only'

import { generateObject } from 'ai'
import { TranslationSchema } from './search-word/_common/schemas'
import type { Translation } from './search-word/_common/types'
import { systemPrompt } from './search-word/system-prompt'
import { userPrompt } from './search-word/user-prompt'

import { fetchCategories } from '@/lib/data/fetch-categories'
import { prisma } from '@/lib/db/client'
import { modelO } from '@/lib/llm/models'
import { auth } from '@clerk/nextjs/server'

export async function searchWord(input: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('You must be authenticated to search for a word')
  }

  const savedWord = await prisma.word.findFirst({
    where: { word: input, userId },
    select: {
      examples: {
        select: {
          original: true,
          translation: true,
        },
      },
      categories: {
        select: {
          name: true,
        },
      },
      translation: true,
      word: true,
      pos: true,
      difficultyCategory: true,
      registerCategory: true,
      frequencyCategory: true,
      description: true,
    },
  })

  if (savedWord) {
    const translation = {
      translation: savedWord.translation,
      correctOriginal: savedWord.word,
      examples: savedWord.examples,
      error: null,
      partOfSpeech: savedWord.pos,
      thematicCategory: savedWord.categories.map(({ name }) => name),
      difficultyCategory: savedWord.difficultyCategory,
      registerCategory: savedWord.registerCategory,
      frequencyCategory: savedWord.frequencyCategory,
      description: savedWord.description,
      baseForm: savedWord.word,
      baseTranslation: savedWord.translation,
    } satisfies Translation

    return { translation, saved: true }
  }

  const thematicCategories = await fetchCategories()

  const { object: translation } = await generateObject({
    model: modelO,
    system: systemPrompt,
    prompt: userPrompt(input, thematicCategories),
    schema: TranslationSchema,
    temperature: 0.35,
  })

  return { translation, saved: false }
}
