'use server'

import 'server-only'

import { generateObject } from 'ai'
import { TranslationSchema } from './search-word/schema'
import { systemPrompt } from './search-word/system-prompt'
import type { Translation } from './search-word/types'
import { userPrompt } from './search-word/user-prompt'

import { prisma } from '@/lib/db/client'
import { modelO } from '@/lib/llm/models'
import { fetchCategories } from '@/lib/data/fetch-categories'

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
