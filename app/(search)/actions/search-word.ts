'use server'

import { openai } from '@ai-sdk/openai'
import { PrismaClient } from '@prisma/client'
import { generateObject } from 'ai'
import { TranslationSchema } from './search-word/schema'
import { systemPrompt } from './search-word/system-prompt'
import type { Translation } from './search-word/types'
import { userPrompt } from './search-word/user-prompt'

const prisma = new PrismaClient()

export async function searchWord(input: string) {
  'use server'
  const savedWord = await prisma.word.findUnique({
    where: { word: input },
  })

  if (savedWord) {
    const translation = {
      translation: savedWord.translation,
      correctOriginal: savedWord.word,
      examples: savedWord.examples,
      error: null,
      partOfSpeech: savedWord.pos,
      thematicCategory: savedWord.category,
      difficultyCategory: savedWord.difficultyCategory,
      registerCategory: savedWord.registerCategory,
      frequencyCategory: savedWord.frequencyCategory,
      description: savedWord.description,
      baseForm: savedWord.word,
      baseTranslation: savedWord.translation,
    } satisfies Translation

    return { translation }
  }

  const thematicCategories = await prisma.word.findMany({
    select: { category: true },
    distinct: ['category'],
  })

  console.log('categories', thematicCategories)

  const { object: translation } = await generateObject({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    prompt: userPrompt(
      input,
      thematicCategories.flatMap(({ category }) => category),
    ),
    schema: TranslationSchema,
  })

  return { translation }
}
