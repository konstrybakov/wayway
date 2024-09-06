'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'

import { generateObject } from 'ai'
import { TranslationSchema } from './search-word/schema'
import { systemPrompt } from './search-word/system-prompt'
import type { Translation } from './search-word/types'
import { userPrompt } from './search-word/user-prompt'

import 'server-only'
import { prisma } from '@/lib/db/client'

// @ts-expect-error
const modelA = anthropic('claude-3-5-sonnet-20240620')
const modelO = openai('gpt-4o-mini-2024-07-18')

export async function searchWord(input: string, userId: string) {
  'use server'
  const savedWord = await prisma.word.findFirst({
    where: { word: input, userId },
    include: { examples: true, categories: true },
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
