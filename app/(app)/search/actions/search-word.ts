'use server'

import 'server-only'
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'

import { generateObject } from 'ai'
import { TranslationSchema } from './search-word/schema'
import { systemPrompt } from './search-word/system-prompt'
import type { Translation } from './search-word/types'
import { userPrompt } from './search-word/user-prompt'

import { prisma } from '@/lib/db/client'

// @ts-expect-error : anthropic is not used atm
const modelA = anthropic('claude-3-5-sonnet-20240620')
const modelO = openai('gpt-4o-mini-2024-07-18')

export async function searchWord(input: string, userId: string) {
  'use server'
  const savedWord = await prisma.word.findFirst({
    where: { word: input, userId },
    include: {
      categories: true,
      wordData: { include: { examples: true } },
    },
  })

  if (savedWord) {
    const translation = {
      translation: savedWord.wordData.translation,
      correctOriginal: savedWord.word,
      examples: savedWord.wordData.examples,
      error: null,
      partOfSpeech: savedWord.wordData.pos,
      thematicCategory: savedWord.categories.map(({ name }) => name),
      difficultyCategory: savedWord.wordData.difficultyCategory,
      registerCategory: savedWord.wordData.registerCategory,
      frequencyCategory: savedWord.wordData.frequencyCategory,
      description: savedWord.wordData.description,
      baseForm: savedWord.word,
      baseTranslation: savedWord.wordData.translation,
    } satisfies Translation

    return { translation, saved: true }
  }

  const thematicCategories = await prisma.category.findMany({
    select: { name: true },
    distinct: ['name'],
  })

  const { object: translation } = await generateObject({
    model: modelO,
    system: systemPrompt,
    prompt: userPrompt(
      input,
      thematicCategories.map(({ name }) => name),
    ),
    schema: TranslationSchema,
    temperature: 0.35,
  })

  return { translation, saved: false }
}
